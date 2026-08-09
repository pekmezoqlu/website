import { MetadataRoute } from "next";
import { urunler } from "@/lib/urunler";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.pekmezoglu.com";

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/urunler`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hakkimizda`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/teklif`, changeFrequency: "monthly", priority: 0.6 },
    ...urunler.map((urun) => ({
      url: `${base}/urunler/${urun.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
