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

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-red-600 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/urunler" className="hover:text-red-600 transition-colors">Ürünlerimiz</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{urun.marka} {urun.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Başlık */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              urun.durum === "Sıfır" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }`}>
              {urun.durum}
            </span>
            {urun.badge && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white">
                {urun.badge}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {urun.modelYili} {urun.marka} {urun.model}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {urun.guc} &bull; {urun.saat} &bull; {urun.vites} Vites
          </p>
        </div>

        {/* Ana içerik: galeri sol, kart sağ */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Sol — Galeri + Özellikler */}
          <div className="lg:col-span-2 space-y-4">

            {/* Fotoğraf galerisi */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 p-3">
              <FotoGalerisi fotolar={urun.fotolar} baslik={`${urun.marka} ${urun.model}`} />
            </div>

            {/* Özellikler tablosu */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-base">İlan Detayları</h2>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-100">
                {[
                  { label: "Marka",                value: urun.marka },
                  { label: "Model",                value: urun.model },
                  { label: "Model Yılı",           value: urun.modelYili },
                  { label: "Güç",                  value: urun.guc },
                  { label: "Çalışma Saati",        value: urun.saat },
                  { label: "Vites",                value: urun.vites },
                  { label: "Kuyruk Mili",          value: urun.kuyrukMili },
                  { label: "Kaldırma Kapasitesi",  value: urun.kaldirmaKapasitesi },
                ].map((o, i) => (
                  <div
                    key={o.label}
                    className={`flex flex-col px-5 py-3.5 ${i % 2 === 0 ? "" : ""} ${i < 6 ? "border-b border-gray-100" : ""}`}
                  >
                    <span className="text-xs text-gray-400 font-medium mb-0.5">{o.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{o.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Açıklama */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 text-base mb-3">Açıklama</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {urun.modelYili} model {urun.marka} {urun.model}, {urun.guc} güç, {urun.saat} çalışma saati,
                {" "}{urun.vites} vites, {urun.kaldirmaKapasitesi} kaldırma kapasitesi.
                {urun.durum === "2. El"
                  ? " 2. el olup tüm detaylar için lütfen bizimle iletişime geçiniz."
                  : " Sıfır araç, Başak yetkili bayii güvencesiyle."}
              </p>
            </div>
          </div>

          {/* Sağ — Fiyat ve iletişim kartı */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Fiyat kartı */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Fiyat</p>
                <p className="text-2xl font-extrabold text-red-600 mb-1">Fiyat için arayın</p>
                <p className="text-xs text-gray-400">En güncel fiyat için bize ulaşın.</p>
              </div>

              {/* Satıcı bilgisi */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white font-extrabold text-lg">P</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-tight">Pekmezoğlu Motorlu Araçlar</p>
                    <p className="text-xs text-gray-400 mt-0.5">Başak Yetkili Bayii</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Odunpazarı / Eskişehir</span>
                </div>

                {/* İletişim butonları */}
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+905457280424"
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    0545 728 04 24
                  </a>
                  <a
                    href="tel:+905359878980"
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    0535 987 89 80
                  </a>
                  <a
                    href="https://wa.me/905457280424"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp ile Sor
                  </a>
                </div>
              </div>

              {/* Geri dön */}
              <Link
                href="/urunler"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Tüm ürünlere dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
