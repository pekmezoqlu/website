const WHATSAPP_NUMBER = "905359878980";

type WhatsappUrun = {
  id: number;
  marka: string;
  model: string;
  modelYili?: string;
};

export function urunWhatsappLink(urun: WhatsappUrun) {
  const urunAdi = [urun.modelYili, urun.marka, urun.model].filter(Boolean).join(" ");
  const ilanLinki = `https://www.pekmezoglu.com/urunler/${urun.id}`;
  const mesaj = `Merhaba, ${urunAdi} traktörünüzün fiyatı ve detayları hakkında bilgi almak istiyorum.\n\nİlan: ${ilanLinki}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mesaj)}`;
}
