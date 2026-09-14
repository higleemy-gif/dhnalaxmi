/**
 * Central site configuration for Dhana Laxmi Construction.
 *
 * IMPORTANT — CONTACT DETAILS ARE PLACEHOLDERS
 * --------------------------------------------
 * The previous website (dhanalaxmiconstruction.in) still carried leftover
 * WordPress demo/template content (a dental brand, US phone numbers, US
 * addresses and a "smiledent@mail.com" email). None of that is real business
 * information for Dhana Laxmi Construction, so it has intentionally NOT been
 * copied here.
 *
 * No verified public phone number, WhatsApp number, email or street address
 * for the business could be confirmed. Fill in the real values below and the
 * whole site (WhatsApp buttons, call buttons, contact page, footer, schema)
 * will update automatically.
 *
 * - Set `whatsappNumber` in international format WITHOUT "+", spaces or dashes
 *   e.g. "919812345678" for +91 98123 45678.
 * - Leave a value as an empty string ("") to hide it in the UI until it is known.
 */

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  /** Production URL — update when the domain is finalised. */
  url: string;
  locale: string;
  /** WhatsApp number in international format, digits only, no leading "+". */
  whatsappNumber: string;
  /** Primary phone number for tel: links (may include +91). */
  phone: string;
  /** Business email address. */
  email: string;
  /** Human-readable business address. */
  address: {
    line1: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
  };
  /** Optional Google Maps embed URL. Leave empty to hide the map. */
  mapEmbedUrl: string;
  /** Social links — leave empty to hide the icon. */
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Dhana Laxmi Construction",
  legalName: "Dhana Laxmi Construction",
  tagline: "Find the Right Property for Your Future",
  description:
    "Explore residential plots, houses and properties in prime locations across Rayagada, Odisha with Dhana Laxmi Construction.",
  url: "https://dhanalaxmiconstruction.in",
  locale: "en_IN",

  // ---- FILL THESE IN WITH VERIFIED BUSINESS DETAILS ----
  // Verified WhatsApp / phone number for Dhana Laxmi Construction:
  // +91 97762 13573 (client-provided).
  whatsappNumber: "919776213573", // international format, digits only, no leading "+"
  phone: "+91 97762 13573",
  email: "", // e.g. "info@dhanalaxmiconstruction.in"
  address: {
    line1: "",
    city: "Rayagada",
    district: "Rayagada",
    state: "Odisha",
    pincode: "",
    country: "India",
  },
  mapEmbedUrl: "", // paste a Google Maps "embed" iframe src for the real office
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
};

/** True when a usable WhatsApp number has been configured. */
export const hasWhatsApp = (): boolean =>
  siteConfig.whatsappNumber.replace(/\D/g, "").length >= 8;

/** True when a usable phone number has been configured. */
export const hasPhone = (): boolean =>
  siteConfig.phone.replace(/\D/g, "").length >= 8;
