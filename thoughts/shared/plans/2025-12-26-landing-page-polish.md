# Landing Page Polish - FlowDiagram, Ripple Background, Resizable Navbar

**Date**: December 26, 2025
**Status**: Implemented (awaiting manual verification)

---

## Overview

Polish the landing page with:
1. Simplified FlowDiagram (3 inputs, remove "You Review" step, add approval badge)
2. Fix Logo SVG anti-aliasing
3. Reduce spacing between logo and "Entourage" text in AINode
4. Replace BlueprintGrid with interactive ripple background effect
5. Implement Aceternity-style resizable navbar with sharp corners

## Current State Analysis

- FlowDiagram has 4 input sources (Meetings, Messages, Email, Transcripts) - redundant
- "You Review" step adds cognitive load without clear value
- BlueprintGrid is very subtle, not adding visual interest
- Navbar is static, no scroll behavior
- Logo SVG may have anti-aliasing artifacts at bar/spine seams

## Desired End State

- 3-step FlowDiagram: Communications (3 icons) → Entourage → Tasks (with approval badge)
- Interactive ripple grid background in hero section
- Navbar that shrinks/transforms on scroll
- Crisp logo rendering in all modes

## What We're NOT Doing

- Changing the hero copy or CTA
- Adding navigation links to navbar
- Mobile hamburger menu
- Changing ValueProps or Footer sections

---

## Phase 1: FlowDiagram Simplification

### Overview
Reduce input sources to 3, remove "You Review" step, add approval checkmark to task output.

### Changes Required:

#### 1. Update InputSources
**File**: `src/components/FlowDiagram.tsx`

Reduce to 3 sources:
```tsx
const sources = [
  { icon: "lucide:calendar", label: "Meetings" },
  { icon: "lucide:message-circle", label: "Messages" },
  { icon: "line-md:email", label: "Email" },
];
```

#### 2. Update AINode spacing
**File**: `src/components/FlowDiagram.tsx`

Reduce gap between logo and "Entourage" text (change `mt-1` to `mt-0.5` or remove):
```tsx
function AINode() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center animate-pulse-slow">
        <LogoMark size={48} />
      </div>
      <span className="text-xs font-semibold text-black dark:text-white">Entourage</span>
      <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 text-center max-w-[140px]">
        Analyzes & organizes into actionable tasks
      </span>
    </div>
  );
}
```

#### 3. Remove HumanReview component and its connector

Remove the `HumanReview` function and update both mobile and desktop layouts to go directly from AINode to TasksOutput.

#### 4. Add approval badge to TasksOutput
**File**: `src/components/FlowDiagram.tsx`

Add a small checkmark badge to indicate human approval:
```tsx
function TasksOutput() {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
        Your Tasks
      </span>
      <div className="flex flex-col items-center gap-2">
        {/* Task list with approval badge */}
        <div className="relative">
          <div className="w-24 h-20 md:w-28 md:h-24 border border-black dark:border-white bg-white dark:bg-black flex flex-col p-3 gap-1.5">
            {/* ... task rows ... */}
          </div>
          {/* Approval badge */}
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <Icon icon="line-md:check" size={12} className="text-white" />
          </div>
        </div>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">You approve • Always current</span>
      </div>
    </div>
  );
}
```

#### 5. Update main FlowDiagram layouts

Remove HumanReview and its connectors from both mobile and desktop:
```tsx
{/* Mobile: Vertical layout */}
<div className="flex flex-col items-center gap-1 md:hidden">
  <InputSources />
  <Connector direction="vertical" />
  <AINode />
  <Connector direction="vertical" />
  <TasksOutput />
</div>

{/* Desktop: Horizontal layout */}
<div className="hidden md:flex items-center gap-2 lg:gap-4">
  <InputSources />
  <Connector direction="horizontal" />
  <AINode />
  <Connector direction="horizontal" />
  <TasksOutput />
</div>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] FlowDiagram shows 3 input sources (Meetings, Messages, Email)
- [ ] No "You Review" step visible
- [ ] Green checkmark badge appears on task output card
- [ ] "You approve • Always current" tagline visible
- [ ] Spacing between logo and "Entourage" text is tighter
- [ ] Flow is clear: Communications → Entourage → Tasks

---

## Phase 2: Fix Logo SVG Anti-aliasing

### Overview
Fix potential white line artifacts in Logo SVG by using integer coordinates and crisp rendering.

### Changes Required:

#### 1. Update LogoMark SVG
**File**: `src/components/Logo.tsx`

```tsx
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-label="Entourage logo"
      className={className}
      shapeRendering="crispEdges"
    >
      {/* Vertical spine: 40% width */}
      <rect x="0" y="0" width="40" height="100" />
      {/* Bar 1: top - adjusted to integers */}
      <rect x="40" y="0" width="60" height="27" />
      {/* Bar 2: middle - use integer, slight overlap to prevent gaps */}
      <rect x="40" y="37" width="60" height="27" />
      {/* Bar 3: bottom */}
      <rect x="40" y="73" width="60" height="27" />
    </svg>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] No white lines visible in logo at any size
- [ ] Logo renders crisply in both light and dark modes
- [ ] Logo looks correct at different zoom levels

---

## Phase 3: Ripple Background Effect

### Overview
Replace BlueprintGrid with an interactive ripple grid effect inspired by Aceternity UI.

### Changes Required:

#### 1. Create Ripple component
**File**: `src/components/RippleGrid.tsx` (NEW)

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RippleGridProps {
  className?: string;
}

export function RippleGrid({ className }: RippleGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<{ row: number; col: number }[]>([]);
  const [rippleCenter, setRippleCenter] = useState<{ row: number; col: number } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);

  const rows = 12;
  const cols = 24;
  const cellSize = 48;

  // Generate cells on mount
  useEffect(() => {
    const newCells: { row: number; col: number }[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newCells.push({ row, col });
      }
    }
    setCells(newCells);
  }, []);

  const handleCellClick = useCallback((row: number, col: number) => {
    setRippleCenter({ row, col });
    setRippleKey((k) => k + 1);
  }, []);

  const getDistance = (r1: number, c1: number, r2: number, c2: number) => {
    return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(c1 - c2, 2));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {cells.map(({ row, col }) => {
          const distance = rippleCenter
            ? getDistance(row, col, rippleCenter.row, rippleCenter.col)
            : 0;
          const delay = distance * 50; // 50ms per unit distance

          return (
            <div
              key={`${row}-${col}-${rippleKey}`}
              className={cn(
                "border border-zinc-200/50 dark:border-zinc-800/50 transition-colors",
                "hover:border-zinc-300 dark:hover:border-zinc-700",
                rippleCenter && "animate-cell-ripple"
              )}
              style={{
                animationDelay: rippleCenter ? `${delay}ms` : undefined,
                pointerEvents: "auto",
              }}
              onClick={() => handleCellClick(row, col)}
            />
          );
        })}
      </div>
      {/* Radial fade mask */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white dark:to-black" />
    </div>
  );
}
```

#### 2. Add CSS animation
**File**: `src/app/globals.css`

Add after existing animations:
```css
@keyframes cell-ripple {
  0% {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.1);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.2);
  }
  100% {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.05);
  }
}

.dark .animate-cell-ripple {
  animation: cell-ripple-dark 600ms ease-out forwards;
}

@keyframes cell-ripple-dark {
  0% {
    background-color: transparent;
    border-color: rgba(255, 255, 255, 0.1);
  }
  50% {
    background-color: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.2);
  }
  100% {
    background-color: transparent;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.animate-cell-ripple {
  animation: cell-ripple 600ms ease-out forwards;
}
```

#### 3. Update Hero to use RippleGrid
**File**: `src/components/Hero.tsx`

Replace BlueprintGrid import and usage:
```tsx
import { RippleGrid } from "./RippleGrid";

// In return:
<section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 overflow-hidden">
  <RippleGrid />
  <Container>
    {/* ... rest unchanged ... */}
  </Container>
</section>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] Grid pattern visible in hero section
- [ ] Clicking cells triggers ripple animation
- [ ] Ripple propagates outward with distance-based delay
- [ ] Works correctly in dark mode
- [ ] Grid fades at edges (radial mask)
- [ ] Performance acceptable (no lag on click)

---

## Phase 4: Resizable Navbar

### Overview
Implement Aceternity-style navbar that shrinks on scroll with sharp corners.

### Changes Required:

#### 1. Create new Header component
**File**: `src/components/Header.tsx`

Complete rewrite with scroll-responsive behavior:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { LogoMark, LogoFull } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-200",
        isScrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10"
          : "bg-transparent"
      )}
    >
      <Container>
        <motion.div
          className="flex items-center justify-between"
          animate={{
            height: isScrolled ? 56 : 72,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Link href="/" className="text-black dark:text-white">
            <motion.div
              animate={{
                scale: isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Mobile: Logo mark only */}
              <LogoMark size={isScrolled ? 24 : 28} className="md:hidden" />
              {/* Desktop: Full logo with text */}
              <LogoFull className="hidden md:flex" />
            </motion.div>
          </Link>

          <motion.div
            className="flex items-center gap-4"
            animate={{
              scale: isScrolled ? 0.95 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <ThemeToggle />
            <Link href="/sign-in">
              <Button variant="secondary" size={isScrolled ? "default" : "default"}>
                Login
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </motion.header>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] Header starts transparent at top of page
- [ ] Header gets background/border on scroll (after ~50px)
- [ ] Header height shrinks from 72px to 56px on scroll
- [ ] Logo scales down slightly on scroll
- [ ] Transition is smooth (200ms)
- [ ] Works correctly in dark mode
- [ ] Login button maintains sharp corners throughout

---

## Testing Strategy

### Manual Testing Steps:
1. Load page fresh - verify header is transparent, full height
2. Scroll down - verify header shrinks, gets background
3. Scroll back to top - verify header returns to original state
4. Click on ripple grid cells - verify ripple animation
5. Toggle dark mode - verify all elements adapt
6. Check FlowDiagram - verify 3 inputs, no review step, approval badge visible
7. Inspect logo at various zoom levels for white line artifacts

## References

- Aceternity Ripple: https://ui.aceternity.com/components/background-ripple-effect
- Aceternity Navbar: https://ui.aceternity.com/components/resizable-navbar
- Previous plan: `thoughts/shared/plans/2025-12-26-landing-page-ux-improvements.md`
