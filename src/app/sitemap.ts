import { MetadataRoute } from "next";
import { urunler } from "@/lib/urunler";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.pekmezoglu.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/urunler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...urunler.map((urun) => ({
      url: `${base}/urunler/${urun.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
