"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ExternalLink, Quote } from "lucide-react";
import { Container } from "@/components/ui";
import { useSite } from "@/context/SiteContext";
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from "@/constants/GOOGLE_REVIEWS";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
  tags: { icon: string; text: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA  — 12 real reviews with SEO tags
// ─────────────────────────────────────────────────────────────────────────────
const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Imad Essati",
    initials: "IE",
    rating: 5,
    text: "Excellent service que je recommande vivement. Voiture propre et en très bon état, mise à disposition et récupérée comme convenu, avec le sourire et un professionnalisme irréprochable.",
    date: "Août 2024",
    tags: [
      { icon: "🚗", text: "Voiture propre" },
      { icon: "👔", text: "Service professionnel" },
      { icon: "📍", text: "Location Rabat" },
    ],
  },
  {
    id: "r2",
    author: "Cédric Wetta",
    initials: "CW",
    rating: 5,
    text: "Location en dernière minute sans souci. Prix transparents, équipe honnête, voiture propre et excellent accueil.",
    date: "Mai 2024",
    tags: [
      { icon: "💰", text: "Prix transparents" },
      { icon: "⏱️", text: "Dernière minute" },
      { icon: "🚗", text: "Voiture propre" },
    ],
  },
  {
    id: "r3",
    author: "Réda Cherkaoui",
    initials: "RC",
    rating: 5,
    text: "Réservation par internet, livraison à l'aéroport Mohammed V à temps. Véhicule conforme aux photos WhatsApp.",
    date: "Avril 2024",
    tags: [
      { icon: "✈️", text: "Livraison aéroport" },
      { icon: "💻", text: "Réservation internet" },
      { icon: "💬", text: "WhatsApp" },
    ],
  },
  {
    id: "r4",
    author: "Ismail El Brini",
    initials: "IB",
    rating: 5,
    text: "Meilleure location voiture Maroc. Livraison gratuite à l'aéroport Rabat-Salé.",
    date: "Février 2024",
    tags: [
      { icon: "🏆", text: "Meilleure location" },
      { icon: "✈️", text: "Livraison gratuite aéroport" },
    ],
  },
  {
    id: "r5",
    author: "Bouiboukir Imad",
    initials: "BI",
    rating: 5,
    text: "Deux locations, jamais déçu. Voitures récentes et très bien entretenues.",
    date: "Mars 2024",
    tags: [
      { icon: "🚘", text: "Véhicules récents" },
      { icon: "🧼", text: "Bien entretenus" },
      { icon: "⭐", text: "Jamais déçu" },
    ],
  },
  {
    id: "r6",
    author: "Ahlam Elasri",
    initials: "AE",
    rating: 5,
    text: "Personnel sympathique, ponctuel, prix abordables, excellente expérience.",
    date: "Janvier 2024",
    tags: [
      { icon: "😊", text: "Personnel sympathique" },
      { icon: "⏱️", text: "Ponctuel" },
      { icon: "🏷️", text: "Prix abordables" },
    ],
  },
  {
    id: "r7",
    author: "Michel Martinez",
    initials: "MM",
    rating: 5,
    text: "Les prix sont affichés et respectés.",
    date: "Décembre 2023",
    tags: [
      { icon: "💰", text: "Prix affichés" },
      { icon: "🤝", text: "Prix respectés" },
    ],
  },
  {
    id: "r8",
    author: "Hamza Maarir",
    initials: "HM",
    rating: 5,
    text: "Voiture propre, excellent service, merci à M. Mounir.",
    date: "Novembre 2023",
    tags: [
      { icon: "🚗", text: "Voiture propre" },
      { icon: "⭐", text: "Excellent service" },
    ],
  },
  {
    id: "r9",
    author: "Nizar B",
    initials: "NB",
    rating: 5,
    text: "Très bon service. Voiture très propre et pratique.",
    date: "Octobre 2023",
    tags: [
      { icon: "⭐", text: "Très bon service" },
      { icon: "✨", text: "Très propre" },
    ],
  },
  {
    id: "r10",
    author: "Bahaedine Tazi",
    initials: "BT",
    rating: 5,
    text: "Très bonne prestation. Agréablement surpris par la réactivité de l'agence.",
    date: "Septembre 2023",
    tags: [
      { icon: "⚡", text: "Réactivité" },
      { icon: "⭐", text: "Bonne prestation" },
    ],
  },
  {
    id: "r11",
    author: "Ali Yahyaoui",
    initials: "AY",
    rating: 5,
    text: "Great experience with the car and the staff.",
    date: "Août 2023",
    tags: [
      { icon: "🌟", text: "Great experience" },
      { icon: "👥", text: "Great staff" },
    ],
  },
  {
    id: "r12",
    author: "Azhari Mulyana",
    initials: "AM",
    rating: 5,
    text: "Great service. Friendly staff. Many types of cars available. We recommend.",
    date: "Juillet 2023",
    tags: [
      { icon: "⭐", text: "Great service" },
      { icon: "😊", text: "Friendly staff" },
      { icon: "🚘", text: "Many cars available" },
    ],
  },
];


// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StarRow = memo(function StarRow({
  rating,
  size = 18,
  animated = false,
  reducedMotion = false,
}: {
  rating: number;
  size?: number;
  animated?: boolean;
  reducedMotion?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`${rating} étoiles sur 5`}
      style={{ display: "flex", gap: 3, alignItems: "center" }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <motion.svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < rating ? "#f59e0b" : "#e5e7eb"}
          aria-hidden="true"
          initial={animated && !reducedMotion ? { scale: 0, opacity: 0 } : {}}
          animate={animated && !reducedMotion ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 400, damping: 20 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
});

const GoogleLogo = memo(function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="Google"
      role="img"
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
});

const AnimatedCounter = memo(function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
  isInView,
  reducedMotion,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  isInView: boolean;
  reducedMotion: boolean;
}) {
  const [current, setCurrent] = useState(reducedMotion ? target : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current || reducedMotion) return;
    startedRef.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration, reducedMotion]);

  return (
    <span aria-label={`${target}${suffix}`}>
      {current}
      {suffix}
    </span>
  );
});

const ReviewCard = memo(function ReviewCard({
  review,
  reducedMotion,
}: {
  review: Review;
  reducedMotion: boolean;
}) {
  return (
    <div
      style={{
        background: "white",
        border: "1.5px solid var(--color-border)",
        borderRadius: 28,
        padding: "clamp(28px, 4vw, 44px)",
        boxShadow:
          "0 4px 6px rgba(0,0,0,0.02), 0 12px 40px rgba(0,0,0,0.06), 0 40px 80px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(8px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,4,41,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 24,
          right: 28,
          opacity: 0.06,
        }}
      >
        <Quote style={{ width: 64, height: 64, color: "var(--color-primary)" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <StarRow rating={review.rating} size={20} animated reducedMotion={reducedMotion} />
        <div
          style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "rgba(66,133,244,0.07)",
            borderRadius: 999,
            padding: "5px 12px",
          }}
        >
          <GoogleLogo size={16} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#4285F4" }}>
            Avis vérifié Google
          </span>
        </div>
      </div>

      {/* SEO Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {review.tags.map((tag, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--color-text-secondary)",
            }}
          >
            <span>{tag.icon}</span>
            {tag.text}
          </span>
        ))}
      </div>

      <blockquote
        style={{
          margin: 0,
          flex: 1,
          fontSize: "clamp(15px, 1.8vw, 17px)",
          lineHeight: 1.75,
          color: "var(--color-text-primary)",
          fontStyle: "normal",
          position: "relative",
          zIndex: 1,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingTop: 20,
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary) 0%, #ff4444 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(217,4,41,0.25)",
          }}
        >
          {review.initials}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
            {review.author}
          </p>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 3 }}>
            Publié sur Google
          </p>
        </div>

        <div style={{ flexShrink: 0, opacity: 0.65 }}>
          <GoogleLogo size={22} />
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────────
export function GoogleReviews() {
  const { t } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion() ?? false;

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > activeIdx ? 1 : -1);
      setActiveIdx(idx);
    },
    [activeIdx]
  );

  const goNext = useCallback(() => {
    const next = (activeIdx + 1) % REVIEWS.length;
    setDirection(1);
    setActiveIdx(next);
  }, [activeIdx]);

  const goPrev = useCallback(() => {
    const prev = (activeIdx - 1 + REVIEWS.length) % REVIEWS.length;
    setDirection(-1);
    setActiveIdx(prev);
  }, [activeIdx]);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    autoPlayRef.current = setInterval(goNext, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isInView, goNext, reducedMotion]);

  useEffect(() => {
    const pause = () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
    const resume = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (!reducedMotion) autoPlayRef.current = setInterval(goNext, 6000);
    };
    document.addEventListener("visibilitychange", () =>
      document.hidden ? pause() : resume()
    );
    return () => document.removeEventListener("visibilitychange", () => {});
  }, [goNext, reducedMotion]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
      touchStartX.current = null;
    },
    [goNext, goPrev]
  );

  const review = REVIEWS[activeIdx];

  const cardVariants = useMemo(
    () => ({
      enter: (d: number) => ({
        opacity: 0,
        y: d > 0 ? 28 : -28,
        scale: 0.98,
      }),
      center: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: "easeOut" as const },
      },
      exit: (d: number) => ({
        opacity: 0,
        y: d > 0 ? -28 : 28,
        scale: 0.98,
        transition: { duration: 0.35, ease: "easeIn" as const },
      }),
    }),
    []
  );

  const headerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
      }),
    }),
    []
  );

  return (
    <section
      ref={sectionRef}
      id="google-reviews"
      aria-labelledby="reviews-heading"
      style={{
        width: "100%",
        paddingTop: "clamp(64px, 8vw, 120px)",
        paddingBottom: "clamp(64px, 8vw, 120px)",
        background: "var(--color-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={
            reducedMotion
              ? {}
              : { opacity: [0.06, 0.10, 0.06], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60vw",
            height: "60vw",
            maxWidth: 700,
            maxHeight: 700,
            borderRadius: "50%",
            background: "var(--color-primary)",
            filter: "blur(120px)",
          }}
        />
      </div>

      <Container style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "clamp(48px, 6vw, 80px)",
          }}
        >
          <motion.div
            custom={0}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 999,
              padding: "7px 18px",
              marginBottom: 20,
              background: "white",
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <GoogleLogo size={16} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-secondary)",
              }}
            >
              {t("reviewsSubtitle")}
            </span>
          </motion.div>

          <motion.h2
            id="reviews-heading"
            custom={1}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--color-text-primary)",
              marginBottom: 16,
              maxWidth: 680,
            }}
          >
            {t("reviewsTitle")}
          </motion.h2>

          <motion.p
            custom={2}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
              maxWidth: 540,
            }}
          >
            {t("reviewsDesc")}
          </motion.p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(32px, 5vw, 80px)",
            flexWrap: "wrap",
          }}
        >
          <motion.aside
            initial={reducedMotion ? {} : { opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
            aria-label="Note Google WIMA CAR"
            style={{
              flex: "0 0 auto",
              minWidth: 220,
              display: "flex",
              flexDirection: "column",
              gap: 28,
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GoogleLogo size={32} />
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Google Reviews
              </span>
            </div>

            <div>
              <div
                style={{
                  fontSize: "clamp(64px, 8vw, 96px)",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-manrope), sans-serif",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 4,
                }}
              >
                {GOOGLE_REVIEW_RATING}
                <span
                  style={{
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                    letterSpacing: 0,
                  }}
                >
                  / 5
                </span>
              </div>

              <div style={{ marginTop: 10, marginBottom: 14 }}>
                <StarRow rating={4} size={22} />
              </div>

              <div
                style={{
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 900,
                  color: "var(--color-primary)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedCounter
                  target={GOOGLE_REVIEW_COUNT}
                  suffix=""
                  isInView={isInView}
                  reducedMotion={reducedMotion}
                />
              </div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  marginTop: 4,
                }}
              >
                avis Google
              </p>
            </div>

            <div
              style={{
                width: "100%",
                height: 1,
                background:
                  "linear-gradient(to right, var(--color-border), transparent)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Dernière mise à jour
              </p>
              <p style={{ fontSize: 15, fontWeight: 800, color: "var(--color-text-primary)" }}>
                Août 2026
              </p>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                  marginTop: 6,
                  maxWidth: 220,
                }}
              >
                Basé sur les avis publics publiés sur Google.
              </p>
            </div>
          </motion.aside>

          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.4, ease: "easeOut" }}
            style={{ flex: "1 1 360px", minWidth: 300 }}
          >
            <motion.div
              whileHover={
                reducedMotion
                  ? {}
                  : {
                      y: -8,
                      boxShadow:
                        "0 4px 6px rgba(0,0,0,0.02), 0 24px 60px rgba(0,0,0,0.12), 0 60px 100px rgba(0,0,0,0.06)",
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                position: "relative",
                minHeight: 340,
                borderRadius: 28,
                cursor: "default",
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={review.id}
                  custom={direction}
                  variants={reducedMotion ? {} : cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  aria-live="polite"
                  aria-atomic="true"
                  style={{ position: "relative", height: "100%" }}
                >
                  <ReviewCard review={review} reducedMotion={reducedMotion} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div
              role="tablist"
              aria-label="Navigation avis"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 24,
                padding: "0 10px"
              }}
            >
              {REVIEWS.map((r, idx) => (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={idx === activeIdx}
                  aria-label={`Avis ${idx + 1} de ${REVIEWS.length}: ${r.author}`}
                  onClick={() => goTo(idx)}
                  style={{
                    width: idx === activeIdx ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    background:
                      idx === activeIdx
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                    transition: "width 0.35s ease, background 0.25s ease",
                    padding: 0,
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.outline = "2px solid var(--color-primary)")}
                  onBlur={(e) => (e.currentTarget.style.outline = "none")}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(48px, 6vw, 72px)",
          }}
        >
          <motion.a
            href="https://www.google.com/search?q=wima+car+rabat+avis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir les ${GOOGLE_REVIEW_COUNT} avis Google de WIMA CAR`}
            whileHover={
              reducedMotion
                ? {}
                : {
                    y: -3,
                    boxShadow: "0 16px 40px rgba(217,4,41,0.2)",
                  }
            }
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              borderRadius: 16,
              border: "1.5px solid var(--color-border)",
              padding: "14px 28px",
              background: "white",
              color: "var(--color-text-primary)",
              fontSize: 15,
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
            className="group"
          >
            {!reducedMotion && (
              <motion.div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "30%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                  transform: "skewX(-20deg)",
                  pointerEvents: "none",
                }}
                animate={{ left: ["-40%", "160%"] }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              />
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
              <GoogleLogo size={20} />
              <span>Voir les {GOOGLE_REVIEW_COUNT} avis Google</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                position: "relative",
                zIndex: 1,
                color: "var(--color-primary)",
              }}
            >
              <motion.div
                whileHover={reducedMotion ? {} : { x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ArrowRight style={{ width: 17, height: 17 }} />
              </motion.div>
              <ExternalLink
                style={{ width: 14, height: 14, opacity: 0.5 }}
                aria-hidden="true"
              />
            </div>
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
