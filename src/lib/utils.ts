import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Extend tailwind-merge to recognize brand semantic colors
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-color": [
        "bg-background",
        "bg-foreground",
        "bg-primary",
        "bg-secondary",
        "bg-muted",
        "bg-accent",
        "bg-destructive",
        "bg-card",
        "bg-popover",
      ],
      "text-color": [
        "text-foreground",
        "text-primary",
        "text-primary-foreground",
        "text-secondary",
        "text-secondary-foreground",
        "text-muted",
        "text-muted-foreground",
        "text-accent",
        "text-accent-foreground",
        "text-destructive",
        "text-card-foreground",
        "text-popover-foreground",
      ],
      "border-color": [
        "border-border",
        "border-input",
        "border-primary",
        "border-secondary",
        "border-destructive",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
