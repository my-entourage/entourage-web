"use client";

import { cn } from "@/lib/utils";
import { Container } from "../../ui/Container";
import { Icon } from "../../Icon";
import { LogoMark } from "../../Logo";
import { PlusCorner } from "../../ui/PlusCorner";

interface FlowSectionProps {
  className?: string;
}

const inputSources = [
  { label: "Meetings", icon: "lucide:calendar" },
  { label: "Messages", icon: "lucide:message-square" },
  { label: "Emails", icon: "lucide:mail" },
  { label: "Documents", icon: "lucide:file-text" },
];

// =============================================================================
// PATH DEFINITIONS - These coordinates are used for both SVG and CSS offset-path
// =============================================================================

// Desktop paths (viewBox 0 0 400 500)
// Badge bottoms: y ≈ 30 | AI Box top: y = 110 (22%)
// Lines go straight down, then converge AT the AI box entry point
const desktopPaths = [
  "M 50 30 v 72 q 0 8 8 8 h 134 q 8 0 8 8 v 282",   // down to y=102, curve at y=110, converge at x=200
  "M 150 30 v 72 q 0 8 8 8 h 34 q 8 0 8 8 v 282",   // down to y=102, curve at y=110, converge at x=200
  "M 250 30 v 72 q 0 8 -8 8 h -34 q -8 0 -8 8 v 282", // down to y=102, curve at y=110, converge at x=200
  "M 350 30 v 72 q 0 8 -8 8 h -134 q -8 0 -8 8 v 282", // down to y=102, curve at y=110, converge at x=200
];

// Mobile paths (viewBox 0 0 300 500)
// Badge bottoms: Row 1 y ≈ 28, Row 2 y ≈ 88 | AI Box top: y = 140 (28%)
// Lines go straight down, then converge AT the AI box entry point
const mobilePaths = [
  "M 75 28 v 104 q 0 8 8 8 h 59 q 8 0 8 8 v 262",    // Row 1 left: down to y=132, curve at y=140
  "M 225 28 v 104 q 0 8 -8 8 h -59 q -8 0 -8 8 v 262", // Row 1 right: down to y=132, curve at y=140
  "M 75 88 v 44 q 0 8 8 8 h 59 q 8 0 8 8 v 262",    // Row 2 left: down to y=132, curve at y=140
  "M 225 88 v 44 q 0 8 -8 8 h -59 q -8 0 -8 8 v 262", // Row 2 right: down to y=132, curve at y=140
];

export function FlowSection({ className }: FlowSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-background", className)}>
      <Container>
        {/* Header - outside fixed aspect container */}
        <div className="text-center mb-8 md:mb-12">
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

        {/* =====================================================================
            DESKTOP LAYOUT (md+) - Fixed aspect ratio 4:5
            ===================================================================== */}
        <div className="hidden md:block relative mx-auto max-w-xl aspect-[4/5]">
          {/* SVG Circuit Lines with animated signals */}
          <svg
            className="absolute inset-0 w-full h-full text-zinc-300 dark:text-zinc-700"
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Definitions for masks and filters */}
            <defs>
              {/* Glow filter for signal dots */}
              <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Masks for each path */}
              {desktopPaths.map((d, i) => (
                <mask key={`mask-${i}`} id={`flow-mask-desktop-${i + 1}`}>
                  <path d={d} strokeWidth="2" stroke="white" fill="none" />
                </mask>
              ))}
            </defs>

            {/* Static circuit paths with draw-in animation */}
            <g
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              strokeDasharray="800 800"
              pathLength="800"
            >
              {desktopPaths.map((d, i) => (
                <path key={i} d={d}>
                  <animate
                    attributeName="stroke-dashoffset"
                    from="800"
                    to="0"
                    dur="1.5s"
                    fill="freeze"
                    calcMode="spline"
                    keySplines="0.25,0.1,0.5,1"
                    keyTimes="0; 1"
                  />
                </path>
              ))}
            </g>

            {/* Animated signal dots - CSS offset-path with color transformation */}
            <g mask="url(#flow-mask-desktop-1)">
              <circle className="flow-signal flow-signal-desktop-1" cx="0" cy="0" r="3" filter="url(#flow-glow)" />
            </g>
            <g mask="url(#flow-mask-desktop-2)">
              <circle className="flow-signal flow-signal-desktop-2" cx="0" cy="0" r="3" filter="url(#flow-glow)" />
            </g>
            <g mask="url(#flow-mask-desktop-3)">
              <circle className="flow-signal flow-signal-desktop-3" cx="0" cy="0" r="3" filter="url(#flow-glow)" />
            </g>
            <g mask="url(#flow-mask-desktop-4)">
              <circle className="flow-signal flow-signal-desktop-4" cx="0" cy="0" r="3" filter="url(#flow-glow)" />
            </g>
          </svg>

          {/* Input badges - positioned at top */}
          <div
            className="absolute left-0 right-0 grid grid-cols-4 gap-3 px-[2%]"
            style={{ top: '2%' }}
          >
            {inputSources.map((source) => (
              <div
                key={source.label}
                className="flex items-center justify-center gap-2 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-background"
              >
                <Icon icon={source.icon} size={16} className="text-zinc-500 dark:text-zinc-400" />
                <span className="text-sm font-mono text-black dark:text-white">{source.label}</span>
              </div>
            ))}
          </div>

          {/* AI Processing Box - centered */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[65%]"
            style={{ top: '22%', height: '40%' }}
          >
            <div className="relative w-full h-full border border-dashed border-zinc-200 dark:border-zinc-800 bg-background">
              {/* Plus corners */}
              <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />

              {/* Title badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 bg-background px-3 py-1">
                <Icon icon="lucide:sparkles" size={12} className="text-black dark:text-white" />
                <span className="text-xs font-mono text-black dark:text-white">AI Processing</span>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Processing pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flow-processing-ring flow-processing-ring-1" />
                  <div className="flow-processing-ring flow-processing-ring-2" />
                  <div className="flow-processing-ring flow-processing-ring-3" />
                </div>

                {/* Logo and text */}
                <LogoMark size={48} className="text-black dark:text-white" />
                <span className="mt-3 text-sm font-semibold text-black dark:text-white">Entourage</span>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 text-center max-w-[180px] mt-1">
                  Analyzes &amp; organizes into actionable tasks
                </span>
              </div>

              {/* Floating badges */}
              <div className="absolute top-3 left-3 border border-zinc-200 dark:border-zinc-800 bg-background px-2 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <Icon icon="lucide:scan-text" size={12} />
                <span>Extract</span>
              </div>
              <div className="absolute bottom-3 right-3 border border-zinc-200 dark:border-zinc-800 bg-background px-2 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <Icon icon="lucide:list-checks" size={12} />
                <span>Organize</span>
              </div>
            </div>
          </div>

          {/* Tasks output - at bottom */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ top: '80%' }}
          >
            <div className="flow-task-arrive flex items-center gap-3 border border-black dark:border-white bg-background px-4 py-2">
              <Icon icon="lucide:clipboard-check" size={20} className="text-black dark:text-white" />
              <span className="text-sm font-mono text-black dark:text-white">Your Tasks</span>
              <div className="flow-checkmark-bounce w-4 h-4 bg-emerald-500 flex items-center justify-center">
                <Icon icon="lucide:check" size={10} className="text-white" />
              </div>
            </div>
            <span className="mt-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">You approve</span>
          </div>
        </div>

        {/* =====================================================================
            MOBILE LAYOUT (<md) - Fixed aspect ratio 3:5
            ===================================================================== */}
        <div className="md:hidden relative mx-auto max-w-xs aspect-[3/5]">
          {/* SVG Circuit Lines with animated signals */}
          <svg
            className="absolute inset-0 w-full h-full text-zinc-300 dark:text-zinc-700"
            viewBox="0 0 300 500"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Definitions for masks and filters */}
            <defs>
              {/* Glow filter for signal dots */}
              <filter id="flow-glow-mobile" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Masks for each path */}
              {mobilePaths.map((d, i) => (
                <mask key={`mask-${i}`} id={`flow-mask-mobile-${i + 1}`}>
                  <path d={d} strokeWidth="2" stroke="white" fill="none" />
                </mask>
              ))}
            </defs>

            {/* Static circuit paths with draw-in animation */}
            <g
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              strokeDasharray="600 600"
              pathLength="600"
            >
              {mobilePaths.map((d, i) => (
                <path key={i} d={d}>
                  <animate
                    attributeName="stroke-dashoffset"
                    from="600"
                    to="0"
                    dur="1.5s"
                    fill="freeze"
                    calcMode="spline"
                    keySplines="0.25,0.1,0.5,1"
                    keyTimes="0; 1"
                  />
                </path>
              ))}
            </g>

            {/* Animated signal dots - CSS offset-path with color transformation */}
            <g mask="url(#flow-mask-mobile-1)">
              <circle className="flow-signal flow-signal-mobile-1" cx="0" cy="0" r="2.5" filter="url(#flow-glow-mobile)" />
            </g>
            <g mask="url(#flow-mask-mobile-2)">
              <circle className="flow-signal flow-signal-mobile-2" cx="0" cy="0" r="2.5" filter="url(#flow-glow-mobile)" />
            </g>
            <g mask="url(#flow-mask-mobile-3)">
              <circle className="flow-signal flow-signal-mobile-3" cx="0" cy="0" r="2.5" filter="url(#flow-glow-mobile)" />
            </g>
            <g mask="url(#flow-mask-mobile-4)">
              <circle className="flow-signal flow-signal-mobile-4" cx="0" cy="0" r="2.5" filter="url(#flow-glow-mobile)" />
            </g>
          </svg>

          {/* Input badges - 2x2 grid */}
          <div
            className="absolute left-0 right-0 grid grid-cols-2 gap-2 px-[4%]"
            style={{ top: '2%' }}
          >
            {inputSources.map((source) => (
              <div
                key={source.label}
                className="flex items-center justify-center gap-1.5 py-2 border border-zinc-300 dark:border-zinc-700 bg-background"
              >
                <Icon icon={source.icon} size={14} className="text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs font-mono text-black dark:text-white">{source.label}</span>
              </div>
            ))}
          </div>

          {/* AI Processing Box */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[80%]"
            style={{ top: '28%', height: '38%' }}
          >
            <div className="relative w-full h-full border border-dashed border-zinc-200 dark:border-zinc-800 bg-background">
              <PlusCorner className="absolute -top-2 -left-2 w-4 h-4 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -top-2 -right-2 w-4 h-4 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -bottom-2 -left-2 w-4 h-4 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -bottom-2 -right-2 w-4 h-4 text-zinc-400 dark:text-zinc-600" />

              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 border border-zinc-300 dark:border-zinc-700 bg-background px-2 py-0.5">
                <Icon icon="lucide:sparkles" size={10} className="text-black dark:text-white" />
                <span className="text-[10px] font-mono text-black dark:text-white">AI Processing</span>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flow-processing-ring flow-processing-ring-1" />
                  <div className="flow-processing-ring flow-processing-ring-2" />
                  <div className="flow-processing-ring flow-processing-ring-3" />
                </div>

                <LogoMark size={36} className="text-black dark:text-white" />
                <span className="mt-2 text-xs font-semibold text-black dark:text-white">Entourage</span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 text-center max-w-[140px] mt-1">
                  Analyzes &amp; organizes into actionable tasks
                </span>
              </div>
            </div>
          </div>

          {/* Tasks output */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ top: '82%' }}
          >
            <div className="flow-task-arrive flex items-center gap-2 border border-black dark:border-white bg-background px-3 py-1.5">
              <Icon icon="lucide:clipboard-check" size={16} className="text-black dark:text-white" />
              <span className="text-xs font-mono text-black dark:text-white">Your Tasks</span>
              <div className="flow-checkmark-bounce w-3.5 h-3.5 bg-emerald-500 flex items-center justify-center">
                <Icon icon="lucide:check" size={8} className="text-white" />
              </div>
            </div>
            <span className="mt-1.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">You approve</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
