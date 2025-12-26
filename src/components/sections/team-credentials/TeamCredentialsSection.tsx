"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "../../ui/Container";
import { InfiniteSlider } from "../../ui/InfiniteSlider";
import { PlusCorner } from "../../ui/PlusCorner";

interface TeamCredentialsSectionProps {
  className?: string;
}

// Company and university logos
// logoDark is optional - used when the logo needs a different version for dark mode
// Order: DeepMind and Google are spaced apart so they're not visible simultaneously
const credentials = [
  { name: "DeepMind", logo: "/logos/deepmind.svg" },
  { name: "McKinsey", logo: "/logos/mckinsey.svg" },
  { name: "Bain", logo: "/logos/bain.svg" },
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Boeing", logo: "/logos/boeing.svg" },
  { name: "Harvard", logo: "/logos/harvard.svg", logoDark: "/logos/harvard-white-text.svg" },
  { name: "Aalto", logo: "/logos/aalto.png", logoDark: "/logos/aalto-white.svg", className: "scale-150" },
];

export function TeamCredentialsSection({
  className,
}: TeamCredentialsSectionProps) {
  return (
    <section className={cn("py-12 md:py-16 bg-background", className)}>
      <Container>
        <div className="relative mx-auto max-w-3xl px-6 md:px-12">
          {/* Top border with plus corners - matching Hero pattern */}
          <div className="absolute top-0 left-0 right-0 border-t border-dashed border-zinc-200 dark:border-zinc-800" />
          <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
          <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />

          {/* Label - positioned over the top border with background to mask the line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-background px-4 text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Built by engineers from
            </span>
          </div>

          {/* Logo cloud */}
          <div className="overflow-hidden pt-8 pb-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <InfiniteSlider gap={64} reverse speed={5}>
              {credentials.map((cred) => (
                <div
                  key={cred.name}
                  className="flex items-center justify-center h-8 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                >
                  {/* Light mode logo */}
                  <Image
                    src={cred.logo}
                    alt={cred.name}
                    width={120}
                    height={32}
                    className={cn(
                      "h-6 md:h-8 w-auto object-contain",
                      cred.logoDark ? "dark:hidden" : "",
                      cred.className
                    )}
                  />
                  {/* Dark mode logo (if different) */}
                  {cred.logoDark && (
                    <Image
                      src={cred.logoDark}
                      alt={cred.name}
                      width={120}
                      height={32}
                      className={cn(
                        "h-6 md:h-8 w-auto object-contain hidden dark:block",
                        cred.className
                      )}
                    />
                  )}
                </div>
              ))}
            </InfiniteSlider>
          </div>

          {/* Bottom border with plus corners */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-zinc-200 dark:border-zinc-800" />
          <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
          <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        </div>
      </Container>
    </section>
  );
}
