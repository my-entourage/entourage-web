# Landing Page Redesign Implementation Plan

## Overview

Comprehensive landing page redesign based on user feedback addressing animation issues, component consolidation into a bento grid, and UX improvements. The goal is to create a cohesive, polished experience that combines the current Swiss-style aesthetic with modern tech landing page patterns.

## Current State Analysis

### Issues Identified:
1. **Navbar Animation** (`Header.tsx:30-39`): Jerky animation because height/width/maxWidth animate separately with different timings
2. **RippleGrid** (`RippleGrid.tsx:66-68`): Only changes border color on hover, not tile fill; clickable area feels small
3. **TeamCredentialsSection**: Scroll speed too fast (`speed={40}`)
4. **FlowSection** (`FlowSection.tsx:327-329`): Logo wrapped in black box div instead of using SVG directly
5. **Section Duplication**: "Connect your tools" and "From Chaos to Clarity" sections feel redundant
6. **IntegrationsSection**: Uses text labels instead of company icons; missing Entourage logo in center

### Key Discoveries:
- InfiniteSlider component at `src/components/ui/InfiniteSlider.tsx` handles scroll animations
- Icon component at `src/components/Icon.tsx` wraps Iconify - can use company logos from `simple-icons:*`
- Plus-corner card pattern already implemented in FlowSection and DataFolderSection
- CSS animations for circuit signals defined in `globals.css:140-199`

## Desired End State

- Smooth, professional navbar animation without visible jerking
- RippleGrid tiles change background color on hover with larger clickable targets
- Team credentials scroll at comfortable reading pace
- FlowSection displays proper SVG Entourage logo
- Single unified BentoFeatures section combining: Integrations, Data Vault, Never Miss Task, Human-in-the-Loop
- FAQ accordion at bottom before CTA
- Section order: Hero → Credentials → How it works → Features (bento) → FAQ → CTA → Footer

### Verification:
- Build passes: `pnpm build`
- No TypeScript errors: `pnpm typecheck`
- Visual inspection confirms all animations are smooth
- All bento cards display correctly on mobile and desktop

## What We're NOT Doing

- Not changing the overall design language (still Swiss-style with tech aesthetic)
- Not modifying the Hero section content (only RippleGrid background)
- Not adding new integrations beyond the specified list
- Not changing the color palette (keeping single green accent)
- Not adding rounded corners anywhere

---

## Phase 1: Fix Navbar Animation

### Overview
Remove jerky shrink/expand behavior by unifying animation timing and using CSS transforms instead of animating width/height separately.

### Changes Required:

#### 1. Update Header Animation Logic
**File**: `src/components/Header.tsx`
**Changes**: Simplify animation to use scale transform and unified timing

```tsx
// Replace the animate prop (lines 30-34) with:
animate={{
  scale: isScrolled ? 0.85 : 1,
}}
transition={{
  duration: 0.3,
  ease: [0.32, 0.72, 0, 1],
}}

// Update the className to handle border visibility:
className={cn(
  "flex items-center justify-between px-4 h-14",
  "transition-all duration-300 ease-out",
  isScrolled
    ? "bg-white/95 dark:bg-black/95 backdrop-blur-md border border-black dark:border-white"
    : "bg-white dark:bg-black border border-transparent"
)}
```

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `pnpm build`
- [x] TypeScript check passes: `pnpm typecheck`

#### Manual Verification:
- [ ] Navbar shrinks smoothly in one motion when scrolling down
- [ ] No visible "expand then shrink" or "shrink then expand" behavior
- [ ] Border appears smoothly when scrolled
- [ ] Works correctly in both light and dark mode

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation.

---

## Phase 2: Fix RippleGrid Interaction

### Overview
Update RippleGrid so tiles change background color on hover (not just borders) and increase the clickable/hoverable area.

### Changes Required:

#### 1. Update RippleGrid Hover Styles
**File**: `src/components/RippleGrid.tsx`
**Changes**: Add background color change on hover, increase cell size

```tsx
// Update lines 17-18 (increase cell size for larger clickable area)
const cellSize = 56; // was 48

// Update className at line 65-68:
className={cn(
  "border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-150",
  "hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80",
  "hover:border-zinc-300 dark:hover:border-zinc-700",
  rippleCenter && "animate-cell-ripple dark:animate-cell-ripple-dark"
)}
```

#### 2. Update Ripple Animation in globals.css
**File**: `src/app/globals.css`
**Changes**: Update keyframes to animate background more prominently

```css
/* Update cell-ripple keyframes (lines 102-115) */
@keyframes cell-ripple {
  0% {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.1);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.25);
  }
  100% {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.05);
  }
}
```

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `pnpm build`

#### Manual Verification:
- [ ] Hovering over tiles shows visible background color change
- [ ] Clicking anywhere on the grid triggers ripple effect
- [ ] Hero title is visible above the grid
- [ ] Grid fades smoothly at edges

**Implementation Note**: After completing this phase, pause for manual confirmation.

---

## Phase 3: Slow TeamCredentialsSection Scroll

### Overview
Reduce scroll speed from 40 to 20 for comfortable reading.

### Changes Required:

#### 1. Update InfiniteSlider Speed
**File**: `src/components/TeamCredentialsSection.tsx`
**Changes**: Reduce speed parameter

```tsx
// Update speed prop (around line with InfiniteSlider)
<InfiniteSlider gap={48} reverse speed={20} speedOnHover={10}>
```

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `pnpm build`

#### Manual Verification:
- [ ] Credentials scroll at readable pace
- [ ] Hover slowdown is noticeable but not jarring

---

## Phase 4: Fix FlowSection Logo

### Overview
Replace black box with logo background with proper SVG logo display.

### Changes Required:

#### 1. Update Center Logo Display
**File**: `src/components/FlowSection.tsx`
**Changes**: Remove black background wrapper, use logo directly

```tsx
// Replace lines 326-329 with:
<div className="relative z-10 flex flex-col items-center">
  <LogoMark size={48} className="text-black dark:text-white" />
  <span className="mt-3 text-sm font-semibold text-black dark:text-white">
    Entourage
  </span>
  ...
</div>
```

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `pnpm build`

#### Manual Verification:
- [ ] Entourage logo displays as SVG (not black box)
- [ ] Logo visible in both light and dark mode
- [ ] Pulse animation rings display correctly around logo

---

## Phase 5: Add Company Icons to Integrations

### Overview
Replace text labels in IntegrationsSection with Iconify company icons. Add Entourage logo to center.

### Changes Required:

#### 1. Update IntegrationsSection with Icons
**File**: `src/components/IntegrationsSection.tsx`
**Changes**: Replace text badges with icon badges, add Entourage logo in center

Company icons to use (from `simple-icons:*` in Iconify):
- Linear: `simple-icons:linear`
- Slack: `simple-icons:slack`
- Calendar: `simple-icons:googlecalendar`
- Email: `lucide:mail` (no simple-icons equivalent)
- WhatsApp: `simple-icons:whatsapp`
- Notion: `simple-icons:notion`
- Granola: `lucide:wheat` (no simple-icons, use food icon)

```tsx
// Add Icon import at top
import { Icon } from "./Icon";
import { LogoMark, LogoFull } from "./Logo";

// Replace each text-based badge with icon version:
<g>
  <rect ... />
  <foreignObject x="35" y="10" width="50" height="20">
    <div className="w-full h-full flex items-center justify-center">
      <Icon icon="simple-icons:linear" size={12} className="text-black dark:text-white" />
    </div>
  </foreignObject>
</g>

// Update center Entourage node to use LogoMark:
<g>
  <rect x="170" y="90" width="60" height="20" className="fill-black dark:fill-white" />
  <foreignObject x="170" y="90" width="60" height="20">
    <div className="w-full h-full flex items-center justify-center gap-1">
      <LogoMark size={12} className="text-white dark:text-black" />
      <span className="text-[7px] font-semibold text-white dark:text-black">ENTOURAGE</span>
    </div>
  </foreignObject>
</g>
```

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `pnpm build`

#### Manual Verification:
- [ ] All integration badges show company icons
- [ ] Center node shows Entourage logo with text
- [ ] Icons are visible in both light and dark mode

---

## Phase 6: Create BentoFeatures Section

### Overview
Create a unified bento grid section combining: Integrations visualization, Data Vault, Never Miss a Task, and Human-in-the-Loop. This replaces separate IntegrationsSection, DataFolderSection, and ValueProps.

### Changes Required:

#### 1. Create BentoFeatures Component
**File**: `src/components/BentoFeatures.tsx` (new file)
**Changes**: Create bento grid layout with 4 feature cards

```tsx
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

// Bento grid with 4 cards:
// - Large card (2x2): Integrations visualization (circuit board mini)
// - Tall card (1x2): Data Vault (folder animation)
// - Wide card (2x1): Never Miss a Task
// - Square card (1x1): Human in the Loop

// Layout on desktop (4 cols):
// [Integrations 2x2] [DataVault 1x2] [HumanLoop 1x1]
// [Integrations    ] [DataVault    ] [NeverMiss 2x1]

// Mobile: Stack vertically
```

#### 2. Create PlusCornerCard Subcomponent
Extract plus-corner card pattern as reusable component for bento cards.

```tsx
interface PlusCornerCardProps {
  children: React.ReactNode;
  className?: string;
  dashed?: boolean;
}

function PlusCornerCard({ children, className, dashed = true }: PlusCornerCardProps) {
  return (
    <div className={cn(
      "relative",
      dashed ? "border border-dashed border-zinc-300 dark:border-zinc-700" : "border border-zinc-300 dark:border-zinc-700",
      "bg-white dark:bg-black",
      className
    )}>
      {/* Plus corners SVGs */}
      {children}
    </div>
  );
}
```

#### 3. Individual Bento Cards

**IntegrationsCard**: Simplified circuit board showing icons flowing to center
**DataVaultCard**: Folder hover animation (extracted from DataFolderSection)
**NeverMissCard**: Icon + title + description
**HumanLoopCard**: Icon + title + description

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `pnpm build`
- [ ] No TypeScript errors

#### Manual Verification:
- [ ] Bento grid displays correctly on desktop (4-column layout)
- [ ] Bento grid stacks properly on mobile
- [ ] Integrations card shows circuit animation
- [ ] Data vault folder opens on hover
- [ ] All cards have plus-corner styling

**Implementation Note**: This is the largest phase. Pause for manual confirmation before proceeding.

---

## Phase 7: Create FAQ Accordion

### Overview
Create a simple FAQ accordion component using shadcn/ui accordion primitive.

### Changes Required:

#### 1. Install ShadCN Accordion
```bash
pnpm dlx shadcn@canary add accordion
```

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
    answer: "Entourage uses AI to analyze your meetings, messages, and emails to identify action items, deadlines, and commitments. It understands context and prioritizes based on your projects.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Your data is encrypted at rest and in transit. We never share your data with third parties, and you can delete your data at any time.",
  },
  {
    question: "Which integrations are supported?",
    answer: "We currently support Linear, Slack, Google Calendar, Email, WhatsApp, Notion, and Granola. More integrations are coming soon.",
  },
  {
    question: "Do I need to manually approve tasks?",
    answer: "Yes. Entourage suggests tasks but you remain in control. Review and approve suggestions before they sync to your task manager.",
  },
];

export function FAQ() {
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
                <AccordionTrigger className="text-left text-black dark:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 dark:text-zinc-400">
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

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `pnpm build`
- [ ] Accordion component installed: check `src/components/ui/accordion.tsx` exists

#### Manual Verification:
- [ ] Accordion expands/collapses on click
- [ ] Only one item open at a time (collapsible)
- [ ] Sharp corners (no rounded edges)
- [ ] Works in both light and dark mode

---

## Phase 8: Reorder Page Sections

### Overview
Update page.tsx to use new components in correct order.

### Changes Required:

#### 1. Update Page Layout
**File**: `src/app/page.tsx`
**Changes**: Remove old sections, add new ones in correct order

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

#### 2. Delete Deprecated Components (optional cleanup)
Can delete or keep for reference:
- `src/components/IntegrationsSection.tsx` (replaced by BentoFeatures)
- `src/components/DataFolderSection.tsx` (merged into BentoFeatures)
- `src/components/ValueProps.tsx` (merged into BentoFeatures)

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `pnpm build`
- [ ] No unused imports/exports

#### Manual Verification:
- [ ] Page loads without errors
- [ ] Section order is: Hero → Credentials → How it works → Features → FAQ → CTA → Footer
- [ ] Scroll flow feels natural
- [ ] No duplicate content

---

## Testing Strategy

### Unit Tests:
- None required for this visual redesign

### Integration Tests:
- None required for this visual redesign

### Manual Testing Steps:
1. Open `http://localhost:3000` in browser
2. Scroll down slowly and verify navbar animation is smooth
3. Hover over RippleGrid tiles and verify background color changes
4. Scroll to credentials section and verify readable speed
5. Verify FlowSection shows SVG logo (not black box)
6. Verify BentoFeatures grid layout on desktop and mobile
7. Expand/collapse FAQ items
8. Test in dark mode
9. Test on mobile viewport

## Performance Considerations

- BentoFeatures section may have multiple animations - ensure `useReducedMotion` is respected
- Circuit board SVG animations should use CSS `offset-path` (already implemented)
- Folder animation uses inline styles for transforms - acceptable for hover states

## References

- Original handoff: `thoughts/shared/handoffs/general/2025-12-25_16-30-54_design-system-flowdiagram-improvements.md`
- Design guide: `entourage_design_guide.md`
- ShadCN components: `src/components/ui/`
- Iconify usage: `src/components/Icon.tsx`
