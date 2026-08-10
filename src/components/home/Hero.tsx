"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Check,
  Clock,
  Car,
  ShieldCheck,
  Headset,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/ui";
import {
  VEHICLES,
  DURATION_OPTIONS,
  buildHeroWhatsAppLink,
  type DurationKey,
} from "@/data/vehicles-data";
import { useSite } from "@/context/SiteContext";
import { useRef } from "react";

// ─── WhatsApp icon SVG ───────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495.0.16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Hero() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>("short");

  const { formatPrice, t } = useSite();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollVehicles = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const selectedVehicle = useMemo(
    () => VEHICLES.find((v) => v.id === selectedVehicleId) ?? null,
    [selectedVehicleId]
  );

  const selectedDurationOption = useMemo(
    () => DURATION_OPTIONS.find((d) => d.key === selectedDuration)!,
    [selectedDuration]
  );

  const pricePerDayMad = useMemo(() => {
    if (!selectedVehicle || selectedVehicle.priceOnRequest) return null;
    return selectedVehicle.pricingTiers[selectedDurationOption.tierIndex]?.price ?? null;
  }, [selectedVehicle, selectedDurationOption]);

  const whatsappLink = useMemo(() => {
    if (!selectedVehicle) return null;
    return buildHeroWhatsAppLink(
      selectedVehicle.name,
      selectedDurationOption.range,
      pricePerDayMad
    );
  }, [selectedVehicle, selectedDurationOption, pricePerDayMad]);

  return (
    <section className="relative w-full overflow-hidden bg-white pt-12 pb-16 lg:pt-24 lg:pb-24">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col items-start text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-4 py-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] shadow-sm backdrop-blur-md">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-[var(--color-primary)]"></span>
              </span>
              {t("heroSubtitle")}
            </div>

            <h1 className="mb-6 text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-black">
              {t("heroTitle1")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#ff4d6d]">
                {t("heroTitle2")}
              </span>
            </h1>

            <p className="mb-10 max-w-lg text-lg font-medium leading-relaxed text-black/70 sm:text-xl">
              {t("heroDesc")}
            </p>

            <div className="mb-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
              <Link
                href="#booking"
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-primary)] px-8 py-4 text-base font-bold text-white transition-all duration-300 ease-out hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:w-auto"
              >
                {t("bookNow")}
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="#fleet"
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-[var(--radius-button)] border-2 border-black/10 bg-transparent px-8 py-4 text-base font-bold text-black/80 transition-all duration-300 ease-out hover:border-black/20 hover:bg-black/5 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/50 sm:w-auto"
              >
                {t("viewFleet")}
              </Link>
            </div>

            {/* Social proof: keep aligned with the verified GBP figure used elsewhere on the site. */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-base font-bold text-black">4.3/5</span>
              </div>
              <span className="text-sm font-medium text-black/60">
                {t("satisfiedClients")}
              </span>
            </div>
          </div>

          <div className="relative flex min-h-[300px] w-full items-center justify-center sm:min-h-[400px] lg:min-h-[500px]">
            <div className="absolute inset-0 m-auto h-[60%] w-[80%] rounded-full bg-[var(--color-primary)]/10 blur-3xl" />

            <div className="absolute right-2 top-4 z-20 flex flex-col items-center gap-1 rounded-xl bg-white/95 p-2 shadow-[var(--shadow-soft)] backdrop-blur-md md:right-10 md:gap-2 md:rounded-2xl md:p-4">
              <MapPin className="size-4 text-[var(--color-primary)] md:size-6" />
              <span className="whitespace-pre-line text-center text-[10px] font-bold leading-tight text-black/80 md:text-sm">
                {t("deliveryAero")}
              </span>
            </div>
            <div className="absolute bottom-4 left-0 z-20 flex flex-col items-center gap-1 rounded-xl bg-white/95 p-2 shadow-[var(--shadow-soft)] backdrop-blur-md md:bottom-8 md:gap-2 md:rounded-2xl md:p-4">
              <ShieldCheck className="size-4 text-[var(--color-primary)] md:size-6" />
              <span className="whitespace-pre-line text-center text-[10px] font-bold leading-tight text-black/80 md:text-sm">
                {t("insuranceIncluded")}
              </span>
            </div>
            <div className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex flex-col items-center gap-1 rounded-xl bg-white/95 p-2 shadow-[var(--shadow-soft)] backdrop-blur-md md:-right-16 md:gap-2 md:rounded-2xl md:p-4">
              <Headset className="size-4 text-[var(--color-primary)] md:size-6" />
              <span className="whitespace-pre-line text-center text-[10px] font-bold leading-tight text-black/80 md:text-sm">
                {t("support247")}
              </span>
            </div>

            <Image
              src="/images/hero/hero-wima.webp"
              alt="WIMA CAR Location de voiture premium à Rabat"
              width={650}
              height={400}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 650px"
              className="relative z-10 h-auto w-full origin-center scale-[1.15] object-contain sm:scale-125 lg:scale-[1.45] xl:scale-[1.5]"
            />
          </div>
        </div>

        <div
          id="booking"
          className="relative z-30 mx-auto mt-12 w-full max-w-6xl rounded-[var(--radius-card)] border border-white bg-white/85 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl lg:mt-4 lg:p-8"
        >
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-black">{t("chooseVehicle")}</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollVehicles("left")} aria-label="Previous vehicle" className="rounded-full border p-2">
                <ChevronLeft className="size-5" />
              </button>
              <button type="button" onClick={() => scrollVehicles("right")} aria-label="Next vehicle" className="rounded-full border p-2">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2">
            {VEHICLES.map((vehicle) => (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => setSelectedVehicleId(vehicle.id)}
                className={`min-w-[180px] rounded-2xl border p-4 text-left transition-colors ${selectedVehicleId === vehicle.id ? "border-[var(--color-primary)]" : "border-black/10"}`}
              >
                <span className="font-bold">{vehicle.name}</span>
              </button>
            ))}
          </div>
          {selectedVehicle && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value as DurationKey)}
                className="rounded-xl border border-black/10 bg-white px-4 py-3"
                aria-label="Rental duration"
              >
                {DURATION_OPTIONS.map((option) => (
                  <option key={option.key} value={option.key}>{option.range}</option>
                ))}
              </select>
              <span className="font-semibold">{pricePerDayMad ? formatPrice(pricePerDayMad) : "Sur demande"}</span>
              {whatsappLink && (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-bold text-white">
                  <WhatsAppIcon className="size-5" />
                  {t("bookNow")}
                </a>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
