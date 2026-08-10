import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VehicleDetails } from "@/components/vehicles/VehicleDetails";
import { CATEGORY_LABELS, VEHICLES } from "@/data/vehicles-data";
import { SITE_CONFIG } from "@/config/site";

export function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = VEHICLES.find((v) => v.slug === slug);

  if (!vehicle) {
    return {
      title: "Vehicule introuvable | WIMA CAR",
    };
  }

  return {
    title: `Location ${vehicle.name} a Rabat | WIMA CAR`,
    description: `Louez une ${vehicle.name} (${CATEGORY_LABELS[vehicle.category]}). Transmission ${vehicle.transmission === "Automatic" ? "Automatique" : "Manuelle"}, ${vehicle.fuel}. Reservez votre voiture chez WIMA CAR a Rabat.`,
    alternates: {
      canonical: `/vehicules/${vehicle.slug}`,
    },
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = VEHICLES.find((v) => v.slug === slug);

  if (!vehicle) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vehicules",
        item: `${SITE_CONFIG.url}/vehicules`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.name,
        item: `${SITE_CONFIG.url}/vehicules/${vehicle.slug}`,
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
