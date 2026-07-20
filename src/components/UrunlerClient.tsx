"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { urunler } from "@/lib/urunler";
import FadeIn from "@/components/FadeIn";

const markaListesi = [...new Set(urunler.map((u) => u.marka))].sort();

const MIN_YIL = Math.min(...urunler.map((u) => Number(u.modelYili)));
const MAX_YIL = Math.max(...urunler.map((u) => Number(u.modelYili)));

function parseSaat(s: string): number | null {
  if (s === "-") return null;
  return Number(s.replace(/[^\d]/g, ""));
}
const saatDegerleri = urunler.map((u) => parseSaat(u.saat)).filter((v): v is number => v !== null);
const MIN_SAAT = 0;
const MAX_SAAT = 15000;

type Siralama = "varsayilan" | "yeni-eklenen" | "en-yeni" | "en-eski" | "fiyat-artan" | "fiyat-azalan";

const SIRALAMA_ETIKET: Record<Siralama, string> = {
  "varsayilan":    "Sıralama",
  "yeni-eklenen":  "Yeni Eklenen",
  "en-yeni":       "Model: En Yeni",
  "en-eski":       "Model: En Eski",
  "fiyat-artan":   "Fiyat: Artan",
  "fiyat-azalan":  "Fiyat: Azalan",
};

type Durum = "" | "Sıfır" | "2. El";
type Filters = {
  durum: Durum;
  markalar: string[];
  yilAralik: [number, number];
  saatAralik: [number, number];
  saatBilinmiyor: boolean;
};

const BOSH: Filters = {
  durum: "",
  markalar: [],
  yilAralik: [MIN_YIL, MAX_YIL],
  saatAralik: [MIN_SAAT, MAX_SAAT],
  saatBilinmiyor: true,
};

function yilFiltresiAktif(f: Filters) {
  return f.yilAralik[0] !== MIN_YIL || f.yilAralik[1] !== MAX_YIL;
}
function saatFiltresiAktif(f: Filters) {
  return f.saatAralik[0] !== MIN_SAAT || f.saatAralik[1] !== MAX_SAAT || !f.saatBilinmiyor;
}

export default function UrunlerClient() {
  const [panelAcik, setPanelAcik] = useState(false);
  const [filters, setFilters] = useState<Filters>(BOSH);
  const [siralama, setSiralama] = useState<Siralama>("varsayilan");

  const aktifSayi = [
    filters.durum !== "",
    filters.markalar.length > 0,
    yilFiltresiAktif(filters),
    saatFiltresiAktif(filters),
  ].filter(Boolean).length;

  const filtrelenmis = useMemo(() => {
    const liste = urunler.filter((u) => {
      if (filters.durum && u.durum !== filters.durum) return false;
      if (filters.markalar.length > 0 && !filters.markalar.includes(u.marka)) return false;
      const yil = Number(u.modelYili);
      if (yil < filters.yilAralik[0] || yil > filters.yilAralik[1]) return false;
      const saat = parseSaat(u.saat);
      if (saat === null) {
        if (!filters.saatBilinmiyor) return false;
      } else {
        if (saat < filters.saatAralik[0] || saat > filters.saatAralik[1]) return false;
      }
      return true;
    });

    return [...liste].sort((a, b) => {
      switch (siralama) {
        case "yeni-eklenen":  return b.id - a.id;
        case "en-yeni":       return Number(b.modelYili) - Number(a.modelYili);
        case "en-eski":       return Number(a.modelYili) - Number(b.modelYili);
        case "fiyat-artan":   return (a.fiyat ?? Infinity) - (b.fiyat ?? Infinity);
        case "fiyat-azalan":  return (b.fiyat ?? 0) - (a.fiyat ?? 0);
        default:              return 0;
      }
    });
  }, [filters, siralama]);

  function toggleMarka(m: string) {
    setFilters((f) => ({
      ...f,
      markalar: f.markalar.includes(m) ? f.markalar.filter((x) => x !== m) : [...f.markalar, m],
    }));
  }

  function temizle() { setFilters(BOSH); }

  return (
    <>
      {/* ── Sticky filtre barı ── */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
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

          <div className="flex gap-2 overflow-x-auto min-w-0" style={{ scrollbarWidth: "none" }}>
            {filters.durum && (
              <Tag label={filters.durum} onRemove={() => setFilters((f) => ({ ...f, durum: "" }))} />
            )}
            {filters.markalar.map((m) => (
              <Tag key={m} label={m} onRemove={() => toggleMarka(m)} />
            ))}
            {yilFiltresiAktif(filters) && (
              <Tag
                label={`${filters.yilAralik[0]}–${filters.yilAralik[1]}`}
                onRemove={() => setFilters((f) => ({ ...f, yilAralik: [MIN_YIL, MAX_YIL] }))}
              />
            )}
            {saatFiltresiAktif(filters) && (
              <Tag
                label={`${filters.saatAralik[0].toLocaleString("tr")}–${filters.saatAralik[1].toLocaleString("tr")} saat`}
                onRemove={() => setFilters((f) => ({ ...f, saatAralik: [MIN_SAAT, MAX_SAAT], saatBilinmiyor: true }))}
              />
            )}
          </div>

          <div className="ml-auto shrink-0 flex items-center gap-2">
            {aktifSayi > 0 && (
              <button onClick={temizle} className="text-xs text-gray-400 hover:text-red-600 transition-colors">
                Temizle
              </button>
            )}
            <div className="relative">
              <select
                value={siralama}
                onChange={(e) => setSiralama(e.target.value as Siralama)}
                className={`text-sm pl-3 pr-7 py-1.5 rounded-full border appearance-none cursor-pointer transition-colors outline-none ${
                  siralama !== "varsayilan"
                    ? "bg-red-600 text-white border-red-600"
                    : "text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600 bg-white"
                }`}
              >
                {(Object.keys(SIRALAMA_ETIKET) as Siralama[]).map((k) => (
                  <option key={k} value={k} className="bg-white text-gray-900">
                    {SIRALAMA_ETIKET[k]}
                  </option>
                ))}
              </select>
              <svg
                className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${siralama !== "varsayilan" ? "text-white" : "text-gray-400"}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filtre paneli ── */}
      {panelAcik && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPanelAcik(false)} />
          <div className="relative bg-white w-80 max-w-[90vw] h-full flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-base">Filtrele</span>
              <button onClick={() => setPanelAcik(false)} className="p-1 text-gray-400 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

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
                    <Checkbox key={m} label={m} checked={filters.markalar.includes(m)} onChange={() => toggleMarka(m)} />
                  ))}
                </div>
              </div>

              {/* Model Yılı */}
              <div>
                <SectionTitle>Model Yılı</SectionTitle>
                <RangeSlider
                  min={MIN_YIL}
                  max={MAX_YIL}
                  step={1}
                  value={filters.yilAralik}
                  onChange={(v) => setFilters((f) => ({ ...f, yilAralik: v }))}
                  format={(v) => String(v)}
                />
              </div>

              {/* Çalışma Saati */}
              <div>
                <SectionTitle>Çalışma Saati</SectionTitle>
                <RangeSlider
                  min={MIN_SAAT}
                  max={MAX_SAAT}
                  step={50}
                  value={filters.saatAralik}
                  onChange={(v) => setFilters((f) => ({ ...f, saatAralik: v }))}
                  format={(v) => v.toLocaleString("tr") + " s"}
                />
                <label className="flex items-center gap-2.5 mt-4 cursor-pointer group">
                  <div
                    onClick={() => setFilters((f) => ({ ...f, saatBilinmiyor: !f.saatBilinmiyor }))}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      filters.saatBilinmiyor ? "bg-red-600 border-red-600" : "border-gray-300 group-hover:border-red-400"
                    }`}
                  >
                    {filters.saatBilinmiyor && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    onClick={() => setFilters((f) => ({ ...f, saatBilinmiyor: !f.saatBilinmiyor }))}
                    className="text-sm text-gray-600 group-hover:text-red-600 transition-colors select-none"
                  >
                    Saati belirtilmeyenleri göster
                  </span>
                </label>
              </div>
            </div>

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
              <button onClick={temizle} className="text-red-600 font-semibold hover:underline">
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
                        <Image src={urun.fotolar[0]} alt={`${urun.marka} ${urun.model}`} fill className="object-contain" />
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
                      <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full z-10 ${urun.durum === "Sıfır" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {urun.durum}
                      </span>
                      {urun.fotolar.length > 1 && (
                        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10">
                          {urun.fotolar.length} foto
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{urun.marka}</span>
                      <h3 className="text-lg font-bold text-gray-900 mt-0.5 mb-3">{urun.model}</h3>
                      <div className="space-y-1.5 mb-5">
                        {[
                          { label: "Model Yılı", value: urun.modelYili },
                          { label: "Güç", value: urun.guc },
                          { label: "Saat", value: urun.saat },
                          { label: "Vites", value: urun.vites },
                          { label: "Kuyruk Mili", value: urun.kuyrukMili },
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
            <Link href="/iletisim" className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors">
              Özel Sipariş / 2. El Talep Et
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Çift kollu range slider ── */
function RangeSlider({
  min, max, step, value, onChange, format,
}: {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  format?: (v: number) => string;
}) {
  const [lo, hi] = value;
  const pctLo = ((lo - min) / (max - min)) * 100;
  const pctHi = ((hi - min) / (max - min)) * 100;
  const fmt = format ?? ((v: number) => String(v));

  return (
    <div>
      <div className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
        <span>{fmt(lo)}</span>
        <span>{fmt(hi)}</span>
      </div>
      <div className="relative h-5 flex items-center range-wrap">
        {/* Arka plan çubuğu */}
        <div className="absolute w-full h-1.5 rounded-full bg-gray-200">
          <div
            className="absolute h-full rounded-full bg-red-500"
            style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }}
          />
        </div>
        {/* Alt kol */}
        <input
          type="range"
          min={min} max={max} step={step}
          value={lo}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), hi);
            onChange([v, hi]);
          }}
          style={{ zIndex: lo >= hi ? 5 : 3 }}
        />
        {/* Üst kol */}
        <input
          type="range"
          min={min} max={max} step={step}
          value={hi}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), lo);
            onChange([lo, v]);
          }}
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  );
}

/* ── Yardımcı bileşenler ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{children}</p>;
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex items-center gap-3 group w-full text-left">
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-red-600 border-red-600" : "border-gray-300 group-hover:border-red-400"}`}>
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
