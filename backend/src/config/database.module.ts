import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { FallbackDbService } from './fallback-db.service';

@Global()
@Module({
  providers: [DatabaseService, FallbackDbService],
  exports: [DatabaseService, FallbackDbService],
})
export class DatabaseModule {}