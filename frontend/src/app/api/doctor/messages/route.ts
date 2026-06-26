import { NextResponse } from "next/server";
import { addMessage, messages } from "../data";

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const text = typeof body?.text === "string" ? body.text.trim() : "";

  if (!text) {
    return NextResponse.json({ error: "Message text is required" }, { status: 400 });
  }

  return NextResponse.json(addMessage(text));
}
