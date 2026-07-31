import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "50 yılı aşkın deneyimimizle Pekmezoğlu Motorlu Araçlar olarak çiftçilerimize en iyi hizmeti sunuyoruz.",
};

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
  {
    baslik: "Sıfır traktör satışı",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.443c0-1.398-1.032-2.586-2.423-2.673C11.062 4.16 9.482 4.15 7.5 4.15c-2.005 0-3.585.01-4.35.037-1.39.087-2.423 1.275-2.423 2.673v9.615c0 .621.504 1.125 1.125 1.125H3m13.5 0h.75V13.5m-13.5 0h9V7.573" />
      </svg>
    ),
  },
  {
    baslik: "2. el traktör alım & satım (tüm marka ve modeller)",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18M16.5 3 21 7.5m0 0L16.5 12M21 7.5H3" />
      </svg>
    ),
  },
  {
    baslik: "Periyodik bakım & servis",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L1.5 3l1.5-1.5L7.5 4.5v1.409l4.26 4.26m1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    baslik: "Garanti kapsamı onarımlar",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    baslik: "Teknik danışmanlık",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    baslik: "Finansman & kredi desteği",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
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
                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-5 leading-tight">
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
                      <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-5 leading-tight">
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

      {/* Hizmetler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Hizmetlerimiz</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hizmetler.map((h, i) => (
              <FadeIn key={h.baslik} direction="zoom" delay={i * 80}>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center h-full">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {h.icon}
                  </div>
                  <span className="text-gray-900 font-bold">{h.baslik}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
