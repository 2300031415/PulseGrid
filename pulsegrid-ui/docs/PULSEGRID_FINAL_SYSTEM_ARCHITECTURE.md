# PulseGrid Final System Architecture

This document captures the complete platform direction used for the current PulseGrid implementation.

## 1. Platform Modules
- Super Admin Portal
- Hospital Admin Portal
- Doctor Portal
- Nurse Portal
- Lab Technician Portal
- Patient Portal
- AI Engine
- Device Engine
- Reports Engine
- Notification Engine
- Analytics Engine

## 2. Multi-Tenant Structure
PulseGrid is designed as a multi-tenant healthcare SaaS platform where each hospital operates in an isolated tenant context.

Examples:
- City General Hospital
- Apollo Hospital
- Yashoda Hospital

Each tenant owns its own users, doctors, nurses, patients, devices, reports, alerts, and monitoring views.

## 3. Login Flow
1. Enter hospital code
2. Identify hospital context
3. Select role
4. Authenticate with role-based demo credentials
5. Route to the correct portal

Supported demo codes:
- CITYHOSP01
- APOLLOH01
- YASHODA01

## 4. Role Coverage
### Super Admin
- Hospitals
- Subscriptions
- Revenue
- Users
- Audit Logs
- System Monitoring

### Hospital Admin
- Doctors
- Nurses
- Patients
- Devices
- Wards
- Lab
- Reports
- Analytics
- Settings

### Doctor Portal
- Dashboard
- Patients Registry
- Patient Command Center
- Live Monitoring
- Alerts Center
- AI Insights
- Reports
- Settings

### Nurse Portal
- Dashboard
- Assigned Patients
- Medication Tasks
- Vitals Entry
- Nursing Notes
- Alerts

### Lab Technician Portal
- Dashboard
- Pending Tests
- Sample Tracking
- Upload Results
- Reports History

### Patient Portal
- My Health
- Recovery Progress
- Prescriptions
- Reports
- Appointments
- Messages

## 5. Backend Architecture
Frontend (Next.js)
  -> NestJS API
  -> Auth, Hospital, User, Patient, Device, Monitoring, Report, Notification, AI, Billing and Audit services
  -> PostgreSQL
  -> Redis
  -> Socket.IO
  -> Live dashboards

## 6. Core Backend Modules
- auth
- users
- hospitals
- doctors
- nurses
- patients
- devices
- monitoring
- reports
- alerts
- ai
- notifications
- billing
- audit

## 7. Database Design
### Hospital
- id
- hospitalCode
- name
- email
- phone
- address
- city
- state
- country
- subscriptionPlan
- status

### User
- id
- hospitalId
- name
- email
- passwordHash
- role
- status
- lastLogin

### Doctor / Nurse / Patient / Device / Vitals / Alerts / Lab / Reports / AI Predictions / Appointments / Messages / Notifications / AuditLog
These entities form the foundation for the multi-role practice and monitoring system.

## 8. Redis and Real-Time Flow
Redis is used to store the latest values for:
- patient vitals
- ECG snapshots
- patient risk status
- active alerts

This improves real-time performance over repeated direct database queries.

## 9. Socket.IO Events
- patient-vitals
- patient-ecg
- patient-alert
- device-status
- ai-prediction
- lab-report-uploaded

## 10. UDP / Device Gateway
Future hardware integration flow:
- ESP32
- MAX30102 (HR + SpO2)
- AD8232 (ECG)
- DS18B20 (Temperature)
- UDP gateway
- NestJS
- PostgreSQL
- Redis
- Socket.IO
- Dashboards

## 11. AI Engine (Phase 1 and Beyond)
Phase 1
- Recovery prediction
- Risk prediction
- Alert classification
- Patient ranking

Phase 2
- Anomaly detection
- ECG analysis
- Sepsis prediction
- Readmission prediction

## 12. Reports and Notifications
- Patient report
- Lab report
- Doctor report
- Ward report
- Recovery report
- Discharge summary
- PDF / Excel export
- Critical alert emails, SMS, push, and in-app notifications

## 13. Current Implementation Status
The current frontend now includes:
- role-based login and multi-tenant demo flow
- hospital admin and super admin portals
- doctor live monitoring, alerts, AI insights, and reports views
- API-backed dashboard data for the main role screens
- architecture documentation for the final production backend and data model
