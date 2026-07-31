import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "50 yılı aşkın deneyimimizle Pekmezoğlu Motorlu Araçlar olarak çiftçilerimize en iyi hizmeti sunuyoruz.",
};

const degerler = [
  {
    baslik: "Dürüstlük",
    aciklama: "Şeffaf fiyatlandırma ve güvenilir ticaret anlayışı.",
    emoji: "🤝",
  },
  {
    baslik: "Doğru Çözüm",
    aciklama: "İhtiyaca, araziye ve bütçeye uygun model seçimi.",
    emoji: "🎯",
  },
  {
    baslik: "Satış Sonrası",
    aciklama: "Bakım, servis ve teknik danışmanlık desteği.",
    emoji: "🛠️",
  },
  {
    baslik: "Tecrübe",
    aciklama: "Yarım asrı aşan sektör bilgisi ve müşteri birikimi.",
    emoji: "🏆",
  },
];

const hikaye = [
  {
    baslik: "Elli yılı aşkın güven.",
    metin:
      "1973'ten bu yana Eskişehir ve çevresindeki çiftçilere hizmet veriyoruz. Traktörü sadece bir makine değil, üretimin bir ortağı olarak görüyoruz; bu yüzden her satışın arkasında yıllara dayanan bir bilgi birikimi var.",
    dosya: "elli-yil.webp",
  },
  {
    baslik: "Şeffaf ticaret, kalıcı ilişki.",
    metin:
      "Fiyatlandırmada gizli bedel, takasta göz boyama yok. Eskişehir'in tarım camiasıyla kurduğumuz güven, bugüne kadar geldiğimiz yolun en büyük sermayesi.",
    dosya: "dogru-cozum.webp",
  },
  {
    baslik: "Satışın ötesinde güvence.",
    metin:
      "İlişkimiz, anahtarı teslim ettiğimiz anda bitmiyor. Periyodik bakım, garanti kapsamlı onarım ve teknik danışmanlıkla traktörünüz sahada olduğu sürece yanınızdayız.",
    dosya: "satis-sonrasi.webp",
  },
  {
    baslik: "Doğru traktör, doğru çözüm.",
    metin:
      "Her arazi, her üretim biçimi farklıdır. Sıfır ve ikinci el geniş ürün yelpazemizle ihtiyacınıza ve bütçenize en uygun modeli birlikte belirliyoruz; asla tek tip çözüm sunmuyoruz.",
    dosya: "seffaf-ticaret.webp",
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
      <section className="bg-white pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeIn direction="left">
              <div>
                <p className="text-red-600 text-sm font-semibold uppercase tracking-widest mb-3">Kurumsal</p>
                <h1 className="font-serif text-4xl md:text-5xl font-medium text-gray-900 mb-5 leading-tight">
                  Hakkımızda
                </h1>
                <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
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
                    Bunun yanı sıra tüm marka ve modellerde 2. el traktör alım ve satımı yapıyoruz. Elinizdeki traktörü
                    satmak ya da ikinci el uygun fiyatlı bir traktör almak istiyorsanız doğru adrestesiniz.
                  </p>
                </div>
                <Link
                  href="/iletisim"
                  className="inline-block bg-red-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-red-700 transition-colors"
                >
                  Bize Ulaşın
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="mx-auto max-w-sm">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/hakkimizda/yonetim.webp"
                    alt="Pekmezoğlu Motorlu Araçlar kurucu ortakları ve yönetim kadrosu"
                    width={1005}
                    height={1529}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Hikaye — editoryal anlatı */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-gray-100">
          {hikaye.map((blok, i) => {
            const gorselSolda = i % 2 === 0;
            return (
              <div key={blok.baslik} className="py-16 md:py-24">
                <div
                  className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
                    gorselSolda ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <FadeIn direction={gorselSolda ? "right" : "left"}>
                    <div>
                      <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900 mb-5 leading-tight">
                        {blok.baslik}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed">{blok.metin}</p>
                    </div>
                  </FadeIn>

                  <FadeIn direction={gorselSolda ? "left" : "right"}>
                    <div className="relative bg-gray-100 rounded-2xl aspect-[4/3] overflow-hidden">
                      <Image
                        src={`/hakkimizda/${blok.dosya}`}
                        alt={blok.baslik}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </FadeIn>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Değerler */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-12">Değerlerimiz</h2>
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
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-12">Hizmetlerimiz</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hizmetler.map((h, i) => (
              <FadeIn key={h} direction="zoom" delay={i * 80}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center gap-4 h-full">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium text-sm">{h}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
