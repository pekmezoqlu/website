import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export const metadata: Metadata = {
  title: "Pekmezoğlu Motorlu Araçlar - Traktör Satış ve Servis",
  description:
    "Pekmezoğlu Motorlu Araçlar ve Ticaret Ltd. Şti. — Kaliteli traktör satışı, servis ve yedek parça hizmetleri.",
  icons: {
    icon: "/icon",
    apple: "/icon",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pekmezoğlu Motorlu Araçlar",
  url: "https://www.pekmezoglu.com",
  logo: "https://www.pekmezoglu.com/icon",
  telephone: "+905457280424",
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
