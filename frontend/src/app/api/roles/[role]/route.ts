import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const BACKEND = "http://localhost:4000";
const DB_FILE = path.join(process.cwd(), "..", "backend", "database-fallback.json");

function readDB(): any {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    }
  } catch {}
  return null;
}

const roleData = {
  doctor: {
    title: "Attending Cardiologist",
    summary: "Cardiac ICU round dashboard, patient telemetry streams, and lab coordination.",
    stats: [
      { label: "Patients", value: "3", detail: "In Cardiac ICU" },
      { label: "Active streams", value: "2", detail: "Telemetry online" },
      { label: "Open alerts", value: "1", detail: "Low SpO₂ alert" },
    ],
  },
  nurse: {
    title: "Nurse Portal",
    summary: "Ward rounds, bedside triage, and critical-care coordination.",
    stats: [
      { label: "Beds in care", value: "3", detail: "All stable" },
      { label: "Vital checks", value: "100%", detail: "Completed on time" },
      { label: "Pending tests", value: "2", detail: "Blood chemistry" },
    ],
  },
  patient: {
    title: "Patient Portal",
    summary: "Personal recovery view, medication reminders, and live monitoring status.",
    stats: [
      { label: "Recovery score", value: "92%", detail: "Improving trend" },
      { label: "Heart rate", value: "74 bpm", detail: "Stable" },
      { label: "SpO₂", value: "98%", detail: "Excellent oxygenation" },
    ],
  },
  lab: {
    title: "Lab Technician Portal",
    summary: "Diagnostics queue, test turnaround, and sample progress tracking.",
    stats: [
      { label: "Pending reports", value: "5", detail: "3 urgent cases" },
      { label: "Results uploaded", value: "0", detail: "All clear" },
      { label: "SLA compliance", value: "100%", detail: "On-time delivery" },
    ],
  },
  admin: {
    title: "Hospital Admin Portal",
    summary: "Hospital operations, staff scheduling, user accounts, and system health.",
    stats: [
      { label: "Doctors", value: "1", detail: "Dr. Sarah Johnson" },
      { label: "Nurses", value: "1", detail: "Nancy Wheeler" },
      { label: "Patients", value: "4", detail: "4 registered under hospital" },
    ],
  },
};

const defaultIdentities = {
  doctor: {
    name: "Dr. Sarah Johnson",
    email: "doctor@pulsegrid.health",
    role: "Attending Cardiologist",
    specialtyOrDepartment: "Cardiology",
  },
  nurse: {
    name: "Nancy Wheeler",
    email: "nurse@pulsegrid.health",
    role: "Charge Nurse",
    specialtyOrDepartment: "Emergency Department",
  },
  patient: {
    name: "Arjun Sharma",
    email: "patient@pulsegrid.health",
    role: "Patient",
    specialtyOrDepartment: "General Ward",
  },
  lab: {
    name: "Ravi Thomas",
    email: "lab@pulsegrid.health",
    role: "Lab Analyst",
    specialtyOrDepartment: "Clinical Pathology",
  },
  admin: {
    name: "Jordan Lee",
    email: "hospital.admin@pulsegrid.health",
    role: "Hospital Operations Manager",
    specialtyOrDepartment: "Administration",
  },
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ role: string }> }
) {
  const { role } = await params;
  let normalized = role.toLowerCase();
  if (normalized === "hospital-admin" || normalized === "admin") {
    normalized = "admin";
  }
  if (normalized === "lab-tech") {
    normalized = "lab";
  }

  if (!roleData[normalized as keyof typeof roleData]) {
    return NextResponse.json({ error: "Role dashboard not found" }, { status: 404 });
  }

  const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase();
  
  // Try to find identity in database fallback
  let identity: any = null;
  const db = readDB();
  if (db && db.users) {
    const userRow = db.users.find((u: any) => u.email.trim().toLowerCase() === email);
    if (userRow) {
      identity = {
        name: userRow.name,
        email: userRow.email,
        role: userRow.role,
        specialtyOrDepartment: userRow.specialtyOrDepartment,
        hospitalCode: userRow.hospitalCode,
      };
    }
  }

  if (!identity) {
    identity = defaultIdentities[normalized as keyof typeof defaultIdentities];
  }

  // Fetch backend dashboard stats if available
  let stats = roleData[normalized as keyof typeof roleData].stats;
  try {
    let backendUrl = "";
    if (normalized === "doctor" || normalized === "nurse") {
      backendUrl = `${BACKEND}/dashboard/doctor`;
    } else if (normalized === "admin") {
      backendUrl = `${BACKEND}/dashboard/admin`;
    }

    if (backendUrl) {
      const res = await fetch(backendUrl);
      if (res.ok) {
        const data = await res.json();
        if (normalized === "doctor" || normalized === "nurse") {
          stats = [
            { label: "Patients", value: String(data.totalPatients || 0), detail: "Active telemetry" },
            { label: "Monitoring active", value: String(data.activeMonitoring || 0), detail: "Bedside observation" },
            { label: "Open alerts", value: String(data.openAlerts || 0), detail: "Require attention" },
          ];
        } else if (normalized === "admin") {
          stats = [
            { label: "Doctors", value: String(db?.users?.filter((u: any) => u.role === "Doctor").length || 1), detail: "Registered" },
            { label: "Nurses", value: String(db?.users?.filter((u: any) => u.role === "Nurse").length || 1), detail: "On shift" },
            { label: "Patients", value: String(data.activePatients || 0), detail: "Total in care" },
          ];
        }
      }
    }
  } catch {}

  // For Patient role, let's also fetch patient stats
  if (normalized === "patient" && db && db.patients) {
    const patientRow = db.patients.find((p: any) => p.name.toLowerCase() === identity.name.toLowerCase());
    if (patientRow) {
      identity.patientId = patientRow.id;
      identity.ward = patientRow.ward;
      identity.attending = patientRow.doctor;
      identity.status = patientRow.status;
      stats = [
        { label: "Recovery score", value: `${patientRow.recovery || 85}%`, detail: "Stable" },
        { label: "Attending Doctor", value: patientRow.doctor || "Dr. Sarah Johnson", detail: patientRow.ward || "ICU-A" },
        { label: "Assigned Tests", value: String(patientRow.labTests?.length || 0), detail: "Lab panels" },
      ];
    }
  }

  // For Lab Tech, let's calculate pending reports from patients list
  if (normalized === "lab" && db && db.patients) {
    let pendingCount = 0;
    let uploadedCount = 0;
    db.patients.forEach((p: any) => {
      (p.labTests || []).forEach((t: any) => {
        if (t.status === "Pending") pendingCount++;
        else if (t.status === "Uploaded") uploadedCount++;
      });
    });
    stats = [
      { label: "Pending reports", value: String(pendingCount), detail: "Awaiting upload" },
      { label: "Uploaded reports", value: String(uploadedCount), detail: "Released" },
      { label: "SLA compliance", value: "100%", detail: "All clear" },
    ];
  }

  const alerts = [
    { title: "Medication Scheduled", patient: identity?.name || "Patient", detail: "Morning dose of Aspirin (81mg) is due in 30 minutes." },
    { title: "Lab Request Received", patient: identity?.name || "Patient", detail: "Attending cardiologist assigned a new Blood Pathology panel." }
  ];
  const tasks = [
    "Confirm morning medication adherence",
    "Complete telemetry device calibration check",
    "Log daily vitals reading (blood pressure & temperature)"
  ];

  return NextResponse.json({
    title: roleData[normalized as keyof typeof roleData].title,
    summary: roleData[normalized as keyof typeof roleData].summary,
    stats,
    identity,
    alerts,
    tasks,
    notifications: [
      { source: "Hospital Ops", message: "PulseGrid platform online", priority: "Low" }
    ],
  });
}
