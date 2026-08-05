import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#D90429",
    lang: SITE_CONFIG.language,
    icons: [
      {
        src: SITE_CONFIG.assets.favicon.ico,
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
