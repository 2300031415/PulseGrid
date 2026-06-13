import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { envConfig } from './env.config';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private readonly pool = new Pool({
    connectionString: envConfig.DATABASE_URL,
    ssl: envConfig.DATABASE_URL.includes('sslmode=require')
      ? { rejectUnauthorized: false }
      : false,
  });

  async ping() {
    try {
      const result = await this.pool.query('SELECT NOW() AS now, current_database() AS current_database');
      return {
        connected: true,
        database: envConfig.DATABASE_URL,
        currentDatabase: result.rows[0]?.current_database || 'unknown',
        serverTime: result.rows[0]?.now || new Date().toISOString(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Database connection unavailable: ${message}`);
      return {
        connected: false,
        database: envConfig.DATABASE_URL,
        error: message,
      };
    }
  }

  async query<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
    const result = await this.pool.query<T>(text, params);
    return result.rows as T[];
  }
}
