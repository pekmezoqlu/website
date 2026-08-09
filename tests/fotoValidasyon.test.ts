import { describe, it, expect, afterAll } from "vitest";

const STORE_ID = "teststore123";
const HOST = `${STORE_ID}.public.blob.vercel-storage.com`;
const ONCEKI_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

// Modül, izin verilen host'u BLOB_READ_WRITE_TOKEN'dan türettiği için
// import'tan ÖNCE ayarlanmalı.
process.env.BLOB_READ_WRITE_TOKEN = `vercel_blob_rw_${STORE_ID}_secretpart`;

const { validateFotolar, FotoValidasyonHatasi } = await import("@/lib/fotoValidasyon");

const gecerliUrl = `https://${HOST}/foto-abc.webp`;

afterAll(() => {
  if (ONCEKI_TOKEN === undefined) delete process.env.BLOB_READ_WRITE_TOKEN;
  else process.env.BLOB_READ_WRITE_TOKEN = ONCEKI_TOKEN;
});

describe("validateFotolar — geçerli girdiler", () => {
  it("null/undefined için boş dizi döner", () => {
    expect(validateFotolar(null)).toEqual([]);
    expect(validateFotolar(undefined)).toEqual([]);
  });

  it("kendi blob store'umuzdaki URL'i kabul eder", () => {
    expect(validateFotolar([{ name: "traktor.webp", url: gecerliUrl }])).toEqual([
      { name: "traktor.webp", url: gecerliUrl },
    ]);
  });

  it("tam 5 fotoğrafa izin verir", () => {
    const besFoto = Array.from({ length: 5 }, (_, i) => ({ name: `f${i}.webp`, url: gecerliUrl }));
    expect(validateFotolar(besFoto)).toHaveLength(5);
  });
});

describe("validateFotolar — dosya adı temizleme", () => {
  it("path traversal denemesini nötrler", () => {
    const [foto] = validateFotolar([{ name: "../../etc/passwd", url: gecerliUrl }]);
    expect(foto.name).not.toContain("/");
    expect(foto.name).toBe(".._.._etc_passwd");
  });

  it("adı 100 karaktere kısaltır", () => {
    const [foto] = validateFotolar([{ name: "a".repeat(500), url: gecerliUrl }]);
    expect(foto.name).toHaveLength(100);
  });

  it("ad yoksa varsayılan isim üretir", () => {
    const [foto] = validateFotolar([{ url: gecerliUrl }]);
    expect(foto.name).toBe("fotograf-1.jpg");
  });
});

describe("validateFotolar — reddedilmesi gerekenler", () => {
  const reddet = (girdi: unknown) => () => validateFotolar(girdi);

  it("5'ten fazla fotoğrafı reddeder", () => {
    const altiFoto = Array.from({ length: 6 }, () => ({ name: "f.webp", url: gecerliUrl }));
    expect(reddet(altiFoto)).toThrow(FotoValidasyonHatasi);
  });

  it("dizi olmayan veriyi reddeder", () => {
    expect(reddet({ url: gecerliUrl })).toThrow(FotoValidasyonHatasi);
    expect(reddet("string")).toThrow(FotoValidasyonHatasi);
  });

  it("SSRF: yabancı host'u reddeder", () => {
    expect(reddet([{ name: "x", url: "https://evil.com/gizli.png" }])).toThrow(FotoValidasyonHatasi);
  });

  it("SSRF: başka bir Vercel Blob store'unu reddeder", () => {
    expect(
      reddet([{ name: "x", url: "https://baskastore.public.blob.vercel-storage.com/a.png" }])
    ).toThrow(FotoValidasyonHatasi);
  });

  it("SSRF: iç ağ adreslerini reddeder", () => {
    expect(reddet([{ name: "x", url: "http://169.254.169.254/latest/meta-data/" }])).toThrow(
      FotoValidasyonHatasi
    );
    expect(reddet([{ name: "x", url: "http://localhost:3000/" }])).toThrow(FotoValidasyonHatasi);
  });

  it("http (https olmayan) protokolü reddeder", () => {
    expect(reddet([{ name: "x", url: `http://${HOST}/a.png` }])).toThrow(FotoValidasyonHatasi);
  });

  it("file:// ve data: şemalarını reddeder", () => {
    expect(reddet([{ name: "x", url: "file:///etc/passwd" }])).toThrow(FotoValidasyonHatasi);
    expect(reddet([{ name: "x", url: "data:text/html,<script>1</script>" }])).toThrow(
      FotoValidasyonHatasi
    );
  });

  it("bozuk URL'i reddeder", () => {
    expect(reddet([{ name: "x", url: "bu bir url degil" }])).toThrow(FotoValidasyonHatasi);
  });

  it("url alanı string değilse reddeder", () => {
    expect(reddet([{ name: "x", url: 123 }])).toThrow(FotoValidasyonHatasi);
    expect(reddet([null])).toThrow(FotoValidasyonHatasi);
  });

  it("host'un alt alan adı hilesini reddeder", () => {
    expect(reddet([{ name: "x", url: `https://${HOST}.evil.com/a.png` }])).toThrow(
      FotoValidasyonHatasi
    );
  });
});
