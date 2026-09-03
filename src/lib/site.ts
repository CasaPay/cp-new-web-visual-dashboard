import tallinnSource from "@/data/tallinn-rentals.json";
import londonSource from "@/data/london-rentals.json";

export type Operator = { name: string; logo: string; website?: string };
export type Building = {
  id: string;
  name: string;
  operatorId: string;
  meta: string;
  propertyTypes: string[];
  description: string;
  amenities: string[];
  address: string;
  latitude: number;
  longitude: number;
  monthlyPriceFrom: number | null;
  monthlyPriceTo: number | null;
  badge?: string;
  applicationUrl: string;
  image?: string;
  images?: string[];
  segment?: string;
  unitCount?: number;
  countType?: string;
};
export type CityData = {
  city: string;
  country: string;
  route: string;
  currencyCode: string;
  currencySymbol: string;
  operators: Record<string, Operator>;
  buildings: Building[];
  priceDisclaimer: string;
  segments: { id: string; label: string }[];
};

export const mediaPath = (value: string) => value.replace(/^\/assets\//, "/media/");

const tallinn = tallinnSource as unknown as Omit<CityData, "city" | "country" | "route" | "currencyCode" | "currencySymbol" | "segments">;
const london = londonSource as unknown as CityData;

export const cityData: Record<string, CityData> = {
  "est/tallinn": {
    ...tallinn,
    city: "Tallinn",
    country: "Estonia",
    route: "/tenant/en/est/tallinn",
    currencyCode: "EUR",
    currencySymbol: "€",
    segments: [
      { id: "apartment", label: "Apartments" },
      { id: "studio", label: "Studios" },
      { id: "co_living", label: "Co-living" },
      { id: "student", label: "Student homes" },
    ],
  },
  "gbr/london": london,
};

export const tenantLinks = [
  ["CasaPay Offers", "/tenant/offers"],
  ["Tenant Protect", "/tenant/tenant-protection"],
  ["CasaPay+", "/tenant/casapay-plus"],
] as const;

export const operatorLinks = [
  ["CasaPay RentLink", "/partner/operator/rentlink"],
  ["CasaPay Offers", "/partner/operator/offers"],
  ["CasaPay+", "/partner/operator/casapay-plus"],
  ["CasaPay Capital", "/partner/operator/capital"],
  ["CasaPay Referrals", "/partner/operator/referrals"],
] as const;

export const partnerLinks = [
  ["For platforms", "/partner/platforms"],
] as const;

export const isPartnerPath = (path: string) => path.startsWith("/partner");
