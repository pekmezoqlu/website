"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { urunler } from "@/lib/urunler";
import FadeIn from "@/components/FadeIn";

const markaListesi = [...new Set(urunler.map((u) => u.marka))].sort();
const yilListesi = [...new Set(urunler.map((u) => u.modelYili))].sort((a, b) => Number(b) - Number(a));

type SaatAralik = "" | "0-500" | "500-2000" | "2000+" | "bilinmiyor";
type Durum = "" | "Sıfır" | "2. El";

type Filters = {
  durum: Durum;
  markalar: string[];
  yillar: string[];
  saat: SaatAralik;
};

const BOSH: Filters = { durum: "", markalar: [], yillar: [], saat: "" };

function saatEsles(deger: string, aralik: SaatAralik): boolean {
  if (aralik === "") return true;
  if (aralik === "bilinmiyor") return deger === "-";
  if (deger === "-") return false;
  const n = Number(deger.replace(/[^\d]/g, ""));
  if (aralik === "0-500") return n <= 500;
  if (aralik === "500-2000") return n > 500 && n <= 2000;
  return n > 2000;
}

export default function UrunlerClient() {
  const [panelAcik, setPanelAcik] = useState(false);
  const [filters, setFilters] = useState<Filters>(BOSH);

  const aktifSayi = [
    filters.durum !== "",
    filters.markalar.length > 0,
    filters.yillar.length > 0,
    filters.saat !== "",
  ].filter(Boolean).length;

  const filtrelenmis = useMemo(
    () =>
      urunler.filter((u) => {
        if (filters.durum && u.durum !== filters.durum) return false;
        if (filters.markalar.length > 0 && !filters.markalar.includes(u.marka)) return false;
        if (filters.yillar.length > 0 && !filters.yillar.includes(u.modelYili)) return false;
        if (!saatEsles(u.saat, filters.saat)) return false;
        return true;
      }),
    [filters]
  );

  function toggleArr<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
  }

  function temizle() { setFilters(BOSH); }

  return (
    <>
      {/* ── Sticky filtre barı ── */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">

          {/* 3-çizgi filtre butonu */}
          <button
            onClick={() => setPanelAcik(true)}
            className={`flex items-center gap-2 shrink-0 text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${
              aktifSayi > 0
                ? "bg-red-600 text-white border-red-600"
                : "text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filtrele
            {aktifSayi > 0 && (
              <span className="bg-white text-red-600 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {aktifSayi}
              </span>
            )}
          </button>

          {/* Aktif etiketler */}
          <div className="flex gap-2 overflow-x-auto min-w-0" style={{ scrollbarWidth: "none" }}>
            {filters.durum && (
              <Tag label={filters.durum} onRemove={() => setFilters((f) => ({ ...f, durum: "" }))} />
            )}
            {filters.markalar.map((m) => (
              <Tag key={m} label={m} onRemove={() => setFilters((f) => ({ ...f, markalar: toggleArr(f.markalar, m) }))} />
            ))}
            {filters.yillar.map((y) => (
              <Tag key={y} label={y} onRemove={() => setFilters((f) => ({ ...f, yillar: toggleArr(f.yillar, y) }))} />
            ))}
            {filters.saat && (
              <Tag label={saatLabel(filters.saat)} onRemove={() => setFilters((f) => ({ ...f, saat: "" }))} />
            )}
          </div>

          {aktifSayi > 0 && (
            <button
              onClick={temizle}
              className="shrink-0 ml-auto text-xs text-gray-400 hover:text-red-600 transition-colors"
            >
              Temizle
            </button>
          )}
        </div>
      </section>

      {/* ── Filtre paneli (slide-in) ── */}
      {panelAcik && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setPanelAcik(false)}
          />

          {/* Panel */}
          <div className="relative bg-white w-80 max-w-[90vw] h-full flex flex-col shadow-2xl overflow-hidden">
            {/* Başlık */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-base">Filtrele</span>
              <button
                onClick={() => setPanelAcik(false)}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* İçerik */}
            <div className="flex-1 overflow-y-auto p-5 space-y-7">

              {/* Durum */}
              <div>
                <SectionTitle>Durum</SectionTitle>
                <div className="flex gap-2 flex-wrap">
                  {(["", "Sıfır", "2. El"] as Durum[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setFilters((f) => ({ ...f, durum: d }))}
                      className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                        filters.durum === d
                          ? "bg-red-600 text-white border-red-600"
                          : "text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600"
                      }`}
                    >
                      {d === "" ? "Tümü" : d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Marka */}
              <div>
                <SectionTitle>Marka</SectionTitle>
                <div className="space-y-2.5">
                  {markaListesi.map((m) => (
                    <Checkbox
                      key={m}
                      label={m}
                      checked={filters.markalar.includes(m)}
                      onChange={() => setFilters((f) => ({ ...f, markalar: toggleArr(f.markalar, m) }))}
                    />
                  ))}
                </div>
              </div>

              {/* Model Yılı */}
              <div>
                <SectionTitle>Model Yılı</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {yilListesi.map((y) => (
                    <button
                      key={y}
                      onClick={() => setFilters((f) => ({ ...f, yillar: toggleArr(f.yillar, y) }))}
                      className={`text-sm px-3 py-1 rounded-lg border transition-colors ${
                        filters.yillar.includes(y)
                          ? "bg-red-600 text-white border-red-600"
                          : "text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Saat */}
              <div>
                <SectionTitle>Çalışma Saati</SectionTitle>
                <div className="space-y-2">
                  {(
                    [
                      { val: "" as SaatAralik, label: "Tümü" },
                      { val: "0-500" as SaatAralik, label: "500 saat altı" },
                      { val: "500-2000" as SaatAralik, label: "500 – 2.000 saat" },
                      { val: "2000+" as SaatAralik, label: "2.000+ saat" },
                      { val: "bilinmiyor" as SaatAralik, label: "Belirtilmemiş" },
                    ]
                  ).map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setFilters((f) => ({ ...f, saat: val }))}
                      className={`w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-colors ${
                        filters.saat === val
                          ? "bg-red-600 text-white border-red-600"
                          : "text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-600"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={temizle}
                className="flex-1 text-sm font-medium py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600 transition-colors"
              >
                Temizle
              </button>
              <button
                onClick={() => setPanelAcik(false)}
                className="flex-1 text-sm font-semibold py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                {filtrelenmis.length} Ürünü Gör
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Ürün grid ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtrelenmis.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-2">Bu filtrede ürün bulunamadı.</p>
              <button
                onClick={temizle}
                className="text-red-600 font-semibold hover:underline"
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtrelenmis.map((urun, i) => (
                <FadeIn key={urun.id} delay={(i % 4) * 80}>
                  <Link
                    href={`/urunler/${urun.id}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-red-100 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-red-200 group block"
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

                      <div className="flex items-center justify-between text-sm text-red-600 font-semibold">
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

/* ── Yardımcı bileşenler ── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{children}</p>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex items-center gap-3 group w-full text-left">
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
          checked ? "bg-red-600 border-red-600" : "border-gray-300 group-hover:border-red-400"
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-sm transition-colors ${checked ? "text-red-600 font-medium" : "text-gray-700 group-hover:text-red-600"}`}>
        {label}
      </span>
    </button>
  );
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="whitespace-nowrap flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-red-800 font-bold leading-none">×</button>
    </span>
  );
}

function saatLabel(val: SaatAralik): string {
  if (val === "0-500") return "≤500 saat";
  if (val === "500-2000") return "500–2K saat";
  if (val === "2000+") return "2K+ saat";
  if (val === "bilinmiyor") return "Saat belirtilmemiş";
  return "";
}
