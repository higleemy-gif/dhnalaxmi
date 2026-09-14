import type { Property } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card overflow-hidden">
          <div className="aspect-[4/3] animate-pulse bg-navy-50" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 animate-pulse rounded bg-line" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-line" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-line" />
            <div className="mt-4 flex gap-2">
              <div className="h-10 flex-1 animate-pulse rounded bg-line" />
              <div className="h-10 w-14 animate-pulse rounded bg-line" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
