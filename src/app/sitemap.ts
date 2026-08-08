import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { VEHICLES } from "@/data/vehicles-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const vehicleRoutes: MetadataRoute.Sitemap = VEHICLES.map((vehicle) => ({
    url: `${SITE_CONFIG.url}/vehicules/${vehicle.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/vehicules`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...vehicleRoutes,
  ];
}
