"use client";

import { useMemo } from "react";
import type { PropertyFilters, SortKey } from "@/lib/search";
import { priceBands, areaBands } from "@/lib/search";
import {
  getAvailablePropertyTypes,
  getAvailableLocations,
} from "@/data/properties";
import { SearchIcon, CloseIcon } from "@/components/icons";

interface Props {
  filters: PropertyFilters;
  sort: SortKey;
  onFiltersChange: (f: PropertyFilters) => void;
  onSortChange: (s: SortKey) => void;
  onClear: () => void;
  activeCount: number;
}

export function PropertyFiltersPanel({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onClear,
  activeCount,
}: Props) {
  const propertyTypes = useMemo(() => getAvailablePropertyTypes(), []);
  const locations = useMemo(() => getAvailableLocations(), []);

  const activeAreaBand = areaBands.findIndex(
    (b) => b.min === filters.minArea && b.max === filters.maxArea
  );

  return (
    <div className="space-y-5 rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-navy">
          Filters
        </h3>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-700"
          >
            <CloseIcon className="h-3.5 w-3.5" /> Clear ({activeCount})
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label htmlFor="filter-search" className="field-label">
          Search
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
          <input
            id="filter-search"
            type="search"
            value={filters.query}
            onChange={(e) =>
              onFiltersChange({ ...filters, query: e.target.value })
            }
            placeholder="Search name, location, type..."
            className="field-input pl-9"
          />
        </div>
      </div>

      {/* Type */}
      <div>
        <label htmlFor="filter-type" className="field-label">
          Property Type
        </label>
        <select
          id="filter-type"
          value={filters.type}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              type: e.target.value as PropertyFilters["type"],
            })
          }
          className="field-input"
        >
          <option value="">All Types</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="filter-location" className="field-label">
          Location
        </label>
        <select
          id="filter-location"
          value={filters.location}
          onChange={(e) =>
            onFiltersChange({ ...filters, location: e.target.value })
          }
          className="field-input"
        >
          <option value="">All Locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label htmlFor="filter-price" className="field-label">
          Price Range
        </label>
        <select
          id="filter-price"
          value={filters.maxPrice ?? ""}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              maxPrice: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="field-input"
        >
          <option value="">Any Price</option>
          {priceBands.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      {/* Area */}
      <div>
        <label htmlFor="filter-area" className="field-label">
          Property Size
        </label>
        <select
          id="filter-area"
          value={activeAreaBand >= 0 ? String(activeAreaBand) : ""}
          onChange={(e) => {
            const idx = e.target.value === "" ? -1 : Number(e.target.value);
            if (idx < 0) {
              onFiltersChange({ ...filters, minArea: null, maxArea: null });
            } else {
              const band = areaBands[idx];
              onFiltersChange({
                ...filters,
                minArea: band.min,
                maxArea: band.max,
              });
            }
          }}
          className="field-input"
        >
          <option value="">Any Size</option>
          {areaBands.map((b, i) => (
            <option key={b.label} value={i}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div>
        <label htmlFor="filter-status" className="field-label">
          Availability
        </label>
        <select
          id="filter-status"
          value={filters.status}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value as PropertyFilters["status"],
            })
          }
          className="field-input"
        >
          <option value="">Any</option>
          <option value="Available">Available</option>
          <option value="Reserved">Reserved</option>
          <option value="Sold">Sold</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <label htmlFor="filter-sort" className="field-label">
          Sort By
        </label>
        <select
          id="filter-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="field-input"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="size-asc">Size: Small to Large</option>
          <option value="size-desc">Size: Large to Small</option>
        </select>
      </div>
    </div>
  );
}
