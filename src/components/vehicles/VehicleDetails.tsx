"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Fuel, Mail, MessageCircle, Settings2, Users } from "lucide-react";
import { Container } from "@/components/ui";
import { useSite } from "@/context/SiteContext";
import {
  buildFleetWhatsAppLink,
  CATEGORY_BADGE_STYLES,
  CATEGORY_LABELS,
  type Vehicle,
} from "@/data/vehicles-data";

export function VehicleDetails({ vehicle }: { vehicle: Vehicle }) {
  const { formatPrice, t } = useSite();
  const badge = {
    label: CATEGORY_LABELS[vehicle.category],
    className: CATEGORY_BADGE_STYLES[vehicle.category],
  };
  const longTermTier = vehicle.pricingTiers[vehicle.pricingTiers.length - 1];
  const startingPriceMad = longTermTier?.price ?? vehicle.pricingTiers[0]?.price ?? 0;
  const transmissionLabel = vehicle.transmission === "Automatic" ? "Automatique" : "Manuelle";
  const priceText = vehicle.priceOnRequest
    ? t("onRequest")
    : `${formatPrice(startingPriceMad)} ${t("perDay")}`;
  const emailBody = `Bonjour! Je suis interesse par:
Vehicule: ${vehicle.name}
Transmission: ${transmissionLabel}
Carburant: ${vehicle.fuel}
Prix par jour: ${priceText}

Merci de me confirmer la disponibilite.`;
  const emailSubject = `Reservation ${vehicle.name}`;
  const mailToLink = `mailto:wimacar@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <main className="bg-[var(--color-background)] pb-20">
      <div className="h-[80px]" />
      <Container>
        <div className="py-8">
          <Link
            href="/vehicules"
            className="inline-flex items-center gap-2 rounded text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            <ArrowLeft className="size-4" />
            {t("ourFleet")}
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-[32px] bg-[var(--color-surface)] shadow-[var(--shadow-card)]"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={vehicle.image}
              alt={`Location ${vehicle.name} a Rabat - WIMA CAR`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${badge.className}`}>
                {badge.label}
              </span>
              {vehicle.featured && (
                <span className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Coup de coeur
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
              <h2 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">
                Tarifs de location
              </h2>
              <div className="flex flex-col gap-3">
                {vehicle.priceOnRequest ? (
                  <div className="text-xl font-extrabold text-[var(--color-primary)]">
                    {t("onRequest")}
                  </div>
                ) : (
                  vehicle.pricingTiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-semibold text-[var(--color-text-secondary)]">
                        {tier.label} <span className="font-normal opacity-80">({tier.range})</span>
                      </span>
                      <span className="font-bold text-[var(--color-text-primary)]">
                        {formatPrice(tier.price)}{" "}
                        <span className="text-sm font-normal text-[var(--color-text-secondary)]">
                          {t("perDay")}
                        </span>
                      </span>
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
                {t("reserveWhatsApp")}
              </a>
              <a
                href={mailToLink}
                className="group/btn flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-primary)] px-6 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-[0_6px_20px_rgba(217,4,41,0.35)]"
              >
                <Mail className="size-5 transition-transform duration-300 group-hover/btn:scale-110" />
                Email
              </a>
            </div>

            <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
              * Sous réserve de disponibilité à Rabat et à l&apos;aéroport de Rabat-Salé. Les tarifs peuvent varier selon la saison.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
