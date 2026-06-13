import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('doctor')
  getDoctorDashboard() {
    return this.dashboardService.getDoctorDashboard();
  }

  @Get('admin')
  getAdminDashboard() {
    return this.dashboardService.getAdminDashboard();
  }
}
