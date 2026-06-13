import { NextResponse } from "next/server";
import { patients as fallbackPatients } from "../../data";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getBackendData(id: string) {
  try {
    const response = await fetch(`${BACKEND}/patients/${id}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Backend unavailable");
    }

    return await response.json();
  } catch {
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const backendPatient = await getBackendData(id);

  if (backendPatient) {
    return NextResponse.json(backendPatient);
  }

  const patient = fallbackPatients.find((item) => item.id === id);

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json(patient);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const res = await fetch(`${BACKEND}/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return NextResponse.json(await res.json());
  } catch { /* fallback */ }

  // Local fallback in case backend is offline
  const patient = fallbackPatients.find((item) => item.id === id);
  if (patient) {
    if (body.labTests !== undefined) (patient as any).labTests = body.labTests;
    if (body.labTest !== undefined) (patient as any).labTest = body.labTest;
  }
  return NextResponse.json({ id, ...body });
}
