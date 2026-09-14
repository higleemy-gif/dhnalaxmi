import type { Property, PropertyType, PropertyStatus } from "@/data/properties";

export interface PropertyFilters {
  query: string;
  type: PropertyType | "";
  location: string; // locality name or ""
  status: PropertyStatus | "";
  /** Max price in INR, or null for no cap. */
  maxPrice: number | null;
  /** Min plot area in sq ft, or null. */
  minArea: number | null;
  /** Max plot area in sq ft, or null. */
  maxArea: number | null;
}

export type SortKey =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "size-asc"
  | "size-desc";

export const defaultFilters: PropertyFilters = {
  query: "",
  type: "",
  location: "",
  status: "",
  maxPrice: null,
  minArea: null,
  maxArea: null,
};

/** Case-insensitive search across name, location, type, description, tags, size. */
function matchesQuery(property: Property, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    property.name,
    property.location,
    property.city,
    property.district,
    property.state,
    property.propertyType,
    property.description,
    property.plotSize,
    ...property.tags,
  ]
    .join(" ")
    .toLowerCase();
  // Every whitespace-separated term must be present (AND search).
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

export function filterProperties(
  list: Property[],
  filters: PropertyFilters
): Property[] {
  return list.filter((p) => {
    if (!matchesQuery(p, filters.query)) return false;
    if (filters.type && p.propertyType !== filters.type) return false;
    if (
      filters.location &&
      !p.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    if (filters.status && p.status !== filters.status) return false;
    if (filters.maxPrice !== null) {
      // Properties with no price are excluded when a price cap is set.
      if (p.price === null || p.price > filters.maxPrice) return false;
    }
    if (filters.minArea !== null) {
      if (p.area === null || p.area < filters.minArea) return false;
    }
    if (filters.maxArea !== null) {
      if (p.area === null || p.area > filters.maxArea) return false;
    }
    return true;
  });
}

export function sortProperties(list: Property[], sort: SortKey): Property[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort(
        (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity)
      );
    case "price-desc":
      return copy.sort(
        (a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity)
      );
    case "size-asc":
      return copy.sort((a, b) => (a.area ?? Infinity) - (b.area ?? Infinity));
    case "size-desc":
      return copy.sort((a, b) => (b.area ?? -Infinity) - (a.area ?? -Infinity));
    case "newest":
    default:
      // Dataset is maintained newest-first.
      return copy;
  }
}

export interface PriceBand {
  label: string;
  value: number; // max price in INR
}

/** Sensible Indian price bands for the filter dropdown. */
export const priceBands: PriceBand[] = [
  { label: "Under ₹50 Lakh", value: 5000000 },
  { label: "Under ₹75 Lakh", value: 7500000 },
  { label: "Under ₹1 Crore", value: 10000000 },
  { label: "Under ₹1.5 Crore", value: 15000000 },
];

export interface AreaBand {
  label: string;
  min: number | null;
  max: number | null;
}

export const areaBands: AreaBand[] = [
  { label: "Up to 1,000 sq ft", min: null, max: 1000 },
  { label: "1,000 – 2,500 sq ft", min: 1000, max: 2500 },
  { label: "2,500 – 4,000 sq ft", min: 2500, max: 4000 },
  { label: "4,000+ sq ft", min: 4000, max: null },
];
