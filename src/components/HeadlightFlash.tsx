"use client";
import { useEffect, useState } from "react";

// Far konumları — orijinal görsel (1316x877) üzerinden tespit edildi
// x: soldan %, y: yukarıdan %
const LIGHTS = [
  { x: 22, y: 56, r: 11 }, // New Holland sol far
  { x: 43, y: 62, r: 15 }, // Başak sol far
  { x: 57, y: 62, r: 15 }, // Başak sağ far
  { x: 80, y: 56, r: 10 }, // Massey Ferguson sağ far
];

export default function HeadlightFlash() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 0.4s delay + 3.2s animasyon = 3.6s; biraz pay bırakıyoruz
    const t = setTimeout(() => setDone(true), 3800);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden anim-headlight">
      {LIGHTS.map((h, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            width: h.r * 2,
            height: h.r * 2,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, #ffffff 0%, #fff8b0 45%, transparent 100%)",
            boxShadow: [
              `0 0 ${h.r * 2}px ${h.r}px rgba(255,248,140,1)`,
              `0 0 ${h.r * 6}px ${h.r * 2.5}px rgba(255,220,50,0.9)`,
              `0 0 ${h.r * 14}px ${h.r * 6}px rgba(255,180,0,0.45)`,
              `0 0 ${h.r * 28}px ${h.r * 12}px rgba(255,150,0,0.15)`,
            ].join(", "),
          }}
        />
      ))}

      {/* Her traktörün çevresine ambiyans ışığı */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 20% 22% at 22% 57%, rgba(255,230,80,0.18) 0%, transparent 100%)",
            "radial-gradient(ellipse 28% 26% at 50% 62%, rgba(255,240,100,0.22) 0%, transparent 100%)",
            "radial-gradient(ellipse 20% 22% at 80% 57%, rgba(255,230,80,0.18) 0%, transparent 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
