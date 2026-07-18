import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ad, telefon, email, konu, mesaj, fotolar } = body as {
      ad: string;
      telefon: string;
      email: string;
      konu: string;
      mesaj: string;
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
      replyTo: email || undefined,
      subject: `Yeni Mesaj: ${konu}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ad Soyad</td><td style="padding:8px;border:1px solid #ddd">${ad}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${telefon}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-posta</td><td style="padding:8px;border:1px solid #ddd">${email || "—"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Konu</td><td style="padding:8px;border:1px solid #ddd">${konu}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Mesaj</td><td style="padding:8px;border:1px solid #ddd">${mesaj.replace(/\n/g, "<br>")}</td></tr>
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
