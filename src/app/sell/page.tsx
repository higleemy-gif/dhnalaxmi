import type { Metadata } from "next";
import { SellPropertyForm } from "@/components/SellPropertyForm";
import { SectionHeading } from "@/components/SectionHeading";
import { BreadcrumbSchema } from "@/components/Schema";
import { CheckIcon, HandshakeIcon, ShieldIcon, EyeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sell Your Property",
  description:
    "Have a property to sell in Rayagada or nearby areas? Submit your property details and Dhana Laxmi Construction will connect you with genuine buyers.",
  alternates: { canonical: "/sell" },
};

export default function SellPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Sell Your Property", url: "/sell" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
        />
        <div className="container-content relative py-16 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
              Sell With Us
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
              Have a <span className="text-gold">Property to Sell?</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-100/85 sm:text-lg">
              Tell us about your property and our team will get in touch with
              you. Free to list, simple to submit, and we work with genuine
              buyers only.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <CheckIcon className="h-4 w-4" />, text: "Free to list your property" },
              { icon: <ShieldIcon className="h-4 w-4" />, text: "Verified buyers only" },
              { icon: <HandshakeIcon className="h-4 w-4" />, text: "Direct, transparent process" },
              { icon: <EyeIcon className="h-4 w-4" />, text: "Local Rayagada expertise" },
            ].map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy">
                  {item.icon}
                </span>
                <span className="text-navy-100/90">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-1 w-full bg-gold" />
      </section>

      <section className="container-content py-12 md:py-16">
        <SectionHeading
          eyebrow="Submission Form"
          title="Submit your property in a few minutes"
          subtitle="All fields marked with * are required. Sensitive information is only used to help sell your property."
        />
        <div className="mt-10">
          <SellPropertyForm />
        </div>
      </section>
    </>
  );
}
