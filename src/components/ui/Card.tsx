import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("w-full relative", {
  variants: {
    variant: {
      default: [
        "border",
        "border-black dark:border-white",
        "bg-white dark:bg-black",
      ],
      plus: [
        "border border-dashed",
        "border-zinc-400 dark:border-zinc-600",
        "relative",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string;
  description?: string;
}

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props}>
    {props.children}
  </div>
));
CardContent.displayName = "CardContent";

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, title, description, children, ...props }, ref) => {
    const PlusIcons = () => (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          strokeWidth="1"
          stroke="currentColor"
          className="text-zinc-400 dark:text-zinc-600 size-5 absolute -top-2.5 -left-2.5"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          strokeWidth="1"
          stroke="currentColor"
          className="text-zinc-400 dark:text-zinc-600 size-5 absolute -top-2.5 -right-2.5"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          strokeWidth="1"
          stroke="currentColor"
          className="text-zinc-400 dark:text-zinc-600 size-5 absolute -bottom-2.5 -left-2.5"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          strokeWidth="1"
          stroke="currentColor"
          className="text-zinc-400 dark:text-zinc-600 size-5 absolute -bottom-2.5 -right-2.5"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </>
    );

    const content = (
      <CardContent>
        {title && (
          <h3 className="text-lg font-semibold mb-1 text-black dark:text-white">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
        )}
        {children}
      </CardContent>
    );

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {variant === "plus" && <PlusIcons />}
        {content}
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card, CardContent, cardVariants };
