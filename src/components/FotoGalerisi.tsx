"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  fotolar: string[];
  baslik: string;
};

export default function FotoGalerisi({ fotolar, baslik }: Props) {
  const [aktif, setAktif] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (fotolar.length === 0) {
    return (
      <div className="bg-gray-100 rounded-xl flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
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
    <>
    {/* Lightbox */}
    {lightbox && (
      <div
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        onClick={() => setLightbox(false)}
      >
        {/* Kapat */}
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center z-10 transition-colors"
          onClick={() => setLightbox(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sayaç */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
          {aktif + 1} / {fotolar.length}
        </div>

        {/* Görsel */}
        <div
          className="relative w-full h-full max-w-3xl max-h-[90vh] mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={fotolar[aktif]}
            alt={`${baslik} - ${aktif + 1}`}
            fill
            className="object-contain"
          />
        </div>

        {/* Önceki */}
        {fotolar.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setAktif((a) => (a - 1 + fotolar.length) % fotolar.length); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setAktif((a) => (a + 1) % fotolar.length); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    )}

    <div className="space-y-2">
      {/* Ana fotoğraf */}
      <div
        className="relative bg-white rounded-xl overflow-hidden aspect-[9/16] lg:aspect-[4/3] cursor-zoom-in"
        onClick={() => setLightbox(true)}
      >
        <Image
          src={fotolar[aktif]}
          alt={`${baslik} - ${aktif + 1}`}
          fill
          className="object-contain"
          priority
        />

        {fotolar.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onceki(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/75 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); sonraki(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/75 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Sayaç */}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {aktif + 1}/{fotolar.length} Fotoğraf
        </div>
      </div>

      {/* Thumbnail şeridi */}
      {fotolar.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {fotolar.map((foto, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              className={`relative shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === aktif ? "border-red-500 opacity-100" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              style={{ width: 80, height: 60 }}
            >
              <Image src={foto} alt={`${baslik} - ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
