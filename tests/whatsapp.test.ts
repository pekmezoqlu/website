import { describe, it, expect } from "vitest";
import { urunWhatsappLink } from "@/lib/whatsapp";

describe("urunWhatsappLink", () => {
  const urun = { id: 42, marka: "Massey Ferguson", model: "285S", modelYili: "1998" };

  it("doğru numaraya wa.me linki üretir", () => {
    expect(urunWhatsappLink(urun)).toMatch(/^https:\/\/wa\.me\/905359878980\?text=/);
  });

  it("mesajda marka, model ve model yılı geçer", () => {
    const mesaj = decodeURIComponent(urunWhatsappLink(urun).split("text=")[1]);
    expect(mesaj).toContain("1998 Massey Ferguson 285S");
  });

  it("ilan linkini ürün id'siyle kurar", () => {
    const mesaj = decodeURIComponent(urunWhatsappLink(urun).split("text=")[1]);
    expect(mesaj).toContain("https://www.pekmezoglu.com/urunler/42");
  });

  it("model yılı yoksa mesajda fazladan boşluk bırakmaz", () => {
    const mesaj = decodeURIComponent(
      urunWhatsappLink({ id: 1, marka: "Fiat", model: "480" }).split("text=")[1]
    );
    expect(mesaj).toContain("Merhaba, Fiat 480 traktörünüzün");
  });

  it("özel karakterleri URL-encode eder", () => {
    const link = urunWhatsappLink(urun);
    expect(link).not.toContain(" ");
    expect(link).not.toContain("\n");
  });
});
