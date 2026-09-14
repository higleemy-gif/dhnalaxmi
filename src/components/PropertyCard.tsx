import Link from "next/link";
import type { Property } from "@/data/properties";
import { PropertyImage } from "@/components/PropertyImage";
import { StatusBadge } from "@/components/StatusBadge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  displayPrice,
  formatPlotSize,
  fullLocation,
  propertyInquiryMessage,
} from "@/lib/format";
import { MapPinIcon, RulerIcon, ArrowRightIcon } from "@/components/icons";

export function PropertyCard({ property }: { property: Property }) {
  const href = `/properties/${property.slug}`;

  return (
    <article className="card group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card-hover">
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden bg-navy-50"
        aria-label={`View details for ${property.name}`}
      >
        <PropertyImage
          src={property.images[0]}
          alt={property.name}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <StatusBadge status={property.status} className="bg-white/95 shadow-sm" />
        </span>
        <span className="badge absolute right-3 top-3 bg-navy/90 text-white shadow-sm">
          {property.propertyType}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-navy">
          <Link href={href} className="transition-colors hover:text-gold">
            {property.name}
          </Link>
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-sm text-muted">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span>{fullLocation(property)}</span>
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            <RulerIcon className="h-4 w-4 text-navy-400" />
            {formatPlotSize(property.plotSize)}
          </span>
          <span className="text-base font-bold text-navy">
            {displayPrice(property)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {property.description}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <Link href={href} className="btn-navy flex-1">
            View Details
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <WhatsAppButton
            message={propertyInquiryMessage(property.name)}
            label=""
            className="!px-3"
          />
        </div>
      </div>
    </article>
  );
}
