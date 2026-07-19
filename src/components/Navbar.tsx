"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler", label: "Ürünlerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-12">
          {/* Sol — linkler */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-red-600 border-b-2 border-red-600 pb-0.5"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Orta — logo */}
          <Link href="/" className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div className="leading-tight">
              <p className="font-bold text-gray-900 text-base leading-none">Pekmezoğlu</p>
              <p className="text-xs text-gray-500 leading-none mt-0.5">Motorlu Araçlar</p>
            </div>
          </Link>

          {/* Sağ — Teklif Al */}
          <div className="hidden md:flex flex-1 justify-end">
            <Link
              href="/teklif"
              className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Teklif Al
            </Link>
          </div>

          {/* Mobil — logo (sol) + hamburger (sağ) */}
          <Link href="/" className="flex md:hidden items-center gap-2">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div className="leading-tight">
              <p className="font-bold text-gray-900 text-sm leading-none">Pekmezoğlu</p>
              <p className="text-xs text-gray-500 leading-none">Motorlu Araçlar</p>
            </div>
          </Link>
          <div className="flex-1 md:hidden" />
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-red-600"
            onClick={() => setOpen(!open)}
            aria-label="Menüyü aç/kapat"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium py-1 ${
                pathname === link.href ? "text-red-600" : "text-gray-700 hover:text-red-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            onClick={() => setOpen(false)}
            className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center hover:bg-red-700 transition-colors"
          >
            Teklif Al
          </Link>
        </div>
      )}
    </header>
  );
}
