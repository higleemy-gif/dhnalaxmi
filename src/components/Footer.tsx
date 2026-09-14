import Link from "next/link";
import { Logo } from "@/components/Logo";
import { navLinks } from "@/components/nav-links";
import { siteConfig, hasWhatsApp, hasPhone } from "@/config/site";
import {
  buildWhatsAppLink,
  buildTelLink,
  generalInquiryMessage,
} from "@/lib/format";
import { MapPinIcon, PhoneIcon, MailIcon, WhatsAppIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappLink = buildWhatsAppLink(generalInquiryMessage());
  const telLink = buildTelLink();
  const addressParts = [
    siteConfig.address.line1,
    siteConfig.address.city,
    siteConfig.address.district !== siteConfig.address.city
      ? siteConfig.address.district
      : "",
    siteConfig.address.state,
    siteConfig.address.pincode,
  ].filter(Boolean);

  return (
    <footer className="mt-20 bg-navy text-navy-100">
      <div className="h-1 w-full bg-gold" />
      <div className="container-content grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/80">
            Helping buyers find residential plots and houses in prime locations
            across Rayagada, Odisha, and connecting property owners with genuine
            buyers.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-navy-100/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-100/80">
            {addressParts.length > 0 && (
              <li className="flex gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{addressParts.join(", ")}</span>
              </li>
            )}
            {hasPhone() && telLink && (
              <li className="flex gap-2.5">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={telLink} className="hover:text-gold">
                  {siteConfig.phone}
                </a>
              </li>
            )}
            {siteConfig.email && (
              <li className="flex gap-2.5">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
            )}
            {!hasPhone() && !siteConfig.email && addressParts.length === 0 && (
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Get in touch with us
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Get Started
          </h3>
          <div className="mt-4 space-y-3">
            {hasWhatsApp() && whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Us
              </a>
            ) : (
              <Link href="/contact" className="btn-whatsapp w-full">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Us
              </Link>
            )}
            <Link href="/sell" className="btn-primary w-full">
              Sell Your Property
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-100/70 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All Rights Reserved.
          </p>
          <p>Residential &bull; Commercial &bull; Property Solutions</p>
        </div>
      </div>
    </footer>
  );
}
