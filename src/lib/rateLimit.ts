import { NextRequest } from "next/server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

const attempts = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const times = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_REQUESTS) {
    attempts.set(ip, times);
    return false;
  }
  times.push(now);
  attempts.set(ip, times);
  return true;
}

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
