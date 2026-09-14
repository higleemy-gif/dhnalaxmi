"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Property } from "@/data/properties";
import {
  defaultFilters,
  filterProperties,
  sortProperties,
  type PropertyFilters,
  type SortKey,
} from "@/lib/search";
import { PropertyFiltersPanel } from "@/components/PropertyFilters";
import { PropertyGrid } from "@/components/PropertyGrid";
import { EmptyState } from "@/components/EmptyState";

function countActive(filters: PropertyFilters): number {
  let n = 0;
  if (filters.query.trim()) n++;
  if (filters.type) n++;
  if (filters.location) n++;
  if (filters.status) n++;
  if (filters.maxPrice !== null) n++;
  if (filters.minArea !== null || filters.maxArea !== null) n++;
  return n;
}

export function PropertiesExplorer({ all }: { all: Property[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initial: PropertyFilters = useMemo(
    () => ({
      ...defaultFilters,
      query: searchParams.get("q") ?? "",
      type: (searchParams.get("type") as PropertyFilters["type"]) ?? "",
      location: searchParams.get("location") ?? "",
      status:
        (searchParams.get("status") as PropertyFilters["status"]) ?? "",
    }),
    // Only capture the initial URL state — subsequent updates are user-driven.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [filters, setFilters] = useState<PropertyFilters>(initial);
  const [sort, setSort] = useState<SortKey>("newest");

  // Sync URL when filters change (shareable state).
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.query.trim()) params.set("q", filters.query.trim());
    if (filters.type) params.set("type", filters.type);
    if (filters.location) params.set("location", filters.location);
    if (filters.status) params.set("status", filters.status);
    const qs = params.toString();
    router.replace(qs ? `/properties?${qs}` : "/properties", { scroll: false });
  }, [filters, router]);

  const results = useMemo(
    () => sortProperties(filterProperties(all, filters), sort),
    [all, filters, sort]
  );

  const activeCount = countActive(filters);
  const clear = () => setFilters(defaultFilters);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <PropertyFiltersPanel
          filters={filters}
          sort={sort}
          onFiltersChange={setFilters}
          onSortChange={setSort}
          onClear={clear}
          activeCount={activeCount}
        />
      </aside>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-ink">
            <span className="text-lg font-bold text-navy">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "Property" : "Properties"} Found
          </p>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clear}
              className="text-sm font-semibold text-gold hover:text-gold-700"
            >
              Clear Search
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <PropertyGrid properties={results} />
        ) : (
          <EmptyState
            title={
              filters.query.trim()
                ? "No properties match your search."
                : "No properties found."
            }
            message="Try adjusting your filters or clearing them to see all available properties."
            actionLabel="Clear Filters"
            onAction={clear}
          />
        )}
      </section>
    </div>
  );
}
