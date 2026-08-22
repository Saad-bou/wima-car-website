import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Fleet } from "@/components/sections/Fleet";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { FAQ } from "@/components/sections/FAQ";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Location de voiture à Rabat | WIMA CAR",
  description:
    "Location de voiture à Rabat avec WIMA CAR. Réservation rapide, tarifs transparents et livraison gratuite à l'aéroport de Rabat-Salé.",
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
};

export default function Home() {
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
