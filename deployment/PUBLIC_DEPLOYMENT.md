# Public Deployment Checklist

Use this checklist to publish PulseGrid publicly.

## 1. Frontend (Vercel)
1. Push the repository to GitHub.
2. Import the pulsegrid-ui project in Vercel.
3. Set environment variables:
   - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   - NEXT_PUBLIC_SOCKET_URL=https://socket.yourdomain.com
   - NEXT_PUBLIC_STORAGE_URL=https://storage.yourdomain.com
4. Deploy.

## 2. Backend (Render / Railway / Fly.io / VPS)
1. Deploy the NestJS service from the backend directory.
2. Set environment variables:
   - DATABASE_URL=postgresql://...
   - REDIS_URL=redis://...
   - JWT_SECRET=replace-this-with-a-long-secret
   - MINIO_ENDPOINT=https://storage.yourdomain.com
   - AI_SERVICE_URL=https://ai.yourdomain.com
3. Expose the service as api.yourdomain.com.

## 3. Database and storage
- PostgreSQL: Neon / Supabase / AWS RDS
- Redis: Upstash / Redis Cloud
- Storage: Cloudflare R2 / AWS S3

## 4. Domain and SSL
- Configure DNS for www, api, socket, ai, and storage.
- Enable Cloudflare SSL / Let’s Encrypt.

## 5. Monitoring
- Prometheus and Grafana are in deployment/docker/docker-compose.yml.
- Use Grafana at your monitoring subdomain.
