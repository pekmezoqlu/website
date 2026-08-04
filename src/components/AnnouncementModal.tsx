"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AnnouncementModal() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Kapat"
          className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-black flex items-center justify-center min-h-0">
          <video
            src="/duyuru-video.mp4"
            controls
            autoPlay
            muted
            playsInline
            className="w-full max-h-[75vh] object-contain"
          />
        </div>

        <div className="p-5 text-center shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Yeni Gelen Traktörümüz</h2>
          <p className="text-gray-500 text-sm mt-1">Detaylar için bizimle iletişime geçebilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}
