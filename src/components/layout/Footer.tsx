"use client";

import { memo, useRef } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import Image from "next/image";
import {
  MessageCircle,
  PhoneCall,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui";
import { useSite } from "@/context/SiteContext";
import type { TranslationKey } from "@/data/translations";
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from "@/constants/GOOGLE_REVIEWS";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

type TFn = (key: TranslationKey) => string;

/** A single footer nav/service link with smooth slide animation */
const FooterLink = memo(function FooterLink({
  href,
  label,
  reducedMotion,
}: {
  href: string;
  label: string;
  reducedMotion: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={reducedMotion ? {} : { x: 4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 14,
        fontWeight: 500,
        color: "var(--color-text-secondary)",
        textDecoration: "none",
        lineHeight: 1.5,
        transition: "color 0.2s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
      onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
    >
      {label}
    </motion.a>
  );
});

/** Brand column */
const BrandCol = memo(function BrandCol({
  reducedMotion,
  t,
}: {
  reducedMotion: boolean;
  t: TFn;
}) {
  return (
    <motion.div variants={colVariants} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Logo */}
      <motion.a
        href="/"
        whileHover={reducedMotion ? {} : { scale: 1.04 }}
        transition={{ duration: 0.25 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          textDecoration: "none",
          width: "fit-content",
        }}
      >
        <Image
          alt="WIMA CAR"
          src="/brand/logo-primary.png"
          width={1280}
          height={240}
          priority
          style={{ width: "auto", height: "40px" }}
        />
      </motion.a>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "var(--color-text-secondary)",
          maxWidth: 240,
          margin: 0,
        }}
      >
        {t("footerDesc")}
      </p>

      {/* Google Rating Badge */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
        whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          padding: "10px 14px",
          width: "fit-content",
        }}
      >
        <div style={{ display: "flex", gap: 2, color: "#f59e0b" }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} style={{ width: 13, height: 13 }} fill="currentColor" />
          ))}
        </div>
        <div>
          <span style={{ fontSize: 14, fontWeight: 800, color: "var(--color-text-primary)" }}>{GOOGLE_REVIEW_RATING}</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>
            {" "}/ 5 Google
          </span>
        </div>
        <div
          style={{
            width: 1,
            height: 16,
            background: "var(--color-border)",
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)" }}>
          {GOOGLE_REVIEW_COUNT} avis
        </span>
      </motion.div>
    </motion.div>
  );
});

/** Navigation column */
const NavCol = memo(function NavCol({
  reducedMotion,
  t,
}: {
  reducedMotion: boolean;
  t: TFn;
}) {
  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: t("ourFleet"), href: "#fleet" },
    { label: t("faq"), href: "#faq" },
    { label: t("reviews"), href: "#google-reviews" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <motion.div variants={colVariants} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3
        style={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        {t("quickLinks")}
      </h3>
      <nav aria-label="Footer navigation">
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <FooterLink href={link.href} label={link.label} reducedMotion={reducedMotion} />
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
});

/** Services column */
const ServicesCol = memo(function ServicesCol({ reducedMotion }: { reducedMotion: boolean }) {
  const serviceLinks = [
    { label: "Location voiture Rabat", href: "#fleet" },
    { label: "Location voiture Aéroport Rabat", href: "#fleet" },
    { label: "SUV à Rabat", href: "#fleet" },
    { label: "Location voiture pas chère Rabat", href: "#fleet" },
    { label: "Location longue durée Rabat", href: "#fleet" },
  ];

  return (
    <motion.div variants={colVariants} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3
        style={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        Nos Services
      </h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {serviceLinks.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href} label={link.label} reducedMotion={reducedMotion} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

/** Contact column */
const ContactCol = memo(function ContactCol({ reducedMotion }: { reducedMotion: boolean }) {
  const waBreathing: Variants = {
    animate: {
      boxShadow: [
        "0 4px 16px rgba(37,211,102,0.15)",
        "0 8px 28px rgba(37,211,102,0.35)",
        "0 4px 16px rgba(37,211,102,0.15)",
      ],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <motion.div variants={colVariants} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3
        style={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        Contact
      </h3>

      <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Phone & Hours */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <motion.a
            href="tel:+212661503446"
            whileHover={reducedMotion ? {} : { x: 4 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 15,
              fontWeight: 700,
              color: "var(--color-text-primary)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            <PhoneCall style={{ width: 16, height: 16, color: "var(--color-primary)", flexShrink: 0 }} />
            06 61 50 34 46
          </motion.a>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", paddingLeft: 26 }}>
            Ouvert 7j/7 &bull; 08:00 — 22:00
          </div>
        </div>

        {/* Email */}
        <motion.a
          href="mailto:wimacar@gmail.com"
          whileHover={reducedMotion ? {} : { x: 4 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
        >
          <Mail style={{ width: 16, height: 16, color: "var(--color-primary)", flexShrink: 0 }} />
          wimacar@gmail.com
        </motion.a>

        {/* Address */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontSize: 14,
            fontWeight: 500,
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          <MapPin style={{ width: 16, height: 16, color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }} />
          <span>
            102-103 Avenue Abdelkrim Al Khattabi<br />
            L&apos;Océan, 10040 Rabat, Maroc
          </span>
        </div>

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/212661503446"
          target="_blank"
          rel="noopener noreferrer"
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          variants={reducedMotion ? {} : waBreathing}
          animate="animate"
          whileHover={reducedMotion ? {} : { scale: 1.02 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#25D366",
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 14,
            padding: "11px 16px",
            borderRadius: 12,
            width: "fit-content",
            marginTop: 8,
            transition: "opacity 0.2s",
          }}
        >
          <MessageCircle style={{ width: 16, height: 16 }} />
          WhatsApp WIMA CAR
        </motion.a>

      </address>
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM BAR
// ─────────────────────────────────────────────────────────────────────────────

const BottomBar = memo(function BottomBar({
  reducedMotion,
  t,
}: {
  reducedMotion: boolean;
  t: TFn;
}) {
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0 }}
      whileInView={reducedMotion ? {} : { opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      viewport={{ once: true }}
      style={{
        marginTop: "clamp(48px, 6vw, 72px)",
        paddingTop: 24,
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>
          © 2026 WIMA CAR — {t("rights")}
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>
          Location voiture Rabat • Aéroport Rabat-Salé • Maroc
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <motion.a 
          whileHover={{ y: -2, color: "var(--color-primary)" }}
          href="https://maps.google.com/?q=Rabat+Maroc" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Maps"
          style={{ color: "var(--color-text-secondary)", transition: "color 0.2s" }}
        >
          <MapPin size={20} />
        </motion.a>
        <motion.a 
          whileHover={{ y: -2, color: "#25D366" }}
          href="https://wa.me/212661503446"
          target="_blank"
          rel="noopener noreferrer" 
          aria-label="WhatsApp"
          style={{ color: "var(--color-text-secondary)", transition: "color 0.2s" }}
        >
          <MessageCircle size={20} />
        </motion.a>
      </div>
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function Footer() {
  const { t } = useSite();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 1.3fr;
          gap: clamp(32px, 5vw, 64px);
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      {/* Divider above footer */}
      <div
        aria-hidden="true"
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)",
          opacity: 0.18,
        }}
      />

      <footer
        ref={footerRef}
        id="contact"
        aria-label="Pied de page WIMA CAR"
        style={{
          width: "100%",
          paddingTop: "clamp(56px, 8vw, 96px)",
          paddingBottom: "clamp(32px, 4vw, 56px)",
          background: "var(--color-background)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Huge wordmark background */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={isInView && !reducedMotion ? { opacity: 0.04 } : {}}
          transition={{ duration: 1.5, delay: 0.1, ease: "easeOut" }}
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, 50%)",
            fontSize: "clamp(80px, 18vw, 200px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "var(--color-text-primary)",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
            opacity: reducedMotion ? 0.04 : 0,
          }}
        >
          WIMA CAR
        </motion.div>

        {/* Soft glow — red left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "30%",
            left: "-8%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "var(--color-primary)",
            opacity: 0.05,
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />
        {/* Soft glow — green right */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-8%",
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: "#25D366",
            opacity: 0.05,
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />

        <Container>
          <motion.div
            className="footer-grid"
            variants={reducedMotion ? {} : containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ position: "relative", zIndex: 1 }}
          >
            <BrandCol reducedMotion={reducedMotion} t={t} />
            <NavCol reducedMotion={reducedMotion} t={t} />
            <ServicesCol reducedMotion={reducedMotion} />
            <ContactCol reducedMotion={reducedMotion} />
          </motion.div>

          <BottomBar reducedMotion={reducedMotion} t={t} />
        </Container>
      </footer>
    </>
  );
}
