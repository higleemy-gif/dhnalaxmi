"use client";

import Link from "next/link";
import { buildWhatsAppLink, buildTelLink, generalInquiryMessage } from "@/lib/format";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";

/**
 * Native-feeling sticky bottom action bar on mobile only.
 * Adds bottom padding to the body via a spacer so it never covers content.
 */
export function MobileStickyCTA() {
  const whatsappLink = buildWhatsAppLink(generalInquiryMessage());
  const telLink = buildTelLink();

  return (
    <>
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2 p-2">
          <a
            href={whatsappLink ?? "/contact"}
            target={whatsappLink ? "_blank" : undefined}
            rel={whatsappLink ? "noopener noreferrer" : undefined}
            className="btn-whatsapp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          {telLink ? (
            <a href={telLink} className="btn-navy">
              <PhoneIcon className="h-4 w-4" />
              Call
            </a>
          ) : (
            <Link href="/contact" className="btn-navy">
              <PhoneIcon className="h-4 w-4" />
              Contact
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
