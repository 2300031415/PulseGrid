import { NextResponse } from "next/server";

const doctorProfile = {
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  hospital: "City General Hospital",
  email: "sarah.johnson@pulsegrid.health",
  phone: "+1 415 555 0188",
  ward: "Cardiac ICU",
  notificationEmail: true,
  smsAlerts: true,
  monitoringMode: "Live telemetry",
};

export async function GET() {
  return NextResponse.json(doctorProfile);
}

export async function POST(request: Request) {
  const body = await request.json();

  Object.assign(doctorProfile, body);

  return NextResponse.json(doctorProfile);
}
