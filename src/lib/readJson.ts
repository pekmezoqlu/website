import { NextRequest, NextResponse } from "next/server";

export async function readJsonBody(
  req: NextRequest
): Promise<{ ok: true; body: unknown } | { ok: false; response: NextResponse }> {
  try {
    return { ok: true, body: await req.json() };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 }),
    };
  }
}
