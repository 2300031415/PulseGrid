const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com:1883';
const productId = process.argv[2] || 'ID-001';
const intervalMs = 2000;

console.log(`Connecting to MQTT broker at ${brokerUrl}...`);
const client = mqtt.connect(brokerUrl);

client.on('connect', async () => {
  console.log(`Connected to broker successfully!`);
  console.log(`Starting telemetry simulation for Product ID: ${productId}`);
  console.log(`Publish topic: telemetry/${productId}/vitals`);

  const logFilePath = path.join(__dirname, '..', 'brain', 'temp_logs', 'extracted', 'logs', 'decision_log.jsonl');
  let logLines = [];

  if (fs.existsSync(logFilePath)) {
    console.log(`Found clinical log file at ${logFilePath}. Reading records...`);
    try {
      const fileStream = fs.createReadStream(logFilePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of rl) {
        if (line.trim()) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.news2_data && parsed.news2_data.breakdown) {
              logLines.push(parsed);
            }
          } catch (e) {}
        }
      }
      console.log(`Loaded ${logLines.length} clinical vitals records from log file.`);
    } catch (err) {
      console.error('Failed to parse log file', err);
    }
  } else {
    console.log(`Clinical log file not found at ${logFilePath}. Using generated mock vitals instead.`);
  }

  let index = 0;
  setInterval(() => {
    let payload = {};

    if (logLines.length > 0) {
      const record = logLines[index];
      const breakdown = record.news2_data.breakdown;
      
      const hr = 75 + (breakdown.hr || 0) * 12 + Math.floor(Math.random() * 4) - 2;
      const spo2 = 98 - (breakdown.spo2 || 0) * 3;
      const temp = 36.8 + (breakdown.temp || 0) * 0.8;
      const respiration = 16 + (breakdown.rr || 0) * 4;

      payload = {
        device_id: productId,
        timestamp: Math.floor(Date.now() / 1000),
        vitals: {
          heart_rate: hr,
          resp_rate: respiration,
          spo2: Math.min(100, spo2),
          temperature: parseFloat(temp.toFixed(1))
        }
      };

      index = (index + 1) % logLines.length;
    } else {
      const hr = 70 + Math.floor(Math.random() * 15);
      const spo2 = 96 + Math.floor(Math.random() * 5);
      const temp = 36.5 + parseFloat((Math.random() * 0.8).toFixed(1));
      const respiration = 14 + Math.floor(Math.random() * 6);

      payload = {
        device_id: productId,
        timestamp: Math.floor(Date.now() / 1000),
        vitals: {
          heart_rate: hr,
          resp_rate: respiration,
          spo2: Math.min(100, spo2),
          temperature: temp
        }
      };
    }

    const topic = `telemetry/${productId}/vitals`;
    const message = JSON.stringify(payload);
    
    client.publish(topic, message, (err) => {
      if (err) {
        console.error(`Publish error: ${err.message}`);
      } else {
        console.log(`[Published to ${topic}]: hr=${payload.vitals.heart_rate}, spo2=${payload.vitals.spo2}, temp=${payload.vitals.temperature}°C`);
      }
    });
  }, intervalMs);
});

client.on('error', (err) => {
  console.error(`MQTT Error: ${err.message}`);
});
