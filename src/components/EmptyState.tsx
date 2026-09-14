import { BuildingIcon } from "@/components/icons";

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy">
        <BuildingIcon className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
      {message && <p className="mt-2 max-w-md text-sm text-muted">{message}</p>}
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="btn-outline mt-6">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
