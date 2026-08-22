import type { MetadataRoute } from "next";
import { VEHICLES } from "@/data/vehicles-data";
import { LANGUAGES, localizedAbsoluteUrl } from "@/lib/i18n";

function sitemapAlternates(path: string): Record<string, string> {
  return {
    "x-default": localizedAbsoluteUrl("FR", path),
    fr: localizedAbsoluteUrl("FR", path),
    ar: localizedAbsoluteUrl("AR", path),
    en: localizedAbsoluteUrl("EN", path),
    es: localizedAbsoluteUrl("ES", path),
    it: localizedAbsoluteUrl("IT", path),
  };
}

function sitemapEntries(path: string, priority: number): MetadataRoute.Sitemap {
  return LANGUAGES.map((language) => ({
    url: localizedAbsoluteUrl(language, path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
    alternates: {
      languages: sitemapAlternates(path),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const vehicleRoutes = VEHICLES.flatMap((vehicle) =>
    sitemapEntries(`/vehicules/${vehicle.slug}`, 0.8)
  );

  return [
    ...sitemapEntries("/", 1),
    ...sitemapEntries("/vehicules", 0.9),
    ...vehicleRoutes,
  ];
}
