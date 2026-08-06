"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import { Fuel, Settings2, Users, ArrowRight, MessageCircle, Mail } from "lucide-react";
import {
  VEHICLES,
  CATEGORY_LABELS,
  CATEGORY_BADGE_STYLES,
  buildFleetWhatsAppLink,
  WHATSAPP_LINK_BASE,
  type VehicleCategory,
  type Vehicle,
} from "@/data/vehicles-data";
import { useSite } from "@/context/SiteContext";

// ─────────────────────────────────────────────
// FILTER CONFIG (simplified)
// ─────────────────────────────────────────────
type FilterValue = "All" | VehicleCategory;



// ─────────────────────────────────────────────
// CAR CARD
// ─────────────────────────────────────────────
function CarCard({ car }: { car: Vehicle }) {
  const { formatPrice, t } = useSite();
  const badge = {
    label: CATEGORY_LABELS[car.category],
    className: CATEGORY_BADGE_STYLES[car.category],
  };
  const longTermTier = car.pricingTiers[car.pricingTiers.length - 1];
  const startingPriceMad = longTermTier?.price ?? car.pricingTiers[0]?.price ?? 0;
  
  const transmissionLabel = car.transmission === "Automatic" ? "Automatique" : "Manuelle";
  const priceText = car.priceOnRequest ? "Sur demande" : `${startingPriceMad} DH`;
  
  const emailBody = `Bonjour! Je suis intéressé par:
Véhicule: ${car.name}
Transmission: ${transmissionLabel}
Carburant: ${car.fuel}
Prix par jour: ${priceText}

Merci de me confirmer la disponibilité.`;

  const emailSubject = `Réservation ${car.name}`;
  const mailToLink = `mailto:wimacar@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <article
      aria-label={`Véhicule: ${car.name}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[32px] bg-[var(--color-background)] shadow-[var(--shadow-card)] transition-shadow duration-300 ease-out hover:shadow-[0_20px_60px_rgb(17_17_17/12%)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30"
    >
      {/* Featured ribbon */}
      {car.featured && (
        <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
          ★ Coup de cœur
        </div>
      )}

      {/* Image wrapper — large and prominent */}
      <div className="relative w-full overflow-hidden bg-[var(--color-surface)]" style={{ aspectRatio: "16/10" }}>
        <Image
          src={car.image}
          alt={`${car.name} – location de voiture à Rabat`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-2 scale-110"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${badge.className}`}>
            {badge.label}
          </span>
          <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {car.transmission === "Automatic" ? "Auto" : "Manuelle"}
          </span>
          <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {car.fuel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-extrabold leading-tight tracking-tight text-[var(--color-text-primary)]">
          {car.name}
        </h3>

        {/* Specs row */}
        <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-1.5">
            <Settings2 className="size-3.5 shrink-0 text-[var(--color-primary)]/70" />
            {car.transmission === "Automatic" ? "Automatique" : "Manuelle"}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="size-3.5 shrink-0 text-[var(--color-primary)]/70" />
            {car.fuel}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5 shrink-0 text-[var(--color-primary)]/70" />
            {car.seats} places
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[var(--color-border)]" />

        {/* Price */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {t("from")}
            </span>
            {car.priceOnRequest ? (
              <span className="text-[20px] font-extrabold leading-none text-[var(--color-primary)]">
                {t("onRequest")}
              </span>
            ) : (
              <span className="flex items-baseline gap-1">
                <span className="text-[24px] font-extrabold leading-none text-[var(--color-primary)]">
                  {formatPrice(startingPriceMad)}
                </span>
                <span className="text-[13px] font-semibold text-[var(--color-text-secondary)]">
                  {t("perDay")} <span className="opacity-70 ml-1">({longTermTier?.range})</span>
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Reserve buttons */}
        <div className="mt-auto flex flex-col gap-2.5">
          <a
            href={buildFleetWhatsAppLink(car)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Réserver ${car.name} via WhatsApp`}
            className="group/btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[#25D366] px-4 py-3 text-[14px] font-bold text-white transition-all duration-[250ms] ease-out hover:opacity-90 hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)]"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
          <a
            href={mailToLink}
            aria-label={`Réserver ${car.name} via Email`}
            className="group/btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-3 text-[14px] font-bold text-white transition-all duration-[250ms] ease-out hover:opacity-90 hover:shadow-[0_6px_20px_rgba(217,4,41,0.35)]"
          >
            <Mail className="size-4" />
            Email
          </a>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
export function Fleet() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [showAll, setShowAll] = useState(false);
  const { t } = useSite();

  const filters = [
    { label: t("all"), value: "All" as FilterValue },
    { label: t("economy"), value: "Economy" as FilterValue },
    { label: "SUV", value: "SUV" as FilterValue },
    { label: t("luxe"), value: "Luxe" as FilterValue },
  ];

  // Reset showAll when filter changes
  const toggleFilter = useCallback((value: FilterValue) => {
    setActiveFilter(value);
    setShowAll(false);
  }, []);

  const filteredCars = useMemo(() => {
    if (activeFilter === "All") return VEHICLES;
    return VEHICLES.filter((car) => car.category === activeFilter);
  }, [activeFilter]);

  // Show 3 on mobile, 6 on desktop initially
  const INITIAL_MOBILE = 3;
  const INITIAL_DESKTOP = 6;
  const hasMore = filteredCars.length > INITIAL_DESKTOP;

  return (
    <section
      id="fleet"
      aria-labelledby="fleet-heading"
      className="w-full bg-[var(--color-surface)] py-28 lg:py-36"
    >
      <Container>
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-[13px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
            {t("ourFleet")}
          </div>
          <h2
            id="fleet-heading"
            className="mb-5 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl"
          >
            {t("fleetTitle")}
          </h2>
          <p className="max-w-xl text-[17px] leading-relaxed text-[var(--color-text-secondary)]">
            {t("fleetDesc")}
          </p>
        </div>

        {/* Filters — simplified: Toutes | Économique | SUV | Luxe */}
        <div
          role="group"
          aria-label="Filtrer les véhicules"
          className="sticky top-[72px] z-20 -mx-4 mb-10 flex items-center gap-2 overflow-x-auto bg-[var(--color-surface)]/90 px-4 py-3 backdrop-blur-md scrollbar-none snap-x snap-mandatory lg:static lg:top-auto lg:mx-0 lg:justify-center lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => toggleFilter(filter.value)}
                aria-pressed={isActive}
                aria-label={`Filtre: ${filter.label}`}
                className={`
                  shrink-0 snap-start cursor-pointer rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]
                  ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white shadow-[0_4px_12px_rgba(217,4,41,0.3)]"
                      : "border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/30 hover:shadow-sm hover:text-[var(--color-primary)]"
                  }
                `}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filteredCars.length === 0 ? (
          <div className="flex min-h-[360px] items-center justify-center text-center">
            <div className="flex flex-col items-center gap-5">
              <div className="flex size-20 items-center justify-center rounded-3xl bg-white text-4xl shadow-[var(--shadow-card)]">
                🚗
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">
                  {t("notFound")}
                </h3>
                <p className="mb-6 text-[15px] text-[var(--color-text-secondary)]">
                  {t("tryAnotherFilter")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveFilter("All")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-[14px] font-bold text-white transition-opacity duration-200 hover:opacity-90"
              >
                {t("resetFilters")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {filteredCars.map((car, index) => (
                <div
                  key={car.id}
                  className={!showAll && index >= INITIAL_MOBILE ? "hidden sm:block" : ""}
                  style={!showAll && index >= INITIAL_DESKTOP ? { display: "none" } : undefined}
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>

            {/* Show more button */}
            {hasMore && !showAll && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-primary)] px-8 py-3.5 text-[14px] font-bold text-[var(--color-primary)] transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_6px_20px_rgba(217,4,41,0.25)]"
                >
                  Voir tous les véhicules
                  <ArrowRight className="size-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <p className="text-[15px] font-medium text-[var(--color-text-secondary)]">
            {t("cantFindVehicle")}
          </p>
          <a
            href={`${WHATSAPP_LINK_BASE}?text=${encodeURIComponent(
              "Bonjour WIMA CAR, je recherche un véhicule spécifique. Pouvez-vous m'aider ?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-[14px] font-bold text-[var(--color-text-primary)] shadow-sm transition-all duration-200 hover:border-[var(--color-primary)]/20 hover:shadow-md hover:text-[var(--color-primary)]"
          >
            {t("contactAdvisor")}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
