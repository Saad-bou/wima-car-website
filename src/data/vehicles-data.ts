// ─────────────────────────────────────────────
// WIMA CAR – Centralized Vehicle Data & Helpers
// ─────────────────────────────────────────────

// ─── WhatsApp ────────────────────────────────
export const WHATSAPP_NUMBER = "212661503446";
export const WHATSAPP_LINK_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

// ─── Types ───────────────────────────────────
export type VehicleCategory = "Economy" | "SUV" | "Luxe";

export type FuelType = "Essence" | "Diesel";

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
  const priceText =
    vehicle.priceOnRequest
      ? "Sur demande"
      : `${vehicle.pricingTiers[0].price} DH`;

  const text = encodeURIComponent(
    `Bonjour! Je suis intéressé par:\n` +
      `Véhicule: ${vehicle.name}\n` +
      `Transmission: ${transmissionLabel}\n` +
      `Carburant: ${vehicle.fuel}\n` +
      `Durée: 3–7 jours\n` +
      `Prix par jour: ${priceText}\n` +
      `Merci de me confirmer la disponibilité.`,
  );
  return `${WHATSAPP_LINK_BASE}?text=${text}`;
}

/** Generic WhatsApp link with custom message */
export function buildWhatsAppLink(message: string): string {
  return `${WHATSAPP_LINK_BASE}?text=${encodeURIComponent(message)}`;
}
