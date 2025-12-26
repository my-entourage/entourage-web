import { cn } from "@/lib/utils";

interface PlusCornerProps {
  className?: string;
  interactive?: boolean;
}

export function PlusCorner({ className, interactive = false }: PlusCornerProps) {
  return (
    <svg
      className={cn(
        className,
        interactive && "transition-colors duration-150 group-hover:text-zinc-500 dark:group-hover:text-zinc-500"
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  );
}
