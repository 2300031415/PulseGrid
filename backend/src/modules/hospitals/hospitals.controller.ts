import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { FallbackDbService } from '../../config/fallback-db.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fallbackDbService: FallbackDbService,
  ) {}

  @Get()
  async findAll() {
    try {
      const rows = await this.databaseService.query('SELECT * FROM hospitals ORDER BY created_at DESC LIMIT 100');
      return rows;
    } catch {
      // Return fallback list from fallbackDbService
      return (this.fallbackDbService as any).data?.hospitals || [
        { id: 'H-1001', name: 'CityCare General', region: 'North Wing', beds: 220, status: 'Active' },
        { id: 'H-1002', name: 'PulseGrid Referral', region: 'Central', beds: 180, status: 'Active' },
      ];
    }
  }
}
