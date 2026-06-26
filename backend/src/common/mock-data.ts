export const patients = [
  {
    id: 'P-1043',
    name: 'Arjun Sharma',
    ward: 'ICU-A',
    age: 64,
    hr: null,
    spo2: null,
    status: 'Stable',
    recovery: 92,
    condition: 'Post-op cardiac monitoring',
    doctor: 'Dr. Sarah Johnson',
    room: 'A-12',
    risk: 'Low',
  },
  {
    id: 'P-1044',
    name: 'Meera Iyer',
    ward: 'ICU-A',
    age: 71,
    hr: null,
    spo2: null,
    status: 'Critical',
    recovery: 45,
    condition: 'Respiratory distress review',
    doctor: 'Dr. Sarah Johnson',
    room: 'A-14',
    risk: 'High',
  },
  {
    id: 'P-1045',
    name: 'Vikram Reddy',
    ward: 'ICU-B',
    age: 58,
    hr: null,
    spo2: null,
    status: 'Warning',
    recovery: 64,
    condition: 'Post-surgery observation',
    doctor: 'Dr. Sarah Johnson',
    room: 'B-03',
    risk: 'Medium',
  },
];

export const alerts = [
  { id: 1, title: 'Low SpO₂', patient: 'Meera Iyer', severity: 'Critical', time: '11:42 AM' },
  { id: 2, title: 'High Heart Rate', patient: 'Arjun Sharma', severity: 'Warning', time: '09:12 AM' },
  { id: 3, title: 'Medication Due', patient: 'Vikram Reddy', severity: 'Info', time: '08:02 AM' },
];

export const hospitals = [
  { id: 'H-1001', name: 'CityCare General', region: 'North Wing', beds: 220, status: 'Active' },
  { id: 'H-1002', name: 'PulseGrid Referral', region: 'Central', beds: 180, status: 'Active' },
];

export const dashboardSummary = {
  totalPatients: patients.length,
  activeMonitoring: patients.filter((item) => item.status !== 'Stable').length,
  criticalCases: patients.filter((item) => item.status === 'Critical').length,
  recoveryRate: 87,
  openAlerts: alerts.length,
  aiInsights: 4,
};
