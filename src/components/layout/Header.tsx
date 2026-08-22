"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  Check,
  ChevronDown,
  Globe,
  Menu,
  PhoneCall,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import { LANGUAGES, getPathWithoutLanguage, localizedPath } from "@/lib/i18n";
import { useSite, type Currency, type Language } from "@/context/SiteContext";
import { usePathname, useRouter } from "next/navigation";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const currencies: Currency[] = ["MAD", "EUR", "USD"];
const languages: Language[] = [...LANGUAGES];

const phoneHref = "tel:+212661503446";
const phoneLabel = "06 61 50 34 46";


// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type SelectorKind = "currency" | "language";

// ─────────────────────────────────────────────
// LUXURY DROPDOWN SELECTOR
// ─────────────────────────────────────────────
type LuxurySelectorProps<T extends string> = {
  ariaLabel: string;
  icon: "currency" | "language";
  isOpen: boolean;
  label: string;
  onOpenChange: () => void;
  onSelect: (value: T) => void;
  options: T[];
};

function LuxurySelector<T extends string>({
  ariaLabel,
  icon,
  isOpen,
  label,
  onOpenChange,
  onSelect,
  options,
}: LuxurySelectorProps<T>) {
  const Icon = icon === "currency" ? Banknote : Globe;

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-neutral-200/50 bg-neutral-50/80 px-3 py-1.5 text-sm font-semibold text-neutral-800 transition-all duration-[250ms] ease-out hover:bg-neutral-100/80 hover:shadow-sm focus-visible:outline-primary"
        onClick={onOpenChange}
        type="button"
      >
        <Icon aria-hidden="true" className="size-3.5" />
        <span>{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-[250ms] ease-out",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-3 min-w-[130px] origin-top rounded-2xl border border-neutral-100 bg-white/95 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.97] opacity-0"
        )}
        role="listbox"
      >
        {options.map((option) => (
          <button
            aria-selected={option === label}
            className={cn(
              "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-neutral-600 transition-all duration-[200ms] ease-out hover:bg-neutral-50 hover:text-neutral-900",
              option === label && "bg-neutral-50 font-semibold text-neutral-950"
            )}
            key={option}
            onClick={() => onSelect(option)}
            role="option"
            type="button"
          >
            <span>{option}</span>
            {option === label ? (
              <Check aria-hidden="true" className="size-3.5 text-[#d90429]" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN HEADER
// ─────────────────────────────────────────────
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSelector, setOpenSelector] = useState<SelectorKind | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const { currency, language, setCurrency, setLanguage, t } = useSite();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: t("vehicles"), href: "#fleet" },
    { label: t("howItWorks"), href: "#how-it-works" },
    { label: t("reviews"), href: "#google-reviews" },
    { label: t("faq"), href: "#faq" },
    { label: t("contact"), href: "#contact" },
  ];

  // Shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu + dropdowns when clicking outside
  useEffect(() => {
    if (!isOpen && openSelector === null) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("header")) {
        setIsOpen(false);
        setOpenSelector(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, openSelector]);

  const closeAll = () => {
    setIsOpen(false);
    setOpenSelector(null);
  };

  const handleSelectorOpen = (selector: SelectorKind) => {
    setOpenSelector((cur) => (cur === selector ? null : selector));
  };

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setOpenSelector(null);
    router.push(localizedPath(nextLanguage, getPathWithoutLanguage(pathname)));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-black/[0.04] bg-white/70 backdrop-blur-3xl transition-all duration-300 ease-out",
        scrolled && "shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-3 xl:h-[72px]">
        {/* ── Logo → scrolls to top ───────────── */}
        <Link
          aria-label="WIMA CAR – Accueil"
          className="flex shrink-0 items-center transition-all duration-300 hover:opacity-85 focus-visible:outline-primary"
          href="/"
          onClick={closeAll}
        >
          <Image
            alt="WIMA CAR"
            src="/brand/logo-primary.png"
            width={1280}
            height={240}
            priority
            style={{ width: "auto", height: "40px" }}
          />
        </Link>

        {/* ── Desktop nav + selectors ─────────── */}
        <div className="hidden flex-1 items-center justify-center xl:flex">
          <nav
            aria-label="Navigation principale"
            className="flex items-center gap-1 xl:gap-2"
          >
            {navItems.map((item) => (
              <Link
                className="group relative whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-medium text-neutral-600 transition-colors duration-300 ease-out hover:text-neutral-950 focus-visible:outline-primary xl:text-[15px]"
                href={item.href}
                key={item.href}
                onClick={() => setOpenSelector(null)}
              >
                {item.label}
                <span className="absolute inset-x-2 bottom-1 h-[2px] origin-center scale-x-0 rounded-full bg-[#d90429] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Currency + Language + Phone ──────── */}
        <div className="hidden items-center gap-2 xl:flex">
          <LuxurySelector<Currency>
            ariaLabel="Choisir la devise"
            icon="currency"
            isOpen={openSelector === "currency"}
            label={currency}
            onOpenChange={() => handleSelectorOpen("currency")}
            onSelect={(v) => { setCurrency(v); setOpenSelector(null); }}
            options={currencies}
          />
          <LuxurySelector<Language>
            ariaLabel="Choisir la langue"
            icon="language"
            isOpen={openSelector === "language"}
            label={language}
            onOpenChange={() => handleSelectorOpen("language")}
            onSelect={selectLanguage}
            options={languages}
          />

          <a
            aria-label={`Appeler WIMA CAR : ${phoneLabel}`}
            className="ml-1 flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#d90429] px-5 py-2.5 text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(217,4,41,0.25)] transition-all duration-300 hover:bg-[#b8021f] hover:shadow-[0_8px_24px_rgba(217,4,41,0.35)] active:scale-95 focus-visible:outline-primary"
            href={phoneHref}
            onClick={() => setOpenSelector(null)}
          >
            <span className="relative flex size-4 items-center justify-center">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-white/60" />
              <PhoneCall aria-hidden="true" className="relative size-3.5" />
            </span>
            <span>{phoneLabel}</span>
          </a>
        </div>

        {/* ── Mobile burger ──────────────────── */}
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200/60 bg-neutral-50/90 text-neutral-900 shadow-sm transition-all duration-200 hover:bg-neutral-100 focus-visible:outline-primary xl:hidden"
          onClick={() => {
            setIsOpen((v) => !v);
            setOpenSelector(null);
          }}
          type="button"
        >
          {isOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </Container>

      {/* ── Mobile menu ──────────────────────── */}
      <div
        className={cn(
          "overflow-hidden border-t border-black/[0.04] bg-white/95 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden",
          isOpen
            ? "max-h-[100dvh] opacity-100"
            : "max-h-0 opacity-0"
        )}
      >
        <Container className="space-y-5 py-5">
          {/* Nav links */}
          <nav aria-label="Navigation mobile" className="grid gap-1">
            {/* Home link visible only in mobile */}
            <Link
              className="rounded-2xl px-4 py-3 text-base font-bold text-neutral-900 transition-colors hover:text-[#d90429] focus-visible:outline-primary"
              href="/"
              onClick={closeAll}
            >
              Accueil
            </Link>
            {navItems.map((item) => (
              <Link
                className="rounded-2xl px-4 py-3 text-base font-bold text-neutral-900 transition-colors hover:text-[#d90429] focus-visible:outline-primary"
                href={item.href}
                key={item.href}
                onClick={closeAll}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Currency + Language selectors */}
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <span className="px-1 text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">
                Devise
              </span>
              <div className="flex flex-wrap gap-2">
                {currencies.map((opt) => (
                  <button
                    aria-pressed={currency === opt}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-bold transition-all duration-150 focus-visible:outline-primary",
                      currency === opt
                        ? "border-[#d90429] bg-[#d90429] text-white"
                        : "border-neutral-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    )}
                    key={opt}
                    onClick={() => setCurrency(opt)}
                    type="button"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-1.5">
              <span className="px-1 text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">
                Langue
              </span>
              <div className="flex flex-wrap gap-2">
                {languages.map((opt) => (
                  <button
                    aria-pressed={language === opt}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-bold transition-all duration-150 focus-visible:outline-primary",
                      language === opt
                        ? "border-[#d90429] bg-[#d90429] text-white"
                        : "border-neutral-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    )}
                    key={opt}
                    onClick={() => selectLanguage(opt)}
                    type="button"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Phone CTA */}
          <a
            aria-label={`Appeler ${phoneLabel}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d90429] py-4 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(217,4,41,0.25)] transition-all hover:bg-[#b8021f] active:scale-[0.98] focus-visible:outline-primary"
            href={phoneHref}
            onClick={closeAll}
          >
            <span className="relative flex size-4 items-center justify-center">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-white/60" />
              <PhoneCall aria-hidden="true" className="relative size-3.5" />
            </span>
            {phoneLabel}
          </a>
        </Container>
      </div>
    </header>
  );
}
