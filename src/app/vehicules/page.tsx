import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Fleet } from "@/components/sections/Fleet";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Notre flotte de véhicules | Location de voiture à Rabat",
  description:
    "Découvrez la flotte de WIMA CAR à Rabat. Voitures économiques, SUV et véhicules premium disponibles à L'Océan et à l'aéroport de Rabat-Salé. Réservez via WhatsApp.",
  alternates: {
    canonical: "/vehicules",
    languages: languageAlternates("/vehicules"),
  },
};

export default function VehiclesPage() {
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
