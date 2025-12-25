"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";

// Icons as React components
function MicIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="2" width="8" height="12" rx="4" />
      <path d="M4 10v1a8 8 0 0 0 16 0v-1" />
      <line x1="12" y1="19" x2="12" y2="23" />
    </svg>
  );
}

function ChatIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function WaveformIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="12" x2="4" y2="12" />
      <line x1="8" y1="8" x2="8" y2="16" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="16" y1="8" x2="16" y2="16" />
      <line x1="20" y1="12" x2="20" y2="12" />
    </svg>
  );
}

function PersonIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PencilIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

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

// Input sources section
function InputSources() {
  const sources = [
    { Icon: MicIcon, label: "Meetings" },
    { Icon: ChatIcon, label: "Chat" },
    { Icon: MailIcon, label: "Email" },
    { Icon: WaveformIcon, label: "Voice" },
  ];

  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
        Your Communications
      </span>
      <div className="flex gap-6 md:gap-4 lg:gap-6">
        {sources.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon className="w-6 h-6 text-black" />
            <span className="text-[11px] font-mono text-zinc-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// AI/Entourage node
function AINode() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-black bg-white flex flex-col items-center justify-center animate-pulse-slow">
        <span className="text-lg md:text-xl font-mono font-semibold">AI</span>
        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Entourage</span>
      </div>
    </div>
  );
}

// Human review section (no circle, just icon and text)
function HumanReview() {
  return (
    <div className="flex flex-col items-center gap-1">
      <PersonIcon className="w-8 h-8 text-black" />
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Human-in-the-loop</span>
        <span className="text-[11px] font-mono text-zinc-500">You Approve</span>
      </div>
    </div>
  );
}

// Task card component
function TaskCard({ action }: { action: "add" | "modify" | "complete" }) {
  const config = {
    add: { color: "text-green-500", bg: "bg-green-500/15", Icon: PlusIcon },
    modify: { color: "text-amber-500", bg: "bg-amber-500/15", Icon: PencilIcon },
    complete: { color: "text-zinc-400", bg: "bg-zinc-400/15", Icon: CheckIcon, strike: true },
  };

  const { color, bg, Icon, strike } = config[action] as { color: string; bg: string; Icon: typeof PlusIcon; strike?: boolean };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-black rounded-md w-28 md:w-32">
      <div className={`p-1 rounded ${bg}`}>
        <Icon className={`w-3 h-3 ${color}`} />
      </div>
      <div className="flex-1 space-y-1">
        <div className={`h-1.5 ${strike ? "bg-zinc-300" : "bg-zinc-300"} rounded w-full ${strike ? "line-through" : ""}`} />
        <div className={`h-1.5 ${strike ? "bg-zinc-200" : "bg-zinc-200"} rounded w-3/4`} />
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
          transition={{ duration: 0.6, ease: "easeOut" }}
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
