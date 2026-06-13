import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { FallbackDbService } from '../../config/fallback-db.service';

@Injectable()
export class DoctorService {
  private readonly logger = new Logger(DoctorService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fallbackDbService: FallbackDbService,
  ) {}

  private mapProfileToFrontend(row: any) {
    if (!row) return null;
    return {
      name: row.name,
      specialty: row.specialty,
      hospital: row.hospital,
      email: row.email,
      phone: row.phone,
      ward: row.ward,
      monitoringMode: row.monitoring_mode,
      notificationEmail: row.notification_email,
      smsAlerts: row.sms_alerts,
    };
  }

  private mapSettingsToFrontend(row: any) {
    if (!row) return null;
    return {
      liveTelemetry: row.live_telemetry,
      aiAlerts: row.ai_alerts,
      autoRefresh: row.auto_refresh,
      notifications: row.notifications,
      darkMode: row.dark_mode,
    };
  }

  async getProfile(): Promise<any> {
    try {
      const rows = await this.databaseService.query(
        'SELECT * FROM doctor_profiles WHERE id = $1',
        ['U-1001']
      );
      if (rows[0]) {
        return this.mapProfileToFrontend(rows[0]);
      }
      return this.fallbackDbService.getDoctorProfile();
    } catch {
      return this.fallbackDbService.getDoctorProfile();
    }
  }

  async saveProfile(body: any): Promise<any> {
    try {
      const rows = await this.databaseService.query(
        `UPDATE doctor_profiles SET
          name = $1,
          specialty = $2,
          hospital = $3,
          email = $4,
          phone = $5,
          ward = $6,
          monitoring_mode = $7,
          notification_email = $8,
          sms_alerts = $9,
          updated_at = NOW()
        WHERE id = $10
        RETURNING *`,
        [
          body.name || 'Dr. Sarah Johnson',
          body.specialty || 'Cardiologist',
          body.hospital || 'City General Hospital',
          body.email || 'doctor@pulsegrid.health',
          body.phone || '+1 415 555 0188',
          body.ward || 'Cardiac ICU',
          body.monitoringMode || 'Live telemetry',
          body.notificationEmail ?? true,
          body.smsAlerts ?? true,
          'U-1001'
        ]
      );
      this.fallbackDbService.saveDoctorProfile(body);
      if (rows[0]) {
        return this.mapProfileToFrontend(rows[0]);
      }
      return this.fallbackDbService.getDoctorProfile();
    } catch {
      this.fallbackDbService.saveDoctorProfile(body);
      return this.fallbackDbService.getDoctorProfile();
    }
  }

  async getSettings(): Promise<any> {
    try {
      const rows = await this.databaseService.query(
        'SELECT * FROM doctor_settings WHERE id = $1',
        ['U-1001']
      );
      if (rows[0]) {
        return this.mapSettingsToFrontend(rows[0]);
      }
      return this.fallbackDbService.getDoctorSettings();
    } catch {
      return this.fallbackDbService.getDoctorSettings();
    }
  }

  async saveSettings(body: any): Promise<any> {
    try {
      const rows = await this.databaseService.query(
        `UPDATE doctor_settings SET
          live_telemetry = $1,
          ai_alerts = $2,
          auto_refresh = $3,
          notifications = $4,
          dark_mode = $5,
          updated_at = NOW()
        WHERE id = $6
        RETURNING *`,
        [
          body.liveTelemetry ?? true,
          body.aiAlerts ?? true,
          body.autoRefresh ?? true,
          body.notifications ?? true,
          body.darkMode ?? false,
          'U-1001'
        ]
      );
      this.fallbackDbService.saveDoctorSettings(body);
      if (rows[0]) {
        return this.mapSettingsToFrontend(rows[0]);
      }
      return this.fallbackDbService.getDoctorSettings();
    } catch {
      this.fallbackDbService.saveDoctorSettings(body);
      return this.fallbackDbService.getDoctorSettings();
    }
  }
}
