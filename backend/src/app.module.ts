import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HospitalsModule } from './modules/hospitals/hospitals.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { PatientsModule } from './modules/patients/patients.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './config/database.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    DashboardModule,
    HospitalsModule,
    MonitoringModule,
    PatientsModule,
    AlertsModule,
    DatabaseModule,
    DoctorModule,
    AdminModule
  ],
})
export class AppModule {}

