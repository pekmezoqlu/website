import type { Metadata } from "next";
import UrunlerClient from "@/components/UrunlerClient";

export const metadata: Metadata = {
  title: "Ürünlerimiz — Pekmezoğlu Motorlu Araçlar",
  description: "Sıfır ve 2. el traktör satışı. Tüm marka ve modeller — Eskişehir.",
};

export default function Urunler() {
  return (
    <>
      {/* Sayfa başlığı */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">Katalog</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Traktör Ürünlerimiz</h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Sıfır traktör satışı ve tüm markalarda 2. el alım & satım.
          </p>
        </div>
      </section>

      <UrunlerClient />
    </>
  );
}
