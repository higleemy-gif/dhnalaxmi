import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { BreadcrumbSchema } from "@/components/Schema";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalInquiryMessage } from "@/lib/format";
import {
  ShieldIcon,
  HandshakeIcon,
  EyeIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { LogoImage } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Dhana Laxmi Construction is a property-focused team helping buyers and sellers in Rayagada, Odisha make confident, transparent decisions.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div className="container-content grid gap-10 py-16 md:py-24 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About Us"
              title="A property partner for Rayagada and Odisha"
              subtitle="Dhana Laxmi Construction is a local, property-focused team helping buyers find the right space and helping owners connect with genuine buyers."
              as="h1"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/properties" className="btn-primary">
                Explore Properties
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <WhatsAppButton
                message={generalInquiryMessage()}
                label="WhatsApp Us"
              />
            </div>
          </div>
          <div className="relative mx-auto max-w-md">
            <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
              <div className="flex items-center justify-center rounded-2xl bg-navy-50 p-8">
                <LogoImage
                  sizes="(max-width: 1024px) 260px, 320px"
                  className="h-auto w-full max-w-[280px]"
                />
              </div>
              <p className="mt-5 text-center text-sm text-muted">
                Residential &bull; Commercial &bull; Property Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="container-content py-16 md:py-20">
        <SectionHeading
          eyebrow="Our approach"
          title="How we work"
          subtitle="We keep things simple: real properties, honest information, and a direct channel to reach a human whenever you need help."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Property-focused service",
              body: "Our attention is on the property. We publish the size, location, price where available, and current status — never fluff.",
            },
            {
              title: "Customer-first attitude",
              body: "Buying or selling property is a serious decision. We take time to answer questions and never pressure you into a call.",
            },
            {
              title: "Transparency by default",
              body: "If something is unknown or unverified, we say so. If a price hasn’t been finalised, we won’t invent one just to fill a card.",
            },
            {
              title: "Helping owners connect with buyers",
              body: "Sellers can submit their property in minutes and we work only with genuine buyer enquiries — no spam calls, no time-wasters.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <CheckIcon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy py-16 md:py-20 text-white">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our values"
            title="What we stand for"
            light
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            <Value
              icon={<ShieldIcon className="h-5 w-5" />}
              title="Trust"
              body="Genuine listings, honest details, no misleading claims."
            />
            <Value
              icon={<HandshakeIcon className="h-5 w-5" />}
              title="Quality"
              body="Care in the small things — clear photos, correct dimensions, direct answers."
            />
            <Value
              icon={<EyeIcon className="h-5 w-5" />}
              title="Transparency"
              body="You always know exactly what you are looking at and who you are talking to."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-content py-16">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white to-surface p-8 md:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr,1fr] lg:items-center">
            <SectionHeading
              eyebrow="Get in touch"
              title="Ready to buy or sell?"
              subtitle="We would love to help. Explore our current inventory or list your own property in just a few minutes."
            />
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/properties" className="btn-primary">
                Explore Properties
              </Link>
              <Link href="/sell" className="btn-outline">
                Sell Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Value({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-navy">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-100/80">{body}</p>
    </div>
  );
}
