import { Module } from '@nestjs/common';
import { MonitoringController } from './monitoring.controller';
import { MqttService } from './mqtt.service';

@Module({
  controllers: [MonitoringController],
  providers: [MqttService],
})
export class MonitoringModule {}
