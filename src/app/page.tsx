import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import StatsBar from "@/components/StatsBar";

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
    id: 7,
    ad: "New Holland TD5.100",
    kategori: "2. El Traktör",
    detay: "100 HP • 768 Saat • 2022",
    foto: "/tractors/nh-td5100-12.jpg",
    renk: "bg-blue-50",
  },
  {
    id: 5,
    ad: "Massey Ferguson 5430",
    kategori: "2. El Traktör",
    detay: "92 HP • 6.000 Saat • 2012",
    foto: "/tractors/mf5430-1.jpg",
    renk: "bg-orange-50",
  },
  {
    id: 10,
    ad: "Başak 2055",
    kategori: "2. El Traktör",
    detay: "55 HP • 185 Saat • 2023",
    foto: "/tractors/basak-2055-2.jpg",
    renk: "bg-red-50",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero + Stats — tam ekran */}
      <div className="flex flex-col md:overflow-hidden md:h-[calc(100svh-80px)]">
      {/* Hero */}
      <section className="relative bg-white overflow-hidden flex-1 min-h-0 flex flex-col md:flex-row md:items-center">

        {/* MOBİL: fotoğraf üstte (flex akışında), metin altta */}
        <div className="md:hidden flex flex-col w-full">
          <div className="w-full shrink-0 relative">
            <Image
              src="/hero-traktor.png"
              alt="Pekmezoğlu traktörler"
              width={800}
              height={533}
              priority
              className="w-full h-auto"
              quality={90}
            />
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
          </div>
          <div className="px-5 pb-8 pt-4 text-center anim-slide-left">
            <h1 className="text-2xl font-black uppercase text-gray-900 mb-2" style={{ lineHeight: "1.15" }}>
              Pekmezoğlu<br />Çiftçilerine Özel Teklifler.
            </h1>
            <p className="text-gray-500 text-xs mb-4 leading-relaxed">
              1973&apos;ten bu yana güvenilir satış, takas desteği ve size özel avantajlar.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/urunler" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Ürünleri İncele
              </Link>
              <Link href="/iletisim" className="border-2 border-red-600 text-red-600 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Bize Ulaşın
              </Link>
            </div>
          </div>
        </div>

        {/* MASAÜSTÜ: fotoğraf sağda, metin solda */}
        <div className="hidden md:block absolute top-0 right-0 w-[60%] h-full z-10 anim-slide-right">
          <Image
            src="/hero-traktor.png"
            alt="Pekmezoğlu traktörler"
            fill
            priority
            className="object-contain object-center"
            quality={90}
          />
          <BeaconLights />
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-20" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent z-20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-20" />
        </div>
        <div className="hidden md:flex relative z-20 w-full max-w-7xl mx-auto px-2 lg:px-4">
          <div className="w-1/2 py-20 anim-slide-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase mb-4 text-gray-900" style={{ lineHeight: "1.15" }}>
              Pekmezoğlu<br />
              Çiftçilerine<br />
              Özel<br />
              Teklifler.
            </h1>
            <p className="text-gray-500 text-base mb-8 max-w-sm leading-relaxed">
              1973&apos;ten bu yana sıfır ve ikinci el traktörlerde güvenilir satış, takas desteği ve size özel avantajlar sunuyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/urunler" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3 rounded-lg transition-colors flex items-center gap-2">
                Ürünleri İncele <span>›</span>
              </Link>
              <Link href="/iletisim" className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-7 py-3 rounded-lg transition-colors flex items-center gap-2">
                Bize Ulaşın <span>›</span>
              </Link>
            </div>
          </div>
        </div>

      </section>

      <StatsBar />
      </div>

      {/* Özellikler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Neden Bizi Seçmelisiniz?</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Yılların deneyimi ve müşteri memnuniyeti odaklı hizmet anlayışımızla fark yaratıyoruz.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ozellikler.map((o, i) => (
              <FadeIn key={o.baslik} delay={i * 100}>
                <div className="bg-gray-50 rounded-2xl p-7 hover:shadow-xl hover:shadow-red-100 hover:scale-[1.02] hover:border-red-200 transition-all duration-300 border border-gray-100">
                  <div className="mb-4">{o.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{o.baslik}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{o.aciklama}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Öne çıkan ürünler */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
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
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {onecikarilan.map((urun, i) => (
              <FadeIn key={urun.id} delay={i * 120}>
              <Link
                href={`/urunler/${urun.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-red-100 hover:scale-[1.02] hover:-translate-y-1 hover:border-red-200 transition-all duration-300 border border-gray-100 group block"
              >
                <div className={`${urun.renk} h-52 relative overflow-hidden`}>
                  <Image
                    src={urun.foto}
                    alt={urun.ad}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{urun.kategori}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-1">{urun.ad}</h3>
                  <p className="text-gray-500 text-sm mb-4">{urun.detay}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold">Fiyat için arayın</span>
                    <span className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg group-hover:bg-red-700 transition-colors">
                      İncele
                    </span>
                  </div>
                </div>
              </Link>
              </FadeIn>
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
      <section className="bg-gray-900 py-20">
        <FadeIn direction="zoom">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Doğru Traktörü Seçmekte Kararsız mısınız?</h2>
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
        </FadeIn>
      </section>
    </>
  );
}
