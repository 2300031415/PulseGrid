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
    productId: 'ID-001',
  }
];

export const alerts = [
  { id: 2, title: 'High Heart Rate', patient: 'Arjun Sharma', severity: 'Warning', time: '09:12 AM' }
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
