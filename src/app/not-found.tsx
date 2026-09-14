import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        404
      </span>
      <h1 className="mt-4 font-serif text-4xl font-bold text-navy sm:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The property or page you are looking for may have moved or is no longer
        available. Explore our latest properties instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/properties" className="btn-primary">
          Browse Properties
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link href="/" className="btn-outline">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
