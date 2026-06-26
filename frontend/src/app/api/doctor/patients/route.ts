import { NextResponse, type NextRequest } from "next/server";
import { patients as fallbackPatients } from "../data";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getBackendData() {
  try {
    const response = await fetch(`${BACKEND}/patients`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Backend unavailable");
    }

    return await response.json();
  } catch {
    return null;
  }
}

export async function GET() {
  const backendData = await getBackendData();

  if (backendData) {
    return NextResponse.json(backendData);
  }

  return NextResponse.json(fallbackPatients);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const res = await fetch(`${BACKEND}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return NextResponse.json(await res.json(), { status: 201 });
  } catch { /* fallback */ }

  // Fallback locally
  const newPatient = {
    ...body,
    id: `P-${1000 + fallbackPatients.length + 1}`,
    labTests: body.labTests ?? [],
    hr: body.hr ?? 80,
    spo2: body.spo2 ?? 98,
    status: body.status ?? 'Stable',
    recovery: body.recovery ?? 85,
    condition: body.condition ?? 'Observation',
    doctor: body.doctor ?? 'Dr. Sarah Johnson',
    room: body.room ?? 'TBD',
    risk: body.risk ?? 'Low',
  };
  fallbackPatients.push(newPatient);
  return NextResponse.json(newPatient, { status: 201 });
}
