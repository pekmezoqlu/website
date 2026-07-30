import { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

// Vercel'in Upstash entegrasyonu değişkenleri KV_REST_API_* ismiyle oluşturuyor;
// UPSTASH_REDIS_REST_* elle/farklı bir entegrasyonla eklenmiş olabilir diye yedek olarak tutuluyor.
const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({ url: redisUrl, token: redisToken }),
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "10 m"),
        prefix: "pekmezoglu-ratelimit",
      })
    : null;

// Upstash yapılandırılmamışsa (örn. yerel geliştirme) bellek içi yedek kullanılır.
// Bu yedek, sunucu yeniden başladığında veya birden fazla instance çalıştığında güvenilir değildir.
const attempts = new Map<string, number[]>();
let warned = false;

function checkRateLimitMemory(ip: string): boolean {
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

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (!ratelimit) {
    if (!warned) {
      console.warn(
        "KV_REST_API_URL/KV_REST_API_TOKEN tanımlı değil; bellek içi (instance'lar arası güvenilir olmayan) rate limit kullanılıyor."
      );
      warned = true;
    }
    return checkRateLimitMemory(ip);
  }

  const { success } = await ratelimit.limit(ip);
  return success;
}

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
