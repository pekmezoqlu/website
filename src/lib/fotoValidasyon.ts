const MAX_FOTO = 5;
const MAX_FOTO_BYTES = 3 * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const DATA_URL_RE = /^data:([^;]+);base64,([A-Za-z0-9+/]+=*)$/;

export type Foto = { name: string; data: string; type: string };

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
    const { name, data, type } = f as Record<string, unknown>;

    if (typeof type !== "string" || !ALLOWED_MIME.includes(type)) {
      throw new FotoValidasyonHatasi("Desteklenmeyen fotoğraf türü.");
    }
    if (typeof data !== "string") {
      throw new FotoValidasyonHatasi("Geçersiz fotoğraf verisi.");
    }

    const match = data.match(DATA_URL_RE);
    if (!match || match[1] !== type) {
      throw new FotoValidasyonHatasi("Fotoğraf verisi bozuk.");
    }

    const base64 = match[2];
    const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
    const byteLength = (base64.length * 3) / 4 - padding;
    if (byteLength > MAX_FOTO_BYTES) {
      throw new FotoValidasyonHatasi("Her fotoğraf en fazla 3 MB olabilir.");
    }

    const safeName =
      typeof name === "string" ? name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100) : "";

    return { name: safeName || `fotograf-${i + 1}.jpg`, data, type };
  });
}
