import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Hakkımızda — Pekmezoğlu Motorlu Araçlar",
  description:
    "50 yılı aşkın deneyimimizle Pekmezoğlu Motorlu Araçlar olarak çiftçilerimize en iyi hizmeti sunuyoruz.",
};

const degerler = [
  {
    baslik: "Dürüstlük",
    aciklama: "Her işlemde şeffaf ve dürüst olmak temel ilkemizdir.",
    emoji: "🤝",
  },
  {
    baslik: "Kalite",
    aciklama: "Sadece test edilmiş ve güvenilir ürünleri müşterilerimize sunuyoruz.",
    emoji: "⭐",
  },
  {
    baslik: "Müşteri Odaklılık",
    aciklama: "Her müşterimizin ihtiyacını kişiselleştirilmiş hizmetle karşılıyoruz.",
    emoji: "❤️",
  },
  {
    baslik: "Sürdürülebilirlik",
    aciklama: "Tarıma ve doğaya saygılı çözümleri her zaman önceliklendiriyoruz.",
    emoji: "🌱",
  },
];

const hizmetler = [
  "Sıfır traktör satışı (tüm marka ve modeller)",
  "2. el traktör alım & satım (tüm marka ve modeller)",
  "Periyodik bakım & servis",
  "Garanti kapsamı onarımlar",
  "Teknik danışmanlık",
  "Finansman & kredi desteği",
];

export default function Hakkimizda() {
  return (
    <>
      {/* Başlık */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Kurumsal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hakkımızda</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              50 yılı aşkın deneyimimizle çiftçilerimize güvenilir traktör ve tarım makinesi çözümleri sunuyoruz.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Hikaye */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Biz Kimiz?</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <span className="font-semibold text-gray-900">Pekmezoğlu Motorlu Araçlar ve Ticaret Ltd. Şti.</span>,
                    50 yılı aşkın süredir Türkiye&apos;nin tarım sektörüne hizmet vermektedir. Kurulduğumuz günden bu yana
                    tek amacımız çiftçilerimize en kaliteli traktörleri en uygun koşullarla ulaştırmak olmuştur.
                  </p>
                  <p>
                    Sıfır traktörde en geniş model yelpazesini ve en iyi fiyat garantisini sunuyoruz. Her müşterimizin
                    tarla büyüklüğünü, arazi yapısını ve bütçesini göz önünde bulundurarak en doğru çözümü birlikte belirliyoruz.
                  </p>
                  <p>
                    Bunun yanı sıra tüm marka ve modellerde 2. el traktör alım
                    ve satımı yapıyoruz. Elinizdeki traktörü satmak ya da ikinci el uygun fiyatlı bir traktör almak istiyorsanız doğru adrestesiniz.
                  </p>
                </div>
                <Link
                  href="/iletisim"
                  className="inline-block mt-8 bg-red-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-red-700 transition-colors"
                >
                  Bize Ulaşın
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-20 h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-sm">Firma fotoğrafınızı buraya ekleyin</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Değerler */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Değerlerimiz</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {degerler.map((d, i) => (
              <FadeIn key={d.baslik} direction="zoom" delay={i * 100}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 text-center">
                  <div className="text-4xl mb-4">{d.emoji}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{d.baslik}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{d.aciklama}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Hizmetlerimiz</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hizmetler.map((h) => (
                    <div key={h} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 gap-6">
              {[
                { sayi: "50+", label: "Yıllık Deneyim", aciklama: "Tarım sektöründe köklü geçmişimiz" },
                { sayi: "5000+", label: "Mutlu Müşteri", aciklama: "Memnun çiftçi ailesimiz büyüyor" },
                { sayi: "100+", label: "Traktör Modeli", aciklama: "Farklı marka ve model seçenekleri" },
                { sayi: "7/24", label: "Teknik Destek", aciklama: "Uzman ekibimizle her an yanınızdayız" },
              ].map((item, i) => (
                <FadeIn key={item.label} direction="zoom" delay={i * 80}>
                  <div className="bg-red-50 rounded-2xl p-6">
                    <p className="text-4xl font-extrabold text-red-600 mb-1">{item.sayi}</p>
                    <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.aciklama}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
