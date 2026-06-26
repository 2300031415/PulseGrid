import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const BACKEND = "http://localhost:4000";
const DB_FILE = path.join(process.cwd(), "..", "backend", "database-fallback.json");

function readDB(): Record<string, any[]> {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch {
    return { patients: [], users: [] };
  }
}

function writeDB(data: Record<string, any[]>) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch {
    // silent
  }
}

export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get("role") || "";
  const hospitalCode = req.nextUrl.searchParams.get("hospitalCode") || "CITYHOSP01";
  try {
    const res = await fetch(`${BACKEND}/admin/users?hospitalCode=${hospitalCode}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return NextResponse.json(role ? data.filter((u: any) => u.role === role) : data);
  } catch {
    const db = readDB();
    const users = (db.users || []) as any[];
    const filtered = users.filter((u: any) => {
      return (!role || u.role === role) && (!hospitalCode || u.hospitalCode === hospitalCode);
    });
    return NextResponse.json(filtered);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const res = await fetch(`${BACKEND}/admin/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error();
    return NextResponse.json(await res.json(), { status: 201 });
  } catch {
    const db = readDB();
    if (!db.users) db.users = [];
    const newMember = {
      ...body,
      id: body.id || `U-${1000 + db.users.length + 1}`
    };
    db.users.push(newMember);

    // If role is Patient, also add to patients array
    if (body.role === "Patient") {
      if (!db.patients) db.patients = [];
      const newPatient = {
        id: `P-${1000 + db.patients.length + 1}`,
        name: body.name,
        age: body.age || 45,
        ward: body.ward || "General",
        hr: 80,
        spo2: 98,
        status: "Stable",
        recovery: 85,
        condition: "Observation",
        doctor: body.doctor || "Dr. Sarah Johnson",
        room: "TBD",
        risk: "Low",
        labTest: "None",
        labTests: [],
        hospitalCode: body.hospitalCode || "CITYHOSP01",
        productId: body.productId || null,
      };
      db.patients.push(newPatient);
    }

    writeDB(db);
    return NextResponse.json(newMember, { status: 201 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const res = await fetch(`${BACKEND}/admin/users/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return NextResponse.json(await res.json());
  } catch {}

  // Fallback
  const db = readDB();
  const user = db.users.find((u) => u.id === id);
  if (user) {
    db.users = db.users.filter((u) => u.id !== id);
    if (user.role === "Patient") {
      db.patients = db.patients.filter((p) => p.name !== user.name);
    }
    writeDB(db);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "User not found" }, { status: 404 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const res = await fetch(`${BACKEND}/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return NextResponse.json(await res.json());
  } catch {}

  // Fallback
  const db = readDB();
  const user = db.users.find((u) => u.id === id);
  if (user) {
    const oldName = user.name;
    if (body.name !== undefined) user.name = body.name;
    if (body.email !== undefined) user.email = body.email;
    if (body.password !== undefined) user.password = body.password;
    if (body.specialtyOrDepartment !== undefined) user.specialtyOrDepartment = body.specialtyOrDepartment;

    if (user.role === "Patient") {
      const patient = db.patients.find((p) => p.name === oldName);
      if (patient) {
        if (body.name !== undefined) patient.name = body.name;
        if (body.age !== undefined) patient.age = Number(body.age);
        if (body.ward !== undefined) patient.ward = body.ward;
        if (body.doctor !== undefined) patient.doctor = body.doctor;
        if (body.productId !== undefined) patient.productId = body.productId;
      }
    }
    writeDB(db);
    return NextResponse.json(user);
  }
  return NextResponse.json({ error: "User not found" }, { status: 404 });
}