import { buildWhatsAppLink } from "@/lib/format";
import { WhatsAppIcon } from "@/components/icons";

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Opens WhatsApp with a pre-filled, property-specific message.
 * When no WhatsApp number is configured yet (see src/config/site.ts) the button
 * gracefully degrades: it points the user to the contact page instead of a
 * broken/fake number.
 */
export function WhatsAppButton({
  message,
  label = "WhatsApp",
  className = "",
  fullWidth = false,
}: WhatsAppButtonProps) {
  const link = buildWhatsAppLink(message);
  const width = fullWidth ? "w-full" : "";
  const accessibleLabel = label || "WhatsApp inquiry";

  if (!link) {
    return (
      <a
        href="/contact"
        className={`btn-whatsapp ${width} ${className}`}
        aria-label="Contact us on WhatsApp"
        title="WhatsApp number will be available soon — tap to contact us"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-whatsapp ${width} ${className}`}
      aria-label={accessibleLabel}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  );
}
