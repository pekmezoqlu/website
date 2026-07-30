import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { validateFotolar, FotoValidasyonHatasi } from "@/lib/fotoValidasyon";
import { escapeHtml } from "@/lib/escapeHtml";

const MIN_SUBMIT_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ad, telefon, email, konu, mesaj, fotolar, web, sure } = body as {
      ad: string;
      telefon: string;
      email: string;
      konu: string;
      mesaj: string;
      fotolar: { name: string; data: string; type: string }[];
      web?: string;
      sure?: number;
    };

    // Honeypot: bu alanı sadece botlar doldurur. Dolu geldiyse sessizce "başarılı" dön.
    if (web) {
      return NextResponse.json({ ok: true });
    }

    // Form birkaç saniyeden kısa sürede gönderildiyse muhtemelen bottur.
    if (typeof sure === "number" && sure < MIN_SUBMIT_MS) {
      return NextResponse.json({ ok: true });
    }

    if (!ad?.trim() || !telefon?.trim() || !konu?.trim() || !mesaj?.trim()) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 });
    }

    if (telefon.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Lütfen geçerli bir telefon numarası girin." }, { status: 400 });
    }

    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Lütfen geçerli bir e-posta adresi girin." }, { status: 400 });
    }

    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Çok fazla mesaj gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      return NextResponse.json({ error: "Sunucu yapılandırması eksik." }, { status: 500 });
    }

    let validFotolar;
    try {
      validFotolar = validateFotolar(fotolar);
    } catch (err) {
      if (err instanceof FotoValidasyonHatasi) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });

    const attachments = validFotolar.map((f, i) => ({
      filename: f.name || `fotograf-${i + 1}.jpg`,
      content: f.data.split(",")[1],
      encoding: "base64" as const,
      contentType: f.type,
    }));

    await transporter.sendMail({
      from: `"Pekmezoğlu Web Sitesi" <${user}>`,
      to: user,
      replyTo: email || undefined,
      subject: `Yeni Mesaj: ${konu}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ad Soyad</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(ad)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(telefon)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-posta</td><td style="padding:8px;border:1px solid #ddd">${email ? escapeHtml(email) : "—"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Konu</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(konu)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Mesaj</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(mesaj).replace(/\n/g, "<br>")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Fotoğraf</td><td style="padding:8px;border:1px solid #ddd">${attachments.length > 0 ? `${attachments.length} adet ektedir` : "Gönderilmedi"}</td></tr>
        </table>
      `,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mail gönderme hatası:", err);
    return NextResponse.json({ error: "Mail gönderilemedi." }, { status: 500 });
  }
}
