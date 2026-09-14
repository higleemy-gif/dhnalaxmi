"use client";

import { useEffect, useState } from "react";
import { PropertyImage } from "@/components/PropertyImage";
import { CloseIcon, ArrowRightIcon, ImageOffIcon } from "@/components/icons";

interface Props {
  images: string[];
  alt: string;
}

/**
 * Main + thumbnails gallery with a lightbox for full-screen viewing.
 * Falls back to a professional "No image available" state when images is empty.
 */
export function PropertyGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Close lightbox on Escape / navigate with arrow keys.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight")
        setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, images.length]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl bg-navy-50 text-navy-300">
        <ImageOffIcon className="h-10 w-10" />
        <span className="text-sm font-medium">No image available</span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group block w-full overflow-hidden rounded-2xl bg-navy-50"
          aria-label="View full-screen"
        >
          <div className="aspect-[4/3]">
            <PropertyImage
              src={images[active]}
              alt={alt}
              priority
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </button>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={`aspect-[4/3] overflow-hidden rounded-lg border transition-all ${
                  i === active
                    ? "border-gold ring-2 ring-gold/40"
                    : "border-line hover:border-navy-300"
                }`}
              >
                <PropertyImage
                  src={src}
                  alt={`${alt} — image ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-900/95 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(false);
            }}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close full-screen"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <PropertyImage
              src={images[active]}
              alt={alt}
              className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i - 1 + images.length) % images.length);
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              >
                <ArrowRightIcon className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i + 1) % images.length);
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
