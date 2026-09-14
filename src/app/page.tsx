import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { HomeSearch } from "@/components/HomeSearch";
import { SectionHeading } from "@/components/SectionHeading";
import { PropertyGrid } from "@/components/PropertyGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  getAvailablePropertyTypes,
  getFeaturedProperties,
  properties,
} from "@/data/properties";
import { generalInquiryMessage } from "@/lib/format";
import {
  ArrowRightIcon,
  ShieldIcon,
  HandshakeIcon,
  EyeIcon,
  BuildingIcon,
  MapPinIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Dhana Laxmi Construction | Properties in Rayagada, Odisha",
  description:
    "Explore residential plots, houses and properties in prime locations across Rayagada, Odisha with Dhana Laxmi Construction.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedProperties(6);
  const propertyTypes = getAvailablePropertyTypes();
  const localities = Array.from(
    new Set(properties.map((p) => p.location.split(",")[0].trim()))
  );

  return (
    <>
      <Hero />

      {/* Available Properties — search sits inside this section, between the
          heading and the property grid, so it acts as an in-context filter
          for the listings shown right below it. */}
      <section className="container-content py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Available Now"
            title="Available Properties"
            subtitle="Explore our currently available properties and find a space that fits your needs."
          />
          <Link href="/properties" className="btn-outline shrink-0">
            View All Properties
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8">
          <HomeSearch />
        </div>

        <div className="mt-10">
          <PropertyGrid properties={featured} />
        </div>
      </section>

      {/* Property Categories */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Browse By Category"
            title="Property Categories"
            subtitle="From residential plots to family homes, find the property type that fits you."
            align="center"
          />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {propertyTypes.map((type) => {
              const count = properties.filter(
                (p) => p.propertyType === type
              ).length;
              return (
                <Link
                  key={type}
                  href={`/properties?type=${encodeURIComponent(type)}`}
                  className="group flex flex-col items-start justify-between rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-gold hover:shadow-card-hover"
                >
                  <BuildingIcon className="h-8 w-8 text-gold" />
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-navy">{type}</p>
                    <p className="mt-1 text-xs text-muted">
                      {count} {count === 1 ? "property" : "properties"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-content py-16 md:py-20">
        <SectionHeading
          eyebrow="Why Dhana Laxmi"
          title="Property help you can trust"
          subtitle="A local, property-focused approach built around clear information, direct communication and a customer-first attitude."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Feature
            icon={<ShieldIcon className="h-6 w-6" />}
            title="Verified listings"
            body="Every property on the site is one we can actually connect you with — no clickbait, no bait-and-switch."
          />
          <Feature
            icon={<HandshakeIcon className="h-6 w-6" />}
            title="Transparent process"
            body="Clear pricing where available, honest information about size, location and status, and direct WhatsApp support."
          />
          <Feature
            icon={<EyeIcon className="h-6 w-6" />}
            title="Local knowledge"
            body="Focused on Rayagada and nearby areas in Odisha, so you get real answers about the neighbourhood, not sales talk."
          />
        </div>
      </section>

      {/* Locations preview */}
      <section className="bg-navy py-16 md:py-20 text-white">
        <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Local Focus"
              title="Prime locations in Rayagada"
              subtitle="From Ashok Nagar and Indira Nagar to main-road commercial plots, our current inventory covers well-known areas in Rayagada, Odisha."
              light
            />
            <div className="mt-6">
              <Link href="/properties" className="btn-primary">
                See Properties by Location
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {localities.map((loc) => (
              <li key={loc}>
                <Link
                  href={`/properties?location=${encodeURIComponent(loc)}`}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white transition-colors hover:border-gold hover:bg-gold/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-gold" />
                    {loc}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-navy-100/60 group-hover:text-gold" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sell CTA */}
      <section className="container-content py-16 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white to-surface p-8 md:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr,1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Have a Property?"
                title="List your property with us"
                subtitle="Tell us about your plot, house or commercial property and our team will get in touch with genuine buyers."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/sell" className="btn-primary">
                  Submit Property
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <WhatsAppButton
                  message={generalInquiryMessage()}
                  label="WhatsApp Us"
                />
              </div>
            </div>
            <ul className="grid gap-3 text-sm">
              {[
                "Free to list your property",
                "We contact you directly",
                "Simple, structured submission form",
                "Support in English, Hindi and Odia",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl bg-white p-3 shadow-card"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <ShieldIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
