import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('auth/login')
  login(@Body() body: { email?: string; password?: string; role?: string }) {
    return {
      token: 'pulsegrid-demo-token',
      user: {
        id: 'U-1001',
        name: 'Dr. Sarah Johnson',
        role: body.role || 'doctor',
        email: body.email || 'doctor@pulsegrid.local',
      },
      message: 'Backend login is ready. Replace with real JWT auth later.',
    };
  }

  @Get('auth/profile')
  profile() {
    return {
      id: 'U-1001',
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      hospital: 'CityCare General',
      status: 'active',
    };
  }
}
