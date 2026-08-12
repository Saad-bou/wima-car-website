// ─────────────────────────────────────────────
// WIMA CAR – Centralized Vehicle Data & Helpers
// ─────────────────────────────────────────────

// ─── WhatsApp ────────────────────────────────
export const WHATSAPP_NUMBER = "212661503446";
export const WHATSAPP_LINK_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

// ─── Types ───────────────────────────────────
export type VehicleCategory = "Economy" | "SUV" | "Luxe";

export type FuelType = "Essence" | "Diesel" | "Hybride";

export type Transmission = "Automatic" | "Manual";

export interface PricingTier {
  label: string;
  range: string; // e.g. "3–7 jours"
  price: number;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  fuel: FuelType;
  transmission: Transmission;
  seats: number;
  priceOnRequest?: boolean;
  startingPrice?: number;
  pricingTiers: PricingTier[];
  image: string;
  featured?: boolean;
}

// ─── Duration options for the Hero widget ────
export type DurationKey = "short" | "medium" | "long";

export interface DurationOption {
  key: DurationKey;
  label: string;
  range: string;
  tierIndex: number; // index into pricingTiers
}

export const DURATION_OPTIONS: DurationOption[] = [
  { key: "short", label: "Court terme", range: "3–7 jours", tierIndex: 0 },
  { key: "medium", label: "Moyen terme", range: "8–14 jours", tierIndex: 1 },
  { key: "long", label: "Long terme", range: "+15 jours", tierIndex: 2 },
];

// ─── All vehicles ────────────────────────────
export const VEHICLES: Vehicle[] = [
  {
    "id": "hyundai-tucson",
    "slug": "hyundai-tucson",
    "name": "Hyundai Tucson",
    "category": "SUV",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 800
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 700
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 600
      }
    ],
    "image": "/images/fleet/hyundai-tucson.webp"
  },
  {
    "id": "logan-diesel",
    "slug": "dacia-logan-diesel",
    "name": "Dacia Logan Diesel",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Manual",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 400
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 350
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 300
      }
    ],
    "image": "/images/fleet/dacia-logan-diesel.webp"
  },
  {
    "id": "citroen-c3",
    "slug": "citroen-c3",
    "name": "Citroën C3",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Manual",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 400
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 350
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 300
      }
    ],
    "image": "/images/fleet/citroen-c3.webp"
  },
  {
    "id": "cupra-formentor",
    "slug": "cupra-formentor",
    "name": "Cupra Formentor",
    "category": "SUV",
    "fuel": "Essence",
    "transmission": "Automatic",
    "seats": 5,
    "priceOnRequest": true,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 0
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 0
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 0
      }
    ],
    "image": "/images/fleet/cupra-formentor.webp",
    "featured": true
  },
  {
    "id": "sandero-diesel",
    "slug": "dacia-sandero-diesel",
    "name": "Dacia Sandero Diesel",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Manual",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 400
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 350
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 300
      }
    ],
    "image": "/images/fleet/dacia-sandero-diesel.webp"
  },
  {
    "id": "opel-corsa",
    "slug": "opel-corsa",
    "name": "Opel Corsa",
    "category": "Economy",
    "fuel": "Essence",
    "transmission": "Manual",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 400
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 350
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 300
      }
    ],
    "image": "/images/fleet/opel-corsa.webp"
  },
  {
    "id": "dacia-duster",
    "slug": "dacia-duster",
    "name": "Dacia Duster",
    "category": "SUV",
    "fuel": "Diesel",
    "transmission": "Manual",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 500
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 450
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 400
      }
    ],
    "image": "/images/fleet/dacia-duster.webp"
  },
  {
    "id": "range-rover-evoque",
    "slug": "range-rover-evoque",
    "name": "Range Rover Evoque",
    "category": "Luxe",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 1400
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 1300
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 1200
      }
    ],
    "image": "/images/fleet/range-rover-evoque.webp",
    "featured": true
  },
  {
    "id": "logan-auto",
    "slug": "dacia-logan-auto",
    "name": "Dacia Logan Auto",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 400
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 350
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 300
      }
    ],
    "image": "/images/fleet/dacia-logan-auto.webp"
  },
  {
    "id": "range-rover-sport",
    "slug": "range-rover-sport",
    "name": "Range Rover Sport",
    "category": "Luxe",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 3600
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 3400
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 3200
      }
    ],
    "image": "/images/fleet/range-rover-sport.webp",
    "featured": true
  },
  {
    "id": "sandero-essence",
    "slug": "dacia-sandero-essence",
    "name": "Dacia Sandero Essence",
    "category": "Economy",
    "fuel": "Essence",
    "transmission": "Manual",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 350
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 300
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 250
      }
    ],
    "image": "/images/fleet/dacia-sandero-essence.webp"
  },
  {
    "id": "renault-clio5",
    "slug": "renault-clio-5",
    "name": "Renault Clio 5",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "pricingTiers": [
      {
        "label": "Court terme",
        "range": "3–7 jours",
        "price": 450
      },
      {
        "label": "Moyen terme",
        "range": "8–14 jours",
        "price": 400
      },
      {
        "label": "Long terme",
        "range": "+15 jours",
        "price": 350
      }
    ],
    "image": "/images/fleet/renault-clio-5.webp"
  },
  {
    "id": "nissan-micra",
    "slug": "nissan-micra",
    "name": "Nissan Micra",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Manual",
    "seats": 5,
    "startingPrice": 350,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 450 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 400 },
      { "label": "Long terme", "range": "+15 jours", "price": 350 }
    ],
    "image": "/images/fleet/nissan-micra.webp"
  },
  {
    "id": "geely-gx3-pro-manual",
    "slug": "geely-gx3-pro-manual",
    "name": "Geely GX3 Pro Manuelle",
    "category": "SUV",
    "fuel": "Essence",
    "transmission": "Manual",
    "seats": 5,
    "startingPrice": 320,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 400 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 350 },
      { "label": "Long terme", "range": "+15 jours", "price": 320 }
    ],
    "image": "/images/fleet/geely-gx3-pro-manual.webp"
  },
  {
    "id": "renault-clio-5-manual",
    "slug": "renault-clio-5-manual",
    "name": "Renault Clio 5 Manuelle",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Manual",
    "seats": 5,
    "startingPrice": 320,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 450 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 400 },
      { "label": "Long terme", "range": "+15 jours", "price": 320 }
    ],
    "image": "/images/fleet/renault-clio-5-manual.webp"
  },
  {
    "id": "geely-gx3-pro-auto",
    "slug": "geely-gx3-pro-auto",
    "name": "Geely GX3 Pro Automatique",
    "category": "SUV",
    "fuel": "Essence",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 420,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 500 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 460 },
      { "label": "Long terme", "range": "+15 jours", "price": 420 }
    ],
    "image": "/images/fleet/geely-gx3-pro-auto.webp"
  },
  {
    "id": "renault-express",
    "slug": "renault-express",
    "name": "Renault Express",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Manual",
    "seats": 5,
    "startingPrice": 370,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 450 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 420 },
      { "label": "Long terme", "range": "+15 jours", "price": 370 }
    ],
    "image": "/images/fleet/renault-express.webp"
  },
  {
    "id": "fiat-500-cabriolet",
    "slug": "fiat-500-cabriolet",
    "name": "Fiat 500 Cabriolet",
    "category": "Economy",
    "fuel": "Essence",
    "transmission": "Automatic",
    "seats": 4,
    "startingPrice": 370,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 450 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 400 },
      { "label": "Long terme", "range": "+15 jours", "price": 370 }
    ],
    "image": "/images/fleet/fiat-500-cabriolet.webp"
  },
  {
    "id": "renault-megane-citadine",
    "slug": "renault-megane-citadine",
    "name": "Renault Mégane Citadine",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 420,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 500 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 470 },
      { "label": "Long terme", "range": "+15 jours", "price": 420 }
    ],
    "image": "/images/fleet/renault-megane-citadine.webp"
  },
  {
    "id": "renault-megane-berline",
    "slug": "renault-megane-berline",
    "name": "Renault Mégane Berline",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 420,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 500 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 470 },
      { "label": "Long terme", "range": "+15 jours", "price": 420 }
    ],
    "image": "/images/fleet/renault-megane-berline.webp"
  },
  {
    "id": "hyundai-elantra",
    "slug": "hyundai-elantra",
    "name": "Hyundai Elantra",
    "category": "Economy",
    "fuel": "Hybride",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 600,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 700 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 650 },
      { "label": "Long terme", "range": "+15 jours", "price": 600 }
    ],
    "image": "/images/fleet/hyundai-elantra.webp"
  },
  {
    "id": "renault-arkana",
    "slug": "renault-arkana",
    "name": "Renault Arkana",
    "category": "SUV",
    "fuel": "Essence",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 600,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 700 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 650 },
      { "label": "Long terme", "range": "+15 jours", "price": 600 }
    ],
    "image": "/images/fleet/renault-arkana.webp"
  },
  {
    "id": "audi-q8",
    "slug": "audi-q8",
    "name": "Audi Q8",
    "category": "Luxe",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 3500,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 3700 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 3600 },
      { "label": "Long terme", "range": "+15 jours", "price": 3500 }
    ],
    "image": "/images/fleet/audi-q8.webp"
  },
  {
    "id": "hyundai-accent",
    "slug": "hyundai-accent",
    "name": "Hyundai Accent",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 370,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 450 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 400 },
      { "label": "Long terme", "range": "+15 jours", "price": 370 }
    ],
    "image": "/images/fleet/hyundai-accent.webp"
  },
  {
    "id": "dacia-jogger",
    "slug": "dacia-jogger",
    "name": "Dacia Jogger",
    "category": "Economy",
    "fuel": "Diesel",
    "transmission": "Manual",
    "seats": 7,
    "startingPrice": 420,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 500 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 450 },
      { "label": "Long terme", "range": "+15 jours", "price": 420 }
    ],
    "image": "/images/fleet/dacia-jogger.webp"
  },
  {
    "id": "mg3",
    "slug": "mg3",
    "name": "MG3",
    "category": "Economy",
    "fuel": "Essence",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 420,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 500 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 450 },
      { "label": "Long terme", "range": "+15 jours", "price": 420 }
    ],
    "image": "/images/fleet/mg3.webp"
  },
  {
    "id": "nissan-juke",
    "slug": "nissan-juke",
    "name": "Nissan Juke",
    "category": "SUV",
    "fuel": "Essence",
    "transmission": "Automatic",
    "seats": 5,
    "startingPrice": 470,
    "pricingTiers": [
      { "label": "Court terme", "range": "1-3 jours", "price": 550 },
      { "label": "Moyen terme", "range": "4-14 jours", "price": 500 },
      { "label": "Long terme", "range": "+15 jours", "price": 470 }
    ],
    "image": "/images/fleet/nissan-juke.webp"
  }
];

// ─── Category labels (French) ────────────────
export const CATEGORY_LABELS: Record<VehicleCategory, string> = {
  Economy: "Économique",
  SUV: "SUV",
  Luxe: "Luxe",
};

// ─── Category badge styles ───────────────────
export const CATEGORY_BADGE_STYLES: Record<VehicleCategory, string> = {
  Economy: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  SUV: "bg-blue-50 text-blue-700 border border-blue-100",
  Luxe: "bg-amber-50 text-amber-700 border border-amber-100",
};

// ─── WhatsApp message builders ───────────────

/** Build a WhatsApp reservation link for the Hero widget */
export function buildHeroWhatsAppLink(
  vehicleName: string,
  duration: string,
  pricePerDay: number | null,
): string {
  const priceText =
    pricePerDay !== null && pricePerDay > 0
      ? `${pricePerDay} DH/jour`
      : "Sur demande";

  const text = encodeURIComponent(
    `Bonjour! Je souhaite confirmer le prix pour:\n` +
      `Véhicule: ${vehicleName}\n` +
      `Durée: ${duration}\n` +
      `Prix estimé: ${priceText}\n` +
      `Merci de me confirmer la disponibilité et le prix final.`,
  );
  return `${WHATSAPP_LINK_BASE}?text=${text}`;
}

/** Build a WhatsApp reservation link for a Fleet card */
export function buildFleetWhatsAppLink(vehicle: Vehicle): string {
  const transmissionLabel =
    vehicle.transmission === "Automatic" ? "Automatique" : "Manuelle";
  
  const longTermTier = vehicle.pricingTiers[vehicle.pricingTiers.length - 1];
  const startingPriceMad = longTermTier?.price ?? vehicle.pricingTiers[0]?.price ?? 0;

  const priceText =
    vehicle.priceOnRequest
      ? "Sur demande"
      : `${startingPriceMad} DH`;

  const text = encodeURIComponent(
    `Bonjour! Je suis intéressé par:\n` +
      `Véhicule: ${vehicle.name}\n` +
      `Transmission: ${transmissionLabel}\n` +
      `Carburant: ${vehicle.fuel}\n` +
      `Prix par jour: ${priceText}\n\n` +
      `Merci de me confirmer la disponibilité.`,
  );
  return `${WHATSAPP_LINK_BASE}?text=${text}`;
}

/** Generic WhatsApp link with custom message */
export function buildWhatsAppLink(message: string): string {
  return `${WHATSAPP_LINK_BASE}?text=${encodeURIComponent(message)}`;
}
