"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/components/nav-links";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalInquiryMessage } from "@/lib/format";

/**
 * Solid white so the underlying page never bleeds through, no matter what
 * ancestor styles (Tailwind purge, backdrop-blur, stacking context) do.
 */
const SOLID_WHITE: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage: "none",
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Only render the portal after mount so it never runs during SSR.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawer = (
    <div
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/60 animate-fade-in"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        id="mobile-menu"
        className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-hidden shadow-2xl"
        style={SOLID_WHITE}
      >
        {/*
         * Failsafe: a full-panel solid-white sheet BEHIND every other drawer
         * element. If for any reason a Tailwind class fails to apply on a
         * child (purge miss, cache issue, override), this sheet still
         * guarantees the drawer is 100% opaque.
         */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={SOLID_WHITE}
        />

        {/* Gold accent bar to echo the site header */}
        <div
          className="relative z-10 h-1 w-full shrink-0"
          style={{ backgroundColor: "#CE811C" }}
        />

        {/* Top row: logo + close */}
        <div
          className="relative z-10 flex shrink-0 items-center justify-between border-b border-line px-5 py-3"
          style={SOLID_WHITE}
        >
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-ghost -mr-2 p-2"
            aria-label="Close menu"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Nav list */}
        <nav
          className="relative z-10 flex flex-1 flex-col gap-1 overflow-y-auto p-4"
          style={SOLID_WHITE}
          aria-label="Mobile primary"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  active
                    ? "bg-navy-50 text-navy"
                    : "text-ink hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTAs */}
        <div
          className="relative z-10 mt-auto shrink-0 space-y-3 border-t border-line p-4"
          style={SOLID_WHITE}
        >
          <Link
            href="/sell"
            className="btn-primary w-full"
            onClick={() => setOpen(false)}
          >
            Sell Your Property
          </Link>
          <WhatsAppButton
            message={generalInquiryMessage()}
            label="WhatsApp Us"
            fullWidth
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-ghost p-2"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/*
       * Portal the drawer into document.body so it escapes the sticky header's
       * stacking context (position:sticky + z-index + backdrop-blur all trap
       * fixed children, which is what caused the page content behind to bleed
       * through the drawer). Portaling to <body> guarantees a full-viewport
       * overlay above everything else.
       */}
      {open && mounted && createPortal(drawer, document.body)}
    </div>
  );
}
