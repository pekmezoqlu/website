import Link from "next/link";
import Image from "next/image";

const ozellikler = [
  {
    icon: (
      <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    baslik: "Güvenilir Kalite",
    aciklama: "Sektörün önde gelen markalarının orijinal traktörlerini sunuyoruz.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    baslik: "Uzman Servis",
    aciklama: "Deneyimli teknik ekibimizle satış sonrası tam destek sağlıyoruz.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    baslik: "Uygun Fiyat",
    aciklama: "En rekabetçi fiyatlarla çiftçilerimize en iyi traktörü sunuyoruz.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    baslik: "Hızlı İletişim",
    aciklama: "Sorularınıza ve taleplerinize en kısa sürede dönüş yapıyoruz.",
  },
];

const onecikarilan = [
  {
    ad: "New Holland T5.120",
    kategori: "Çift Çeker Traktör",
    beygir: "120 HP",
    fiyat: "Fiyat için arayın",
    renk: "bg-blue-50",
  },
  {
    ad: "Massey Ferguson 5S.145",
    kategori: "Çift Çeker Traktör",
    beygir: "145 HP",
    fiyat: "Fiyat için arayın",
    renk: "bg-red-50",
  },
  {
    ad: "John Deere 5090R",
    kategori: "Çift Çeker Traktör",
    beygir: "90 HP",
    fiyat: "Fiyat için arayın",
    renk: "bg-green-50",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero + İstatistik bar birlikte tam ekran */}
      <div className="flex flex-col md:min-h-[calc(100vh-64px)]">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white overflow-hidden md:flex-1 flex flex-col justify-center">
        {/* Masaüstü arka plan */}
        <Image
          src="/hero4.png"
          alt="Pekmezoğlu Motorlu Araçlar showroom"
          fill
          priority
          className="hidden md:block object-cover object-center"
          quality={90}
        />
        {/* Mobil arka plan */}
        <Image
          src="/hero-mobile.png"
          alt="Pekmezoğlu Motorlu Araçlar showroom"
          fill
          priority
          className="block md:hidden object-cover object-center"
          quality={90}
        />
        {/* Karartma katmanı */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 md:bg-gradient-to-r md:from-gray-900/80 md:via-gray-900/40 md:to-gray-900/10" />
        <div className="relative w-full py-16 md:pb-36 md:pt-0 px-5 sm:px-10 md:pl-24 md:pr-10 text-center md:text-left" style={{ marginTop: "0px" }}>
          <div className="max-w-2xl mx-auto md:mx-0">
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Türkiye&apos;nin Güvenilir Traktör Satıcısı
            </span>

            {/* 3D Pekmezoğlu başlığı */}
            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-3 leading-none"
              style={{
                color: "#ffffff",
                textShadow: `
                  1px 1px 0px #b91c1c,
                  2px 2px 0px #b91c1c,
                  3px 3px 0px #991b1b,
                  4px 4px 0px #991b1b,
                  5px 5px 0px #7f1d1d,
                  6px 6px 0px #7f1d1d,
                  7px 7px 0px #6b1c1c,
                  8px 8px 16px rgba(0,0,0,0.6)
                `,
              }}
            >
              Pekmezoğlu
            </h1>

            <p className="text-lg md:text-xl font-semibold text-red-400 uppercase tracking-widest mb-6">
              Motorlu Araçlar
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Başak yetkili bayisi olarak sıfır traktörde en iyi fiyat garantisi sunuyoruz.
              Tüm marka ve modellerde 2. el traktör alım & satımı yapıyoruz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/urunler"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3 rounded-lg transition-colors text-sm md:text-base"
              >
                Ürünleri İncele
              </Link>
              <Link
                href="/iletisim"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3 rounded-lg transition-colors text-sm md:text-base"
              >
                Bize Ulaşın
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistik bar */}
      <section className="bg-red-600 text-white shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { sayi: "30+", label: "Yıllık Deneyim" },
              { sayi: "100+", label: "Traktör Modeli" },
              { sayi: "5000+", label: "Mutlu Müşteri" },
              { sayi: "7/24", label: "Teknik Destek" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-extrabold">{item.sayi}</p>
                <p className="text-red-100 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* Özellikler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Yılların deneyimi ve müşteri memnuniyeti odaklı hizmet anlayışımızla fark yaratıyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ozellikler.map((o) => (
              <div
                key={o.baslik}
                className="bg-gray-50 rounded-2xl p-7 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="mb-4">{o.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{o.baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{o.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Öne çıkan ürünler */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Öne Çıkan Traktörler</h2>
              <p className="text-gray-500">En çok tercih edilen modellerimizden bir seçki</p>
            </div>
            <Link
              href="/urunler"
              className="hidden md:inline-flex items-center gap-1 text-red-600 font-semibold text-sm hover:underline"
            >
              Tümünü Gör
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {onecikarilan.map((urun) => (
              <div
                key={urun.ad}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`${urun.renk} h-52 flex items-center justify-center`}>
                  <svg className="w-28 h-28 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2h1a1 1 0 001-1v-3a1 1 0 00-.293-.707L16 9.586A1 1 0 0015.293 9H13" />
                  </svg>
                </div>
                <div className="p-6">
                  <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{urun.kategori}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-1">{urun.ad}</h3>
                  <p className="text-gray-500 text-sm mb-4">{urun.beygir} • Dizel</p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold">{urun.fiyat}</span>
                    <Link
                      href="/iletisim"
                      className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Teklif Al
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/urunler" className="text-red-600 font-semibold underline">
              Tüm ürünleri gör →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Doğru Traktörü Seçmekte Kararsız mısınız?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Uzman ekibimiz ihtiyacınıza en uygun modeli belirlemenize ücretsiz yardımcı olur.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-4 rounded-xl transition-colors text-lg"
          >
            Ücretsiz Danışmanlık Al
          </Link>
        </div>
      </section>
    </>
  );
}
