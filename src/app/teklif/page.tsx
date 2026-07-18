"use client";

import { useState, useRef } from "react";
import type { FormEvent, DragEvent } from "react";

type Foto = { name: string; data: string; type: string; preview: string };

export default function Teklif() {
  const [gonderildi, setGonderildi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [form, setForm] = useState({ telefon: "", il: "", ilce: "", marka: "", model: "", yil: "", saat: "" });
  const [fotolar, setFotolar] = useState<Foto[]>([]);
  const [surukle, setSurukle] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function dosyaEkle(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      if (fotolar.length >= 5) break;
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 3 * 1024 * 1024) { setHata("Her fotoğraf en fazla 3 MB olabilir."); continue; }
      setHata("");
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        setFotolar((prev) => prev.length < 5 ? [...prev, { name: file.name, data, type: file.type, preview: data }] : prev);
      };
      reader.readAsDataURL(file);
    }
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
      const res = await fetch("/api/teklif", {
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
      setHata("Gönderim başarısız, lütfen tekrar deneyin.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <>
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Hızlı Değerlendirme</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Fiyat Teklifi Al</h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Traktörünüzün bilgilerini ve fotoğraflarını gönderin, en kısa sürede sizi arayalım.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {gonderildi ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Talebiniz Alındı!</h3>
                <p className="text-gray-500">En kısa sürede sizi arayacağız.</p>
                <button
                  onClick={() => { setGonderildi(false); setForm({ telefon: "", il: "", ilce: "", marka: "", model: "", yil: "", saat: "" }); setFotolar([]); }}
                  className="mt-6 text-red-600 font-semibold text-sm hover:underline"
                >
                  Yeni talep gönder
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Traktör Bilgileri</h2>
                <form onSubmit={handleSubmit} className="space-y-5">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon Numarası *</label>
                    <input
                      required
                      type="tel"
                      value={form.telefon}
                      onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                      placeholder="0xxx xxx xx xx"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">İl *</label>
                      <input
                        required
                        type="text"
                        value={form.il}
                        onChange={(e) => setForm({ ...form, il: e.target.value })}
                        placeholder="Eskişehir"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">İlçe *</label>
                      <input
                        required
                        type="text"
                        value={form.ilce}
                        onChange={(e) => setForm({ ...form, ilce: e.target.value })}
                        placeholder="Odunpazarı"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Traktör Markası *</label>
                      <input
                        required
                        type="text"
                        value={form.marka}
                        onChange={(e) => setForm({ ...form, marka: e.target.value })}
                        placeholder="Başak, John Deere..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Model *</label>
                      <input
                        required
                        type="text"
                        value={form.model}
                        onChange={(e) => setForm({ ...form, model: e.target.value })}
                        placeholder="2055, 5615..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Model Yılı *</label>
                      <input
                        required
                        type="number"
                        min="1950"
                        max="2026"
                        value={form.yil}
                        onChange={(e) => setForm({ ...form, yil: e.target.value })}
                        placeholder="2018"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Çalışma Saati *</label>
                      <input
                        required
                        type="text"
                        value={form.saat}
                        onChange={(e) => setForm({ ...form, saat: e.target.value })}
                        placeholder="3500 saat"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Fotoğraf yükleme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Traktör Fotoğrafları
                      <span className="text-gray-400 font-normal ml-1">(isteğe bağlı, max 5 foto)</span>
                    </label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setSurukle(true); }}
                      onDragLeave={() => setSurukle(false)}
                      onDrop={onDrop}
                      onClick={() => fotolar.length < 5 && fileRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
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
                        {fotolar.length >= 5 ? "Maksimum fotoğraf sayısına ulaşıldı" : "Fotoğrafları buraya sürükleyin veya tıklayın"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG — max 3 MB/foto</p>
                    </div>

                    {fotolar.length > 0 && (
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {fotolar.map((f, i) => (
                          <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={f.preview} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setFotolar((prev) => prev.filter((_, idx) => idx !== i))}
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
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{hata}</p>
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
      </section>
    </>
  );
}
