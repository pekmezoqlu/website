"use client";
import { useEffect, useRef, useState } from "react";

// Orijinal görsel boyutu (1316×877)
const IMG_W = 1316;
const IMG_H = 877;

// Görsel üzerinde tepe lambası konumları (0-1 arası kesir)
// Orijinal 1316×877 piksel görsel üzerinden piksel koordinatı ölçüldü
// New Holland 1 lamba, Başak 1 lamba, Massey Ferguson 2 lamba
const BEACONS = [
  { fx: 0.22, fy: 0.38, period: 1700, delay: 0 },    // New Holland
  { fx: 0.50, fy: 0.31, period: 1650, delay: 350 },  // Başak (1 tane)
  { fx: 0.74, fy: 0.29, period: 1600, delay: 180 },  // Massey Ferguson sol
  { fx: 0.83, fy: 0.29, period: 1800, delay: 600 },  // Massey Ferguson sağ
];

interface Rect { x: number; y: number; w: number; h: number }

export default function BeaconLights() {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const calc = () => {
      const cw = el.offsetWidth;
      const ch = el.offsetHeight;
      const ratio = IMG_W / IMG_H;
      let w, h, x, y;
      if (ratio > cw / ch) {
        // Genişlikle sınırlı (letterbox üst/alt)
        w = cw; h = cw / ratio;
        x = 0;  y = (ch - h) / 2;
      } else {
        // Yükseklikle sınırlı (letterbox sol/sağ)
        h = ch; w = ch * ratio;
        x = (cw - w) / 2; y = 0;
      }
      setRect({ x, y, w, h });
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 z-30 pointer-events-none">
      {rect && BEACONS.map((b, i) => {
        const px = rect.x + b.fx * rect.w;
        const py = rect.y + b.fy * rect.h;
        return (
          <div key={i} style={{ position: "absolute", left: px, top: py }}>
            {/* Titreşen hale */}
            <div style={{
              position: "absolute",
              width: 36, height: 36,
              marginLeft: -18, marginTop: -18,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,140,0,0.55) 0%, rgba(255,100,0,0.15) 50%, transparent 70%)",
              animation: `beaconGlow ${b.period}ms ease-in-out ${b.delay}ms infinite`,
            }} />
            {/* Dönen ışık kovası */}
            <div style={{
              position: "absolute",
              width: 20, height: 20,
              marginLeft: -10, marginTop: -10,
              borderRadius: "50%",
              overflow: "hidden",
              background: "conic-gradient(rgba(255,175,0,0.95) 0deg, rgba(255,235,60,0.55) 50deg, transparent 108deg, transparent 360deg)",
              animation: `beaconSpin ${b.period}ms linear ${b.delay}ms infinite`,
            }} />
            {/* Merkez nokta */}
            <div style={{
              position: "absolute",
              width: 7, height: 7,
              marginLeft: -3.5, marginTop: -3.5,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ffffaa 0%, #ffb300 70%)",
              boxShadow: "0 0 5px 2px rgba(255,150,0,0.95), 0 0 12px 5px rgba(255,100,0,0.4)",
            }} />
          </div>
        );
      })}
    </div>
  );
}
