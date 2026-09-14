import type { PropertyStatus } from "@/data/properties";

const styles: Record<PropertyStatus, string> = {
  Available: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  Reserved: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  Sold: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
  Unavailable: "bg-gray-100 text-gray-600 ring-1 ring-gray-500/20",
};

export function StatusBadge({
  status,
  className = "",
}: {
  status: PropertyStatus;
  className?: string;
}) {
  return (
    <span className={`badge ${styles[status]} ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
