"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { TRANSLATIONS, type TranslationKey } from "@/data/translations";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type Currency = "MAD" | "EUR" | "USD";
export type Language = "FR" | "AR" | "EN" | "ES" | "IT";

// ─────────────────────────────────────────────
// CONVERSION RATES (from MAD)
// ─────────────────────────────────────────────
const RATES: Record<Currency, number> = {
  MAD: 1,
  EUR: 0.093,
  USD: 0.10,
};

const SYMBOLS: Record<Currency, string> = {
  MAD: "DH",
  EUR: "€",
  USD: "$",
};



// Always default to FR + MAD — user can change manually via Header selectors

// ─────────────────────────────────────────────
// CONTEXT VALUE TYPE
// ─────────────────────────────────────────────
interface SiteContextValue {
  currency: Currency;
  language: Language;
  setCurrency: (c: Currency) => void;
  setLanguage: (l: Language) => void;
  /** Format a MAD price into the selected currency with symbol */
  formatPrice: (priceMad: number) => string;
  /** Convert MAD to current currency (number only) */
  convertPrice: (priceMad: number) => number;
  /** Currency symbol (DH, €, $) */
  currencySymbol: string;
  /** Translate a UI key */
  t: (key: TranslationKey) => string;
}

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────
const SiteContext = createContext<SiteContextValue | null>(null);

// ─────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────
export function SiteProvider({ children }: { children: ReactNode }) {
  // Always start with FR + MAD — user changes via Header
  const [currency, setCurrencyState] = useState<Currency>("MAD");
  const [language, setLanguageState] = useState<Language>("FR");

  // Sync lang and dir attributes when user changes language
  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
  }, [language]);

  const setCurrency = useCallback((c: Currency) => setCurrencyState(c), []);
  const setLanguage = useCallback((l: Language) => setLanguageState(l), []);

  const convertPrice = useCallback(
    (priceMad: number) => Math.round(priceMad * RATES[currency]),
    [currency]
  );

  const formatPrice = useCallback(
    (priceMad: number): string => {
      const converted = Math.round(priceMad * RATES[currency]);
      if (currency === "EUR") return `${converted} €`;
      if (currency === "USD") return `$${converted}`;
      return `${converted} DH`;
    },
    [currency]
  );

  const currencySymbol = SYMBOLS[currency];

  const t = useCallback(
    (key: TranslationKey): string => {
      return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.FR[key];
    },
    [language]
  );

  const value = useMemo<SiteContextValue>(
    () => ({
      currency,
      language,
      setCurrency,
      setLanguage,
      formatPrice,
      convertPrice,
      currencySymbol,
      t,
    }),
    [currency, language, setCurrency, setLanguage, formatPrice, convertPrice, currencySymbol, t]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

// ─────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────
export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within <SiteProvider>");
  return ctx;
}
