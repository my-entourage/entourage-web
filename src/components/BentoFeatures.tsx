"use client";

import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { PlusCornerCard } from "./ui/PlusCornerCard";
import { Icon } from "./Icon";
import { IntegrationsCard } from "./bento/IntegrationsCard";
import { DataVaultCard } from "./bento/DataVaultCard";

interface BentoFeaturesProps {
  className?: string;
}

export function BentoFeatures({ className }: BentoFeaturesProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-background", className)}>
      <Container>
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Features
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-black dark:text-white">
            Everything you need
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Integrations Card - 2x2 */}
          <div className="md:col-span-2 md:row-span-2">
            <IntegrationsCard />
          </div>

          {/* Data Vault Card - 1x2 */}
          <div className="md:row-span-2">
            <DataVaultCard />
          </div>

          {/* Human in the Loop Card - 1x1 */}
          <PlusCornerCard className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="w-12 h-12 border border-black dark:border-white flex items-center justify-center mb-4">
              <Icon icon="lucide:user-check" size={24} className="text-black dark:text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Human in the Loop
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Review and approve before tasks sync
            </p>
          </PlusCornerCard>

          {/* Never Miss a Task Card - 1x1 */}
          <PlusCornerCard className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="w-12 h-12 border border-black dark:border-white flex items-center justify-center mb-4">
              <Icon icon="lucide:list-checks" size={24} className="text-black dark:text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Never Miss a Task
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Auto-capture from meetings and chats
            </p>
          </PlusCornerCard>
        </div>
      </Container>
    </section>
  );
}
