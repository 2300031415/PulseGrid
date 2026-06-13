# PulseGrid

This repository contains the PulseGrid frontend UI, backend API scaffold, deployment assets, and architecture notes.

## Quick start (fresh run)

Open two terminals from the repository root.

### 1) Install dependencies

Frontend:
```powershell
cd D:\Pulsegrid\pulsegrid-ui
npm install
```

Backend:
```powershell
cd D:\Pulsegrid\backend
npm install
```

### 2) Start the backend

```powershell
cd D:\Pulsegrid\backend
npm run start:dev
```

### 3) Start the frontend

```powershell
cd D:\Pulsegrid\pulsegrid-ui
npm run dev
```

Open the app here:
- http://localhost:3000

## Useful commands

### Frontend
```powershell
cd D:\Pulsegrid\pulsegrid-ui
npm run dev
npm run build
npm run start
```

### Backend
```powershell
cd D:\Pulsegrid\backend
npm run start:dev
npm run build
npm run start
```

## If port 3000 is already in use

A previous Next.js dev server can keep the port locked. Kill the stale process first:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { taskkill /F /PID $_ }
```

Then start the frontend again:

```powershell
cd D:\Pulsegrid\pulsegrid-ui
npm run dev
```

## Project layout

- pulsegrid-ui/     - Next.js frontend UI
- backend/          - NestJS backend API and modules
- deployment/       - Docker, env, monitoring, and infra setup
- architecture/     - Architecture notes and system overview

## Notes

- The frontend is currently the main app to open in the browser.
- The backend is intended for API, dashboard, auth, alerts, monitoring, and healthcare service modules.
- For production deployment, use the files under deployment/ as the starting point.
