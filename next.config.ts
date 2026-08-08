import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Fotoğraflar zaten webp'ye çevrilip küçültülerek yükleniyor; Next.js'in
    // sunucu taraflı yeniden optimizasyonu gereksiz ve Vercel'in Image
    // Optimization kotasını (Hobby planda) hızla tüketiyordu.
    unoptimized: true,
    qualities: [75, 90],
  },
};

export default nextConfig;
