import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<typeof ShadcnInput>;

export function Input({ className, ...props }: InputProps) {
  return (
    <ShadcnInput
      className={cn(
        "rounded-none",
        "border-zinc-300 dark:border-zinc-700",
        "bg-white dark:bg-black",
        "text-black dark:text-white",
        "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
        "focus-visible:border-black dark:focus-visible:border-white",
        "focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white",
        className
      )}
      {...props}
    />
  );
}
