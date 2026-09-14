import { siteConfig } from "@/config/site";
import type { Property } from "@/data/properties";
import { displayPrice } from "@/lib/format";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    addressCountry: "IN",
  };
  if (siteConfig.address.line1) address.streetAddress = siteConfig.address.line1;
  if (siteConfig.address.pincode)
    address.postalCode = siteConfig.address.pincode;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url.replace(/\/$/, "")}/logo.png`,
    image: `${siteConfig.url.replace(/\/$/, "")}/logo.png`,
    areaServed: "Rayagada, Odisha, India",
    address,
  };
  if (siteConfig.phone) data.telephone = siteConfig.phone;
  if (siteConfig.email) data.email = siteConfig.email;
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;

  return <JsonLd data={data} />;
}

export function PropertySchema({ property }: { property: Property }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.name,
    description: property.description,
    category: property.propertyType,
    url: `${siteConfig.url}/properties/${property.slug}`,
    brand: { "@type": "Brand", name: siteConfig.name },
  };
  if (property.images.length) {
    const base = siteConfig.url.replace(/\/$/, "");
    // JSON-LD requires absolute image URLs; property images are stored under
    // /public/properties/ so we prefix the site origin here.
    data.image = property.images.map((img) =>
      img.startsWith("http") ? img : `${base}${img}`
    );
  }
  if (property.price !== null) {
    data.offers = {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability:
        property.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    };
  }
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

// Re-export for pages that want the price string in JSON (kept for parity)
export { displayPrice };
