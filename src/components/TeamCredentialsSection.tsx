"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { InfiniteSlider } from "./ui/InfiniteSlider";

interface TeamCredentialsSectionProps {
  className?: string;
}

// Plus corner SVG component for consistency
function PlusCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  );
}

// Company and university logos
const credentials = [
  { name: "DeepMind", logo: "/logos/deepmind.svg", className: "" },
  { name: "Google", logo: "/logos/google.svg", className: "" },
  { name: "McKinsey", logo: "/logos/mckinsey.svg", className: "" },
  { name: "Boeing", logo: "/logos/boeing.svg", className: "" },
  { name: "Bain", logo: "/logos/bain.svg", className: "" },
  { name: "Harvard", logo: "/logos/harvard.svg", className: "" },
  { name: "Aalto", logo: "/logos/aalto.png", className: "scale-150" },
];

export function TeamCredentialsSection({
  className,
}: TeamCredentialsSectionProps) {
  return (
    <section className={cn("py-12 md:py-16 bg-white dark:bg-black", className)}>
      <Container>
        <div className="relative mx-auto max-w-3xl">
          {/* Header with brand styling */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {/* Left dashed line with plus */}
            <div className="flex items-center gap-1 flex-1">
              <PlusCorner className="w-5 h-5 text-zinc-400 dark:text-zinc-600 shrink-0" />
              <div className="flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" />
            </div>

            {/* Label */}
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
              Built by engineers from
            </span>

            {/* Right dashed line with plus */}
            <div className="flex items-center gap-1 flex-1">
              <div className="flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" />
              <PlusCorner className="w-5 h-5 text-zinc-400 dark:text-zinc-600 shrink-0" />
            </div>
          </div>

          {/* Logo cloud */}
          <div className="overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <InfiniteSlider gap={64} reverse speed={5}>
              {credentials.map((cred) => (
                <div
                  key={cred.name}
                  className="flex items-center justify-center h-8 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                >
                  <Image
                    src={cred.logo}
                    alt={cred.name}
                    width={120}
                    height={32}
                    className={cn(
                      "h-6 md:h-8 w-auto object-contain dark:invert",
                      cred.className
                    )}
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>

          {/* Bottom divider with plus signs */}
          <div className="flex items-center gap-1 mt-8">
            <PlusCorner className="w-5 h-5 text-zinc-400 dark:text-zinc-600 shrink-0" />
            <div className="flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" />
            <PlusCorner className="w-5 h-5 text-zinc-400 dark:text-zinc-600 shrink-0" />
          </div>
        </div>
      </Container>
    </section>
  );
}
