export type PatientRecord = {
  id: string;
  name: string;
  ward: string;
  age: number;
  hr: number;
  spo2: number;
  status: "Stable" | "Warning" | "Critical";
  recovery: number;
  condition: string;
  doctor: string;
  room: string;
  risk: string;
};

export const patients: PatientRecord[] = [
  {
    id: "P-1043",
    name: "Arjun Sharma",
    ward: "ICU-A",
    age: 64,
    hr: 74,
    spo2: 98,
    status: "Stable",
    recovery: 92,
    condition: "Post-op cardiac monitoring",
    doctor: "Dr. Sarah Johnson",
    room: "A-12",
    risk: "Low",
  },
  {
    id: "P-1044",
    name: "Meera Iyer",
    ward: "ICU-A",
    age: 71,
    hr: 100,
    spo2: 97,
    status: "Critical",
    recovery: 45,
    condition: "Respiratory distress review",
    doctor: "Dr. Sarah Johnson",
    room: "A-14",
    risk: "High",
  },
  {
    id: "P-1045",
    name: "Vikram Reddy",
    ward: "ICU-B",
    age: 58,
    hr: 88,
    spo2: 95,
    status: "Warning",
    recovery: 64,
    condition: "Post-surgery observation",
    doctor: "Dr. Sarah Johnson",
    room: "B-03",
    risk: "Medium",
  },
];

export const alerts = [
  { id: 1, title: "Low SpO₂", patient: "Meera Iyer", severity: "Critical", time: "11:42 AM" },
  { id: 2, title: "High Heart Rate", patient: "Arjun Sharma", severity: "Warning", time: "09:12 AM" },
  { id: 3, title: "Medication Due", patient: "Vikram Reddy", severity: "Info", time: "08:02 AM" },
];

export const messages = [
  { id: 1, sender: "Lab Team", text: "New CRP result for P-1044 is ready for review.", time: "09:20 AM", unread: true },
  { id: 2, sender: "Nurse Station", text: "Patient P-1045 requires follow-up on respiration trend.", time: "08:40 AM", unread: false },
];

export let settings = {
  liveTelemetry: true,
  aiAlerts: true,
  autoRefresh: true,
  notifications: true,
  darkMode: false,
};

export function updateSettings(next: Partial<typeof settings>) {
  settings = { ...settings, ...next };
  return settings;
}

export function addMessage(text: string) {
  messages.unshift({
    id: Date.now(),
    sender: "You",
    text,
    time: "Just now",
    unread: false,
  });
  return messages;
}
