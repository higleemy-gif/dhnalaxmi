import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProperties,
  getPropertyBySlug,
  getSimilarProperties,
} from "@/data/properties";
import { siteConfig } from "@/config/site";
import {
  displayPrice,
  formatPlotSize,
  fullLocation,
  propertyInquiryMessage,
} from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyGrid } from "@/components/PropertyGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CallButton } from "@/components/CallButton";
import { SectionHeading } from "@/components/SectionHeading";
import { BreadcrumbSchema, PropertySchema } from "@/components/Schema";
import {
  MapPinIcon,
  RulerIcon,
  TagIcon,
  CheckIcon,
  BuildingIcon,
  ArrowRightIcon,
} from "@/components/icons";

interface PageProps {
  params: { slug: string };
}

/** Statically generate a route for every property in the dataset. */
export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const property = getPropertyBySlug(params.slug);
  if (!property) {
    return { title: "Property not found" };
  }
  const title = `${property.name} — ${formatPlotSize(property.plotSize)}`;
  const description = property.description;
  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/properties/${property.slug}`,
      type: "article",
      images: property.images.length
        ? property.images.map((url) => ({ url }))
        : undefined,
    },
    twitter: {
      card: property.images.length ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

export default function PropertyDetailPage({ params }: PageProps) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const similar = getSimilarProperties(property, 3);
  const detailRows: { label: string; value: string }[] = [
    { label: "Property Type", value: property.propertyType },
    { label: "Location", value: fullLocation(property) },
    { label: "Plot Size", value: formatPlotSize(property.plotSize) },
    ...(property.area
      ? [{ label: "Approx. Area", value: `${property.area} sq ft` }]
      : []),
    { label: "Price", value: displayPrice(property) },
    { label: "Status", value: property.status },
  ];

  return (
    <>
      <PropertySchema property={property} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Properties", url: "/properties" },
          {
            name: property.name,
            url: `/properties/${property.slug}`,
          },
        ]}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-line bg-surface"
      >
        <div className="container-content py-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-navy">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/properties" className="hover:text-navy">
                Properties
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-navy line-clamp-2" aria-current="page">
              {property.name}
            </li>
          </ol>
        </div>
      </nav>

      <section className="container-content py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr,1fr] lg:gap-14">
          {/* Gallery */}
          <div>
            <PropertyGallery images={property.images} alt={property.name} />
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={property.status} />
              <span className="badge bg-navy/10 text-navy">
                {property.propertyType}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-3xl font-bold text-navy sm:text-4xl">
              {property.name}
            </h1>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted sm:text-base">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>{fullLocation(property)}</span>
            </p>

            <div className="mt-6 flex flex-wrap items-baseline gap-3 rounded-2xl border border-line bg-surface p-5">
              <span className="text-3xl font-bold text-navy sm:text-4xl">
                {displayPrice(property)}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <RulerIcon className="h-4 w-4 text-navy-400" />
                {formatPlotSize(property.plotSize)}
                {property.area ? ` (${property.area} sq ft)` : ""}
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <WhatsAppButton
                message={propertyInquiryMessage(property.name)}
                label="WhatsApp Inquiry"
                fullWidth
              />
              <CallButton fullWidth />
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-navy">Description</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
                {property.description}
              </p>
            </div>

            {/* Details table */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-sm">
                <caption className="sr-only">Key property details</caption>
                <tbody>
                  {detailRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i % 2 === 0 ? "bg-white" : "bg-surface"}
                    >
                      <th
                        scope="row"
                        className="w-1/2 border-b border-line p-3 text-left font-medium text-muted"
                      >
                        {row.label}
                      </th>
                      <td className="border-b border-line p-3 text-navy">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      {property.highlights.length > 0 && (
        <section className="bg-surface py-12">
          <div className="container-content">
            <SectionHeading eyebrow="At a glance" title="Property Highlights" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {property.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-ink">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Location */}
      <section className="container-content py-12 md:py-16">
        <SectionHeading
          eyebrow="Location"
          title="Where this property is"
          subtitle={fullLocation(property)}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,1.2fr] lg:items-start">
          <div className="card p-6">
            <h3 className="text-base font-semibold text-navy">Getting there</h3>
            <p className="mt-2 text-sm text-muted">
              Situated in {property.location.split(",")[0].trim()}, part of{" "}
              {property.city}, {property.state}. For a live site visit or exact
              directions, please get in touch — a member of our team will assist you.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <WhatsAppButton
                message={propertyInquiryMessage(property.name)}
                label="Get Directions"
              />
              <CallButton label="Call Now" />
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-ink">
                <BuildingIcon className="h-4 w-4 text-gold" />
                {property.city}, {property.state}
              </li>
              <li className="flex items-center gap-2 text-ink">
                <TagIcon className="h-4 w-4 text-gold" />
                {property.propertyType}
              </li>
              <li className="flex items-center gap-2 text-ink">
                <RulerIcon className="h-4 w-4 text-gold" />
                {formatPlotSize(property.plotSize)}
              </li>
            </ul>
          </div>

          <MapPreview query={`${property.location}, ${property.city}, ${property.state}`} />
        </div>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="bg-surface py-16 md:py-20">
          <div className="container-content">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="You might also like"
                title="Similar Properties"
              />
              <Link href="/properties" className="btn-outline">
                Browse all
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8">
              <PropertyGrid properties={similar} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/**
 * Uses the free Google Maps "search" embed which works without an API key.
 * Because we have no verified pinpoint coordinates for each property (the
 * source site never published them) this shows an approximate area map based
 * on the location text — which is the honest thing to display.
 */
function MapPreview({ query }: { query: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <iframe
        title={`Map preview for ${query}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[16/10] w-full"
      />
    </div>
  );
}
