"use client";

import {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  Car,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Star,
  Phone,
  Shield,
  Headphones,
  Check,
  CheckCheck,
  ArrowRight,
  Bell,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui";
import { useSite } from "@/context/SiteContext";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const WA_GREEN = "#25d366";
const WA_DARK  = "#075e54";
const WA_BG    = "#ece5dd";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ChatMessage {
  id: string;
  side: "client" | "agent";
  text: string;
  time: string;
  isRead?: boolean;
  isConfirmation?: boolean; 
  delay: number;
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────


const CHAT_MESSAGES: ChatMessage[] = [
  { id: "c1", side: "client", text: "Bonjour 👋", time: "14:32", isRead: true, delay: 500 },
  { id: "c2", side: "client", text: "Je souhaite réserver une Renault Clio 5.", time: "14:32", isRead: true, delay: 1200 },
  { id: "a1", side: "agent",  text: "Bonjour M. Karim !\nAvec plaisir.", time: "14:33", delay: 3000 },
  { id: "a2", side: "agent",  text: "Voici votre réservation 👇", time: "14:33", delay: 4200 },
  { id: "a3", side: "agent",  text: "📍 Rabat Centre", time: "14:33", delay: 5000 },
  { id: "a4", side: "agent",  text: "📅 15 → 20 Août", time: "14:33", delay: 5700 },
  { id: "a5", side: "agent",  text: "🚗 Renault Clio 5", time: "14:33", delay: 6400 },
  { id: "a6", side: "agent",  text: "💰 2250 DH", time: "14:34", delay: 7100 },
  { id: "a7", side: "agent",  text: "Livraison à l\'aéroport ?", time: "14:34", delay: 8200 },
  { id: "c3", side: "client", text: "Oui parfait.", time: "14:35", isRead: true, delay: 9500 },
  { id: "a8", side: "agent",  text: "", time: "14:35", isConfirmation: true, delay: 11500 },
];



const STEP_TRIGGER: Record<number, number> = { 1: 0, 2: 2, 3: 8, 4: 10 };

// ─────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────
const TypingIndicator = memo(function TypingIndicator({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      aria-label="Agent en train d\'écrire"
      style={{
        display: "flex", alignItems: "center", gap: 5,
        background: "white",
        borderRadius: "18px 18px 18px 4px",
        padding: "12px 16px",
        width: "fit-content",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginLeft: 36, // Align with avatar spacing
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: "#aaa" }}
          animate={reducedMotion ? {} : { y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────
// CONFIRMATION CARD
// ─────────────────────────────────────────────
const ConfirmationCard = memo(function ConfirmationCard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #06c44c 0%, #04a03e 100%)",
        borderRadius: "20px 20px 20px 4px",
        padding: "16px 18px",
        maxWidth: "100%",
        boxShadow: "0 8px 32px rgba(6,196,76,0.35)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Check style={{ width: 18, height: 18, color: "white" }} />
        </div>
        <p style={{ fontSize: 13, fontWeight: 800, color: "white", letterSpacing: "0.02em" }}>
          Réservation confirmée ✅
        </p>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.95)" }}>
        Merci M. Karim 🙏<br />
        Nous vous attendons le <strong style={{ color: "white" }}>15 août</strong><br />
        à <strong style={{ color: "white" }}>Rabat Centre</strong>.
      </p>
    </div>
  );
});

// ─────────────────────────────────────────────
// MESSAGE BUBBLE
// ─────────────────────────────────────────────
interface BubbleProps {
  message: ChatMessage;
  reducedMotion: boolean;
}

const MessageBubble = memo(function MessageBubble({ message, reducedMotion }: BubbleProps) {
  const isClient = message.side === "client";

  // Light colors for timestamp
  const timeColor = isClient ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.35)";

  return (
    <motion.div
      style={{ display: "flex", justifyContent: isClient ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}
      initial={reducedMotion ? {} : { opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      // Ease Out for smoother inertia feeling instead of bouncy spring
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Agent Avatar */}
      {!isClient && (
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: "white", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 18
        }}>
          <Image src="/brand/Favicon.png" alt="WIMA" width={20} height={20} style={{ objectFit: "contain" }} />
        </div>
      )}

      <div style={{
        maxWidth: "75%", display: "flex", flexDirection: "column",
        gap: 2, alignItems: isClient ? "flex-end" : "flex-start",
      }}>
        {message.isConfirmation ? (
          <ConfirmationCard />
        ) : (
          <div style={isClient ? {
            background: "var(--color-primary)", color: "white",
            borderRadius: "20px 20px 4px 20px",
            padding: "10px 14px", fontSize: 14, lineHeight: 1.5,
            boxShadow: "0 4px 14px rgba(217,4,41,0.18)",
          } : {
            background: "white", color: "#111",
            borderRadius: "20px 20px 20px 4px",
            padding: "10px 14px", fontSize: 14, lineHeight: 1.5,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            {message.text}
          </div>
        )}

        {/* Timestamp & Read Receipts */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: timeColor, padding: "0 4px" }}>
          <time dateTime={message.time}>{message.time}</time>
          {isClient && (message.isRead
            ? <CheckCheck aria-label="Lu"     style={{ width: 14, height: 14, color: "#53bdeb" }} />
            : <Check      aria-label="Envoyé" style={{ width: 14, height: 14, color: timeColor }} />
          )}
        </div>
      </div>

      {/* Client Avatar */}
      {isClient && (
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: "#e4e4e7", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#71717a", fontSize: 12, fontWeight: 700, marginBottom: 18,
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
        }}>
          K
        </div>
      )}
    </motion.div>
  );
});

// ─────────────────────────────────────────────
// NOTIFICATION BANNER
// ─────────────────────────────────────────────
interface NotifProps { show: boolean; reducedMotion: boolean; }
const NotificationBanner = memo(function NotificationBanner({ show, reducedMotion }: NotifProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { y: -80, opacity: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            position: "absolute",
            top: 60, left: 10, right: 10,
            zIndex: 70,
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg, var(--color-primary), #ff4444)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Bell style={{ width: 18, height: 18, color: "white" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#111", lineHeight: 1.3 }}>
              WIMA CAR
            </p>
            <p style={{ fontSize: 12, color: "#555", lineHeight: 1.3, marginTop: 2 }}>
              🔔 Nouvelle réservation confirmée
            </p>
          </div>
          <p style={{ fontSize: 11, color: "#aaa", flexShrink: 0 }}>maint.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ─────────────────────────────────────────────
// PHONE MOCKUP
// ─────────────────────────────────────────────
interface PhoneMockProps {
  isInView: boolean;
  onStepChange: (step: number) => void;
}

const PhoneMock = memo(function PhoneMock({ isInView, onStepChange }: PhoneMockProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [agentStatus, setAgentStatus] = useState<"online" | "typing">("online");
  const [vibrate, setVibrate] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [successPulse, setSuccessPulse] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const timerIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Smooth auto-scroll behavior
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      // Use smooth scroll behavior to simulate "inertia"
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [visibleMessages, showTyping]);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    if (reducedMotion) {
      setVisibleMessages(CHAT_MESSAGES);
      onStepChange(4);
      return;
    }

    CHAT_MESSAGES.forEach((msg, idx) => {
      const isAgent = msg.side === "agent";

      // Show typing 800ms before ALL agent messages (including confirmation)
      if (isAgent) {
        const t1 = setTimeout(() => {
          setShowTyping(true);
          setAgentStatus("typing");
        }, msg.delay - 800);
        timerIds.current.push(t1);
      }

      const t2 = setTimeout(() => {
        if (isAgent) {
          setShowTyping(false);
          setAgentStatus("online");
          setVibrate(v => v + 1);
        }
        setVisibleMessages(prev => [...prev, msg]);

        if (msg.isConfirmation) {
          setSuccessPulse(true);
          setShowNotif(true);
          setTimeout(() => setShowNotif(false), 2800);
          setTimeout(() => setSuccessPulse(false), 1500);
        }

        const entry = Object.entries(STEP_TRIGGER).findLast(([, mi]) => mi <= idx);
        if (entry) onStepChange(Number(entry[0]));
      }, msg.delay);
      timerIds.current.push(t2);
    });

    return () => timerIds.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <motion.div
      role="img"
      aria-label="Simulation WhatsApp WIMA CAR"
      animate={reducedMotion ? {} : { y: [-6, 6, -6] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* ── Phone shell ── */}
      <motion.div
        animate={reducedMotion ? {} : {
          x: vibrate > 0 ? [-3, 3, -3, 3, -2, 2, 0] : 0,
          boxShadow: successPulse
            ? [
                "0 60px 120px -20px rgba(0,0,0,0.55), 0 0 0 0 rgba(37,211,102,0.6)",
                "0 60px 120px -20px rgba(0,0,0,0.55), 0 0 0 25px rgba(37,211,102,0)"
              ]
            : "0 60px 120px -20px rgba(0,0,0,0.55), 0 0 0 0 rgba(37,211,102,0)"
        }}
        transition={{ duration: 0.35, boxShadow: { duration: 1, ease: "easeOut" } }}
        style={{
          width: 300,
          height: 640,
          borderRadius: 48,
          background: "#111",
          border: "7px solid #1a1a1a",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          // Performance optimization
          willChange: "transform, box-shadow",
        }}
      >
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 55, pointerEvents: "none",
          background: "linear-gradient(120deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.02) 38%, transparent 60%)",
          borderRadius: "inherit",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, right: 0, width: "40%", height: "30%",
          zIndex: 55, pointerEvents: "none",
          background: "radial-gradient(circle at bottom right, rgba(255,255,255,0.06), transparent 70%)",
          borderRadius: "inherit",
        }} />

        {/* ── Dynamic Island (Black) ── */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
          width: 100, height: 30, background: "#000",
          borderRadius: 20, zIndex: 65,
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px",
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#111" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0a0a0a", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.15)" }} />
        </div>

        {/* ── Notification banner ── */}
        <NotificationBanner show={showNotif} reducedMotion={reducedMotion} />

        {/* ── WhatsApp header ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
          background: WA_DARK,
          paddingTop: 58, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}>
          {/* Avatar with WIMA logo */}
          <div aria-hidden="true" style={{
            width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
            background: "white", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)", position: "relative", overflow: "visible",
          }}>
            <Image src="/brand/Favicon.png" alt="WIMA" width={26} height={26} style={{ objectFit: "contain" }} />
            <span style={{
              position: "absolute", bottom: -2, right: -2,
              width: 12, height: 12, borderRadius: "50%",
              border: "2px solid " + WA_DARK,
              background: agentStatus === "typing" ? "#f59e0b" : "#22c55e",
              transition: "background 0.3s",
              zIndex: 10
            }} />
          </div>

          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "white" }}>WIMA CAR</span>
              <Shield aria-label="Vérifiée" style={{ width: 13, height: 13, color: "#53bdeb" }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={agentStatus}
                initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.18 }}
                style={{ fontSize: 12, color: agentStatus === "typing" ? "#a7f3d0" : "rgba(255,255,255,0.7)" }}
              >
                {agentStatus === "typing" ? "en train d\'écrire..." : "En ligne"}
              </motion.span>
            </AnimatePresence>
          </div>
          <Phone aria-hidden="true" style={{ width: 20, height: 20, color: "rgba(255,255,255,0.75)" }} />
        </div>

        {/* ── Chat body ── */}
        <div
          ref={scrollRef}
          aria-live="polite"
          style={{
            position: "absolute", inset: 0,
            paddingTop: 134, paddingBottom: 68,
            paddingLeft: 12, paddingRight: 12,
            background: WA_BG,
            overflowY: "auto",
            overscrollBehavior: "contain",
            display: "flex", flexDirection: "column", gap: 8,
            scrollbarWidth: "none",
            scrollBehavior: "smooth", // Native inertia
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.035,
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 4, position: "relative", zIndex: 1 }}>
            <span style={{
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)",
              fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,0.5)",
              borderRadius: 999, padding: "5px 14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}>
              {"Aujourd\'hui"}
            </span>
          </div>

          <AnimatePresence>
            {visibleMessages.map(msg => (
              <MessageBubble key={msg.id} message={msg} reducedMotion={reducedMotion} />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {showTyping && (
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }} 
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }} 
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                style={{ display: "flex", justifyContent: "flex-start", marginBottom: 18 }}
              >
                <TypingIndicator reducedMotion={reducedMotion} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Input bar ── */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 50,
          background: "#f0f0f0",
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px",
          boxShadow: "0 -1px 8px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            flex: 1, background: "white", borderRadius: 999, height: 40,
            paddingLeft: 16, display: "flex", alignItems: "center",
            fontSize: 13, color: "rgba(0,0,0,0.3)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>Message</div>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: WA_DARK,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 4px 12px rgba(7,94,84,0.3)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Glow */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: "-10%", zIndex: -1, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(217,4,41,0.07) 0%, transparent 75%)",
        filter: "blur(32px)",
      }} />
    </motion.div>
  );
});

// ─────────────────────────────────────────────
// TIMELINE CARD
// ─────────────────────────────────────────────
interface TimelineCardProps {
  step: Step;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
  isFinal: boolean;
  isFullyDone: boolean;
  reducedMotion: boolean;
  onClick: (id: number) => void;
}

const TimelineCard = memo(function TimelineCard({
  step, isActive, isCompleted, isLast, isFullyDone, reducedMotion, onClick,
}: TimelineCardProps) {
  const Icon = step.icon;

  const circleColor = isFullyDone ? "var(--color-success)" : isActive ? "var(--color-primary)" : isCompleted ? "var(--color-success)" : "var(--color-background)";
  const circleBorder = isFullyDone ? "var(--color-success)" : isActive ? "var(--color-primary)" : isCompleted ? "var(--color-success)" : "var(--color-border)";
  const circleGlow = isFullyDone ? "0 0 0 8px rgba(34,197,94,0.15), 0 12px 24px rgba(34,197,94,0.2)" : isActive ? "0 0 0 8px rgba(217,4,41,0.12), 0 12px 24px rgba(217,4,41,0.2)" : isCompleted ? "0 0 0 6px rgba(34,197,94,0.12)" : "0 4px 12px rgba(0,0,0,0.04)";
  const cardBg = isFullyDone ? "var(--color-success)" : isActive ? "var(--color-primary)" : "var(--color-background)";
  const lineColor = isCompleted || isFullyDone ? "var(--color-success)" : isActive ? "var(--color-primary)" : "var(--color-border)";

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(step.id); }
  }, [onClick, step.id]);

  return (
    <div role="listitem" style={{ position: "relative", display: "flex", gap: 20, alignItems: "flex-start", zIndex: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 56 }}>
        <motion.button
          type="button" onClick={() => onClick(step.id)} onKeyDown={handleKey}
          aria-label={`Étape ${step.number}: ${step.title}`} aria-pressed={isActive}
          whileHover={reducedMotion ? {} : { scale: 1.08 }} whileTap={reducedMotion ? {} : { scale: 0.92 }}
          animate={reducedMotion ? {} : (isActive && !isFullyDone) ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 0.6, repeat: (isActive && !isFullyDone) ? Infinity : 0, ease: "easeInOut" }}
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: circleColor, border: `2px solid ${circleBorder}`,
            color: (isActive || isCompleted || isFullyDone) ? "white" : "var(--color-text-secondary)",
            fontSize: 15, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: circleGlow, transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            cursor: "pointer", outline: "none",
          }}
        >
          {(isCompleted && !isActive) || isFullyDone ? <Check style={{ width: 22, height: 22 }} /> : step.number}
        </motion.button>

        {!isLast && (
          <div aria-hidden="true" style={{
            width: 3, height: 78, background: "var(--color-border)", borderRadius: 999,
            position: "relative", marginTop: 5, marginBottom: 5, overflow: "hidden",
          }}>
            <motion.div
              style={{ position: "absolute", top: 0, left: 0, right: 0, borderRadius: 999, background: lineColor }}
              initial={{ height: "0%" }}
              animate={{ height: isCompleted || isFullyDone ? "100%" : isActive ? "50%" : "0%" }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>

      <motion.div
        onClick={() => onClick(step.id)} onKeyDown={handleKey} tabIndex={0} role="button"
        animate={reducedMotion ? {} : (isActive || isFullyDone) ? { scale: 1.02, y: -3 } : { scale: 1, y: 0 }}
        whileHover={reducedMotion ? {} : { y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12)", borderColor: "var(--color-primary)" }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        style={{
          flex: 1, marginBottom: 22, padding: "22px",
          cursor: "pointer", borderRadius: 24, background: cardBg,
          border: `1.5px solid ${(isActive || isFullyDone) ? cardBg : "var(--color-border)"}`,
          boxShadow: (isActive && !isFullyDone) ? "0 20px 40px rgba(217,4,41,0.22)" : isFullyDone ? "0 20px 40px rgba(34,197,94,0.22)" : "0 6px 20px rgba(0,0,0,0.04)",
          transition: "background 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          outline: "none", position: "relative", overflow: "hidden",
        }}
      >
        {isFullyDone && (
          <motion.div
            style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.3)", borderRadius: "inherit" }}
            initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}
          />
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, position: "relative", zIndex: 1 }}>
          <Icon aria-hidden="true" style={{ width: 20, height: 20, flexShrink: 0, color: (isActive || isFullyDone) ? "rgba(255,255,255,0.9)" : "var(--color-primary)", transition: "color 0.35s" }} />
          <h3 style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.01em", color: (isActive || isFullyDone) ? "white" : "var(--color-text-primary)", transition: "color 0.35s" }}>{step.title}</h3>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.65, position: "relative", zIndex: 1, color: (isActive || isFullyDone) ? "rgba(255,255,255,0.75)" : "var(--color-text-secondary)", transition: "color 0.35s" }}>{step.description}</p>
      </motion.div>
    </div>
  );
});

// ─────────────────────────────────────────────
// TRUST CARD
// ─────────────────────────────────────────────
interface TrustCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  sub: string;
  delay: number;
  idx: number;
  reducedMotion: boolean;
  isInView: boolean;
}

const TrustCard = memo(function TrustCard({ icon: Icon, label, sub, delay, idx, reducedMotion, isInView }: TrustCardProps) {
  return (
    <motion.article
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      whileHover={reducedMotion ? {} : { y: -6, boxShadow: "0 18px 36px -6px rgba(0,0,0,0.12)", borderColor: "var(--color-primary)" }}
      aria-label={label}
      style={{
        flex: "1 1 120px", minWidth: 120, background: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(0,0,0,0.06)", backdropFilter: "blur(20px)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)", borderRadius: 20, padding: "18px 14px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      <motion.div animate={reducedMotion ? {} : { y: [0, -4, 0] }} transition={{ duration: 4 + idx * 1.2, repeat: Infinity, ease: "easeInOut" }}>
        <Icon aria-hidden="true" style={{ width: 22, height: 22, color: "var(--color-primary)" }} />
      </motion.div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 800, color: "var(--color-text-primary)", lineHeight: 1.2 }}>{label}</p>
        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)", marginTop: 3 }}>{sub}</p>
      </div>
    </motion.article>
  );
});

// ─────────────────────────────────────────────
// CTA BUTTON
// ─────────────────────────────────────────────
interface CTAProps { isInView: boolean; reducedMotion: boolean; }
const CTAButton = memo(function CTAButton({ isInView, reducedMotion }: CTAProps) {
  const { t } = useSite();
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.9, duration: 0.5 }} style={{ marginTop: 28 }}
    >
      <motion.a
        href="https://wa.me/212600000000?text=Bonjour%20WIMA%20CAR%2C%20je%20souhaite%20r%C3%A9server." target="_blank" rel="noopener noreferrer"
        aria-label="Réserver maintenant via WhatsApp"
        whileHover={reducedMotion ? {} : { scale: 1.03, boxShadow: "0 20px 48px rgba(37,211,102,0.5)", y: -2 }}
        whileTap={reducedMotion ? {} : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12, position: "relative", overflow: "hidden",
          borderRadius: 20, background: WA_GREEN, padding: "14px 26px", fontSize: 15, fontWeight: 800, color: "white", textDecoration: "none",
          boxShadow: "0 12px 32px rgba(37,211,102,0.35)",
        }}
      >
        {!reducedMotion && (
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "35%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)", transform: "skewX(-20deg)", pointerEvents: "none" }}
            animate={{ left: ["-50%", "160%"] }} transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.8 }}
          />
        )}
        <svg width="22" height="22" viewBox="0 0 32 32" fill="white" aria-hidden="true" style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
          <path d="M16.004 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.34.625 4.607 1.802 6.598L2.667 29.333l6.96-1.776A13.271 13.271 0 0 0 16.004 29.333C23.371 29.333 29.333 23.363 29.333 16S23.371 2.667 16.004 2.667zm0 2.4c6.04 0 10.933 4.893 10.933 10.933 0 6.04-4.893 10.933-10.933 10.933a10.887 10.887 0 0 1-5.696-1.604l-.408-.243-4.131 1.055 1.085-4.024-.27-.427A10.876 10.876 0 0 1 5.07 16c0-6.04 4.893-10.933 10.934-10.933zm-3.054 5.6c-.222 0-.58.083-.884.41-.303.328-1.157 1.13-1.157 2.758s1.185 3.2 1.35 3.42c.166.22 2.32 3.56 5.622 4.994 2.3 1.017 3.163.817 3.73.766.567-.05 1.83-.748 2.09-1.473.26-.726.26-1.348.182-1.476-.078-.13-.287-.208-.6-.364-.314-.156-1.858-.917-2.147-1.022-.29-.104-.5-.156-.71.156-.21.313-.81 1.022-.992 1.231-.181.21-.362.234-.675.078-.312-.156-1.32-.487-2.515-1.553-.93-.83-1.558-1.854-1.74-2.167-.182-.313-.02-.483.137-.638.14-.14.313-.363.47-.545.156-.182.208-.313.313-.522.104-.21.052-.393-.026-.55-.078-.155-.704-1.704-.967-2.33-.25-.6-.506-.52-.696-.53-.18-.008-.39-.01-.6-.01z" />
        </svg>
        <span style={{ position: "relative", zIndex: 1 }}>{t("hiwCTA")}</span>
        <ArrowRight style={{ width: 18, height: 18, position: "relative", zIndex: 1 }} />
      </motion.a>
    </motion.div>
  );
});

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
export function HowItWorks() {
  const { t } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.30 });
  const reducedMotion = useReducedMotion() ?? false;
  const [activeStep, setActiveStep] = useState(1);
  
  const STEPS: Step[] = useMemo(() => [
    {
      id: 1,
      number: "01",
      title: t("hiwStep1Title"),
      description: t("hiwStep1Desc"),
      icon: Car,
    },
    {
      id: 2,
      number: "02",
      title: t("hiwStep2Title"),
      description: t("hiwStep2Desc"),
      icon: Calendar,
    },
    {
      id: 3,
      number: "03",
      title: t("hiwStep3Title"),
      description: t("hiwStep3Desc"),
      icon: MessageCircle,
    },
    {
      id: 4,
      number: "04",
      title: t("hiwStep4Title"),
      description: t("hiwStep4Desc"),
      icon: CheckCircle2,
    },
  ], [t]);

  const TRUST_CARDS = useMemo(() => [
    { id: "res",     icon: MessageCircle, label: t("hiwTrust1"),   sub: t("hiwTrust1Sub")  },
    { id: "support", icon: CreditCard,  label: t("hiwTrust2"),   sub: t("hiwTrust2Sub") },
  ], [t]);

  const completedSteps = useMemo(() => STEPS.filter(s => s.id < activeStep).map(s => s.id), [activeStep, STEPS]);
  const step4Done = activeStep === 4;
  const handleStepClick = useCallback((id: number) => setActiveStep(id), []);

  const headerVariants = useMemo(() => ({
    hidden:  { opacity: 0, y: 28 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.14, duration: 0.65, ease: "easeOut" as const } }),
  }), []);

  return (
    <section ref={sectionRef} id="how-it-works" aria-labelledby="hiw-heading" style={{ width: "100%", paddingTop: "7rem", paddingBottom: "7rem", background: "white", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <motion.div animate={reducedMotion ? {} : { opacity: [0.07, 0.12, 0.07], scale: [1, 1.06, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "30%", right: "-8%", width: 580, height: 580, borderRadius: "50%", background: "var(--color-primary)", filter: "blur(130px)" }} />
        <motion.div animate={reducedMotion ? {} : { opacity: [0.04, 0.07, 0.04] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} style={{ position: "absolute", top: "15%", left: "-8%", width: 500, height: 500, borderRadius: "50%", background: "#6366f1", filter: "blur(120px)" }} />
      </div>

      <Container style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", marginBottom: "5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <motion.div custom={0} variants={headerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, padding: "7px 18px", marginBottom: 22, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", background: "white", border: "1px solid var(--color-border)", color: "var(--color-primary)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>{t("hiwSubtitle")}</motion.div>
          <motion.h2 id="hiw-heading" custom={1} variants={headerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--color-text-primary)", marginBottom: 20 }}>{t("hiwTitle1")} <span style={{ color: "var(--color-primary)" }}>{t("hiwTitle2")}</span></motion.h2>
          <motion.p custom={2} variants={headerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ fontSize: 18, lineHeight: 1.7, color: "var(--color-text-secondary)", maxWidth: 540 }}>{t("hiwDesc")}</motion.p>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(32px, 5vw, 64px)", flexWrap: "wrap" }}>
          <motion.div initial={reducedMotion ? {} : { opacity: 0, x: -32 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }} role="list" aria-label="Étapes de réservation" style={{ flex: "55 1 340px", minWidth: 280, position: "relative" }}>
            <motion.div aria-hidden="true" animate={reducedMotion ? {} : { top: `${(activeStep - 1) * 27}%` }} transition={{ type: "spring", stiffness: 60, damping: 20 }} style={{ position: "absolute", right: -30, width: 90, height: 90, borderRadius: "50%", background: "var(--color-primary)", filter: "blur(50px)", opacity: 0.15, pointerEvents: "none", zIndex: 0 }} />
            {STEPS.map((step, idx) => <TimelineCard key={step.id} step={step} isActive={activeStep === step.id} isCompleted={completedSteps.includes(step.id)} isLast={idx === STEPS.length - 1} isFinal={idx === STEPS.length - 1} isFullyDone={idx === STEPS.length - 1 && step4Done} reducedMotion={reducedMotion} onClick={handleStepClick} />)}
            <CTAButton isInView={isInView} reducedMotion={reducedMotion} />
          </motion.div>

          <motion.div initial={reducedMotion ? {} : { opacity: 0, x: 32 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }} style={{ flex: "45 1 300px", minWidth: 280, display: "flex", flexDirection: "column", alignItems: "center", gap: 32, position: "sticky", top: 100, alignSelf: "flex-start" }}>
            <PhoneMock isInView={isInView} onStepChange={setActiveStep} />
            <div aria-label="Nos engagements" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", width: "100%", maxWidth: 380 }}>
              {TRUST_CARDS.map((card, idx) => <TrustCard key={card.id} idx={idx} icon={card.icon} label={card.label} sub={card.sub} delay={0.65 + idx * 0.12} reducedMotion={reducedMotion} isInView={isInView} />)}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
