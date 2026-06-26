import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';

import { DatabaseService } from '../../config/database.service';

@Controller()
export class AuthController {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  @Post('auth/login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    const users = await this.databaseService.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [body.email],
    );

    const user = users[0];

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.password !== body.password) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      token: 'pulsegrid-token',
      user,
    };
  }

  @Get('auth/profile')
  profile() {
    return {
      status: 'ok',
    };
  }
}