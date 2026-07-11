import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "NOT_SET";
  let backendResponse = null;
  let backendError = null;

  try {
    const res = await fetch(`${backendUrl}/admin/users?hospitalCode=CITYHOSP01`, {
      cache: "no-store",
    });
    backendResponse = {
      status: res.status,
      ok: res.ok,
      headers: Object.fromEntries(res.headers.entries()),
      data: await res.json().catch(() => "failed_to_parse_json"),
    };
  } catch (err: any) {
    backendError = {
      message: err.message,
      stack: err.stack,
    };
  }

  return NextResponse.json({
    vercelEnv: {
      NEXT_PUBLIC_API_URL: backendUrl,
      NODE_ENV: process.env.NODE_ENV,
    },
    backendResponse,
    backendError,
  });
}
