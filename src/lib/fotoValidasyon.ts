const MAX_FOTO = 5;
const BLOB_HOST_RE = /^[a-z0-9]+\.public\.blob\.vercel-storage\.com$/;

export type Foto = { name: string; url: string };

export class FotoValidasyonHatasi extends Error {}

export function validateFotolar(fotolar: unknown): Foto[] {
  if (fotolar == null) return [];
  if (!Array.isArray(fotolar)) {
    throw new FotoValidasyonHatasi("Geçersiz fotoğraf verisi.");
  }
  if (fotolar.length > MAX_FOTO) {
    throw new FotoValidasyonHatasi(`En fazla ${MAX_FOTO} fotoğraf gönderebilirsiniz.`);
  }

  return fotolar.map((f, i) => {
    if (!f || typeof f !== "object") {
      throw new FotoValidasyonHatasi("Geçersiz fotoğraf verisi.");
    }
    const { name, url } = f as Record<string, unknown>;

    if (typeof url !== "string") {
      throw new FotoValidasyonHatasi("Geçersiz fotoğraf verisi.");
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new FotoValidasyonHatasi("Geçersiz fotoğraf bağlantısı.");
    }

    // Sadece bizim Vercel Blob deposumuza ait URL'lere izin verilir; aksi halde
    // sunucu, saldırganın verdiği keyfi bir adrese e-posta ekleri için istek atabilir (SSRF).
    if (parsed.protocol !== "https:" || !BLOB_HOST_RE.test(parsed.hostname)) {
      throw new FotoValidasyonHatasi("Geçersiz fotoğraf bağlantısı.");
    }

    const safeName =
      typeof name === "string" ? name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100) : "";

    return { name: safeName || `fotograf-${i + 1}.jpg`, url };
  });
}
