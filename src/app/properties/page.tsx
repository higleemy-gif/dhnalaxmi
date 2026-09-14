import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProperties } from "@/data/properties";
import { SectionHeading } from "@/components/SectionHeading";
import { PropertiesExplorer } from "@/components/PropertiesExplorer";
import { PropertyGridSkeleton } from "@/components/PropertyGrid";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Properties in Rayagada, Odisha",
  description:
    "Browse residential plots, houses and commercial properties available with Dhana Laxmi Construction in Rayagada, Odisha.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  const all = getAllProperties();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Properties", url: "/properties" },
        ]}
      />

      {/* Page header */}
      <section className="border-b border-line bg-surface">
        <div className="container-content py-12 md:py-16">
          <SectionHeading
            eyebrow="Inventory"
            title="Available Properties"
            subtitle="Search, filter and shortlist properties from our current inventory in Rayagada, Odisha."
          />
        </div>
      </section>

      <section className="container-content py-10 md:py-14">
        <Suspense fallback={<PropertyGridSkeleton />}>
          <PropertiesExplorer all={all} />
        </Suspense>
      </section>
    </>
  );
}
