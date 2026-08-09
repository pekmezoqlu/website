import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const sendMail = vi.fn().mockResolvedValue({ messageId: "test" });

vi.mock("nodemailer", () => ({
  default: { createTransport: () => ({ sendMail }) },
}));

const checkRateLimit = vi.fn().mockResolvedValue(true);
vi.mock("@/lib/rateLimit", () => ({
  checkRateLimit: (ip: string) => checkRateLimit(ip),
  checkUploadRateLimit: vi.fn().mockResolvedValue(true),
  getClientIp: () => "1.2.3.4",
}));

process.env.SMTP_USER = "test@example.com";
process.env.SMTP_PASS = "sifre";

const { POST } = await import("@/app/api/teklif/route");

function istek(govde: unknown) {
  return new NextRequest("http://localhost/api/teklif", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(govde),
  });
}

const gecerli = {
  telefon: "0535 987 89 80",
  il: "Eskişehir",
  ilce: "Odunpazarı",
  marka: "Massey Ferguson",
  model: "285S",
  yil: "1998",
  saat: "5000",
  sure: 10000,
};

beforeEach(() => {
  sendMail.mockClear();
  checkRateLimit.mockClear().mockResolvedValue(true);
});

describe("POST /api/teklif", () => {
  it("geçerli talebi kabul eder", async () => {
    const res = await POST(istek(gecerli));
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledOnce();
  });

  it("mail konusunda marka ve model geçer", async () => {
    await POST(istek(gecerli));
    expect(sendMail.mock.calls[0][0].subject).toContain("Massey Ferguson 285S");
  });

  it("her zorunlu alan tek tek kontrol edilir", async () => {
    const zorunlu = ["telefon", "il", "ilce", "marka", "model", "yil", "saat"] as const;
    for (const alan of zorunlu) {
      const eksik = { ...gecerli, [alan]: "" };
      const res = await POST(istek(eksik));
      expect(res.status, `${alan} eksikken 400 beklenirdi`).toBe(400);
    }
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("honeypot doluysa mail göndermez", async () => {
    const res = await POST(istek({ ...gecerli, web: "bot" }));
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("çok hızlı gönderimi bot sayar", async () => {
    const res = await POST(istek({ ...gecerli, sure: 100 }));
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("kısa telefonu reddeder", async () => {
    const res = await POST(istek({ ...gecerli, telefon: "555" }));
    expect(res.status).toBe(400);
  });

  it("aşırı uzun model adını reddeder", async () => {
    const res = await POST(istek({ ...gecerli, model: "a".repeat(81) }));
    expect(res.status).toBe(400);
  });

  it("girdiyi mail HTML'ine kaçırarak yazar", async () => {
    await POST(istek({ ...gecerli, il: "<b>Eskişehir</b>" }));
    const html = sendMail.mock.calls[0][0].html as string;
    expect(html).toContain("&lt;b&gt;");
    expect(html).not.toContain("<b>Eskişehir</b>");
  });

  it("rate limit aşıldığında 429 döner", async () => {
    checkRateLimit.mockResolvedValue(false);
    const res = await POST(istek(gecerli));
    expect(res.status).toBe(429);
  });

  it("5'ten fazla fotoğrafı reddeder", async () => {
    const fotolar = Array.from({ length: 6 }, () => ({ name: "a.png", url: "https://x.com/a.png" }));
    const res = await POST(istek({ ...gecerli, fotolar }));
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
});
