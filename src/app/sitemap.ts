import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProperties } from "@/data/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/properties`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/about`, lastModified: now, priority: 0.6 },
    { url: `${base}/sell`, lastModified: now, priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, priority: 0.6 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = getAllProperties().map((p) => ({
    url: `${base}/properties/${p.slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "weekly",
  }));

  return [...staticRoutes, ...propertyRoutes];
}
