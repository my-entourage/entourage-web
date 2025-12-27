# Landing Page Redesign - Phases 6, 7, 8 Implementation Plan

## Overview

Complete the landing page redesign by implementing the BentoFeatures section (consolidating 3 existing components), FAQ accordion, and final section reordering with cleanup.

## Current State Analysis

### Components to Consolidate into BentoFeatures:
1. **IntegrationsSection** (`src/components/IntegrationsSection.tsx`) - 391 lines
   - Full circuit board SVG with animated signal paths
   - 10 integration icons using Iconify
   - Center Entourage logo with plus corners

2. **DataFolderSection** (`src/components/DataFolderSection.tsx`) - 207 lines
   - 3D folder with CSS perspective transforms
   - Hover animation: folder opens, data cards fly out
   - Three data items: Meeting Notes, Slack Threads, Email Chains

3. **ValueProps** (`src/components/ValueProps.tsx`) - 98 lines
   - Three value props with icons
   - Only need 2 for bento: "Never Miss a Task" and "Human in the Loop"
   - (Context-Aware is redundant with Integrations message)

### Shared Pattern to Extract:
**PlusCornerCard** - Currently duplicated in Hero.tsx, FlowSection.tsx, DataFolderSection.tsx
- SVG plus signs at 4 corners
- viewBox: `0 0 24 24`, path: `M12 6v12m6-6H6`
- Size: `w-5 h-5`, offset: `-2.5`
- Color: `text-zinc-400 dark:text-zinc-600`

## Desired End State

- Single BentoFeatures section with 4 cards in a responsive grid
- FAQ accordion with 4 questions
- Page sections in order: Hero → Credentials → Flow → BentoFeatures → FAQ → CTA → Footer
- Deprecated components deleted

### Verification:
- Build passes: `pnpm build`
- All animations work smoothly
- Grid responsive on mobile/desktop
- Dark mode works throughout

## What We're NOT Doing

- Not redesigning the animations (keeping existing implementations)
- Not changing FAQ content beyond the 4 existing questions
- Not adding new features or sections
- Not modifying Hero, FlowSection, or other retained components

---

## Phase 6: Create BentoFeatures Section

### Overview
Create a unified bento grid section with 4 feature cards, extracting and consolidating code from IntegrationsSection, DataFolderSection, and ValueProps.

### Changes Required:

#### 1. Create PlusCornerCard Component
**File**: `src/components/ui/PlusCornerCard.tsx` (new file)
**Purpose**: Reusable card wrapper with plus corner decorations

```tsx
import { cn } from "@/lib/utils";

interface PlusCornerCardProps {
  children: React.ReactNode;
  className?: string;
  dashed?: boolean;
}

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

export function PlusCornerCard({
  children,
  className,
  dashed = true
}: PlusCornerCardProps) {
  return (
    <div
      className={cn(
        "relative",
        dashed
          ? "border border-dashed border-zinc-300 dark:border-zinc-700"
          : "border border-zinc-300 dark:border-zinc-700",
        "bg-white dark:bg-black",
        className
      )}
    >
      <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      {children}
    </div>
  );
}
```

#### 2. Create BentoFeatures Component
**File**: `src/components/BentoFeatures.tsx` (new file)
**Purpose**: Main bento grid section

```tsx
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { PlusCornerCard } from "./ui/PlusCornerCard";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

// Sub-components defined below or imported
import { IntegrationsCard } from "./bento/IntegrationsCard";
import { DataVaultCard } from "./bento/DataVaultCard";

interface BentoFeaturesProps {
  className?: string;
}

export function BentoFeatures({ className }: BentoFeaturesProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={cn("py-16 md:py-24 bg-white dark:bg-black", className)}>
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
```

#### 3. Create IntegrationsCard Sub-component
**File**: `src/components/bento/IntegrationsCard.tsx` (new file)
**Purpose**: Extracted circuit board visualization from IntegrationsSection

```tsx
"use client";

import { PlusCornerCard } from "../ui/PlusCornerCard";
import { Icon } from "../Icon";
import { LogoMark } from "../Logo";

export function IntegrationsCard() {
  return (
    <PlusCornerCard className="h-full min-h-[400px] md:min-h-[440px] flex flex-col">
      {/* Card header */}
      <div className="p-4 md:p-6 pb-0">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Integrations
        </span>
        <h3 className="mt-1 text-lg font-semibold text-black dark:text-white">
          Connect your tools
        </h3>
      </div>

      {/* Circuit board SVG */}
      <div className="flex-1 flex items-center justify-center p-4">
        <svg
          className="w-full h-auto max-h-[300px] text-zinc-300 dark:text-zinc-700"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Circuit paths from integrations to center */}
          <g
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeDasharray="200 200"
            pathLength="200"
          >
            {/* Top row paths */}
            <path
              className="circuit-path circuit-path-1"
              d="M 60 30 v 35 q 0 5 5 5 h 115 q 5 0 5 5 v 25"
            />
            <path
              className="circuit-path circuit-path-2"
              d="M 140 30 v 25 q 0 5 5 5 h 35 q 5 0 5 5 v 35"
            />
            <path
              className="circuit-path circuit-path-3"
              d="M 200 30 v 70"
            />
            <path
              className="circuit-path circuit-path-4"
              d="M 260 30 v 25 q 0 5 -5 5 h -35 q -5 0 -5 5 v 35"
            />
            <path
              className="circuit-path circuit-path-5"
              d="M 340 30 v 35 q 0 5 -5 5 h -115 q -5 0 -5 5 v 25"
            />

            {/* Bottom row paths */}
            <path
              className="circuit-path circuit-path-6"
              d="M 60 170 v -35 q 0 -5 5 -5 h 115 q 5 0 5 -5 v -25"
            />
            <path
              className="circuit-path circuit-path-7"
              d="M 140 170 v -25 q 0 -5 5 -5 h 35 q 5 0 5 -5 v -35"
            />
            <path
              className="circuit-path circuit-path-8"
              d="M 200 170 v -50"
            />
            <path
              className="circuit-path circuit-path-9"
              d="M 260 170 v -25 q 0 -5 -5 -5 h -35 q -5 0 -5 -5 v -35"
            />
            <path
              className="circuit-path circuit-path-10"
              d="M 340 170 v -35 q 0 -5 -5 -5 h -115 q -5 0 -5 -5 v -25"
            />

            {/* Path animation */}
            <animate
              attributeName="stroke-dashoffset"
              from="200"
              to="0"
              dur="1.5s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.25,0.1,0.5,1"
              keyTimes="0; 1"
            />
          </g>

          {/* Animated signal lights - green accent */}
          <g mask="url(#circuit-mask-1)">
            <circle className="circuit-signal circuit-signal-1" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-2)">
            <circle className="circuit-signal circuit-signal-2" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-3)">
            <circle className="circuit-signal circuit-signal-3" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-4)">
            <circle className="circuit-signal circuit-signal-4" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-5)">
            <circle className="circuit-signal circuit-signal-5" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-6)">
            <circle className="circuit-signal circuit-signal-6" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-7)">
            <circle className="circuit-signal circuit-signal-7" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-8)">
            <circle className="circuit-signal circuit-signal-8" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-9)">
            <circle className="circuit-signal circuit-signal-9" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-10)">
            <circle className="circuit-signal circuit-signal-10" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>

          {/* Integration icons - Top row */}
          <foreignObject x="48" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:linear" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="128" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:slack" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="188" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:googledrive" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="248" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="mdi:gmail" size={20} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="328" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:whatsapp" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>

          {/* Integration icons - Bottom row */}
          <foreignObject x="48" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:microsoftoutlook" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="128" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:notion" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="188" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:openai" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="248" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/icons/fireflies.svg"
                alt="Fireflies"
                className="w-[18px] h-[18px]"
                style={{ filter: "grayscale(100%) brightness(0.6)", opacity: 0.7 }}
              />
            </div>
          </foreignObject>
          <foreignObject x="328" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/icons/granola.svg"
                alt="Granola"
                className="w-[20px] h-[20px]"
                style={{ filter: "grayscale(100%) brightness(0.6)", opacity: 0.7 }}
              />
            </div>
          </foreignObject>

          {/* Center Entourage node */}
          <g>
            <rect
              x="168"
              y="78"
              width="64"
              height="44"
              className="fill-white dark:fill-black stroke-zinc-200 dark:stroke-zinc-800"
              strokeWidth="1"
              strokeDasharray="2 2"
              shapeRendering="crispEdges"
            />
            <g className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" fill="none">
              <path d="M 168 73 v 10 M 163 78 h 10" />
              <path d="M 232 73 v 10 M 227 78 h 10" />
              <path d="M 168 117 v 10 M 163 122 h 10" />
              <path d="M 232 117 v 10 M 227 122 h 10" />
            </g>
            <foreignObject x="168" y="78" width="64" height="44">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <LogoMark size={22} className="text-black dark:text-white" />
                <span className="text-[6px] font-semibold text-black dark:text-white font-mono tracking-wider mt-0.5">
                  ENTOURAGE
                </span>
              </div>
            </foreignObject>
          </g>

          {/* Definitions */}
          <defs>
            <mask id="circuit-mask-1">
              <path d="M 60 30 v 35 q 0 5 5 5 h 115 q 5 0 5 5 v 25" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-2">
              <path d="M 140 30 v 25 q 0 5 5 5 h 35 q 5 0 5 5 v 35" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-3">
              <path d="M 200 30 v 70" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-4">
              <path d="M 260 30 v 25 q 0 5 -5 5 h -35 q -5 0 -5 5 v 35" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-5">
              <path d="M 340 30 v 35 q 0 5 -5 5 h -115 q -5 0 -5 5 v 25" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-6">
              <path d="M 60 170 v -35 q 0 -5 5 -5 h 115 q 5 0 5 -5 v -25" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-7">
              <path d="M 140 170 v -25 q 0 -5 5 -5 h 35 q 5 0 5 -5 v -35" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-8">
              <path d="M 200 170 v -50" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-9">
              <path d="M 260 170 v -25 q 0 -5 -5 -5 h -35 q -5 0 -5 -5 v -35" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-10">
              <path d="M 340 170 v -35 q 0 -5 -5 -5 h -115 q -5 0 -5 -5 v -25" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <radialGradient id="signal-gradient" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor="#48BB78" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </PlusCornerCard>
  );
}
```

**Note**: The circuit signal animations are defined in `globals.css` (lines 102-177) and will work automatically with the class names.

#### 4. Create DataVaultCard Sub-component
**File**: `src/components/bento/DataVaultCard.tsx` (new file)
**Purpose**: Extracted 3D folder animation from DataFolderSection

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlusCornerCard } from "../ui/PlusCornerCard";
import { Icon } from "../Icon";

const dataItems = [
  { id: 1, label: "Meeting Notes", icon: "lucide:file-text" },
  { id: 2, label: "Slack Threads", icon: "lucide:message-square" },
  { id: 3, label: "Email Chains", icon: "lucide:mail" },
];

export function DataVaultCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PlusCornerCard
      className="h-full min-h-[400px] md:min-h-[440px] flex flex-col cursor-pointer"
      dashed={true}
    >
      {/* Card header */}
      <div className="p-4 md:p-6 pb-0">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Unified storage
        </span>
        <h3 className="mt-1 text-lg font-semibold text-black dark:text-white">
          Your Data Vault
        </h3>
      </div>

      {/* 3D Folder Animation */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: "1000px" }}
      >
        {/* Folder visualization - extracted from DataFolderSection.tsx:86-174 */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {/* Folder back panel */}
          <div
            className="w-32 h-24 bg-zinc-200 dark:bg-zinc-800 relative"
            style={{
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Folder tab */}
          <div
            className="absolute w-12 h-4 bg-zinc-300 dark:bg-zinc-700"
            style={{
              top: "-16px",
              left: "8px",
              transformOrigin: "bottom center",
              transform: isHovered
                ? "rotateX(-25deg) translateY(-2px)"
                : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Data cards container */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            {dataItems.map((item, index) => {
              const rotations = [-12, 0, 12];
              const translations = [-40, 0, 40];
              return (
                <div
                  key={item.id}
                  className="absolute w-16 h-20 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center"
                  style={{
                    transform: isHovered
                      ? `translateY(-70px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
                      : "translateY(0) translateX(0) rotate(0deg) scale(0.5)",
                    opacity: isHovered ? 1 : 0,
                    transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`,
                    zIndex: 10 - index,
                    left: "50%",
                    top: "50%",
                    marginLeft: "-32px",
                    marginTop: "-40px",
                  }}
                >
                  <Icon
                    icon={item.icon}
                    size={20}
                    className="text-zinc-600 dark:text-zinc-400"
                  />
                  <span className="mt-1 text-[8px] font-mono text-zinc-500 dark:text-zinc-400 text-center px-1">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Folder front panel */}
          <div
            className="absolute top-0 left-0 w-32 h-24 bg-zinc-100 dark:bg-zinc-900"
            style={{
              transformOrigin: "bottom center",
              transform: isHovered
                ? "rotateX(25deg) translateY(8px)"
                : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 30,
            }}
          />
        </div>

        {/* Labels */}
        <p
          className="mt-6 text-sm font-mono text-zinc-500 dark:text-zinc-400"
          style={{
            opacity: isHovered ? 0.7 : 1,
            transition: "opacity 300ms",
          }}
        >
          Unified & indexed
        </p>
        <p
          className="mt-2 text-xs font-mono text-zinc-400 dark:text-zinc-500"
          style={{
            opacity: isHovered ? 0 : 0.6,
            transform: isHovered ? "translateY(10px)" : "translateY(0)",
            transition: "all 300ms",
          }}
        >
          Hover to explore
        </p>
      </div>
    </PlusCornerCard>
  );
}
```

#### 5. Create bento directory
**Directory**: `src/components/bento/` (new directory)
**Purpose**: Organize bento card sub-components

Files to create:
- `src/components/bento/IntegrationsCard.tsx`
- `src/components/bento/DataVaultCard.tsx`

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `pnpm build`
- [x] TypeScript check passes: `pnpm typecheck`
- [x] New files exist:
  - `src/components/ui/PlusCornerCard.tsx`
  - `src/components/BentoFeatures.tsx`
  - `src/components/bento/IntegrationsCard.tsx`
  - `src/components/bento/DataVaultCard.tsx`

#### Manual Verification:
- [ ] Bento grid displays correctly on desktop (4-column layout)
- [ ] Bento grid stacks properly on mobile (single column)
- [ ] IntegrationsCard circuit animation works (signals flow along paths)
- [ ] DataVault folder opens on hover with staggered card animation
- [ ] All 4 cards have plus-corner styling
- [ ] Dark mode works for all cards
- [ ] Reduced motion is respected

**Implementation Note**: This is the largest phase. Pause for manual confirmation before proceeding.

---

## Phase 7: Create FAQ Accordion

### Overview
Install shadcn accordion and create FAQ section with 4 questions.

### Changes Required:

#### 1. Install ShadCN Accordion
```bash
pnpm dlx shadcn@canary add accordion
```

This will create `src/components/ui/accordion.tsx`.

#### 2. Create FAQ Component
**File**: `src/components/FAQ.tsx` (new file)

```tsx
"use client";

import { Container } from "./ui/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Entourage extract tasks from my communications?",
    answer:
      "Entourage uses AI to analyze your meetings, messages, and emails to identify action items, deadlines, and commitments. It understands context and prioritizes based on your projects.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your data is encrypted at rest and in transit. We never share your data with third parties, and you can delete your data at any time.",
  },
  {
    question: "Which integrations are supported?",
    answer:
      "We currently support Linear, Slack, Google Calendar, Gmail, Outlook, WhatsApp, Notion, Fireflies, Granola, and ChatGPT. More integrations are coming soon.",
  },
  {
    question: "Do I need to manually approve tasks?",
    answer:
      "Yes. Entourage suggests tasks but you remain in control. Review and approve suggestions before they sync to your task manager.",
  },
];

interface FAQProps {
  className?: string;
}

export function FAQ({ className }: FAQProps) {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black">
      <Container>
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            FAQ
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-black dark:text-white">
            Common questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-zinc-200 dark:border-zinc-800 px-4"
              >
                <AccordionTrigger className="text-left text-black dark:text-white hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 dark:text-zinc-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
```

#### 3. Style Accordion for Sharp Corners
**File**: `src/components/ui/accordion.tsx`
**Changes**: Remove any rounded corners from the default shadcn styling

Check the generated accordion.tsx and ensure:
- No `rounded-*` classes on AccordionItem
- No `rounded-*` classes on AccordionTrigger
- Chevron icon for expand/collapse indicator

If needed, update classes to remove rounded corners:
```tsx
// In AccordionItem, ensure no rounded classes
className={cn("border-b", className)}

// In AccordionTrigger, ensure sharp styling
className={cn(
  "flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
  className
)}
```

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `pnpm build`
- [x] Accordion component exists: `src/components/ui/accordion.tsx`
- [x] FAQ component exists: `src/components/FAQ.tsx`

#### Manual Verification:
- [ ] Accordion expands/collapses on click
- [ ] Only one item open at a time (collapsible mode)
- [ ] Sharp corners (no rounded edges)
- [ ] Smooth open/close animation
- [ ] Works in both light and dark mode
- [ ] Chevron rotates on expand

---

## Phase 8: Reorder Page Sections & Cleanup

### Overview
Update page.tsx to use new components in correct order and delete deprecated components.

### Changes Required:

#### 1. Update Page Layout
**File**: `src/app/page.tsx`
**Changes**: Replace old sections with new ones

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TeamCredentialsSection } from "@/components/TeamCredentialsSection";
import { FlowSection } from "@/components/FlowSection";
import { BentoFeatures } from "@/components/BentoFeatures";
import { FAQ } from "@/components/FAQ";
import { SecondaryCTA } from "@/components/SecondaryCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TeamCredentialsSection />
        <FlowSection />
        <BentoFeatures />
        <FAQ />
        <SecondaryCTA />
      </main>
      <Footer />
    </>
  );
}
```

**Removed imports:**
- `IntegrationsSection`
- `DataFolderSection`
- `ValueProps`

#### 2. Delete Deprecated Components
**Files to delete:**
- `src/components/IntegrationsSection.tsx`
- `src/components/DataFolderSection.tsx`
- `src/components/ValueProps.tsx`

```bash
rm src/components/IntegrationsSection.tsx
rm src/components/DataFolderSection.tsx
rm src/components/ValueProps.tsx
```

#### 3. Verify No Orphaned Imports
Check that no other files import the deleted components:
```bash
grep -r "IntegrationsSection\|DataFolderSection\|ValueProps" src/
```

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `pnpm build`
- [x] No TypeScript errors: `pnpm typecheck`
- [x] Deleted files no longer exist
- [x] No orphaned imports in codebase

#### Manual Verification:
- [ ] Page loads without errors
- [ ] Section order is: Hero → Credentials → Flow → BentoFeatures → FAQ → CTA → Footer
- [ ] Scroll flow feels natural
- [ ] No duplicate or missing content
- [ ] All animations still work
- [ ] Dark mode works throughout

---

## Testing Strategy

### Manual Testing Steps:
1. Open `http://localhost:3000` in browser
2. Verify section order from top to bottom
3. Test BentoFeatures grid:
   - Hover over IntegrationsCard - signals should animate
   - Hover over DataVault - folder should open with cards
   - Verify all 4 cards have plus corners
4. Test FAQ accordion:
   - Click each question to expand
   - Verify only one open at a time
   - Check for sharp corners
5. Test responsive:
   - Resize to mobile width
   - Verify bento cards stack vertically
   - Verify FAQ is readable
6. Test dark mode toggle
7. Test reduced motion (enable in OS settings)

## Performance Considerations

- BentoFeatures contains multiple animations - all respect `useReducedMotion`
- Circuit board SVG animations use CSS `offset-path` (GPU accelerated)
- Folder animation uses CSS transforms (GPU accelerated)
- No JavaScript-driven frame-by-frame animations

## File Summary

### New Files:
- `src/components/ui/PlusCornerCard.tsx`
- `src/components/BentoFeatures.tsx`
- `src/components/bento/IntegrationsCard.tsx`
- `src/components/bento/DataVaultCard.tsx`
- `src/components/FAQ.tsx`
- `src/components/ui/accordion.tsx` (from shadcn)

### Modified Files:
- `src/app/page.tsx`

### Deleted Files:
- `src/components/IntegrationsSection.tsx`
- `src/components/DataFolderSection.tsx`
- `src/components/ValueProps.tsx`

## References

- Original plan: `thoughts/shared/plans/2025-12-26-landing-page-redesign.md`
- Current state research: `thoughts/shared/research/2025-12-26-landing-page-redesign-status.md`
- Design guide: `entourage_design_guide.md`
- Handoff: `thoughts/shared/handoffs/general/2025-12-26_04-02-07_landing-page-redesign.md`
