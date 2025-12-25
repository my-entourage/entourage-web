"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

// Dashed connector line with arrow - vertical or horizontal
function Connector({ direction = "vertical" }: { direction?: "vertical" | "horizontal" }) {
  const isVertical = direction === "vertical";

  return (
    <div className={`flex items-center justify-center ${isVertical ? "h-8 w-4" : "w-8 h-4 md:w-10 lg:w-14"}`}>
      <div className="relative flex items-center justify-center">
        {/* Dashed line */}
        <div
          className={`
            ${isVertical ? "h-6 w-px" : "w-6 h-px md:w-8 lg:w-12"}
            border-black dark:border-white border-dashed
            ${isVertical ? "border-l" : "border-t"}
          `}
        />
        {/* Arrow */}
        <div
          className={`
            absolute text-black dark:text-white text-[10px]
            ${isVertical ? "bottom-0 translate-y-1/2" : "right-0 translate-x-1/2"}
          `}
        >
          {isVertical ? "▼" : "▶"}
        </div>
      </div>
    </div>
  );
}

// Input sources section with Iconify icons
function InputSources() {
  const sources = [
    { icon: "lucide:calendar", label: "Meetings" },
    { icon: "lucide:message-circle", label: "Messages" },
    { icon: "line-md:email", label: "Email" },
    { icon: "lucide:audio-lines", label: "Transcripts" },
  ];

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
        Your Communications
      </span>
      <div className="flex gap-6 md:gap-4 lg:gap-6">
        {sources.map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon icon={icon} size={24} className="text-black dark:text-white" />
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// AI/Entourage node with E-Block logo
function AINode() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center animate-pulse-slow">
        <LogoMark size={48} />
      </div>
      <span className="text-xs font-semibold text-black dark:text-white mt-1">Entourage</span>
      <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 text-center max-w-[140px]">
        Analyzes & organizes into actionable tasks
      </span>
    </div>
  );
}

// Human review section with Iconify icon
function HumanReview() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon icon="line-md:account" size={32} className="text-black dark:text-white" />
      <div className="flex flex-col items-center">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">You Review</span>
      </div>
    </div>
  );
}

// Simplified task output section
function TasksOutput() {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
        Your Tasks
      </span>
      <div className="flex flex-col items-center gap-2">
        {/* Simplified task list representation */}
        <div className="w-24 h-20 md:w-28 md:h-24 border border-black dark:border-white bg-white dark:bg-black flex flex-col p-3 gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-green-500 flex items-center justify-center">
              <Icon icon="line-md:plus" size={8} className="text-green-500" />
            </div>
            <div className="h-1.5 bg-zinc-300 dark:bg-zinc-600 rounded flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-amber-500 flex items-center justify-center">
              <Icon icon="lucide:pencil" size={8} className="text-amber-500" />
            </div>
            <div className="h-1.5 bg-zinc-300 dark:bg-zinc-600 rounded flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-zinc-400 flex items-center justify-center">
              <Icon icon="line-md:check" size={8} className="text-zinc-400" />
            </div>
            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded flex-1 line-through" />
          </div>
        </div>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Always up to date</span>
      </div>
    </div>
  );
}

export function FlowDiagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-12 sm:py-16 md:py-24">
      <Container>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex justify-center"
        >
          {/* Mobile: Vertical layout */}
          <div className="flex flex-col items-center gap-1 md:hidden">
            <InputSources />
            <Connector direction="vertical" />
            <AINode />
            <Connector direction="vertical" />
            <HumanReview />
            <Connector direction="vertical" />
            <TasksOutput />
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <InputSources />
            <Connector direction="horizontal" />
            <AINode />
            <Connector direction="horizontal" />
            <HumanReview />
            <Connector direction="horizontal" />
            <TasksOutput />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
