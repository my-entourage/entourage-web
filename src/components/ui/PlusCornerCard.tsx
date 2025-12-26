import { cn } from "@/lib/utils";
import { PlusCorner } from "./PlusCorner";

interface PlusCornerCardProps {
  children: React.ReactNode;
  className?: string;
  dashed?: boolean;
  interactive?: boolean;
}

export function PlusCornerCard({
  children,
  className,
  dashed = true,
  interactive = false,
}: PlusCornerCardProps) {
  return (
    <div
      className={cn(
        "relative",
        interactive && "group",
        dashed
          ? "border border-dashed border-zinc-300 dark:border-zinc-700"
          : "border border-zinc-300 dark:border-zinc-700",
        "bg-background",
        className
      )}
    >
      <PlusCorner interactive={interactive} className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner interactive={interactive} className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner interactive={interactive} className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner interactive={interactive} className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      {children}
    </div>
  );
}
