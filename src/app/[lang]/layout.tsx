import { notFound } from "next/navigation";
import { SiteProvider } from "@/context/SiteContext";
import { PATH_TO_LANGUAGE, isLanguagePath } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }, { lang: "es" }, { lang: "it" }];
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLanguagePath(lang) || lang === "fr") {
    notFound();
  }

  return (
    <SiteProvider initialLanguage={PATH_TO_LANGUAGE[lang]}>
      {children}
    </SiteProvider>
  );
}
