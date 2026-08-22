import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VehicleDetails } from "@/components/vehicles/VehicleDetails";
import { CATEGORY_LABELS, VEHICLES } from "@/data/vehicles-data";
import { SITE_CONFIG } from "@/config/site";
import {
  PATH_TO_LANGUAGE,
  isLanguagePath,
  languageAlternates,
  localizedPath,
} from "@/lib/i18n";

export function generateStaticParams() {
  return ["en", "ar", "es", "it"].flatMap((lang) =>
    VEHICLES.map((vehicle) => ({
      lang,
      slug: vehicle.slug,
    }))
  );
}

function vehicleDescription(language: string, vehicleName: string, category: string, details: string) {
  if (language === "EN") {
    return `Rent a ${vehicleName} in Rabat with WIMA CAR. ${details}. Fast booking, transparent rates and free airport delivery.`;
  }
  if (language === "AR") {
    return `استأجر ${vehicleName} في الرباط مع WIMA CAR. ${details}. حجز سريع، أسعار شفافة وتوصيل مجاني للمطار.`;
  }
  if (language === "ES") {
    return `Alquila un ${vehicleName} en Rabat con WIMA CAR. ${details}. Reserva rápida, tarifas transparentes y entrega gratuita en el aeropuerto.`;
  }
  if (language === "IT") {
    return `Noleggia una ${vehicleName} a Rabat con WIMA CAR. ${details}. Prenotazione rapida, tariffe trasparenti e consegna gratuita in aeroporto.`;
  }

  return `Louez une ${vehicleName} (${category}) à Rabat avec WIMA CAR. ${details}.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isLanguagePath(lang) || lang === "fr") {
    notFound();
  }

  const vehicle = VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) {
    notFound();
  }

  const language = PATH_TO_LANGUAGE[lang];
  const transmission = vehicle.transmission === "Automatic" ? "Automatic" : "Manual";
  const details = `${CATEGORY_LABELS[vehicle.category]}, ${transmission}, ${vehicle.fuel}`;

  return {
    title: `Location ${vehicle.name} Rabat | WIMA CAR`,
    description: vehicleDescription(language, vehicle.name, CATEGORY_LABELS[vehicle.category], details),
    alternates: {
      canonical: localizedPath(language, `/vehicules/${vehicle.slug}`),
      languages: languageAlternates(`/vehicules/${vehicle.slug}`),
    },
  };
}

export default async function LocalizedVehiclePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isLanguagePath(lang) || lang === "fr") {
    notFound();
  }

  const vehicle = VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) {
    notFound();
  }

  const language = PATH_TO_LANGUAGE[lang];
  const vehiclePath = localizedPath(language, `/vehicules/${vehicle.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "WIMA CAR",
        item: localizedPath(language, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vehicles",
        item: `${SITE_CONFIG.url}${localizedPath(language, "/vehicules")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.name,
        item: `${SITE_CONFIG.url}${vehiclePath}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <VehicleDetails vehicle={vehicle} />
      <Footer />
    </>
  );
}
