# PulseGrid Deployment Guide

This folder contains the production deployment scaffold for PulseGrid. It is designed to extend the current Next.js frontend in frontend without changing the existing UI pages or their routes.

## 1. Deployment goals
- Keep the current UI untouched.
- Add an API gateway, PostgreSQL, Redis, Socket.IO, MinIO, AI service, and device/UDP support.
- Provide a production-ready structure for hospitals, patients, doctors, nurses, alerts, reports, and real-time monitoring.

## 2. Recommended production layout
- Frontend: Next.js app in frontend
- Backend: NestJS/API layer (to be added under backend/)
- AI service: Python/FastAPI
- UDP gateway: Python device listener
- Storage: MinIO or S3
- Monitoring: Prometheus + Grafana

## 3. Folder structure
- backend/deployment/docker/         - Compose and container definitions
- backend/deployment/nginx/          - Reverse-proxy config
- backend/deployment/monitoring/      - Prometheus and Grafana config
- backend/deployment/database/        - PostgreSQL initialization
- backend/deployment/cache/redis/     - Redis config
- backend/deployment/storage/minio/   - storage mount point

## 4. Environment variables
Copy backend/deployment/env.example to a real environment file before deploying.

Required variables:
- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_SOCKET_URL
- NEXT_PUBLIC_STORAGE_URL
- DATABASE_URL
- REDIS_URL
- JWT_SECRET
- MINIO_ENDPOINT
- AI_SERVICE_URL

## 5. Start the stack
From the repository root:

1. docker compose -f backend/deployment/docker/docker-compose.yml up -d postgres redis minio
2. docker compose -f backend/deployment/docker/docker-compose.yml up -d backend ai-service udp-gateway
3. docker compose -f backend/deployment/docker/docker-compose.yml up -d frontend
4. docker compose -f backend/deployment/docker/docker-compose.yml up -d prometheus grafana

## 6. Public deployment path
For a public URL, deploy the frontend to Vercel and the backend to Render/Railway/Fly.io or a VPS:

1. Frontend: import the frontend folder in Vercel
2. Backend: deploy the NestJS API container to Render or Railway
3. Database: use Neon/Supabase/AWS RDS
4. Redis: use Upstash or Redis Cloud
5. Storage: use Cloudflare R2 or AWS S3
6. Domain: point www.yourdomain.com, api.yourdomain.com, socket.yourdomain.com, and storage.yourdomain.com to the deployed services

## 7. Health checks

## 8. Health checks
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/health
- Redis: redis-cli -h localhost -p 6379 ping
- MinIO: http://localhost:9001
- Grafana: http://localhost:3001

## 9. Phase rollout
- Phase 1: Next.js + NestJS + PostgreSQL + JWT
- Phase 2: Redis + Socket.IO + live monitoring
- Phase 3: Reports and file storage
- Phase 4: UDP gateway and ESP32 devices
- Phase 5: AI predictions and ECG analytics

## 8. Important operating rules
- Keep all hospital data isolated by hospital_id.
- Use Redis for live vitals and alerts.
- Store files in object storage (MinIO/S3) and keep only URLs in PostgreSQL.
- Do not change the UI route structure in frontend unless a future backend integration requires it.
