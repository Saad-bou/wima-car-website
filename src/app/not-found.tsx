import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[var(--color-background)] py-20 text-center">
        <Container className="flex flex-col items-center gap-6">
          <h1 className="text-8xl font-black text-[var(--color-primary)]">404</h1>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Page introuvable
          </h2>
          <p className="max-w-md text-lg text-[var(--color-text-secondary)]">
            Désolé, nous ne trouvons pas la page que vous recherchez. Elle a peut-être été déplacée ou supprimée.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[var(--color-primary)]/90 hover:shadow-lg"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/vehicules"
              className="inline-flex items-center justify-center rounded-full border-2 border-[var(--color-border)] bg-transparent px-8 py-3.5 text-sm font-bold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
            >
              Voir notre flotte
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
