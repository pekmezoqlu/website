import { describe, it, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";

// Upstash yapılandırılmadığında bellek içi yedek devreye girer; burada onu test ediyoruz.
delete process.env.KV_REST_API_URL;
delete process.env.KV_REST_API_TOKEN;
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;

const { checkRateLimit, checkUploadRateLimit, getClientIp } = await import("@/lib/rateLimit");

afterEach(() => {
  vi.useRealTimers();
});

function req(headers: Record<string, string>) {
  return new NextRequest("http://localhost/api/iletisim", { headers });
}

describe("getClientIp", () => {
  it("x-forwarded-for'daki ilk IP'yi alır", () => {
    expect(getClientIp(req({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" }))).toBe("1.2.3.4");
  });

  it("boşlukları temizler", () => {
    expect(getClientIp(req({ "x-forwarded-for": "  9.9.9.9 , 1.1.1.1" }))).toBe("9.9.9.9");
  });

  it("x-forwarded-for yoksa x-real-ip'e düşer", () => {
    expect(getClientIp(req({ "x-real-ip": "8.8.8.8" }))).toBe("8.8.8.8");
  });

  it("hiçbiri yoksa 'unknown' döner", () => {
    expect(getClientIp(req({}))).toBe("unknown");
  });
});

describe("checkRateLimit (bellek içi yedek)", () => {
  it("form için ilk 3 isteğe izin verip 4.'yü engeller", async () => {
    const ip = "10.0.0.1";
    expect(await checkRateLimit(ip)).toBe(true);
    expect(await checkRateLimit(ip)).toBe(true);
    expect(await checkRateLimit(ip)).toBe(true);
    expect(await checkRateLimit(ip)).toBe(false);
  });

  it("farklı IP'ler birbirini etkilemez", async () => {
    const a = "10.0.0.2";
    const b = "10.0.0.3";
    for (let i = 0; i < 3; i++) await checkRateLimit(a);
    expect(await checkRateLimit(a)).toBe(false);
    expect(await checkRateLimit(b)).toBe(true);
  });

  it("pencere dolduktan sonra tekrar izin verir", async () => {
    vi.useFakeTimers();
    const ip = "10.0.0.4";
    for (let i = 0; i < 3; i++) await checkRateLimit(ip);
    expect(await checkRateLimit(ip)).toBe(false);

    vi.advanceTimersByTime(10 * 60 * 1000 + 1000);
    expect(await checkRateLimit(ip)).toBe(true);
  });

  it("yükleme limiti forma göre daha cömerttir (8 istek)", async () => {
    const ip = "10.0.0.5";
    for (let i = 0; i < 8; i++) {
      expect(await checkUploadRateLimit(ip), `${i + 1}. istek geçmeliydi`).toBe(true);
    }
    expect(await checkUploadRateLimit(ip)).toBe(false);
  });

  it("form ve yükleme limitleri ayrı sayaç tutar", async () => {
    const ip = "10.0.0.6";
    for (let i = 0; i < 3; i++) await checkRateLimit(ip);
    expect(await checkRateLimit(ip)).toBe(false);
    expect(await checkUploadRateLimit(ip)).toBe(true);
  });
});
