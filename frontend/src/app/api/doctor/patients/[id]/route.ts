import { NextResponse } from "next/server";
import { patients as fallbackPatients } from "../../data";

export const dynamic = "force-dynamic";

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
    if (body.hr !== undefined) (patient as any).hr = Number(body.hr);
    if (body.spo2 !== undefined) (patient as any).spo2 = Number(body.spo2);
    if (body.status !== undefined) (patient as any).status = body.status;
    if (body.recovery !== undefined) (patient as any).recovery = Number(body.recovery);
    
    // Clinical fields
    if (body.condition !== undefined) (patient as any).condition = body.condition;
    if (body.diagnosisDetails !== undefined) (patient as any).diagnosisDetails = body.diagnosisDetails;
    if (body.admissionReason !== undefined) (patient as any).admissionReason = body.admissionReason;
    if (body.admissionReasonDetails !== undefined) (patient as any).admissionReasonDetails = body.admissionReasonDetails;
    if (body.currentTreatment !== undefined) (patient as any).currentTreatment = body.currentTreatment;
    if (body.currentTreatmentDetails !== undefined) (patient as any).currentTreatmentDetails = body.currentTreatmentDetails;
    if (body.risk !== undefined) (patient as any).risk = body.risk;
    if (body.riskDetails !== undefined) (patient as any).riskDetails = body.riskDetails;
    if (body.medications !== undefined) (patient as any).medications = body.medications;
  }
  return NextResponse.json({ id, ...body });
}
