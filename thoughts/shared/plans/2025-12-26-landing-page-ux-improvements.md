# Landing Page UX Improvements

**Date**: December 26, 2025
**Status**: Implemented (awaiting manual verification)

---

## Overview

Improve the landing page user experience by fixing navbar layout and button visibility, enhancing the hero CTA prominence, and simplifying the FlowDiagram for instant comprehension.

## Current State Analysis

### Navbar Issues
- "Login" uses ghost button style — appears as plain text, not clickable
- Theme toggle floats awkwardly between logo and login
- Right side feels sparse with no visual grouping
- No visual weight balance (logo strong on left, right side weak)

### Hero Issues
- Headlines wrap awkwardly ("be done." and "list." orphaned)
- CTA button is subtle (outline style doesn't command attention)
- Blueprint grid is barely visible

### FlowDiagram Issues
- Output section too complex (3 detailed task cards + redundant legend)
- "Human-in-the-loop" text wraps awkwardly with hyphenation
- No directional arrows on connectors
- Information density mismatch (abstract inputs vs detailed outputs)

## Desired End State

1. **Navbar**: Login button clearly visible as a button, right-side elements tightly grouped
2. **Hero**: Black solid CTA button that commands attention, no orphaned words in headlines
3. **FlowDiagram**: Simplified output with single task list representation, cleaner human review step, optional directional arrows

### Verification:
- All buttons look clickable (clear visual affordance)
- Hero CTA is the most prominent action on the page
- FlowDiagram is understandable in <5 seconds
- No visual regressions in dark mode

## What We're NOT Doing

- Adding navigation links to navbar (keeping it minimal)
- Changing the input sources section of FlowDiagram (already good)
- Redesigning the entire page layout
- Adding mobile-specific navbar (hamburger menu etc.)

---

## Phase 1: Navbar Improvements

### Overview
Fix the Login button visibility and improve right-side element grouping.

### Changes Required:

#### 1. Update Button Component - Add "secondary" variant
**File**: `src/components/ui/Button.tsx`

Add a new `secondary` variant for the Login button (visible border, not invisible like ghost):

```tsx
const variants = {
  primary:
    "bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-none",
  secondary:
    "bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-none",
  ghost:
    "bg-transparent text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-none",
};
```

Update the type:
```tsx
variant?: "primary" | "secondary" | "ghost";
```

#### 2. Update Header Component
**File**: `src/components/Header.tsx`

Change Login button from `ghost` to `secondary` and increase gap between elements:

```tsx
<div className="flex items-center gap-4">
  <ThemeToggle />
  <Link href="/sign-in">
    <Button variant="secondary" size="default">
      Login
    </Button>
  </Link>
</div>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] Login button has visible border (looks clickable)
- [ ] Theme toggle and Login are visually grouped with appropriate spacing
- [ ] Dark mode: Login button border visible as white
- [ ] Hover states work correctly on Login button

---

## Phase 2: Hero Section Polish

### Overview
Make the CTA button more prominent with solid black background, and control headline wrapping.

### Changes Required:

#### 1. Add "solid" variant to Button Component
**File**: `src/components/ui/Button.tsx`

Add inverted solid variant for high-prominence CTAs:

```tsx
const variants = {
  primary:
    "bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-none",
  solid:
    "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-none",
  secondary:
    "bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-none",
  ghost:
    "bg-transparent text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-none",
};
```

Update the type:
```tsx
variant?: "primary" | "solid" | "secondary" | "ghost";
```

#### 2. Update Hero Component
**File**: `src/components/Hero.tsx`

Change CTA to use solid variant and add manual line break control:

```tsx
<motion.h1
  {...fadeUp(0)}
  className="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl md:text-6xl"
>
  Know what needs to be done.
</motion.h1>
<motion.p
  {...fadeUp(0.1)}
  className="mt-2 text-3xl font-semibold tracking-tight text-zinc-400 dark:text-zinc-500 sm:text-4xl md:text-6xl"
>
  Without touching your task list.
</motion.p>
```

Change to constrain width on the secondary line to prevent "list." orphan:
```tsx
<motion.p
  {...fadeUp(0.1)}
  className="mx-auto mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-400 dark:text-zinc-500 sm:text-4xl md:text-6xl"
>
  Without touching your task list.
</motion.p>
```

Update CTA button:
```tsx
<Link href="/sign-up">
  <Button variant="solid" size="lg">
    Join the Waitlist
  </Button>
</Link>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] Hero CTA button is solid black with white text
- [ ] No orphaned words in headlines at common viewport widths
- [ ] Dark mode: CTA button inverts to white bg, black text
- [ ] CTA is clearly the most prominent action on the page

---

## Phase 3: FlowDiagram Simplification

### Overview
Simplify the output section by replacing 3 task cards with a single task list representation, clean up the human review text, and add directional arrows to connectors.

### Changes Required:

#### 1. Simplify Connector with Arrow
**File**: `src/components/FlowDiagram.tsx`

Update Connector to include an arrow indicator:

```tsx
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
```

#### 2. Simplify Human Review
**File**: `src/components/FlowDiagram.tsx`

Remove hyphenation, make text cleaner:

```tsx
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
```

#### 3. Replace TaskCard and TasksSection with Simplified Output
**File**: `src/components/FlowDiagram.tsx`

Remove the `TaskCard` component entirely.

Replace `TasksSection` with a simplified version:

```tsx
function TasksOutput() {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
        Your Tasks
      </span>
      <div className="flex flex-col items-center gap-2">
        {/* Simplified task list icon */}
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
```

#### 4. Update Main FlowDiagram to Use New Components
**File**: `src/components/FlowDiagram.tsx`

Replace `TasksSection` with `TasksOutput` in both mobile and desktop layouts.

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] FlowDiagram shows directional arrows on connectors
- [ ] Human review step shows "You Review" (no hyphenation)
- [ ] Output section shows single consolidated task list representation
- [ ] Redundant legend is removed
- [ ] FlowDiagram is understandable in <5 seconds
- [ ] Dark mode works correctly for all elements

---

## Testing Strategy

### Manual Testing Steps:
1. View landing page at various viewport widths (mobile, tablet, desktop)
2. Toggle dark mode and verify all elements adapt correctly
3. Verify Login button in navbar looks clickable (has visible border)
4. Verify Hero CTA is the most prominent element (solid black button)
5. Verify FlowDiagram communicates the value prop clearly:
   - Communications go in → Entourage processes → You review → Tasks come out
6. Check for any visual regressions in other sections (ValueProps, Footer, etc.)

## References

- Previous plan: `thoughts/plans/2025-12-25-vercel-style-design-language.md`
- FlowDiagram research: `thoughts/shared/research/2025-12-25-flowdiagram-improvements.md`
- Design guide: `entourage_design_guide.md`
