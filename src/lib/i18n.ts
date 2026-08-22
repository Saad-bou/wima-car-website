import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import type { Language } from "@/context/SiteContext";

export const LANGUAGES = ["FR", "AR", "EN", "ES", "IT"] as const satisfies readonly Language[];
export const LANGUAGE_PATHS = ["fr", "ar", "en", "es", "it"] as const;

export type LanguagePath = (typeof LANGUAGE_PATHS)[number];

export const DEFAULT_LANGUAGE: Language = "FR";
export const DEFAULT_LANGUAGE_PATH: LanguagePath = "fr";

export const LANGUAGE_TO_PATH: Record<Language, LanguagePath> = {
  FR: "fr",
  AR: "ar",
  EN: "en",
  ES: "es",
  IT: "it",
};

export const PATH_TO_LANGUAGE: Record<LanguagePath, Language> = {
  fr: "FR",
  ar: "AR",
  en: "EN",
  es: "ES",
  it: "IT",
};

export const LANGUAGE_LOCALES: Record<Language, string> = {
  FR: "fr_MA",
  AR: "ar_MA",
  EN: "en",
  ES: "es",
  IT: "it",
};

export function isLanguagePath(value: string): value is LanguagePath {
  return (LANGUAGE_PATHS as readonly string[]).includes(value);
}

export function localizedPath(language: Language, path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const withoutLanguage = cleanPath.replace(/^\/(fr|ar|en|es|it)(?=\/|$)/, "") || "/";
  const prefix = LANGUAGE_TO_PATH[language];

  if (language === DEFAULT_LANGUAGE) {
    return withoutLanguage;
  }

  return withoutLanguage === "/" ? `/${prefix}` : `/${prefix}${withoutLanguage}`;
}

export function localizedAbsoluteUrl(language: Language, path = "/"): string {
  return `${SITE_CONFIG.url}${localizedPath(language, path)}`;
}

export function languageAlternates(path = "/"): NonNullable<Metadata["alternates"]>["languages"] {
  return {
    "x-default": localizedAbsoluteUrl(DEFAULT_LANGUAGE, path),
    fr: localizedAbsoluteUrl("FR", path),
    ar: localizedAbsoluteUrl("AR", path),
    en: localizedAbsoluteUrl("EN", path),
    es: localizedAbsoluteUrl("ES", path),
    it: localizedAbsoluteUrl("IT", path),
  };
}

export function getPathWithoutLanguage(pathname: string): string {
  return pathname.replace(/^\/(fr|ar|en|es|it)(?=\/|$)/, "") || "/";
}
