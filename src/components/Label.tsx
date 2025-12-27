"use client";

import { Label as ShadcnLabel } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type LabelProps = ComponentProps<typeof ShadcnLabel>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <ShadcnLabel
      className={cn(
        "text-sm font-medium",
        "text-black dark:text-white",
        className
      )}
      {...props}
    />
  );
}
