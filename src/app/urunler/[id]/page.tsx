import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { urunler } from "@/lib/urunler";
import FotoGalerisi from "@/components/FotoGalerisi";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return urunler.map((u) => ({ id: String(u.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const urun = urunler.find((u) => u.id === Number(id));
  if (!urun) return {};
  return {
    title: `${urun.marka} ${urun.model} — Pekmezoğlu Motorlu Araçlar`,
    description: `${urun.modelYili} model ${urun.marka} ${urun.model} — ${urun.guc}, ${urun.durum}`,
  };
}

export default async function UrunDetay({ params }: Props) {
  const { id } = await params;
  const urun = urunler.find((u) => u.id === Number(id));
  if (!urun) notFound();

  const tablo = [
    { label: "Fiyat",                value: "Fiyat İçin Arayın", kirmizi: true },
    { label: "Marka",                value: urun.marka },
    { label: "Model",                value: urun.model },
    { label: "Yıl",                  value: urun.modelYili },
    { label: "Motor Gücü (HP)",      value: urun.guc },
    { label: "Çalışma Saati",        value: urun.saat },
    { label: "Vites",                value: urun.vites },
    { label: "Kuyruk Mili",          value: urun.kuyrukMili },
    { label: "Kaldırma Kapasitesi",  value: urun.kaldirmaKapasitesi },
    { label: "Araç Durumu",          value: urun.durum },
    { label: "Çekiş Tipi",          value: "4x4" },
    { label: "Tipi",                 value: "Tarla Tipi" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ═══════════════════════════════════
          MOBİL DÜZEN  (lg altı)
      ═══════════════════════════════════ */}
      <div className="lg:hidden pb-24">

        {/* Tam genişlik galeri */}
        <div className="bg-black">
          <FotoGalerisi fotolar={urun.fotolar} baslik={`${urun.marka} ${urun.model}`} />
        </div>

        {/* Başlık + Konum */}
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              urun.durum === "Sıfır" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }`}>
              {urun.durum}
            </span>
            {urun.badge && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                {urun.badge}
              </span>
            )}
          </div>
          <h1 className="text-lg font-extrabold text-gray-900 leading-snug uppercase">
            {urun.modelYili} {urun.marka} {urun.model}
            {urun.saat !== "-" ? ` — ${urun.saat}` : ""}
          </h1>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Odunpazarı / Eskişehir
          </div>
        </div>

        {/* Satıcı */}
        <div className="bg-white mt-2 px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-extrabold">P</span>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">Pekmezoğlu Motorlu Araçlar</p>
              <p className="text-xs text-gray-400 mt-0.5">Başak Yetkili Bayii</p>
            </div>
          </div>
        </div>

        {/* Özellik tablosu */}
        <div className="bg-white mt-2">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">İlan Bilgileri</p>
          </div>
          {tablo.map((satir) => (
            <div
              key={satir.label}
              className="flex justify-between items-center px-4 py-3.5 border-b border-gray-100 last:border-0"
            >
              <span className="text-sm text-gray-500">{satir.label}</span>
              <span className={`text-sm font-semibold ${satir.kirmizi ? "text-red-600" : "text-gray-900"}`}>
                {satir.value}
              </span>
            </div>
          ))}
        </div>

        {/* Breadcrumb altta */}
        <div className="px-4 py-3 flex items-center gap-1.5 text-xs text-gray-400 mt-2">
          <Link href="/urunler" className="hover:text-red-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tüm İlanlar
          </Link>
        </div>

        {/* Sabit alt bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
          <a
            href="tel:+905457280424"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-center text-sm transition-colors"
          >
            Ara
          </a>
          <a
            href="https://wa.me/905457280424"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center shrink-0 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════
          MASAÜSTÜ DÜZEN  (lg ve üzeri)
      ═══════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-red-600">Ana Sayfa</Link>
            <span>&rsaquo;</span>
            <Link href="/urunler" className="hover:text-red-600">Traktörler</Link>
            <span>&rsaquo;</span>
            <span className="text-gray-700">{urun.marka}</span>
            <span>&rsaquo;</span>
            <span className="text-gray-700">{urun.model}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
            {urun.modelYili} {urun.marka} {urun.model}
            {urun.saat !== "-" ? ` — ${urun.saat}` : ""}
          </h1>

          <div className="grid lg:grid-cols-5 gap-5">
            {/* Galeri */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
                <FotoGalerisi fotolar={urun.fotolar} baslik={`${urun.marka} ${urun.model}`} />
              </div>
            </div>

            {/* Sağ panel */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Fiyat */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <p className="text-2xl font-extrabold text-red-600">Fiyat İçin Arayın</p>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                  <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Odunpazarı / Eskişehir
                </div>
                <div className="flex gap-2 mt-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    urun.durum === "Sıfır" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>{urun.durum}</span>
                  {urun.badge && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700">{urun.badge}</span>
                  )}
                </div>
              </div>

              {/* Tablo */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Teknik Özellikler</p>
                </div>
                {tablo.filter(s => !s.kirmizi).map((satir, i, arr) => (
                  <div
                    key={satir.label}
                    className={`flex items-center text-sm ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <div className="w-2/5 px-4 py-2.5 bg-gray-50 text-gray-500 font-medium text-xs">{satir.label}</div>
                    <div className="w-3/5 px-4 py-2.5 text-gray-900 font-semibold">{satir.value}</div>
                  </div>
                ))}
              </div>

              {/* Satıcı & İletişim */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
                  <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white font-extrabold text-base">P</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Pekmezoğlu Motorlu Araçlar</p>
                    <p className="text-xs text-gray-400 mt-0.5">Başak Yetkili Bayii</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <a href="tel:+905457280424"
                    className="flex items-center justify-between bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-xl transition-colors">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm">0545 728 04 24</span>
                    </div>
                    <span className="text-xs opacity-75">Ara</span>
                  </a>
                  <a href="tel:+905359878980"
                    className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-3 rounded-xl transition-colors">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm">0535 987 89 80</span>
                    </div>
                    <span className="text-xs opacity-50">Ara</span>
                  </a>
                  <a href="https://wa.me/905457280424" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-sm">WhatsApp ile Mesaj Gönder</span>
                  </a>
                </div>
              </div>

              <Link href="/urunler"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Tüm ilanlar
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
