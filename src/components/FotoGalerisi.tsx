"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  fotolar: string[];
  baslik: string;
};

export default function FotoGalerisi({ fotolar, baslik }: Props) {
  const [aktif, setAktif] = useState(0);

  if (fotolar.length === 0) {
    return (
      <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Fotoğraf yakında eklenecek</p>
        </div>
      </div>
    );
  }

  const onceki = () => setAktif((a) => (a - 1 + fotolar.length) % fotolar.length);
  const sonraki = () => setAktif((a) => (a + 1) % fotolar.length);

  return (
    <div className="space-y-3">
      {/* Ana fotoğraf */}
      <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "9/16", maxHeight: "80vh" }}>
        <Image
          src={fotolar[aktif]}
          alt={`${baslik} - ${aktif + 1}`}
          fill
          className="object-contain"
          priority
        />

        {/* Önceki / Sonraki butonları */}
        {fotolar.length > 1 && (
          <>
            <button
              onClick={onceki}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={sonraki}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Sayaç */}
        {fotolar.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
            {aktif + 1} / {fotolar.length}
          </div>
        )}
      </div>

      {/* Küçük önizleme thumbnails */}
      {fotolar.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {fotolar.map((foto, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === aktif ? "border-red-600" : "border-transparent"
              }`}
            >
              <Image src={foto} alt={`${baslik} - ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Nokta göstergesi */}
      {fotolar.length > 1 && (
        <div className="flex justify-center gap-2">
          {fotolar.map((_, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === aktif ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
