import { cn } from "@/lib/utils";

interface PlusCornerCardProps {
  children: React.ReactNode;
  className?: string;
  dashed?: boolean;
}

function PlusCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  );
}

export function PlusCornerCard({
  children,
  className,
  dashed = true
}: PlusCornerCardProps) {
  return (
    <div
      className={cn(
        "relative",
        dashed
          ? "border border-dashed border-zinc-300 dark:border-zinc-700"
          : "border border-zinc-300 dark:border-zinc-700",
        "bg-background",
        className
      )}
    >
      <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      {children}
    </div>
  );
}
