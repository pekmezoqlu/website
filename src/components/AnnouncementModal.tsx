"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { urunler } from "@/lib/urunler";

const OZEL_URUN_ID = 87;
const GOSTERILDI_KEY = "duyuru-gosterildi";

export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const urun = urunler.find((u) => u.id === OZEL_URUN_ID);

  const saatParcalari = urun && urun.saat !== "-" ? urun.saat.split(" ") : null;

  const ozellikler = [
    {
      label: "Servis\nBakımlı",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
    {
      label: urun ? `${urun.model}\n${urun.modelYili} Model` : "—\nModel",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.83.699 2.528 0l4.318-4.318a1.79 1.79 0 000-2.528l-9.581-9.581A2.25 2.25 0 009.568 3zM7 8a1 1 0 100-2 1 1 0 000 2z" />
      ),
    },
    {
      label: saatParcalari ? `${saatParcalari[0]}\n${saatParcalari.slice(1).join(" ").toUpperCase()}` : "—\nSaat",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
  ];

  useEffect(() => {
    if (pathname !== "/") {
      setOpen(false);
      return;
    }
    if (sessionStorage.getItem(GOSTERILDI_KEY)) return;
    sessionStorage.setItem(GOSTERILDI_KEY, "1");
    setOpen(true);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    // Safari bazen otomatik oynatmayı yalnızca gerçek bir kullanıcı
    // etkileşiminden sonra izin veriyor; görünür bir kontrol eklemeden
    // sayfadaki ilk dokunuşta sessizce tekrar dene.
    const onFirstInteraction = () => {
      if (v.paused) tryPlay();
    };
    document.addEventListener("pointerdown", onFirstInteraction, { once: true });
    document.addEventListener("touchstart", onFirstInteraction, { once: true });

    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("pointerdown", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function handleVideoEnded() {
    closeTimerRef.current = setTimeout(() => setOpen(false), 3000);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div className="relative w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Köşe kurdelesi */}
          <div className="absolute top-[16px] left-[-58px] z-30 w-[190px] -rotate-45 origin-center pointer-events-none">
            <div className="bg-red-600 text-white text-[12px] font-black text-center py-1.5 shadow-md tracking-wide">
              YENİ GELDİ!
            </div>
          </div>

          {/* Stokta rozeti */}
          <div className="absolute top-3 right-12 z-30 bg-green-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            STOKTA
          </div>

          {/* Kapat */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Kapat"
            className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video */}
          <div className="relative bg-black flex items-center justify-center min-h-0 shrink">
            <video
              ref={videoRef}
              src="/duyuru-video.mp4"
              autoPlay
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload noremoteplayback nofullscreen"
              onContextMenu={(e) => e.preventDefault()}
              onEnded={handleVideoEnded}
              tabIndex={-1}
              className="w-full max-h-[42vh] object-contain pointer-events-none"
            />
          </div>

          {/* İçerik */}
          <div className="p-6 text-center flex-1 min-h-0 overflow-y-auto">
            <div className="flex items-center justify-center gap-2 text-red-600 text-xs font-bold tracking-widest mb-2">
              <span>★</span> YENİ GELENLER <span>★</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase leading-tight">
              {urun ? (
                <>
                  {urun.marka}{" "}
                  <span className="text-red-600">{urun.model}</span>
                </>
              ) : (
                "Yeni Gelen Traktörümüz"
              )}
            </h2>
            <div className="w-14 h-1 bg-red-600 mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-gray-500 text-sm mb-5">
              Stoklarımıza <span className="text-red-600 font-semibold">yeni</span> eklenmiştir.
            </p>

            <div className="flex items-start justify-center gap-3 mb-6">
              {ozellikler.map((o, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="w-px h-10 bg-gray-200 mx-3" />}
                  <div className="flex flex-col items-center gap-1.5 w-20">
                    <div className="w-10 h-10 rounded-full border-2 border-red-100 bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {o.icon}
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 leading-tight whitespace-pre-line">
                      {o.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/urunler/${OZEL_URUN_ID}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/30"
            >
              ÜRÜNÜ İNCELE
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
