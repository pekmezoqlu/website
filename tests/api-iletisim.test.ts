import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const sendMail = vi.fn().mockResolvedValue({ messageId: "test" });

vi.mock("nodemailer", () => ({
  default: { createTransport: () => ({ sendMail }) },
}));

// Rate limit'i testler arası sızmasın diye devre dışı bırakıyoruz;
// limitin kendisi ayrıca test ediliyor.
const checkRateLimit = vi.fn().mockResolvedValue(true);
vi.mock("@/lib/rateLimit", () => ({
  checkRateLimit: (ip: string) => checkRateLimit(ip),
  checkUploadRateLimit: vi.fn().mockResolvedValue(true),
  getClientIp: () => "1.2.3.4",
}));

process.env.SMTP_USER = "test@example.com";
process.env.SMTP_PASS = "sifre";

const { POST } = await import("@/app/api/iletisim/route");

function istek(govde: unknown) {
  return new NextRequest("http://localhost/api/iletisim", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(govde),
  });
}

const gecerli = {
  ad: "Şevket Pekmezoğlu",
  telefon: "0535 987 89 80",
  email: "test@example.com",
  konu: "Traktör hakkında",
  mesaj: "Merhaba, bilgi almak istiyorum.",
  sure: 10000,
};

beforeEach(() => {
  sendMail.mockClear();
  checkRateLimit.mockClear().mockResolvedValue(true);
});

describe("POST /api/iletisim — mutlu yol", () => {
  it("geçerli formu kabul eder ve mail gönderir", async () => {
    const res = await POST(istek(gecerli));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(sendMail).toHaveBeenCalledOnce();
  });

  it("e-posta opsiyoneldir", async () => {
    const res = await POST(istek({ ...gecerli, email: "" }));
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledOnce();
  });

  it("replyTo alanını gönderenin e-postasına ayarlar", async () => {
    await POST(istek(gecerli));
    expect(sendMail.mock.calls[0][0].replyTo).toBe("test@example.com");
  });
});

describe("POST /api/iletisim — bot koruması", () => {
  it("honeypot doluysa mail göndermeden sessizce başarılı döner", async () => {
    const res = await POST(istek({ ...gecerli, web: "bot-doldurdu" }));
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("form 3 saniyeden hızlı gönderildiyse mail göndermez", async () => {
    const res = await POST(istek({ ...gecerli, sure: 500 }));
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });
});

describe("POST /api/iletisim — doğrulama", () => {
  it("zorunlu alanlar eksikse 400 döner", async () => {
    const res = await POST(istek({ sure: 10000 }));
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("sadece boşluktan oluşan alanları reddeder", async () => {
    const res = await POST(istek({ ...gecerli, ad: "   " }));
    expect(res.status).toBe(400);
  });

  it("10 haneden kısa telefonu reddeder", async () => {
    const res = await POST(istek({ ...gecerli, telefon: "12345" }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ error: expect.stringContaining("telefon") });
  });

  it("geçersiz e-postayı reddeder", async () => {
    const res = await POST(istek({ ...gecerli, email: "ali@" }));
    expect(res.status).toBe(400);
  });

  it("çok uzun mesajı reddeder", async () => {
    const res = await POST(istek({ ...gecerli, mesaj: "a".repeat(5001) }));
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("çok uzun adı reddeder", async () => {
    const res = await POST(istek({ ...gecerli, ad: "a".repeat(101) }));
    expect(res.status).toBe(400);
  });
});

describe("POST /api/iletisim — güvenlik", () => {
  it("kullanıcı girdisini mail HTML'ine kaçırarak yazar (XSS)", async () => {
    await POST(istek({ ...gecerli, ad: '<img src=x onerror=alert(1)>' }));
    const html = sendMail.mock.calls[0][0].html as string;
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;img");
  });

  it("yabancı host'taki fotoğrafı reddeder (SSRF)", async () => {
    const res = await POST(
      istek({ ...gecerli, fotolar: [{ name: "a.png", url: "https://evil.com/a.png" }] })
    );
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rate limit aşıldığında 429 döner", async () => {
    checkRateLimit.mockResolvedValue(false);
    const res = await POST(istek(gecerli));
    expect(res.status).toBe(429);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("SMTP hatasında iç detayı sızdırmaz", async () => {
    sendMail.mockRejectedValueOnce(new Error("535 auth failed for user admin@sirket.com"));
    const res = await POST(istek(gecerli));
    expect(res.status).toBe(500);
    const govde = await res.json();
    expect(JSON.stringify(govde)).not.toContain("admin@sirket.com");
  });
});
