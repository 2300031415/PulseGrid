import { Controller, Get, Param, Patch } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { FallbackDbService } from '../../config/fallback-db.service';

@Controller('alerts')
export class AlertsController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fallbackDbService: FallbackDbService,
  ) {}

  private mapAlert(row: any) {
    return {
      id: row.id,
      title: row.type || row.title || 'Alert',
      patient: row.patient || 'Unassigned',
      severity: row.severity || 'Info',
      time: row.created_at ? new Date(row.created_at).toLocaleTimeString() : 'Now',
    };
  }

  @Get()
  async getAlerts() {
    try {
      const rows = await this.databaseService.query('SELECT a.*, p.name AS patient FROM alerts a LEFT JOIN patients p ON p.id = a.patient_id ORDER BY a.created_at DESC LIMIT 100');
      return rows.map((row) => this.mapAlert(row));
    } catch {
      return this.fallbackDbService.getAlerts().map((row) => this.mapAlert(row));
    }
  }

  @Get('critical')
  async getCriticalAlerts() {
    try {
      const rows = await this.databaseService.query('SELECT a.*, p.name AS patient FROM alerts a LEFT JOIN patients p ON p.id = a.patient_id WHERE a.severity = $1 ORDER BY a.created_at DESC', ['Critical']);
      return rows.map((row) => this.mapAlert(row));
    } catch {
      return this.fallbackDbService.getAlerts().filter((item) => item.severity === 'Critical').map((row) => this.mapAlert(row));
    }
  }

  @Patch(':id/resolve')
  async resolve(@Param('id') id: string) {
    try {
      await this.databaseService.query('UPDATE alerts SET status = $1 WHERE id = $2', ['RESOLVED', id]);
      this.fallbackDbService.resolveAlert(id);
      return { id, status: 'resolved', resolvedAt: new Date().toISOString() };
    } catch {
      this.fallbackDbService.resolveAlert(id);
      return { id, status: 'resolved', resolvedAt: new Date().toISOString() };
    }
  }
}
