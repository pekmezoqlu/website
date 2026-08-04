import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementModal from "@/components/AnnouncementModal";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Pekmezoğlu Motorlu Araçlar | Traktör Satış & Servis | Eskişehir",
    template: "%s | Pekmezoğlu Motorlu Araçlar",
  },
  description:
    "Eskişehir'de traktör satışı ve servisi. Sıfır ve ikinci el traktör alım & satım, servis ve yedek parça. 1973'den beri güvenilir hizmet.",
  keywords: ["traktör", "Eskişehir traktör", "ikinci el traktör", "sıfır traktör", "Pekmezoğlu"],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Pekmezoğlu Motorlu Araçlar | Traktör Satış & Servis",
    description: "Eskişehir'de traktör satışı ve servisi. Sıfır ve ikinci el traktör alım & satım.",
    url: "https://www.pekmezoglu.com",
    siteName: "Pekmezoğlu Motorlu Araçlar",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://www.pekmezoglu.com/hero-traktor.webp",
        width: 1200,
        height: 630,
        alt: "Pekmezoğlu Motorlu Araçlar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pekmezoğlu Motorlu Araçlar | Traktör Satış & Servis",
    description: "Eskişehir'de traktör satışı ve servisi. Sıfır ve ikinci el traktör alım & satım.",
    images: ["https://www.pekmezoglu.com/hero-traktor.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Pekmezoğlu Motorlu Araçlar",
  legalName: "Pekmezoğlu Motorlu Araçlar ve Ticaret Ltd. Şti.",
  description:
    "Eskişehir Odunpazarı'nda traktör satışı ve servisi. Sıfır ve ikinci el traktör alım-satım, takas ve servis hizmetleri.",
  url: "https://www.pekmezoglu.com",
  logo: "https://www.pekmezoglu.com/icon",
  image: "https://www.pekmezoglu.com/hero-traktor.webp",
  telephone: "+905359878980",
  foundingDate: "1973",
  address: {
    "@type": "PostalAddress",
    streetAddress: "75. Yıl (Sultandere) Mah. Oto Galericiler Sitesi No: 467/7",
    addressLocality: "Odunpazarı",
    addressRegion: "Eskişehir",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.7394427,
    longitude: 30.614442,
  },
  areaServed: {
    "@type": "City",
    name: "Eskişehir",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+905359878980",
    contactType: "sales",
    areaServed: "TR",
    availableLanguage: ["Turkish"],
  },
  sameAs: ["https://wa.me/905359878980"],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traktör Satışı" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traktör Takas" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traktör Servisi" } },
  ],
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K17C7R3J6S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K17C7R3J6S');
          `}
        </Script>
        <AnnouncementModal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
