import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.pekmezoglu.com";

  const urunIdleri = [4, 5, 6, 7, 8, 9, 10, 11, 12];

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/urunler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...urunIdleri.map((id) => ({
      url: `${base}/urunler/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
