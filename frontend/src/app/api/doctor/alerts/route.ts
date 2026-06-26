import { NextResponse } from "next/server";
import { alerts as fallbackAlerts } from "../data";

async function getBackendData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${baseUrl}/alerts`, { cache: "no-store" });

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

  return NextResponse.json(fallbackAlerts);
}
