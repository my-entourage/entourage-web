"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

// Dashed connector line - vertical or horizontal
function Connector({ direction = "vertical" }: { direction?: "vertical" | "horizontal" }) {
  const isVertical = direction === "vertical";

  return (
    <div className={`flex items-center justify-center ${isVertical ? "h-10 w-px" : "w-10 h-px md:w-12 lg:w-16"}`}>
      <div
        className={`
          ${isVertical ? "h-full w-px" : "w-full h-px"}
          border-black border-dashed
          ${isVertical ? "border-l" : "border-t"}
        `}
      />
    </div>
  );
}

// Input sources section with Iconify icons
function InputSources() {
  const sources = [
    { icon: "lucide:calendar", label: "Meetings" },
    { icon: "lucide:message-circle", label: "Chat" },
    { icon: "line-md:email", label: "Email" },
    { icon: "lucide:audio-lines", label: "Voice" },
  ];

  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
        Your Communications
      </span>
      <div className="flex gap-6 md:gap-4 lg:gap-6">
        {sources.map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon icon={icon} size={24} className="text-black" />
            <span className="text-[11px] font-mono text-zinc-500">{label}</span>
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
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-black bg-white flex items-center justify-center animate-pulse-slow">
        <LogoMark size={40} />
      </div>
    </div>
  );
}

// Human review section with Iconify icon
function HumanReview() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon icon="line-md:account" size={32} className="text-black" />
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Human-in-the-loop</span>
        <span className="text-[11px] font-mono text-zinc-500">You Approve</span>
      </div>
    </div>
  );
}

// Task card component with Iconify icons
function TaskCard({ action }: { action: "add" | "modify" | "complete" }) {
  const config = {
    add: { color: "text-green-500", bg: "bg-green-500/15", icon: "line-md:plus" },
    modify: { color: "text-amber-500", bg: "bg-amber-500/15", icon: "lucide:pencil" },
    complete: { color: "text-zinc-400", bg: "bg-zinc-400/15", icon: "line-md:check", strike: true },
  };

  const { color, bg, icon, strike } = config[action] as { color: string; bg: string; icon: string; strike?: boolean };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-black rounded-md w-28 md:w-32">
      <div className={`p-1 rounded ${bg}`}>
        <Icon icon={icon} size={12} className={color} />
      </div>
      <div className="flex-1 space-y-1">
        <div className={`h-1.5 bg-zinc-300 rounded w-full ${strike ? "line-through" : ""}`} />
        <div className="h-1.5 bg-zinc-200 rounded w-3/4" />
      </div>
    </div>
  );
}

// Tasks section
function TasksSection() {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
        Your Tasks
      </span>
      <div className="flex flex-col gap-2">
        <TaskCard action="add" />
        <TaskCard action="modify" />
        <TaskCard action="complete" />
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-green-500/30" />
          <span className="text-[8px] font-mono text-zinc-400">Add</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-amber-500/30" />
          <span className="text-[8px] font-mono text-zinc-400">Edit</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-zinc-400/30" />
          <span className="text-[8px] font-mono text-zinc-400">Done</span>
        </div>
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
            <TasksSection />
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <InputSources />
            <Connector direction="horizontal" />
            <AINode />
            <Connector direction="horizontal" />
            <HumanReview />
            <Connector direction="horizontal" />
            <TasksSection />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
