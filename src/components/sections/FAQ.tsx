"use client";

import { memo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, Variants } from "framer-motion";
import { ChevronDown, MessageCircle, PhoneCall, Check, CarFront, Star, Clock } from "lucide-react";
import { Container } from "@/components/ui";
import Head from "next/head";

import { useSite } from "@/context/SiteContext";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

interface FAQItem {
  id: string;
  q: string;
  a: React.ReactNode;
  schemaA: string;
}



// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA JSON-LD
// ─────────────────────────────────────────────────────────────────────────────

function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.schemaA,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCORDION ITEM
// ─────────────────────────────────────────────────────────────────────────────

const AccordionItem = memo(function AccordionItem({
  faq,
  isOpen,
  onClick,
  reducedMotion,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onClick: () => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        borderColor: isOpen ? "var(--color-primary)" : "var(--color-border)",
        boxShadow: isOpen ? "0 12px 32px rgba(217, 4, 41, 0.08)" : "0 4px 12px rgba(0, 0, 0, 0.02)",
      }}
      whileHover={
        reducedMotion || isOpen
          ? {}
          : { 
              borderColor: "var(--color-primary)",
              boxShadow: "0 8px 24px rgba(217, 4, 41, 0.06)",
              y: -2 
            }
      }
      style={{
        background: "white",
        borderRadius: 20,
        marginBottom: 16,
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-question-${faq.id}`}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(20px, 4vw, 28px)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          outline: "none",
        }}
      >
        <span
          style={{
            fontSize: "clamp(16px, 2vw, 18px)",
            fontWeight: 800,
            color: isOpen ? "var(--color-primary)" : "var(--color-text-primary)",
            lineHeight: 1.4,
            paddingRight: 24,
            transition: "color 0.3s ease",
          }}
        >
          {faq.q}
        </span>
        <motion.div
          animate={reducedMotion ? {} : { 
            rotate: isOpen ? 180 : 0, 
            backgroundColor: isOpen ? "var(--color-primary)" : "var(--color-surface)", 
            color: isOpen ? "var(--color-surface)" : "var(--color-text-primary)" 
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-surface)",
            color: "var(--color-text-primary)",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          <ChevronDown style={{ width: 18, height: 18 }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
            initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                padding: "0 clamp(20px, 4vw, 28px) clamp(20px, 4vw, 28px)",
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
              }}
            >
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// STICKY INFO CARD
// ─────────────────────────────────────────────────────────────────────────────

const ContactCard = memo(function ContactCard({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      whileHover={reducedMotion ? {} : { y: -4, boxShadow: "0 24px 48px rgba(0,0,0,0.08)" }}
      style={{
        background: "white",
        border: "1px solid var(--color-border)",
        borderRadius: 24,
        padding: "clamp(24px, 4vw, 36px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "rgba(217,4,41,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <MessageCircle style={{ width: 28, height: 28, color: "var(--color-primary)" }} />
      </div>

      <h3 style={{ fontSize: 24, fontWeight: 900, color: "var(--color-text-primary)", marginBottom: 20, lineHeight: 1.2 }}>
        Besoin d&apos;une réponse immédiate ?
      </h3>
      
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, padding: "14px 16px", background: "var(--color-surface)", borderRadius: 16, border: "1px solid var(--color-border)" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <Clock style={{ width: 20, height: 20, color: "var(--color-primary)" }} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>Temps moyen</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--color-text-primary)" }}>&lt; 5 min</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        <a
          href="https://wa.me/212600000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: "#25D366", color: "white", textDecoration: "none",
            fontWeight: 700, fontSize: 16, padding: "16px 24px", borderRadius: 16,
            transition: "opacity 0.2s, transform 0.2s",
            boxShadow: "0 8px 24px rgba(37,211,102,0.2)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <MessageCircle style={{ width: 20, height: 20 }} />
          WhatsApp WIMA CAR
        </a>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
        {[
          "98% des demandes traitées sur WhatsApp",
          "Assistance client 7j/7",
          "Sans engagement de réservation"
        ].map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
            <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
              <Check style={{ width: 12, height: 12, color: "#22c55e" }} />
            </div>
            {item}
          </li>
        ))}
      </ul>
      
      <div style={{ paddingTop: 24, borderTop: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", color: "#f59e0b" }}>
          {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 16, height: 16 }} fill="currentColor" />)}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>
          4.8 <span style={{ fontWeight: 500, color: "var(--color-text-secondary)" }}>Google (120 avis)</span>
        </div>
      </div>
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM CTA
// ─────────────────────────────────────────────────────────────────────────────

const BottomCTA = memo(function BottomCTA({ reducedMotion }: { reducedMotion: boolean }) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const breathingVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.03, 0.06, 0.03],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      ref={ctaRef}
      style={{
        marginTop: "clamp(64px, 8vw, 120px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          background: "linear-gradient(145deg, #ffffff, var(--color-surface))",
          border: "1px solid var(--color-border)",
          borderRadius: 40,
          padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 64px)",
          textAlign: "center",
          boxShadow: "0 24px 64px rgba(0,0,0,0.04)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glows */}
        <motion.div 
          variants={reducedMotion ? {} : breathingVariants}
          animate="animate"
          style={{ position: "absolute", top: -100, left: "-10%", width: 500, height: 500, background: "var(--color-primary)", filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none" }} 
        />
        <motion.div 
          variants={reducedMotion ? {} : breathingVariants}
          animate="animate"
          style={{ position: "absolute", bottom: -100, right: "-10%", width: 500, height: 500, background: "#25D366", filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none", animationDelay: "-3s" }} 
        />

        <motion.div
          variants={reducedMotion ? {} : containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ position: "relative", zIndex: 1 }}
        >
          <motion.h3 variants={itemVariants} style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "var(--color-text-primary)", marginBottom: 20, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Votre voiture vous attend.
          </motion.h3>
          
          <motion.p variants={itemVariants} style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "var(--color-text-secondary)", marginBottom: 48, maxWidth: 600, marginInline: "auto", fontWeight: 500 }}>
            Réservez en moins de 2 minutes sur WhatsApp.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
            <motion.a
              whileHover={reducedMotion ? {} : { y: -3, boxShadow: "0 16px 40px rgba(37,211,102,0.3)" }}
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 12, background: "#25D366", color: "white", textDecoration: "none", fontWeight: 800, fontSize: 18, height: 56, padding: "0 40px", borderRadius: 28, boxShadow: "0 8px 24px rgba(37,211,102,0.2)", transition: "background 0.2s",
              }}
            >
              <MessageCircle style={{ width: 22, height: 22 }} />
              WhatsApp
            </motion.a>
            <motion.a
              whileHover={reducedMotion ? {} : { y: -3, boxShadow: "0 16px 40px rgba(0,0,0,0.06)" }}
              href="tel:+212600000000"
              style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "white", color: "var(--color-text-primary)", textDecoration: "none", fontWeight: 700, fontSize: 18, height: 56, padding: "0 40px", borderRadius: 28, border: "2px solid var(--color-border)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "background 0.2s, border-color 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "var(--color-surface)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "white"; }}
            >
              <PhoneCall style={{ width: 22, height: 22 }} />
              Appeler
            </motion.a>
            <motion.a
              whileHover={reducedMotion ? {} : { y: -2, color: "var(--color-primary)" }}
              href="#fleet"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--color-text-secondary)", textDecoration: "none", fontWeight: 700, fontSize: 18, height: 56, padding: "0 24px", transition: "color 0.2s" }}
            >
              <CarFront style={{ width: 22, height: 22 }} />
              Voir la flotte
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "16px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>
              <div style={{ display: "flex", color: "#f59e0b" }}>
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 14, height: 14 }} fill="currentColor" />)}
              </div>
              4.3 Google
            </div>
            
            {[
              "Réponse <5 min",
              "Livraison Rabat & Aéroport",
              "Sans frais cachés"
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)" }}>
                <Check style={{ width: 16, height: 16, color: "#22c55e" }} />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function FAQ() {
  const { t } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const reducedMotion = useReducedMotion() ?? false;

  const FAQS: FAQItem[] = [
    {
      id: "f1",
      q: t("faqQ1"),
      a: <>{t("faqA1")}</>,
      schemaA: t("faqA1"),
    },
    {
      id: "f2",
      q: t("faqQ2"),
      a: <>{t("faqA2")}</>,
      schemaA: t("faqA2"),
    },
    {
      id: "f3",
      q: t("faqQ3"),
      a: <>{t("faqA3")}</>,
      schemaA: t("faqA3"),
    },
    {
      id: "f4",
      q: t("faqQ4"),
      a: <>{t("faqA4")}</>,
      schemaA: t("faqA4"),
    },
  ];

  const [openId, setOpenId] = useState<string>("f1");

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  }, []);

  return (
    <>
      <FAQSchema faqs={FAQS} />
      <style dangerouslySetInnerHTML={{ __html: `
        .faq-layout {
          display: flex;
          align-items: flex-start;
          gap: clamp(32px, 5vw, 64px);
        }
        .faq-left-col {
          flex: 0 0 380px;
          position: sticky;
          top: 120px;
        }
        .faq-right-col {
          flex: 1 1 0%;
          min-width: 0;
        }
        @media (max-width: 1024px) {
          .faq-layout {
            flex-direction: column;
          }
          .faq-left-col {
            position: relative;
            top: 0;
            width: 100%;
            flex: none;
            max-width: 100%;
            margin-bottom: 8px;
          }
          .faq-right-col {
            width: 100%;
            flex: none;
          }
        }
      `}} />
      <section
        ref={sectionRef}
        id="faq"
        aria-labelledby="faq-heading"
        style={{
          width: "100%",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
          background: "var(--color-background)",
        }}
      >
        <Container>
          {/* HEADER */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "clamp(56px, 10vw, 96px)" }}
          >
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                borderRadius: 999, padding: "7px 18px", marginBottom: 24,
                background: "var(--color-surface)", border: "1px solid var(--color-border)",
                fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                color: "var(--color-text-secondary)"
              }}
            >
              <span>❓</span> {t("faqSubtitle")}
            </div>

            <h2
              id="faq-heading"
              style={{
                fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
                lineHeight: 1.1, letterSpacing: "-0.025em",
                color: "var(--color-text-primary)", marginBottom: 0
              }}
            >
              {t("faqTitle")}
            </h2>
          </motion.div>

          {/* TWO COLUMN LAYOUT */}
          <div className="faq-layout">
            {/* LEFT: STICKY CARD */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="faq-left-col"
            >
              <ContactCard reducedMotion={reducedMotion} />
            </motion.div>

            {/* RIGHT: ACCORDION */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="faq-right-col"
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 700,
              }}
            >
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onClick={() => toggle(faq.id)}
                  reducedMotion={reducedMotion}
                />
              ))}
            </motion.div>
          </div>

          <BottomCTA reducedMotion={reducedMotion} />
        </Container>
      </section>
    </>
  );
}
