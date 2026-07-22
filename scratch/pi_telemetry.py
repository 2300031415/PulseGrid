import os
import sys
import time
import json
import ssl
import random
import asyncio
import paho.mqtt.client as mqtt
from bleak import BleakScanner, BleakClient

# ==========================================
# CONFIGURATION
# ==========================================
# Replace these with your HiveMQ Cloud broker details
MQTT_HOST = "7b173a77600e470095ca0e0ed1d6a582.s1.eu.hivemq.cloud"
MQTT_PORT = 8883
MQTT_USER = "pulsegrid_device"
MQTT_PASSWORD = "Manoj@2005"

# The Product ID registered to the patient (change to match patient setup, e.g., ID-001 or ID-003)
PRODUCT_ID = "ID-001"

# Berry PM6100 BLE UUIDs (standard Microchip GATT serial stream)
BLE_SERVICE_UUID = "49535343-fe7d-4ae5-8fa9-9fafd205e455"
BLE_NOTIFY_CHAR_UUID = "49535343-1e4d-4bd9-ba61-23c647249616"

# ==========================================
# MQTT CLIENT INITIALIZATION
# ==========================================
try:
    # Support paho-mqtt v2.x versioning
    mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1, client_id=f"pi_monitor_{PRODUCT_ID}")
except AttributeError:
    # Fallback for legacy paho-mqtt v1.x
    mqtt_client = mqtt.Client(client_id=f"pi_monitor_{PRODUCT_ID}")
    
mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)

# Enable secure TLS connection (required by HiveMQ Cloud)
context = ssl.create_default_context()
mqtt_client.tls_set_context(context)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("[MQTT] Successfully connected to HiveMQ Cloud Broker.")
    else:
        print(f"[MQTT] Connection failed with code {rc}")

mqtt_client.on_connect = on_connect

try:
    print(f"[MQTT] Connecting to secure broker: {MQTT_HOST}:{MQTT_PORT}...")
    mqtt_client.connect(MQTT_HOST, MQTT_PORT, 60)
    mqtt_client.loop_start()
except Exception as e:
    print(f"[ERROR] Could not connect to MQTT: {e}")
    sys.exit(1)

# ==========================================
# TELEMETRY PUBLISHER
# ==========================================
def publish_vitals(hr, spo2, resp, temp):
    topic = f"telemetry/{PRODUCT_ID}/vitals"
    payload = {
        "device_id": PRODUCT_ID,
        "timestamp": int(time.time()),
        "vitals": {
            "heart_rate": int(hr),
            "spo2": int(spo2),
            "resp_rate": int(resp),
            "temperature": round(float(temp), 1)
        }
    }
    
    payload_str = json.dumps(payload)
    print(f"[PUBLISH] Sending vitals to topic '{topic}': {payload_str}")
    mqtt_client.publish(topic, payload_str, qos=1)

# ==========================================
# PARSE PM6100 TELEMETRY PACKET
# ==========================================
byte_buffer = bytearray()

def parse_ble_data(sender, data):
    global byte_buffer
    byte_buffer.extend(data)
    
    # Process buffer packet by packet
    while len(byte_buffer) >= 5:
        # PM6100 packets start with a sync byte (MSB is 1)
        sync_index = -1
        for idx, byte in enumerate(byte_buffer):
            if (byte & 0x80) != 0:
                sync_index = idx
                break
                
        if sync_index == -1:
            byte_buffer.clear()
            break
            
        if sync_index > 0:
            del byte_buffer[:sync_index]
            
        if len(byte_buffer) < 5:
            break
            
        # Ensure all subsequent bytes in the packet have MSB as 0 (valid data)
        is_valid = all((b & 0x80) == 0 for b in byte_buffer[1:5])
        if is_valid:
            packet = byte_buffer[:5]
            del byte_buffer[:5]
            
            hr = packet[2]
            spo2 = packet[3]
            resp = packet[4]
            
            # Simple bounds check
            if 30 < hr < 240 and 50 < spo2 <= 100:
                # Estimate a normal temperature for physical testing
                temp = 36.5 + random.uniform(-0.2, 0.2)
                publish_vitals(hr, spo2, resp, temp)
        else:
            # Shift buffer if packet is corrupted
            byte_buffer.pop(0)

# ==========================================
# RUN MODES
# ==========================================
async def run_simulation_mode():
    print("\n--- Starting Simulation Mode ---")
    print(f"Streaming generated vitals for Product ID '{PRODUCT_ID}' every 2 seconds...")
    hr = 75
    spo2 = 98
    temp = 36.6
    resp = 16
    
    while True:
        # Create dynamic normal fluctuations
        hr = max(60, min(110, hr + random.choice([-4, -3, -2, -1, 0, 1, 2, 3, 4])))
        spo2 = max(94, min(100, spo2 + random.choice([-1, 0, 1]) if random.random() > 0.7 else 0))
        temp = max(36.1, min(37.5, temp + random.uniform(-0.15, 0.15)))
        resp = max(12, min(22, resp + random.choice([-2, -1, 0, 1, 2]) if random.random() > 0.6 else 0))
        
        publish_vitals(hr, spo2, resp, temp)
        await asyncio.sleep(2)

async def run_ble_hardware_mode():
    print("\n--- Starting BLE Hardware Mode ---")
    print("Scanning for PM6100 Patient Monitor BLE Broadcast...")
    
    devices = await BleakScanner.discover()
    target_address = None
    for d in devices:
        name = d.name or ""
        if "Berry" in name or "PM6100" in name or "Monitor" in name:
            print(f"[FOUND] Match device '{name}' at Address: {d.address}")
            target_address = d.address
            break
            
    if not target_address:
        print("[WARNING] No PM6100 BLE monitor discovered. Falling back to Simulation Mode...")
        await run_simulation_mode()
        return

    print(f"Connecting to BLE device at {target_address}...")
    async with BleakClient(target_address) as client:
        print("[CONNECTED] Paired with Bluetooth Patient Monitor.")
        await client.start_notify(BLE_NOTIFY_CHAR_UUID, parse_ble_data)
        
        # Keep client notification stream alive
        while client.is_connected:
            await asyncio.sleep(1)

# ==========================================
# MAIN EXECUTION ENTRY
# ==========================================
if __name__ == "__main__":
    mode = "sim"
    if len(sys.argv) > 1:
        mode = sys.argv[1].strip().lower()
        
    print("==================================================")
    print("          PULSEGRID TELEMETRY PI AGENT            ")
    print("==================================================")
    print(f"Targeting Product ID: {PRODUCT_ID}")
    
    try:
        if mode == "ble":
            asyncio.run(run_ble_hardware_mode())
        else:
            asyncio.run(run_simulation_mode())
    except KeyboardInterrupt:
        print("\nExiting Telemetry Pi Agent. Disconnecting...")
        mqtt_client.loop_stop()
        mqtt_client.disconnect()
        sys.exit(0)
