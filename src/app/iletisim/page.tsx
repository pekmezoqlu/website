"use client";

import { useState, useRef } from "react";
import type { FormEvent, DragEvent } from "react";

type Foto = { name: string; data: string; type: string; preview: string };

export default function Iletisim() {
  const [gonderildi, setGonderildi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [form, setForm] = useState({ ad: "", telefon: "", email: "", konu: "", mesaj: "" });
  const [fotolar, setFotolar] = useState<Foto[]>([]);
  const [surukle, setSurukle] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function dosyaEkle(files: FileList | null) {
    if (!files) return;
    const yeniList = [...fotolar];
    for (const file of Array.from(files)) {
      if (yeniList.length >= 5) break;
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 3 * 1024 * 1024) { setHata("Her fotoğraf en fazla 3 MB olabilir."); continue; }
      setHata("");
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        setFotolar((prev) => prev.length < 5 ? [...prev, { name: file.name, data, type: file.type, preview: data }] : prev);
      };
      reader.readAsDataURL(file);
      yeniList.push({ name: file.name, data: "", type: file.type, preview: "" });
    }
  }

  function fotoCikar(i: number) {
    setFotolar((prev) => prev.filter((_, idx) => idx !== i));
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setSurukle(false);
    dosyaEkle(e.dataTransfer.files);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setYukleniyor(true);
    setHata("");
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          fotolar: fotolar.map(({ name, data, type }) => ({ name, data, type })),
        }),
      });
      if (!res.ok) throw new Error();
      setGonderildi(true);
    } catch {
      setHata("Mesaj gönderilemedi, lütfen tekrar deneyin.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <>
      {/* Başlık */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Bize Yazın</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">İletişim</h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Traktör teklifi, servis randevusu veya herhangi bir konuda bize ulaşın — en kısa sürede dönüş yapalım.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* İletişim bilgileri */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Bilgilerimiz</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Adres</p>
                    <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">
                      75. Yıl (Sultandere) Mah. Oto Galericiler Sitesi<br />No: 467/7 Odunpazarı / Eskişehir
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Telefon</p>
                    <a href="tel:+905457280424" className="block text-gray-700 text-sm font-medium hover:text-red-600 transition-colors">0545 728 04 24</a>
                    <a href="tel:+905359878980" className="block text-gray-700 text-sm font-medium hover:text-red-600 transition-colors">0535 987 89 80</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">WhatsApp</p>
                    <a href="https://wa.me/905457280424" target="_blank" rel="noopener noreferrer" className="block text-gray-700 text-sm font-medium hover:text-green-600 transition-colors">0545 728 04 24</a>
                    <a href="https://wa.me/905359878980" target="_blank" rel="noopener noreferrer" className="block text-gray-700 text-sm font-medium hover:text-green-600 transition-colors">0535 987 89 80</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">E-posta</p>
                    <a href="mailto:pekmezoglu@hotmail.com.tr" className="text-gray-700 text-sm mt-0.5 font-medium hover:text-red-600 transition-colors">
                      pekmezoglu@hotmail.com.tr
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Çalışma Saatleri</p>
                    <p className="text-gray-500 text-sm mt-0.5">08:00 – 18:00</p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="mt-10 rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-56">
                <iframe
                  src="https://maps.google.com/maps?q=39.7394427,30.614442&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pekmezoğlu Motorlu Araçlar Konum"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/ZyAvh8jB3Efz8exY6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-red-600 text-sm font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Google Maps&apos;te Aç
              </a>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {gonderildi ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mesajınız Alındı!</h3>
                  <p className="text-gray-500">En kısa sürede size dönüş yapacağız.</p>
                  <button
                    onClick={() => { setGonderildi(false); setForm({ ad: "", telefon: "", email: "", konu: "", mesaj: "" }); setFotolar([]); }}
                    className="mt-6 text-red-600 font-semibold text-sm hover:underline"
                  >
                    Yeni mesaj gönder
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Fiyat Teklifi Al</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad Soyad *</label>
                        <input
                          required
                          type="text"
                          value={form.ad}
                          onChange={(e) => setForm({ ...form, ad: e.target.value })}
                          placeholder="Adınız Soyadınız"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon *</label>
                        <input
                          required
                          type="tel"
                          value={form.telefon}
                          onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                          placeholder="0xxx xxx xx xx"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ornek@email.com"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Konu *</label>
                      <select
                        required
                        value={form.konu}
                        onChange={(e) => setForm({ ...form, konu: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Konu seçin</option>
                        <option>Sıfır traktör fiyat teklifi</option>
                        <option>2. el traktör satın almak istiyorum</option>
                        <option>2. el traktörümü satmak istiyorum</option>
                        <option>Servis & bakım randevusu</option>
                        <option>Genel bilgi</option>
                        <option>Diğer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Mesajınız *</label>
                      <textarea
                        required
                        rows={3}
                        value={form.mesaj}
                        onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                        placeholder="Traktörün markası, modeli, yılı, saati vb. bilgileri yazın..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Fotoğraf yükleme */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Traktör Fotoğrafları
                        <span className="text-gray-400 font-normal ml-1">(isteğe bağlı, max 5 foto)</span>
                      </label>

                      {/* Dropzone */}
                      <div
                        onDragOver={(e) => { e.preventDefault(); setSurukle(true); }}
                        onDragLeave={() => setSurukle(false)}
                        onDrop={onDrop}
                        onClick={() => fotolar.length < 5 && fileRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                          surukle ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-red-400 hover:bg-gray-50"
                        } ${fotolar.length >= 5 ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => dosyaEkle(e.target.files)}
                        />
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500">
                          {fotolar.length >= 5
                            ? "Maksimum fotoğraf sayısına ulaşıldı"
                            : "Fotoğrafları buraya sürükleyin veya tıklayın"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG — max 3 MB/foto</p>
                      </div>

                      {/* Önizlemeler */}
                      {fotolar.length > 0 && (
                        <div className="mt-3 grid grid-cols-5 gap-2">
                          {fotolar.map((f, i) => (
                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                              {f.preview && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={f.preview} alt="" className="w-full h-full object-cover" />
                              )}
                              <button
                                type="button"
                                onClick={() => fotoCikar(i)}
                                className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-700"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {hata && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                        {hata}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={yukleniyor}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      {yukleniyor ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Gönderiliyor...
                        </>
                      ) : "Teklif İste"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
