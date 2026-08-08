import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Fuel, Settings2, Users, MessageCircle, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui";
import {
  VEHICLES,
  CATEGORY_LABELS,
  CATEGORY_BADGE_STYLES,
  buildFleetWhatsAppLink
} from "@/data/vehicles-data";

export function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const vehicle = VEHICLES.find((v) => v.slug === params.slug);
  
  if (!vehicle) {
    return {
      title: "Véhicule introuvable | WIMA CAR",
    };
  }

  return {
    title: `Location ${vehicle.name} à Rabat | WIMA CAR`,
    description: `Louez une ${vehicle.name} (${CATEGORY_LABELS[vehicle.category]}). Transmission ${vehicle.transmission === "Automatic" ? "Automatique" : "Manuelle"}, ${vehicle.fuel}. Réservez votre voiture chez WIMA CAR à Rabat.`,
    alternates: {
      canonical: `/vehicules/${vehicle.slug}`,
    },
  };
}

export default function VehiclePage({ params }: { params: { slug: string } }) {
  const vehicle = VEHICLES.find((v) => v.slug === params.slug);

  if (!vehicle) {
    notFound();
  }

  const badge = {
    label: CATEGORY_LABELS[vehicle.category],
    className: CATEGORY_BADGE_STYLES[vehicle.category],
  };

  const longTermTier = vehicle.pricingTiers[vehicle.pricingTiers.length - 1];
  const startingPriceMad = longTermTier?.price ?? vehicle.pricingTiers[0]?.price ?? 0;
  
  const transmissionLabel = vehicle.transmission === "Automatic" ? "Automatique" : "Manuelle";
  const priceText = vehicle.priceOnRequest ? "Sur demande" : `${startingPriceMad} DH / jour`;

  const emailBody = `Bonjour! Je suis intéressé par:\nVéhicule: ${vehicle.name}\nTransmission: ${transmissionLabel}\nCarburant: ${vehicle.fuel}\nPrix par jour: ${priceText}\n\nMerci de me confirmer la disponibilité.`;
  const emailSubject = `Réservation ${vehicle.name}`;
  const mailToLink = `mailto:wimacar@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <>
      <Header />
      <main className="bg-[var(--color-background)] pb-20">
        <div className="h-[80px]" /> {/* Spacer */}
        
        <Container>
          <div className="py-8">
            <Link 
              href="/vehicules"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            >
              <ArrowLeft className="size-4" />
              Retour à la flotte
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image Column */}
            <div className="relative overflow-hidden rounded-[32px] bg-[var(--color-surface)] shadow-[var(--shadow-card)]" style={{ aspectRatio: "4/3" }}>
              <Image
                src={vehicle.image}
                alt={`Location ${vehicle.name} à Rabat - WIMA CAR`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>

            {/* Info Column */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${badge.className}`}>
                  {badge.label}
                </span>
                {vehicle.featured && (
                  <span className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    ★ Coup de cœur
                  </span>
                )}
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
                Location {vehicle.name}
              </h1>

              <div className="mb-10 flex flex-wrap items-center gap-6 text-[15px] font-medium text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-2">
                  <Settings2 className="size-5 shrink-0 text-[var(--color-primary)]/70" />
                  <span>{transmissionLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="size-5 shrink-0 text-[var(--color-primary)]/70" />
                  <span>{vehicle.fuel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-5 shrink-0 text-[var(--color-primary)]/70" />
                  <span>{vehicle.seats} places</span>
                </div>
              </div>

              <div className="mb-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">Tarifs de location</h2>
                <div className="flex flex-col gap-3">
                  {vehicle.priceOnRequest ? (
                    <div className="text-xl font-extrabold text-[var(--color-primary)]">
                      Sur demande
                    </div>
                  ) : (
                    vehicle.pricingTiers.map((tier, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0">
                        <span className="font-semibold text-[var(--color-text-secondary)]">{tier.label} <span className="font-normal opacity-80">({tier.range})</span></span>
                        <span className="font-bold text-[var(--color-text-primary)]">{tier.price} DH <span className="text-sm font-normal text-[var(--color-text-secondary)]">/jour</span></span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={buildFleetWhatsAppLink(vehicle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[#25D366] px-6 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)]"
                >
                  <MessageCircle className="size-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  Réserver via WhatsApp
                </a>
                <a
                  href={mailToLink}
                  className="group/btn flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-primary)] px-6 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-[0_6px_20px_rgba(217,4,41,0.35)]"
                >
                  <Mail className="size-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  Réserver par Email
                </a>
              </div>
              
              <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
                * Sous réserve de disponibilité à Rabat et à l&apos;aéroport de Rabat-Salé. Les tarifs peuvent varier selon la saison.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
