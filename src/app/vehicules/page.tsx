import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Fleet } from "@/components/sections/Fleet";

export const metadata: Metadata = {
  title: "Notre Flotte de Véhicules | Location de Voiture à Rabat",
  description: "Découvrez la flotte de WIMA CAR à Rabat. Voitures économiques, SUV et véhicules premium disponibles à Agdal et à l'aéroport de Rabat-Salé. Réservez via WhatsApp.",
  alternates: {
    canonical: "/vehicules",
  },
};

export default function VehiclesPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--color-background)]">
        {/* Spacer for fixed header */}
        <div className="h-[80px]" />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
