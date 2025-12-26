"use client";

import {
  Accordion as ShadcnAccordion,
  AccordionContent as ShadcnAccordionContent,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger as ShadcnAccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AccordionProps = ComponentProps<typeof ShadcnAccordion>;
type AccordionItemProps = ComponentProps<typeof ShadcnAccordionItem>;
type AccordionTriggerProps = ComponentProps<typeof ShadcnAccordionTrigger>;
type AccordionContentProps = ComponentProps<typeof ShadcnAccordionContent>;

export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <ShadcnAccordion
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <ShadcnAccordionItem
      className={cn(
        "rounded-none border border-zinc-200 dark:border-zinc-800 px-4",
        className
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, ...props }: AccordionTriggerProps) {
  return (
    <ShadcnAccordionTrigger
      className={cn(
        "text-left text-black dark:text-white hover:no-underline py-4",
        className
      )}
      {...props}
    />
  );
}

export function AccordionContent({ className, ...props }: AccordionContentProps) {
  return (
    <ShadcnAccordionContent
      className={cn(
        "text-zinc-500 dark:text-zinc-400 pb-4",
        className
      )}
      {...props}
    />
  );
}
