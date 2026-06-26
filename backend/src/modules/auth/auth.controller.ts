import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';

import { DatabaseService } from '../../config/database.service';
import { FallbackDbService } from '../../config/fallback-db.service';

@Controller()
export class AuthController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fallbackDbService: FallbackDbService,
  ) {}

  @Post('auth/login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    let user: any = null;
    try {
      const users = await this.databaseService.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [body.email],
      );
      user = users[0];
    } catch {
      // Fallback to local file database
      const users = this.fallbackDbService.getUsers();
      user = users.find((u) => u.email.trim().toLowerCase() === body.email.trim().toLowerCase());
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userPassword = user.password;
    if (userPassword !== body.password) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: user.id,
      hospitalCode: user.hospitalCode || user.hospital_code,
      role: user.role,
      name: user.name,
      email: user.email,
      specialtyOrDepartment: user.specialtyOrDepartment || user.specialty_or_department,
    };

    return {
      token: 'pulsegrid-token',
      user: payload,
    };
  }

  @Get('auth/profile')
  profile() {
    return {
      status: 'ok',
    };
  }
}