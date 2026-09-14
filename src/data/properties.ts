/**
 * Central property dataset for Dhana Laxmi Construction.
 *
 * SOURCE OF TRUTH
 * ---------------
 * Every listing below was extracted from the client's live site
 * (dhanalaxmiconstruction.in) property showcase: names, locations, plot sizes,
 * prices, availability and the actual uploaded property images. No values were
 * invented. Listings without a price on the source simply have `price: null`,
 * and the one listing with no uploaded photo has an empty `images` array so the
 * UI shows a professional "No image available" state.
 *
 * ADDING A NEW PROPERTY
 * ---------------------
 * Append an object to the `properties` array. The rest of the site (home,
 * listing, filters, search, detail pages, sitemap, schema) consumes this data,
 * so no component changes are required to publish a new property.
 */

export type PropertyType =
  | "Residential Plot"
  | "Commercial Plot"
  | "Residential House"
  | "3BHK House"
  | "Villa"
  | "Apartment"
  | "Commercial Property"
  | "Agricultural Land"
  | "Other";

export type PropertyStatus = "Available" | "Reserved" | "Sold" | "Unavailable";

export interface Property {
  id: string;
  name: string;
  slug: string;
  propertyType: PropertyType;
  location: string;
  city: string;
  district: string;
  state: string;
  description: string;
  /** Numeric price in INR, or null when the source does not publish a price. */
  price: number | null;
  /** Human-friendly price as shown on the source site (Indian format). */
  priceDisplay: string | null;
  /** Plot dimensions exactly as published, e.g. "30X30". */
  plotSize: string;
  /** Derived area in square feet (from the dimensions) for sorting/filtering. */
  area: number | null;
  areaUnit: "sq ft";
  status: PropertyStatus;
  /** Full-size image URLs. Empty array => no image available. */
  images: string[];
  highlights: string[];
  tags: string[];
  featured: boolean;
}

/**
 * Property photos are self-hosted under `public/property-photos/` (originally
 * downloaded from the client's live WordPress site so we don't hotlink from
 * an external host). File names match each property's slug for easy upkeep.
 *
 * The folder is intentionally NOT named `properties/` because that path
 * collides with the `/properties/[slug]` dynamic route in `app/properties/`.
 */
const IMG = "/property-photos";

export const properties: Property[] = [
  {
    id: "1534",
    name: "3BHK House in Ashok Nagar",
    slug: "3bhk-house-in-ashok-nagar",
    propertyType: "3BHK House",
    location: "Ashok Nagar, last lane Rayagada",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    description:
      "A 3BHK house on a 30 × 30 plot in Ashok Nagar, last lane, Rayagada. A ready residential option in an established local neighbourhood.",
    price: 7000000,
    priceDisplay: "₹70 Lakh",
    plotSize: "30X30",
    area: 900,
    areaUnit: "sq ft",
    status: "Available",
    images: [`${IMG}/3bhk-house-in-ashok-nagar.png`],
    highlights: [
      "3BHK independent house",
      "Plot size 30 × 30",
      "Located in Ashok Nagar, last lane",
      "Rayagada, Odisha",
    ],
    tags: ["3bhk", "house", "ashok nagar", "rayagada", "residential"],
    featured: true,
  },
  {
    id: "1531",
    name: "Residential Plot in Ashok Nagar",
    slug: "residential-plot-in-ashok-nagar-3",
    propertyType: "Residential Plot",
    location: "Ashok Nagar Last Lane Rayagada Odisha",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    description:
      "A 30 × 120 residential plot in Ashok Nagar, last lane, Rayagada, Odisha. A spacious plot suited to building a custom home.",
    price: null,
    priceDisplay: null,
    plotSize: "30X120",
    area: 3600,
    areaUnit: "sq ft",
    status: "Available",
    images: [`${IMG}/residential-plot-in-ashok-nagar-3.png`],
    highlights: [
      "Residential plot",
      "Plot size 30 × 120",
      "Located in Ashok Nagar, last lane",
      "Rayagada, Odisha",
    ],
    tags: ["plot", "ashok nagar", "rayagada", "residential", "land"],
    featured: true,
  },
  {
    id: "1527",
    name: "Vishal Mart Back Side",
    slug: "vishal-mart-back-side",
    propertyType: "Commercial Plot",
    location: "Main road Vishal Mart Back side",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    description:
      "A 40 × 55 plot on the main road behind Vishal Mart, Rayagada. A main-road location suited to commercial or mixed use.",
    price: 15000000,
    priceDisplay: "₹1.5 Crore",
    plotSize: "40X55",
    area: 2200,
    areaUnit: "sq ft",
    status: "Available",
    images: [`${IMG}/vishal-mart-back-side.png`],
    highlights: [
      "Main road plot",
      "Plot size 40 × 55",
      "Behind Vishal Mart",
      "Rayagada, Odisha",
    ],
    tags: ["plot", "vishal mart", "main road", "commercial", "rayagada"],
    featured: true,
  },
  {
    id: "1525",
    name: "Residential Plot in Ashok Nagar 3rd Lane Opp",
    slug: "residential-plot-in-ashok-nagar-3rd-lane-opp",
    propertyType: "Residential Plot",
    location: "Ashok Nagar 3rd Lane Opp Rayagada Odisha",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    description:
      "A 30 × 70 residential plot at Ashok Nagar 3rd Lane (opposite), Rayagada, Odisha.",
    price: null,
    priceDisplay: null,
    plotSize: "30X70",
    area: 2100,
    areaUnit: "sq ft",
    status: "Available",
    images: [`${IMG}/residential-plot-in-ashok-nagar-3rd-lane-opp.png`],
    highlights: [
      "Residential plot",
      "Plot size 30 × 70",
      "Ashok Nagar, 3rd lane (opposite)",
      "Rayagada, Odisha",
    ],
    tags: ["plot", "ashok nagar", "rayagada", "residential", "land"],
    featured: false,
  },
  {
    id: "1519",
    name: "Residential Plot in Indira Nagar",
    slug: "residential-plot-in-indira-nagar",
    propertyType: "Residential Plot",
    location: "Indira Nagar, 3rd lane Rayagada",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    description:
      "A 45 × 90 residential plot in Indira Nagar, 3rd lane, Rayagada. A large plot in a residential locality.",
    price: 15000000,
    priceDisplay: "₹1.5 Crore",
    plotSize: "45X90",
    area: 4050,
    areaUnit: "sq ft",
    status: "Available",
    images: [`${IMG}/residential-plot-in-indira-nagar.png`],
    highlights: [
      "Residential plot",
      "Plot size 45 × 90",
      "Indira Nagar, 3rd lane",
      "Rayagada, Odisha",
    ],
    tags: ["plot", "indira nagar", "rayagada", "residential", "land"],
    featured: true,
  },
  {
    id: "1517",
    name: "Residential Plot in Ashok Nagar",
    slug: "residential-plot-in-ashok-nagar-2",
    propertyType: "Residential Plot",
    location: "Ashok Nagar, last lane Rayagada",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    description:
      "A 20 × 30 residential plot in Ashok Nagar, last lane, Rayagada. A compact, affordable plot option.",
    price: 4000000,
    priceDisplay: "₹40 Lakh",
    plotSize: "20X30",
    area: 600,
    areaUnit: "sq ft",
    status: "Available",
    images: [],
    highlights: [
      "Residential plot",
      "Plot size 20 × 30",
      "Ashok Nagar, last lane",
      "Rayagada, Odisha",
    ],
    tags: ["plot", "ashok nagar", "rayagada", "residential", "land"],
    featured: false,
  },
  {
    id: "1514",
    name: "Residential House in Ashok Nagar",
    slug: "residential-house-in-ashok-nagar",
    propertyType: "Residential House",
    location: "Ashok Nagar, last lane Rayagada",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    description:
      "A residential house on a 15 × 60 plot in Ashok Nagar, last lane, Rayagada.",
    price: 4500000,
    priceDisplay: "₹45 Lakh",
    plotSize: "15X60",
    area: 900,
    areaUnit: "sq ft",
    status: "Available",
    images: [`${IMG}/residential-house-in-ashok-nagar.png`],
    highlights: [
      "Residential house",
      "Plot size 15 × 60",
      "Ashok Nagar, last lane",
      "Rayagada, Odisha",
    ],
    tags: ["house", "ashok nagar", "rayagada", "residential"],
    featured: false,
  },
  {
    id: "1512",
    name: "Residential Plot in Ashok Nagar",
    slug: "residential-plot-in-ashok-nagar",
    propertyType: "Residential Plot",
    location: "Ashok Nagar, last lane Rayagada",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    description:
      "A 45 × 105 residential plot in Ashok Nagar, last lane, Rayagada. A large plot suited to a spacious home.",
    price: 6500000,
    priceDisplay: "₹65 Lakh",
    plotSize: "45X105",
    area: 4725,
    areaUnit: "sq ft",
    status: "Available",
    images: [`${IMG}/residential-plot-in-ashok-nagar.png`],
    highlights: [
      "Residential plot",
      "Plot size 45 × 105",
      "Ashok Nagar, last lane",
      "Rayagada, Odisha",
    ],
    tags: ["plot", "ashok nagar", "rayagada", "residential", "land"],
    featured: false,
  },
];

/* ----------------------------- Derived helpers ---------------------------- */

export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(limit?: number): Property[] {
  const featured = properties.filter((p) => p.featured);
  const list = featured.length > 0 ? featured : properties;
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Property types that actually appear in the dataset (for relevant filters). */
export function getAvailablePropertyTypes(): PropertyType[] {
  const set = new Set<PropertyType>();
  properties.forEach((p) => set.add(p.propertyType));
  return Array.from(set);
}

/** Distinct locality names (first segment of the location) present in data. */
export function getAvailableLocations(): string[] {
  const set = new Set<string>();
  properties.forEach((p) => {
    const locality = p.location.split(",")[0].trim();
    if (locality) set.add(locality);
  });
  return Array.from(set).sort();
}

/**
 * Similar properties: same locality first, then same type, then any — always
 * drawn from real data and never the property itself.
 */
export function getSimilarProperties(
  property: Property,
  limit = 3
): Property[] {
  const others = properties.filter((p) => p.id !== property.id);
  const locality = property.location.split(",")[0].trim().toLowerCase();

  const scored = others
    .map((p) => {
      let score = 0;
      if (p.location.toLowerCase().includes(locality)) score += 2;
      if (p.propertyType === property.propertyType) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.p);
}
