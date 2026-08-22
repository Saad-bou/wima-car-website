import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Fleet } from "@/components/sections/Fleet";
import {
  PATH_TO_LANGUAGE,
  isLanguagePath,
  languageAlternates,
  localizedPath,
} from "@/lib/i18n";

const FLEET_SEO = {
  EN: {
    title: "Our car fleet | Car rental in Rabat",
    description:
      "Discover WIMA CAR's fleet in Rabat. Economy cars, SUVs and luxury vehicles with fast WhatsApp booking and free airport delivery.",
  },
  AR: {
    title: "أسطول السيارات | تأجير سيارات في الرباط",
    description:
      "اكتشف أسطول WIMA CAR في الرباط: سيارات اقتصادية، SUV وسيارات فاخرة مع حجز سريع عبر واتساب وتوصيل مجاني للمطار.",
  },
  ES: {
    title: "Nuestra flota | Alquiler de coches en Rabat",
    description:
      "Descubre la flota de WIMA CAR en Rabat. Coches económicos, SUV y vehículos de lujo con reserva rápida por WhatsApp.",
  },
  IT: {
    title: "La nostra flotta | Noleggio auto a Rabat",
    description:
      "Scopri la flotta WIMA CAR a Rabat. Auto economiche, SUV e veicoli di lusso con prenotazione rapida via WhatsApp.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isLanguagePath(lang) || lang === "fr") {
    notFound();
  }

  const language = PATH_TO_LANGUAGE[lang];
  const seo = FLEET_SEO[language as keyof typeof FLEET_SEO];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: localizedPath(language, "/vehicules"),
      languages: languageAlternates("/vehicules"),
    },
  };
}

export default async function LocalizedVehiclesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLanguagePath(lang) || lang === "fr") {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-[var(--color-background)]">
        <div className="h-[80px]" />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
