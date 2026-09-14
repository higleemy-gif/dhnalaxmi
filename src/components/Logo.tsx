import Image from "next/image";
import Link from "next/link";
import logoImage from "../../public/logo.png";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  /** Reserved for future compact variants; not currently used. */
  withText?: boolean;
}

/**
 * The official Dhana Laxmi Construction logo, sourced from the client's live
 * site (wp-content/uploads/2026/08/Untitled-design-9.png) and stored locally
 * at /public/logo.png so it is bundled with the deploy and served over the
 * project's own domain.
 *
 * The single image already contains the building mark plus the "DhanaLaxmi
 * CONSTRUCTION" wordmark, so we render it as a whole rather than combining an
 * SVG mark with type. `next/image` gives us automatic responsive sizes.
 */
export function LogoImage({
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 120px, 160px",
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={logoImage}
      alt="Dhana Laxmi Construction"
      priority={priority}
      placeholder="blur"
      sizes={sizes}
      className={className}
    />
  );
}

/**
 * Backwards-compatible alias. Kept so any spot that previously used a compact
 * "mark" still renders the real logo without extra wiring.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return <LogoImage className={className} />;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";
  // The logo has a white background, so on dark backgrounds we drop it into a
  // small white plaque so it stays crisp and legible.
  const wrapperBase =
    "inline-flex items-center transition-transform duration-200 hover:scale-[1.02]";
  const wrapper = isLight
    ? `${wrapperBase} rounded-lg bg-white/95 px-2.5 py-1.5 shadow-sm`
    : wrapperBase;

  return (
    <Link
      href="/"
      aria-label="Dhana Laxmi Construction — home"
      className={`${wrapper} ${className}`}
    >
      <LogoImage
        priority
        className="h-11 w-auto sm:h-12 lg:h-14"
      />
    </Link>
  );
}
