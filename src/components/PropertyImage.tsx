"use client";

import { useState } from "react";
import { ImageOffIcon } from "@/components/icons";

interface PropertyImageProps {
  src?: string;
  alt: string;
  className?: string;
  /** Loading priority for the first/hero image. */
  priority?: boolean;
  sizes?: string;
}

/**
 * Property image with a professional "No image available" fallback that is
 * shown both when there is no source AND when the remote image fails to load.
 * Uses native lazy loading (unless `priority`) so lists stay fast.
 */
export function PropertyImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
}: PropertyImageProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-navy-50 text-navy-300 ${className}`}
        role="img"
        aria-label={`${alt} — no image available`}
      >
        <ImageOffIcon className="h-8 w-8" />
        <span className="text-xs font-medium">No image available</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
