import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export const metadata: Metadata = {
  title: {
    default: "Pekmezoğlu Motorlu Araçlar | Başak Traktör Bayii | Eskişehir",
    template: "%s | Pekmezoğlu Motorlu Araçlar",
  },
  description:
    "Eskişehir'de Başak Traktör yetkili bayii. Sıfır ve ikinci el traktör satışı, servis ve yedek parça. 1973'den beri güvenilir hizmet.",
  keywords: ["traktör", "Başak traktör", "Eskişehir traktör", "ikinci el traktör", "Pekmezoğlu"],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Pekmezoğlu Motorlu Araçlar | Başak Traktör Bayii",
    description: "Eskişehir'de Başak Traktör yetkili bayii. Sıfır ve ikinci el traktör satışı.",
    url: "https://www.pekmezoglu.com",
    siteName: "Pekmezoğlu Motorlu Araçlar",
    locale: "tr_TR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Pekmezoğlu Motorlu Araçlar",
  url: "https://www.pekmezoglu.com",
  logo: "https://www.pekmezoglu.com/icon",
  telephone: "+905457280424",
  foundingDate: "1973",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Eskişehir",
    addressCountry: "TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
