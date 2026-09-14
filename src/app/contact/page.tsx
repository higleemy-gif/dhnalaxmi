import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CallButton } from "@/components/CallButton";
import { ContactForm } from "@/components/ContactForm";
import { BreadcrumbSchema } from "@/components/Schema";
import { siteConfig, hasPhone, hasWhatsApp } from "@/config/site";
import { generalInquiryMessage } from "@/lib/format";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dhana Laxmi Construction — WhatsApp, call or send us a message about buying or selling a property in Rayagada, Odisha.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const addressParts = [
    siteConfig.address.line1,
    siteConfig.address.city,
    siteConfig.address.district !== siteConfig.address.city
      ? siteConfig.address.district
      : "",
    siteConfig.address.state,
    siteConfig.address.pincode,
  ].filter(Boolean);

  const hasAnyContact =
    hasPhone() ||
    hasWhatsApp() ||
    !!siteConfig.email ||
    addressParts.length > 0;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div className="container-content py-16 md:py-20">
          <SectionHeading
            eyebrow="Contact"
            title="We would love to hear from you"
            subtitle="Reach out about a property, a site visit or listing your own property — whichever channel is easiest for you."
            as="h1"
          />
        </div>
      </section>

      <section className="container-content py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr] lg:gap-14">
          {/* Details */}
          <div className="space-y-4">
            {!hasAnyContact && (
              <div className="rounded-2xl border border-dashed border-line bg-white p-6 text-sm text-muted">
                Direct contact details are being verified. In the meantime,
                please use the form on this page — we will get back to you as
                soon as possible.
              </div>
            )}

            {addressParts.length > 0 && (
              <ContactCard
                icon={<MapPinIcon className="h-5 w-5" />}
                title="Our Office"
                body={addressParts.join(", ")}
              />
            )}

            {hasPhone() && (
              <ContactCard
                icon={<PhoneIcon className="h-5 w-5" />}
                title="Call Us"
                body={
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="hover:text-gold"
                  >
                    {siteConfig.phone}
                  </a>
                }
              />
            )}

            {hasWhatsApp() && (
              <ContactCard
                icon={<WhatsAppIcon className="h-5 w-5" />}
                title="WhatsApp"
                body="Quick replies during business hours"
              />
            )}

            {siteConfig.email && (
              <ContactCard
                icon={<MailIcon className="h-5 w-5" />}
                title="Email"
                body={
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-gold"
                  >
                    {siteConfig.email}
                  </a>
                }
              />
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <WhatsAppButton
                message={generalInquiryMessage()}
                label="WhatsApp Us"
              />
              <CallButton />
            </div>

            {siteConfig.mapEmbedUrl && (
              <div className="overflow-hidden rounded-2xl border border-line">
                <iframe
                  title="Dhana Laxmi Construction office location"
                  src={siteConfig.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[16/10] w-full"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <div>
            <div className="card p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold text-navy">
                Send us a message
              </h2>
              <p className="mt-1 text-sm text-muted">
                Fill in the form and we will get back to you shortly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
            <p className="mt-6 text-sm text-muted">
              Looking to sell? Use the{" "}
              <Link href="/sell" className="font-semibold text-navy hover:text-gold">
                dedicated Sell Your Property form
              </Link>{" "}
              for a faster response.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="card flex items-start gap-4 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {title}
        </p>
        <div className="mt-1 text-sm font-medium text-navy">{body}</div>
      </div>
    </div>
  );
}
