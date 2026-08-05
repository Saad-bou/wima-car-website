export type BrandAssetKey = "primary" | "horizontal" | "monogram";

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Brand = {
  name: string;
  city: "Rabat";
  country: "Morocco";
  assets: {
    logo: Record<BrandAssetKey, string>;
    favicon: {
      ico: string;
      svg: string;
      appleTouchIcon: string;
    };
    openGraph: {
      default: string;
    };
  };
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type Navigation = {
  primary: NavigationItem[];
  footer: NavigationItem[];
};

export type VehicleCategory = "business" | "tourism" | "family" | "long-term";

export type VehicleTransmission = "manual" | "automatic";

export type VehicleFuel = "diesel" | "petrol" | "hybrid" | "electric";

export type Vehicle = {
  id: string;
  name: string;
  category: VehicleCategory;
  priceFrom: number;
  transmission: VehicleTransmission;
  fuel: VehicleFuel;
  seats: number;
  image: string;
  imageAlt: string;
};
