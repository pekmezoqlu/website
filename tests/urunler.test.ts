import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { urunler } from "@/lib/urunler";

const publicDir = path.resolve(__dirname, "../public");

describe("ürün kataloğu — veri bütünlüğü", () => {
  it("katalog boş değil", () => {
    expect(urunler.length).toBeGreaterThan(0);
  });

  it("tüm id'ler benzersiz", () => {
    const ids = urunler.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("zorunlu metin alanları boş değil", () => {
    for (const u of urunler) {
      expect(u.marka.trim(), `id ${u.id} marka`).not.toBe("");
      expect(u.model.trim(), `id ${u.id} model`).not.toBe("");
      expect(u.modelYili.trim(), `id ${u.id} modelYili`).not.toBe("");
    }
  });

  it("model yılı ya '-' ya da 1950–gelecek yıl aralığında geçerli bir sayı", () => {
    const ustSinir = new Date().getFullYear() + 1;
    for (const u of urunler) {
      if (u.modelYili === "-") continue;
      const yil = Number(u.modelYili);
      expect(Number.isNaN(yil), `id ${u.id} modelYili sayı değil: ${u.modelYili}`).toBe(false);
      expect(yil, `id ${u.id}`).toBeGreaterThanOrEqual(1950);
      expect(yil, `id ${u.id}`).toBeLessThanOrEqual(ustSinir);
    }
  });

  // BİLİNEN SORUN: UrunlerClient yıl filtresi ve sıralaması Number(modelYili)
  // kullanıyor. "-" değeri NaN'a dönüştüğü için:
  //   • yıl aralığı filtresi bu ürünü hiçbir zaman elemiyor,
  //   • "Model: En Yeni / En Eski" sıralamasında karşılaştırma NaN dönüyor.
  // Filtre panelinde saat için olan "belirtilmeyenleri göster" seçeneğinin
  // bir benzeri yıl için de gerekiyor. Bu test, sorunu görünür tutmak için var.
  it.skip("model yılı bilinmeyen ürün yok (yıl filtresi/sıralaması NaN'a düşüyor)", () => {
    const bilinmeyen = urunler.filter((u) => u.modelYili === "-");
    expect(bilinmeyen.map((u) => `${u.id} ${u.marka} ${u.model}`)).toEqual([]);
  });

  it("durum sadece 'Sıfır' veya '2. El'", () => {
    for (const u of urunler) {
      expect(["Sıfır", "2. El"], `id ${u.id}`).toContain(u.durum);
    }
  });

  it("her ürünün en az bir fotoğrafı var", () => {
    // SearchModal ve ürün kartları fotolar[0]'a doğrudan eriştiği için
    // fotoğrafsız bir ürün çalışma zamanında hata verir.
    for (const u of urunler) {
      expect(u.fotolar.length, `id ${u.id} (${u.marka} ${u.model}) fotoğrafsız`).toBeGreaterThan(0);
    }
  });

  it("referans verilen tüm fotoğraf dosyaları public/ içinde mevcut", () => {
    const eksik: string[] = [];
    for (const u of urunler) {
      for (const foto of u.fotolar) {
        if (!fs.existsSync(path.join(publicDir, foto))) eksik.push(`id ${u.id}: ${foto}`);
      }
    }
    expect(eksik).toEqual([]);
  });

  it("fotoğraf yolları / ile başlar ve boşluk içermez", () => {
    for (const u of urunler) {
      for (const foto of u.fotolar) {
        expect(foto.startsWith("/"), `id ${u.id}: ${foto}`).toBe(true);
        expect(foto.includes(" "), `id ${u.id}: ${foto}`).toBe(false);
      }
    }
  });

  it("aynı ürün içinde tekrarlayan fotoğraf yok", () => {
    for (const u of urunler) {
      expect(new Set(u.fotolar).size, `id ${u.id} tekrarlayan foto içeriyor`).toBe(u.fotolar.length);
    }
  });

  it("çalışma saati '-' ya da sayısal bir değer", () => {
    for (const u of urunler) {
      if (u.saat === "-") continue;
      const rakam = u.saat.replace(/[^\d]/g, "");
      expect(rakam.length, `id ${u.id} saat: ${u.saat}`).toBeGreaterThan(0);
    }
  });
});
