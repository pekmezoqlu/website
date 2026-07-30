import { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Vercel'in Upstash entegrasyonu değişkenleri KV_REST_API_* ismiyle oluşturuyor;
// UPSTASH_REDIS_REST_* elle/farklı bir entegrasyonla eklenmiş olabilir diye yedek olarak tutuluyor.
const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

let warned = false;
function warnMemoryFallback() {
  if (!warned) {
    console.warn(
      "KV_REST_API_URL/KV_REST_API_TOKEN tanımlı değil; bellek içi (instance'lar arası güvenilir olmayan) rate limit kullanılıyor."
    );
    warned = true;
  }
}

// Upstash yapılandırılmamışsa (örn. yerel geliştirme) bellek içi yedek kullanılır.
// Bu yedek, sunucu yeniden başladığında veya birden fazla instance çalıştığında güvenilir değildir.
function createLimiter(name: string, maxRequests: number, windowMs: number) {
  const ratelimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(maxRequests, `${windowMs / 1000} s`),
        prefix: `pekmezoglu-ratelimit-${name}`,
      })
    : null;

  const attempts = new Map<string, number[]>();

  return async function check(ip: string): Promise<boolean> {
    if (!ratelimit) {
      warnMemoryFallback();
      const now = Date.now();
      const times = (attempts.get(ip) ?? []).filter((t) => now - t < windowMs);
      if (times.length >= maxRequests) {
        attempts.set(ip, times);
        return false;
      }
      times.push(now);
      attempts.set(ip, times);
      return true;
    }

    const { success } = await ratelimit.limit(ip);
    return success;
  };
}

export const checkRateLimit = createLimiter("form", 3, 10 * 60 * 1000);
export const checkUploadRateLimit = createLimiter("upload", 30, 10 * 60 * 1000);

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
