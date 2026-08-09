import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Fleet } from "@/components/sections/Fleet";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Location de voiture à Rabat | WIMA CAR",
  description:
    "WIMA CAR, agence de location de voitures à Rabat. Découvrez notre flotte et réservez votre voiture à Rabat ou à l'aéroport de Rabat-Salé.",
  alternates: {
    canonical: "/",
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
