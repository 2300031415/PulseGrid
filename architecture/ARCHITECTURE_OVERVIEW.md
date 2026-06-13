# PulseGrid Architecture Overview

## 1. System purpose
PulseGrid is a healthcare monitoring and operations platform focused on:
- real-time vitals and patient monitoring
- doctor, nurse, lab, admin, and patient dashboards
- alerts, analytics, and AI-assisted insights
- hospital and role-based access control

## 2. Main components

### Frontend
- Location: pulsegrid-ui/
- Stack: Next.js + React + TypeScript
- Responsibility: landing pages, login flows, dashboards, UI components, role-based views

### Backend
- Location: backend/
- Stack: NestJS + TypeScript
- Responsibility: REST API, auth, hospital logic, dashboards, monitoring services, alerts, health endpoints

### Deployment / Infrastructure
- Location: deployment/
- Responsibility: Docker, PostgreSQL, Redis, MinIO, Prometheus, Grafana, Nginx, environment configuration

## 3. Runtime flow
1. Users open the Next.js frontend in the browser.
2. The frontend calls API endpoints from the backend.
3. Backend services use database and cache layers for hospital, dashboard, and alert data.
4. Monitoring, alerts, and analytics can be extended through the deployment layer.

## 4. Core modules
- Auth and role management
- Dashboard data and analytics
- Hospital / patient / doctor / nurse management
- Monitoring and alert systems
- Reporting and notifications

## 5. Local development flow
- Start backend: backend npm run start:dev
- Start frontend: pulsegrid-ui npm run dev
- Use deployment scripts for containers and environment setup in production

## 6. Operational notes
- Keep hospital-scoped data isolated by hospital_id.
- Use Redis for real-time vitals and alerts.
- Use object storage for files and reports.
- Keep the existing UI structure stable while integrating API services.

## 7. Current status
- Frontend UI is runnable locally.
- Backend and deployment scaffold are available for extension and integration.
