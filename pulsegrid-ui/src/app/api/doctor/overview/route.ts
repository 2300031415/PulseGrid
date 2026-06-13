import { NextResponse } from "next/server";
import { alerts, patients } from "../data";

async function getBackendData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${baseUrl}/dashboard/doctor`, { cache: "no-store" });

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

  return NextResponse.json({
    totalPatients: patients.length,
    activeMonitoring: patients.filter((item) => item.status !== "Stable").length,
    criticalCases: patients.filter((item) => item.status === "Critical").length,
    recoveryRate: 87,
    openAlerts: alerts.length,
    aiInsights: 4,
  });
}
