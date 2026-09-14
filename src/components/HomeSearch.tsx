"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon, ArrowRightIcon } from "@/components/icons";

/**
 * Homepage search: pushes the query to the properties page, where the real
 * property dataset filtering happens.
 */
export function HomeSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = value.trim();
    const target = q ? `/properties?q=${encodeURIComponent(q)}` : "/properties";
    router.push(target);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-2xl border border-line bg-white p-2 shadow-card"
      role="search"
    >
      <label htmlFor="home-search" className="sr-only">
        Search properties
      </label>
      <div className="flex flex-1 items-center gap-2 pl-3">
        <SearchIcon className="h-5 w-5 shrink-0 text-navy-400" />
        <input
          id="home-search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by property name, location or property type..."
          className="w-full border-0 bg-transparent py-3 text-sm text-ink outline-none placeholder:text-muted"
          aria-label="Search properties"
        />
      </div>
      <button type="submit" className="btn-primary">
        <span className="hidden sm:inline">Search</span>
        <ArrowRightIcon className="h-4 w-4 sm:hidden" />
      </button>
    </form>
  );
}
