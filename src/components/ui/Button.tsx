import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
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
      "bg-white text-black border border-black hover:bg-zinc-100 rounded-full",
    ghost:
      "bg-transparent text-black hover:bg-zinc-100 border border-transparent hover:border-zinc-200 rounded-full",
  };

  const sizes = {
    default: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
