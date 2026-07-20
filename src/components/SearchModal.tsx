"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { urunler } from "@/lib/urunler";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim().length === 0 ? [] : urunler.filter((u) => {
    const q = query.toLowerCase();
    return (
      u.marka.toLowerCase().includes(q) ||
      u.model.toLowerCase().includes(q) ||
      `${u.marka} ${u.model}`.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function go(id: number) {
    onClose();
    router.push(`/urunler/${id}`);
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col items-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Traktör adı veya marka ara…"
            className="flex-1 outline-none text-gray-900 text-base placeholder-gray-400"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sonuçlar */}
        {query.trim().length > 0 && (
          <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {results.length === 0 ? (
              <li className="px-4 py-6 text-center text-gray-400 text-sm">Sonuç bulunamadı</li>
            ) : (
              results.map((u) => (
                <li key={u.id}>
                  <button
                    onClick={() => go(u.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`${u.renk} w-12 h-12 rounded-lg relative overflow-hidden shrink-0`}>
                      <Image
                        src={u.fotolar[0]}
                        alt={`${u.marka} ${u.model}`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {u.marka} {u.model}
                      </p>
                      <p className="text-xs text-gray-400">
                        {u.modelYili} • {u.guc !== "-" ? u.guc : ""} {u.durum}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}

        {query.trim().length === 0 && (
          <p className="px-4 py-5 text-sm text-gray-400 text-center">
            Aramak istediğiniz traktör adını yazın
          </p>
        )}
      </div>
    </div>
  );
}
