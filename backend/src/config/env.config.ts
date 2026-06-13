export const envConfig = {
  PORT: Number(process.env.PORT || 4000),
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://pulsegrid:pulsegrid@localhost:5432/pulsegrid',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  JWT_SECRET: process.env.JWT_SECRET || 'pulsegrid-dev-secret',
};
