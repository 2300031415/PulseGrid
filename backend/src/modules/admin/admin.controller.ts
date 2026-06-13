import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { FallbackDbService } from '../../config/fallback-db.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fallbackDbService: FallbackDbService,
  ) {}

  @Get('users')
  async getUsers(@Query('hospitalCode') hospitalCode: string) {
    try {
      const rows = await this.databaseService.query(
        'SELECT * FROM users WHERE hospital_code = $1',
        [hospitalCode]
      );
      return rows;
    } catch {
      const users = this.fallbackDbService.getUsers();
      return users.filter((u) => !hospitalCode || u.hospitalCode === hospitalCode);
    }
  }

  @Post('users')
  async addUser(@Body() body: any) {
    try {
      const id = body.id || `U-${1000 + this.fallbackDbService.getUsers().length + 1}`;
      const rows = await this.databaseService.query(
        `INSERT INTO users (id, hospital_code, role, name, email, password, specialty_or_department)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          id,
          body.hospitalCode,
          body.role,
          body.name,
          body.email,
          body.password,
          body.specialtyOrDepartment || null
        ]
      );
      this.fallbackDbService.addUser({ ...body, id });
      return rows[0];
    } catch {
      return this.fallbackDbService.addUser(body);
    }
  }
}
