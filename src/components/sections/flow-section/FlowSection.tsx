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
// Lines go down briefly, converge horizontally ABOVE the AI box, then drop into it
const desktopPaths = [
  "M 50 30 v 30 q 0 8 8 8 h 134 q 8 0 8 8 v 324",   // horizontal at y=68, well above AI box
  "M 150 30 v 30 q 0 8 8 8 h 34 q 8 0 8 8 v 324",   // horizontal at y=68
  "M 250 30 v 30 q 0 8 -8 8 h -34 q -8 0 -8 8 v 324", // horizontal at y=68
  "M 350 30 v 30 q 0 8 -8 8 h -134 q -8 0 -8 8 v 324", // horizontal at y=68
];

// Mobile paths (viewBox 0 0 300 500)
// Badge bottoms: Row 1 y ≈ 28, Row 2 y ≈ 88 | AI Box top: y = 140 (28%)
// Lines go down briefly, converge horizontally ABOVE the AI box
const mobilePaths = [
  "M 75 28 v 62 q 0 8 8 8 h 59 q 8 0 8 8 v 304",    // Row 1 left: horizontal at y=98
  "M 225 28 v 62 q 0 8 -8 8 h -59 q -8 0 -8 8 v 304", // Row 1 right: horizontal at y=98
  "M 75 88 v 2 q 0 8 8 8 h 59 q 8 0 8 8 v 304",     // Row 2 left: horizontal at y=98
  "M 225 88 v 2 q 0 8 -8 8 h -59 q -8 0 -8 8 v 304",  // Row 2 right: horizontal at y=98
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
            <defs>
              {/* Radial gradient with animated amber→emerald color transition */}
              <radialGradient id="flow-signal-gradient" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#F59E0B">
                  <animate
                    attributeName="stop-color"
                    values="#F59E0B;#F59E0B;#10B981;#10B981"
                    keyTimes="0;0.3;0.7;1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              {/* Masks for each path */}
              {desktopPaths.map((d, i) => (
                <mask key={`mask-${i}`} id={`flow-mask-desktop-${i + 1}`}>
                  <path d={d} strokeWidth="3" stroke="white" fill="none" />
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

            {/* Animated signal dots - masked with radial gradient */}
            {desktopPaths.map((d, i) => (
              <g key={i} mask={`url(#flow-mask-desktop-${i + 1})`}>
                <circle r="8" fill="url(#flow-signal-gradient)">
                  <animateMotion
                    path={d}
                    dur={`${3.5 + i * 0.5}s`}
                    begin={`${1.5 + i * 0.3}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                    keyTimes="0;1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.9;1"
                    dur={`${3.5 + i * 0.5}s`}
                    begin={`${1.5 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
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
                {/* Logo and text */}
                <LogoMark size={48} className="text-black dark:text-white" />
                <span className="mt-3 text-sm font-semibold text-black dark:text-white">Entourage</span>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 text-center max-w-[180px] mt-1">
                  Analyzes &amp; organizes into actionable tasks
                </span>
              </div>

              {/* Floating badges with staggered pulse animation */}
              <div
                className="flow-action-badge absolute top-3 left-3 border border-zinc-200 dark:border-zinc-700 bg-background px-2 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1"
                style={{ animationDelay: '0s' }}
              >
                <Icon icon="lucide:scan-text" size={12} />
                <span>Extract</span>
              </div>
              <div
                className="flow-action-badge absolute bottom-3 right-3 border border-zinc-200 dark:border-zinc-700 bg-background px-2 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1"
                style={{ animationDelay: '0.3s' }}
              >
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
            <defs>
              {/* Radial gradient with animated amber→emerald color transition */}
              <radialGradient id="flow-signal-gradient-mobile" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#F59E0B">
                  <animate
                    attributeName="stop-color"
                    values="#F59E0B;#F59E0B;#10B981;#10B981"
                    keyTimes="0;0.3;0.7;1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              {/* Masks for each path */}
              {mobilePaths.map((d, i) => (
                <mask key={`mask-${i}`} id={`flow-mask-mobile-${i + 1}`}>
                  <path d={d} strokeWidth="3" stroke="white" fill="none" />
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

            {/* Animated signal dots - masked with radial gradient */}
            {mobilePaths.map((d, i) => (
              <g key={i} mask={`url(#flow-mask-mobile-${i + 1})`}>
                <circle r="6" fill="url(#flow-signal-gradient-mobile)">
                  <animateMotion
                    path={d}
                    dur={`${3.5 + i * 0.5}s`}
                    begin={`${1.5 + i * 0.3}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                    keyTimes="0;1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.9;1"
                    dur={`${3.5 + i * 0.5}s`}
                    begin={`${1.5 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
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
                <LogoMark size={36} className="text-black dark:text-white" />
                <span className="mt-2 text-xs font-semibold text-black dark:text-white">Entourage</span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 text-center max-w-[140px] mt-1">
                  Analyzes &amp; organizes into actionable tasks
                </span>
              </div>

              {/* Floating badges with staggered pulse animation - mobile */}
              <div
                className="flow-action-badge absolute top-2 left-2 border border-zinc-200 dark:border-zinc-700 bg-background px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1"
                style={{ animationDelay: '0s' }}
              >
                <Icon icon="lucide:scan-text" size={10} />
                <span>Extract</span>
              </div>
              <div
                className="flow-action-badge absolute bottom-2 right-2 border border-zinc-200 dark:border-zinc-700 bg-background px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1"
                style={{ animationDelay: '0.3s' }}
              >
                <Icon icon="lucide:list-checks" size={10} />
                <span>Organize</span>
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
