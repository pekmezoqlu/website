import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export const metadata: Metadata = {
  title: "Pekmezoğlu Motorlu Araçlar - Traktör Satış ve Servis",
  description:
    "Pekmezoğlu Motorlu Araçlar ve Ticaret Ltd. Şti. — Kaliteli traktör satışı, servis ve yedek parça hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
