import { NextResponse } from "next/server";
import { settings, updateSettings } from "../data";

export async function GET() {
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(updateSettings(body));
}
