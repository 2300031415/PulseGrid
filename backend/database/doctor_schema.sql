-- PulseGrid doctor dashboard persistence schema
-- This SQL is ready for the Phase 7 backend integration with PostgreSQL/Prisma.

CREATE TABLE IF NOT EXISTS doctor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  hospital_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  ward TEXT,
  monitoring_mode TEXT NOT NULL DEFAULT 'Live telemetry',
  notification_email BOOLEAN NOT NULL DEFAULT TRUE,
  sms_alerts BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  ward TEXT NOT NULL,
  age INTEGER NOT NULL,
  hr INTEGER NOT NULL,
  spo2 INTEGER NOT NULL,
  status TEXT NOT NULL,
  recovery INTEGER NOT NULL,
  condition TEXT NOT NULL,
  doctor TEXT NOT NULL,
  room TEXT NOT NULL,
  risk TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alerts (
  id BIGSERIAL PRIMARY KEY,
  patient_id TEXT REFERENCES patients(id),
  title TEXT NOT NULL,
  severity TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS telemetry_events (
  id BIGSERIAL PRIMARY KEY,
  patient_id TEXT REFERENCES patients(id),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
