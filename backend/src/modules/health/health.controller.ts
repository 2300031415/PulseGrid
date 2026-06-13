import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';

@Controller()
export class HealthController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('health')
  async health() {
    const dbStatus = await this.databaseService.ping();

    return {
      status: dbStatus.connected ? 'ok' : 'degraded',
      service: 'pulsegrid-backend',
      timestamp: new Date().toISOString(),
      database: dbStatus,
    };
  }
}
