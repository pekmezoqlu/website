"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { urunler } from "@/lib/urunler";
import FadeIn from "@/components/FadeIn";

const markalar = [
  "Tümü", "Sıfır", "2. El",
  "Başak", "New Holland", "Massey Ferguson", "John Deere",
  "Deutz-Fahr", "Kubota", "Kioti", "Captain", "Steyr",
  "Fiat", "Tümosan", "Ford", "Case IH", "Landini",
  "Erkunt", "Hattat", "Valtra",
];

export default function UrunlerClient() {
  const [aktif, setAktif] = useState("Tümü");

  const filtrelenmis = useMemo(() => {
    if (aktif === "Tümü") return urunler;
    if (aktif === "Sıfır") return urunler.filter((u) => u.durum === "Sıfır");
    if (aktif === "2. El") return urunler.filter((u) => u.durum === "2. El");
    return urunler.filter((u) => u.marka === aktif);
  }, [aktif]);

  return (
    <>
      {/* Filtreler */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {markalar.map((m) => (
            <button
              key={m}
              onClick={() => setAktif(m)}
              className={`whitespace-nowrap text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                aktif === m
                  ? "bg-red-600 text-white border-red-600"
                  : "text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* Ürün grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtrelenmis.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-2">Bu filtrede ürün bulunamadı.</p>
              <button
                onClick={() => setAktif("Tümü")}
                className="text-red-600 font-semibold hover:underline"
              >
                Tüm ürünleri göster
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtrelenmis.map((urun, i) => (
                <FadeIn key={urun.id} delay={(i % 4) * 80}>
                <Link
                  href={`/urunler/${urun.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 group block"
                >
                  <div
                    className={`${urun.fotolar.length > 0 ? "bg-black" : urun.renk} relative overflow-hidden`}
                    style={{ aspectRatio: "9/16" }}
                  >
                    {urun.fotolar.length > 0 ? (
                      <Image
                        src={urun.fotolar[0]}
                        alt={`${urun.marka} ${urun.model}`}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2h1a1 1 0 001-1v-3a1 1 0 00-.293-.707L16 9.586A1 1 0 0015.293 9H13" />
                      </svg>
                    )}
                    {urun.badge && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                        {urun.badge}
                      </span>
                    )}
                    <span
                      className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full z-10 ${
                        urun.durum === "Sıfır" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {urun.durum}
                    </span>
                    {urun.fotolar.length > 1 && (
                      <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10">
                        {urun.fotolar.length} foto
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      {urun.marka}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5 mb-3">{urun.model}</h3>

                    <div className="space-y-1.5 mb-5">
                      {[
                        { label: "Model Yılı",          value: urun.modelYili },
                        { label: "Güç",                 value: urun.guc },
                        { label: "Saat",                value: urun.saat },
                        { label: "Vites",               value: urun.vites },
                        { label: "Kuyruk Mili",         value: urun.kuyrukMili },
                        { label: "Kaldırma Kapasitesi", value: urun.kaldirmaKapasitesi },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center text-xs border-b border-gray-50 pb-1.5">
                          <span className="text-gray-400 font-medium">{item.label}</span>
                          <span className="font-semibold text-gray-800">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-red-600 font-semibold group-hover:gap-2 transition-all">
                      <span>Detayları Gör</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
                </FadeIn>
              ))}
            </div>
          )}

          <div className="mt-14 bg-white border border-dashed border-red-300 rounded-2xl p-10 text-center">
            <p className="text-gray-500 mb-2">Aradığınız modeli bulamadınız mı?</p>
            <p className="text-gray-700 font-medium mb-4">
              Stoğumuzda listelenmemiş tüm marka ve modeller için teklif verebiliyoruz.
            </p>
            <Link
              href="/iletisim"
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors"
            >
              Özel Sipariş / 2. El Talep Et
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
