import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Fleet } from "@/components/sections/Fleet";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { FAQ } from "@/components/sections/FAQ";
import {
  LANGUAGE_LOCALES,
  PATH_TO_LANGUAGE,
  isLanguagePath,
  languageAlternates,
  localizedPath,
} from "@/lib/i18n";

const HOME_SEO = {
  EN: {
    title: "Car rental in Rabat | WIMA CAR",
    description:
      "Rent a car in Rabat with WIMA CAR. Fast booking, transparent rates and free delivery to Rabat-Sale Airport.",
  },
  AR: {
    title: "تأجير سيارات في الرباط | WIMA CAR",
    description:
      "تأجير سيارات في الرباط مع WIMA CAR. حجز سريع، أسعار شفافة وتوصيل مجاني إلى مطار الرباط سلا.",
  },
  ES: {
    title: "Alquiler de coches en Rabat | WIMA CAR",
    description:
      "Alquila un coche en Rabat con WIMA CAR. Reserva rápida, tarifas transparentes y entrega gratuita en el aeropuerto de Rabat-Salé.",
  },
  IT: {
    title: "Noleggio auto a Rabat | WIMA CAR",
    description:
      "Noleggia un'auto a Rabat con WIMA CAR. Prenotazione rapida, tariffe trasparenti e consegna gratuita all'aeroporto di Rabat-Salé.",
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
  const seo = HOME_SEO[language as keyof typeof HOME_SEO];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: localizedPath(language, "/"),
      languages: languageAlternates("/"),
    },
    openGraph: {
      locale: LANGUAGE_LOCALES[language],
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function LocalizedHome({
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
      <main>
        <Hero />
        <Fleet />
        <HowItWorks />
        <GoogleReviews />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
