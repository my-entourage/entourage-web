"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

interface FlowSectionProps {
  className?: string;
}

const inputSources = [
  { label: "Meetings", icon: "lucide:calendar" },
  { label: "Messages", icon: "lucide:message-square" },
  { label: "Emails", icon: "lucide:mail" },
  { label: "Documents", icon: "lucide:file-text" },
];

export function FlowSection({ className }: FlowSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-background", className)}>
      <Container>
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            How it works
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-black dark:text-white">
            From chaos to clarity
          </h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Entourage processes your communications and surfaces actionable tasks
          </p>
        </div>

        <div className="relative flex flex-col items-center max-w-2xl mx-auto">
          {/* Input source badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl">
            {inputSources.map((source) => (
              <div
                key={source.label}
                className="flex items-center justify-center gap-2.5 px-4 py-3 md:px-5 md:py-3.5 border border-zinc-300 dark:border-zinc-700 bg-background"
              >
                <Icon
                  icon={source.icon}
                  size={18}
                  className="text-zinc-500 dark:text-zinc-400"
                />
                <span className="text-sm md:text-base font-mono text-black dark:text-white">
                  {source.label}
                </span>
              </div>
            ))}
          </div>

          {/* Simple connecting line */}
          <div className="flex flex-col items-center py-4">
            <div className="h-6 w-px border-l border-dashed border-zinc-200 dark:border-zinc-800" />
            <div className="text-zinc-400 dark:text-zinc-600 text-xs">▼</div>
          </div>

          {/* Main processing box */}
          <div className="relative w-full flex flex-col items-center">
            <div className="relative z-10 w-full max-w-md border border-dashed border-zinc-200 dark:border-zinc-800 bg-background">
              {/* Plus corners */}
              <svg
                className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M12 6v12m6-6H6" />
              </svg>
              <svg
                className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M12 6v12m6-6H6" />
              </svg>
              <svg
                className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M12 6v12m6-6H6" />
              </svg>
              <svg
                className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M12 6v12m6-6H6" />
              </svg>

              {/* Title badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-background px-3 py-1">
                <Icon icon="lucide:sparkles" size={12} className="text-black dark:text-white" />
                <span className="ml-2 text-xs font-mono text-black dark:text-white">
                  AI Processing
                </span>
              </div>

              {/* Content */}
              <div className="relative overflow-hidden py-12 px-6">
                {/* Pulse rings */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-zinc-200 dark:border-zinc-800"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-zinc-200 dark:border-zinc-800"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-zinc-200 dark:border-zinc-800"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.05, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />

                {/* Center logo */}
                <div className="relative z-10 flex flex-col items-center">
                  <LogoMark size={48} className="text-black dark:text-white" />
                  <span className="mt-3 text-sm font-semibold text-black dark:text-white">
                    Entourage
                  </span>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 text-center max-w-[200px] mt-1">
                    Analyzes &amp; organizes into actionable tasks
                  </span>
                </div>

                {/* Floating badges */}
                <div className="absolute top-4 left-4 border border-zinc-200 dark:border-zinc-800 bg-background px-2 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Icon icon="lucide:scan-text" size={12} />
                  <span>Extract</span>
                </div>
                <div className="absolute bottom-4 right-4 border border-zinc-200 dark:border-zinc-800 bg-background px-2 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Icon icon="lucide:list-checks" size={12} />
                  <span>Organize</span>
                </div>
              </div>
            </div>

            {/* Output arrow and tasks */}
            <div className="flex flex-col items-center mt-4">
              <div className="h-6 w-px border-l border-dashed border-zinc-200 dark:border-zinc-800" />
              <div className="text-zinc-400 dark:text-zinc-600 text-xs">▼</div>
              <div className="mt-4 flex items-center gap-3 border border-black dark:border-white bg-background px-4 py-2">
                <Icon icon="lucide:clipboard-check" size={20} className="text-black dark:text-white" />
                <span className="text-sm font-mono text-black dark:text-white">Your Tasks</span>
                <div className="w-4 h-4 bg-green-500 flex items-center justify-center">
                  <Icon icon="lucide:check" size={10} className="text-white" />
                </div>
              </div>
              <span className="mt-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                You approve
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
