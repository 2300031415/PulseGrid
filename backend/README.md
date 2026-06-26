# PulseGrid Backend Structure

This backend directory is organized as a healthcare platform with six cooperating systems:

1. Auth Service
2. Hospital / User / Role Service
3. Patient / Device / Monitoring Service
4. Alert / Report / Message Service
5. AI / Analytics Service
6. Notification / Audit / Billing Service

Recommended module layout:
- app/auth/
- app/hospitals/
- app/doctors/
- app/nurses/
- app/patients/
- app/devices/
- app/monitoring/
- app/alerts/
- app/reports/
- app/messages/
- app/notifications/
- app/ai/
- app/dashboard/
- app/audit/
- app/billing/

Deployment notes:
- Keep all tenant-specific queries scoped with hospital_id.
- Use Redis for live vitals and alerts.
- Use MinIO/S3 for reports and images.
- Leave the current Next.js UI in frontend untouched and connect it through the API gateway.
