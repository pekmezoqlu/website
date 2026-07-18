import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { telefon, il, ilce, marka, model, yil, saat, fotolar } = body as {
      telefon: string;
      il: string;
      ilce: string;
      marka: string;
      model: string;
      yil: string;
      saat: string;
      fotolar: { name: string; data: string; type: string }[];
    };

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      return NextResponse.json({ error: "Sunucu yapılandırması eksik." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });

    const attachments = (fotolar ?? []).map((f, i) => ({
      filename: f.name || `fotograf-${i + 1}.jpg`,
      content: f.data.split(",")[1],
      encoding: "base64" as const,
      contentType: f.type,
    }));

    await transporter.sendMail({
      from: `"Pekmezoğlu Web Sitesi" <${user}>`,
      to: user,
      subject: `Yeni Fiyat Teklifi Talebi — ${marka} ${model}`,
      html: `
        <h2>Yeni Fiyat Teklifi Talebi</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${telefon}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">İl / İlçe</td><td style="padding:8px;border:1px solid #ddd">${il} / ${ilce}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Marka</td><td style="padding:8px;border:1px solid #ddd">${marka}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Model</td><td style="padding:8px;border:1px solid #ddd">${model}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Model Yılı</td><td style="padding:8px;border:1px solid #ddd">${yil}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Çalışma Saati</td><td style="padding:8px;border:1px solid #ddd">${saat}</td></tr>
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
