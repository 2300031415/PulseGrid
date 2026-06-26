import { Controller, Get, Post, Body, Query, Delete, Patch, Param } from '@nestjs/common';
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

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.databaseService.query('DELETE FROM users WHERE id = $1', [id]);
      this.fallbackDbService.deleteUser(id);
      return { success: true };
    } catch {
      const success = this.fallbackDbService.deleteUser(id);
      return { success };
    }
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    try {
      await this.databaseService.query(
        `UPDATE users
         SET name = COALESCE($1, name),
             email = COALESCE($2, email),
             password = COALESCE($3, password),
             specialty_or_department = COALESCE($4, specialty_or_department)
         WHERE id = $5`,
        [
          body.name || null,
          body.email || null,
          body.password || null,
          body.specialtyOrDepartment || null,
          id
        ]
      );
      const updated = this.fallbackDbService.updateUser(id, body);
      return updated;
    } catch {
      return this.fallbackDbService.updateUser(id, body);
    }
  }
}
