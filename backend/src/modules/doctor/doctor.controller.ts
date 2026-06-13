import { Controller, Get, Post, Body } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('profile')
  async getProfile() {
    return this.doctorService.getProfile();
  }

  @Post('profile')
  async saveProfile(@Body() body: any) {
    return this.doctorService.saveProfile(body);
  }

  @Get('settings')
  async getSettings() {
    return this.doctorService.getSettings();
  }

  @Post('settings')
  async saveSettings(@Body() body: any) {
    return this.doctorService.saveSettings(body);
  }
}