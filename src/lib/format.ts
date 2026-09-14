import { siteConfig } from "@/config/site";
import type { Property } from "@/data/properties";

/**
 * Format an INR amount into the Indian real-estate convention
 * (Lakh / Crore). Falls back to a grouped rupee figure otherwise.
 */
export function formatIndianPrice(amount: number | null): string {
  if (amount === null || Number.isNaN(amount)) return "Price on request";

  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${trimZeros(cr)} Crore`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${trimZeros(lakh)} Lakh`;
  }
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
}

function trimZeros(value: number): string {
  return value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

/** Prefer the price exactly as published; otherwise derive it. */
export function displayPrice(property: Property): string {
  if (property.priceDisplay) return property.priceDisplay;
  return formatIndianPrice(property.price);
}

/** Render plot dimensions with a proper multiplication sign. */
export function formatPlotSize(plotSize: string): string {
  return plotSize.replace(/x/i, " × ");
}

/** Full location string with city/state appended when not already present. */
export function fullLocation(property: Property): string {
  const parts = [property.location];
  if (!property.location.toLowerCase().includes(property.state.toLowerCase())) {
    parts.push(property.state);
  }
  return parts.join(", ");
}

/**
 * Build a wa.me link with a property-specific pre-filled message.
 * Returns null when no WhatsApp number is configured yet.
 */
export function buildWhatsAppLink(message: string): string | null {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function propertyInquiryMessage(propertyName: string): string {
  return `Hello ${siteConfig.name}, I am interested in the ${propertyName}. Please share more details.`;
}

export function generalInquiryMessage(): string {
  return `Hello ${siteConfig.name}, I would like to know more about your available properties.`;
}

/** Build a tel: link, or null when no phone is configured. */
export function buildTelLink(): string | null {
  const digits = siteConfig.phone.replace(/[^\d+]/g, "");
  if (digits.replace(/\D/g, "").length < 8) return null;
  return `tel:${digits}`;
}
