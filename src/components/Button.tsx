"use client";

import { Button as ShadcnButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof ShadcnButton>;

/**
 * Custom Button wrapper with sharp corners (Vercel-style) + dark mode
 * Overrides the default rounded-full from ui/Button
 */
export function Button({ className, ...props }: ButtonProps) {
  return (
    <ShadcnButton
      className={cn(
        // Sharp corners + dark mode overrides
        "rounded-none",
        "dark:text-white dark:border-white dark:hover:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}
