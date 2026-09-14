import Image from "next/image";
import Link from "next/link";
import bannerBg from "../../public/banner-bg.png";
import { ArrowRightIcon, ShieldIcon, CheckIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Full-bleed banner background — uses the client's supplied artwork. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={bannerBg}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
        {/*
         * Dark navy overlay so the headline and CTAs stay legible over the
         * artwork on every screen size. Slightly stronger on the left to give
         * the copy a comfortable reading surface, softer on the right so the
         * banner artwork still shows through.
         */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/65 to-navy-900/45" />
        <div className="absolute inset-0 bg-navy-900/25" />
      </div>

      {/* Content */}
      <div className="container-content relative py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Rayagada &bull; Odisha
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.1] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            Find the Right{" "}
            <span className="text-gold">Property</span> for Your Future
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-100/90 sm:text-lg">
            Explore residential plots, houses and properties in prime locations
            with Dhana Laxmi Construction.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/properties" className="btn-primary">
              Explore Properties
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/sell"
              className="btn border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              Sell Your Property
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.18em] text-navy-100/80">
            <li className="inline-flex items-center gap-2">
              <ShieldIcon className="h-4 w-4 text-gold" /> Residential
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-gold" /> Commercial
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-gold" /> Property Solutions
            </li>
          </ul>
        </div>
      </div>

      {/* Gold bottom accent */}
      <div className="relative h-1 w-full bg-gold" />
    </section>
  );
}
