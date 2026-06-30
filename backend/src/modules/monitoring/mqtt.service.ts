import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { FallbackDbService } from '../../config/fallback-db.service';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private mqttClient: mqtt.MqttClient;
  private readonly logger = new Logger(MqttService.name);

  constructor(private readonly fallbackDb: FallbackDbService) {}

  onModuleInit() {
    this.connectBroker();
  }

  private connectBroker() {
    const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com:1883';
    this.logger.log(`Connecting to MQTT broker at: ${brokerUrl}`);

    try {
      this.mqttClient = mqtt.connect(brokerUrl, {
        clientId: `pulsegrid_backend_${Math.random().toString(16).substring(2, 10)}`,
        clean: true,
        connectTimeout: 5000,
        reconnectPeriod: 2000,
      });

      this.mqttClient.on('connect', () => {
        this.logger.log('Successfully connected to MQTT broker.');
        this.mqttClient.subscribe('telemetry/+/vitals', (err) => {
          if (err) {
            this.logger.error('Failed to subscribe to MQTT telemetry topic pattern.');
          } else {
            this.logger.log('Subscribed to MQTT topic pattern: telemetry/+/vitals');
          }
        });
      });

      this.mqttClient.on('message', (topic, message) => {
        this.handleMessage(topic, message.toString());
      });

      this.mqttClient.on('error', (err) => {
        this.logger.error(`MQTT connection error: ${err.message}`);
      });

      this.mqttClient.on('close', () => {
        this.logger.warn('MQTT connection closed.');
      });
    } catch (e) {
      this.logger.error(`Failed to initialize MQTT connection: ${e.message}`);
    }
  }

  private handleMessage(topic: string, messageStr: string) {
    try {
      const parts = topic.split('/');
      if (parts.length < 3 || parts[2] !== 'vitals') return;

      const deviceId = parts[1]; // Product ID (e.g. ID-001)
      const data = JSON.parse(messageStr);

      this.logger.debug(`Received MQTT vitals on topic ${topic}: ${messageStr}`);

      const patients = this.fallbackDb.getPatients();
      const patient = patients.find(
        (p) => p.productId && p.productId.toLowerCase() === deviceId.toLowerCase(),
      );

      if (!patient) {
        this.logger.warn(`No registered patient matches product ID: ${deviceId}`);
        return;
      }

      const payloadVitals = data.vitals || data;
      const hr = payloadVitals.heart_rate !== undefined ? payloadVitals.heart_rate : payloadVitals.hr;
      const spo2 = payloadVitals.spo2 !== undefined ? payloadVitals.spo2 : payloadVitals.oxygenLevel;
      const temp = payloadVitals.temperature !== undefined ? payloadVitals.temperature : payloadVitals.temp;
      const resp = payloadVitals.resp_rate !== undefined ? payloadVitals.resp_rate : payloadVitals.respiration;

      const updates: any = {};
      if (hr !== undefined) updates.hr = Number(hr);
      if (spo2 !== undefined) updates.spo2 = Number(spo2);
      
      // Determine status warning thresholds
      if (hr !== undefined && spo2 !== undefined) {
        updates.status = Number(hr) > 100 || Number(spo2) < 95 ? 'Warning' : 'Stable';
      }

      this.fallbackDb.updatePatientVitals(patient.id, updates);
      this.logger.log(`Updated vitals for patient ${patient.name} (${patient.id}) from telemetry`);
    } catch (err) {
      this.logger.error(`Error processing MQTT message: ${err.message}`);
    }
  }

  onModuleDestroy() {
    if (this.mqttClient) {
      this.logger.log('Disconnecting from MQTT broker.');
      this.mqttClient.end();
    }
  }
}
