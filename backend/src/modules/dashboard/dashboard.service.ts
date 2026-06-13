import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { FallbackDbService } from '../../config/fallback-db.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fallbackDbService: FallbackDbService,
  ) {}

  private mapPatient(row: any) {
    return {
      id: row.id,
      name: row.name,
      ward: row.ward || 'General',
      age: row.age ?? 58,
      hr: row.hr ?? 82,
      spo2: row.spo2 ?? 97,
      status: row.status === 'ACTIVE' ? 'Stable' : row.status,
      recovery: row.recovery ?? 78,
      condition: row.diagnosis || 'Monitoring in progress',
      doctor: row.doctor || 'On-call physician',
      room: row.room || 'TBD',
      risk: row.risk || 'Medium',
    };
  }

  private mapAlert(row: any) {
    return {
      id: row.id,
      title: row.type || row.title || 'Alert',
      patient: row.patient || 'Unassigned',
      severity: row.severity || 'Info',
      time: row.created_at ? new Date(row.created_at).toLocaleTimeString() : 'Now',
    };
  }

  async getDoctorDashboard() {
    try {
      const [patientRows, alertRows] = await Promise.all([
        this.databaseService.query('SELECT * FROM patients ORDER BY created_at DESC LIMIT 10'),
        this.databaseService.query('SELECT a.*, p.name AS patient FROM alerts a LEFT JOIN patients p ON p.id = a.patient_id ORDER BY a.created_at DESC LIMIT 10'),
      ]);

      const patients = patientRows.map((row) => this.mapPatient(row));
      const alerts = alertRows.map((row) => this.mapAlert(row));

      return {
        totalPatients: patients.length,
        activeMonitoring: patients.filter((item) => item.status !== 'Stable').length,
        criticalCases: patients.filter((item) => item.status === 'Critical').length,
        recoveryRate: 87,
        openAlerts: alerts.length,
        aiInsights: 4,
        patients,
        alerts,
        generatedAt: new Date().toISOString(),
      };
    } catch {
      const patients = this.fallbackDbService.getPatients();
      const alerts = this.fallbackDbService.getAlerts();
      return {
        totalPatients: patients.length,
        activeMonitoring: patients.filter((item) => item.status !== 'Stable').length,
        criticalCases: patients.filter((item) => item.status === 'Critical').length,
        recoveryRate: 87,
        openAlerts: alerts.length,
        aiInsights: 4,
        patients,
        alerts,
        generatedAt: new Date().toISOString(),
      };
    }
  }

  async getAdminDashboard() {
    try {
      const [patientRows, alertRows, hospitalRows] = await Promise.all([
        this.databaseService.query('SELECT COUNT(*)::int AS total FROM patients'),
        this.databaseService.query('SELECT COUNT(*)::int AS total FROM alerts WHERE status = $1', ['OPEN']),
        this.databaseService.query('SELECT COUNT(*)::int AS total FROM hospitals'),
      ]);

      return {
        hospitals: hospitalRows[0]?.total ?? 0,
        activePatients: patientRows[0]?.total ?? 0,
        criticalCases: 0,
        alerts: alertRows[0]?.total ?? 0,
      };
    } catch {
      const patients = this.fallbackDbService.getPatients();
      const alerts = this.fallbackDbService.getAlerts();
      return {
        hospitals: 2,
        activePatients: patients.length,
        criticalCases: patients.filter((item) => item.status === 'Critical').length,
        alerts: alerts.length,
      };
    }
  }
}
