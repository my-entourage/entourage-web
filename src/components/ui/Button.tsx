import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "solid" | "secondary" | "ghost";
  size?: "default" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";

  const variants = {
    primary:
      "bg-background text-black dark:text-white border border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-none",
    solid:
      "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-none",
    secondary:
      "bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-none",
    ghost:
      "bg-transparent text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-none",
  };

  const sizes = {
    default: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
