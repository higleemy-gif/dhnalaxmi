import { buildTelLink } from "@/lib/format";
import { PhoneIcon } from "@/components/icons";

interface CallButtonProps {
  label?: string;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Call button. Degrades to the contact page when no phone number is configured.
 */
export function CallButton({
  label = "Call Now",
  className = "",
  fullWidth = false,
}: CallButtonProps) {
  const link = buildTelLink();
  const width = fullWidth ? "w-full" : "";

  const href = link ?? "/contact";
  return (
    <a
      href={href}
      className={`btn-outline ${width} ${className}`}
      aria-label={link ? label : "Contact us"}
      title={link ? label : "Phone number will be available soon — tap to contact us"}
    >
      <PhoneIcon className="h-4 w-4" />
      {label}
    </a>
  );
}
