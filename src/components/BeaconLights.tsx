// Tepe lambası (döner sarı ışık) — görselin aspect-ratio'suna göre tam konumlandırılır

interface Beacon {
  x: number; // görsel içinde soldan %
  y: number; // görsel içinde yukarıdan %
  period: number; // bir tam dönüş süresi (ms)
  delay: number;  // animasyon gecikmesi (ms)
}

// Konumlar 1316×877 piksel orijinal görsel üzerinden tespit edildi
const BEACONS: Beacon[] = [
  { x: 22, y: 27, period: 1700, delay: 0 },    // New Holland
  { x: 45, y: 22, period: 1650, delay: 350 },  // Başak sol
  { x: 57, y: 22, period: 1750, delay: 800 },  // Başak sağ
  { x: 74, y: 21, period: 1600, delay: 180 },  // Massey Ferguson sol
  { x: 82, y: 21, period: 1800, delay: 600 },  // Massey Ferguson sağ
];

export default function BeaconLights() {
  return (
    // Overlay, görüntünün gerçek render alanıyla birebir eşleşen bir kutu oluşturur.
    // object-contain ile aynı mantık: width:100% + maxHeight:100% + aspect-ratio
    <div
      className="absolute pointer-events-none z-20"
      style={{
        aspectRatio: "1316 / 877",
        width: "100%",
        maxHeight: "100%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {BEACONS.map((b, i) => (
        <div
          key={i}
          style={{ position: "absolute", left: `${b.x}%`, top: `${b.y}%` }}
        >
          {/* Titreşen ışık halesi */}
          <div
            style={{
              position: "absolute",
              width: 38, height: 38,
              marginLeft: -19, marginTop: -19,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,140,0,0.55) 0%, rgba(255,100,0,0.18) 50%, transparent 72%)",
              animation: `beaconGlow ${b.period}ms ease-in-out ${b.delay}ms infinite`,
            }}
          />
          {/* Dönen ışık kovası */}
          <div
            style={{
              position: "absolute",
              width: 20, height: 20,
              marginLeft: -10, marginTop: -10,
              borderRadius: "50%",
              overflow: "hidden",
              background:
                "conic-gradient(rgba(255,175,0,0.95) 0deg, rgba(255,235,60,0.55) 50deg, transparent 108deg, transparent 360deg)",
              animation: `beaconSpin ${b.period}ms linear ${b.delay}ms infinite`,
            }}
          />
          {/* Merkez lamba */}
          <div
            style={{
              position: "absolute",
              width: 7, height: 7,
              marginLeft: -3.5, marginTop: -3.5,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ffffe0 0%, #ffb300 70%)",
              boxShadow:
                "0 0 5px 2px rgba(255,150,0,0.95), 0 0 12px 5px rgba(255,100,0,0.4)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
