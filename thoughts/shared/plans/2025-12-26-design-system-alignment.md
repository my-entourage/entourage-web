# Design System Alignment Implementation Plan

## Overview

Align the landing page implementation with design system v6.0 by extracting shared components, adding ShadCN wrappers, fixing code patterns, and introducing strategic accent colors.

## Current State Analysis

Based on comprehensive evaluation of the landing page against `docs/design-system.md`:

### What's Working Well
- Dark mode pairing: 100% consistent
- Border radius: `rounded-none` used everywhere
- Section/container spacing follows design system
- Plus corner specs correct (size, position, colors)
- Typography patterns aligned

### Key Issues Identified
1. **PlusCorner duplication**: Same SVG component defined inline in 4 files
2. **Button.tsx doesn't use cn()**: Uses template literal instead of utility
3. **No Accordion wrapper**: ShadCN component used directly without brand enforcement
4. **Tracking inconsistency**: One label uses `tracking-widest` instead of `tracking-wider`
5. **Wrong accent color**: Uses `green-500` instead of documented `emerald-500`
6. **No interactive Plus corners**: Design system documents hover enhancement but not implemented
7. **Accent colors underutilized**: Design system's 5-color accent palette not leveraged

### Key Discoveries
- `src/components/ui/PlusCornerCard.tsx:9-21` - Internal PlusCorner exists but not exported
- `src/components/Hero.tsx:9-21` - Duplicate PlusCorner
- `src/components/TeamCredentialsSection.tsx:13-25` - Duplicate PlusCorner
- `src/components/FlowSection.tsx:66-101` - 4 inline SVG plus corners
- `src/components/ui/Button.tsx:37` - Template literal className
- `src/components/FAQ.tsx:57` - Direct ShadCN usage with inline customization
- `src/components/TeamCredentialsSection.tsx:54` - Uses `tracking-widest`
- `src/components/FlowSection.tsx:160` - Uses `bg-green-500`

## Desired End State

A landing page that fully adheres to design system v6.0:
- Single source of truth for PlusCorner component with optional interactivity
- All UI components using proper `cn()` utility for class composition
- ShadCN components wrapped with brand styling enforcement
- Consistent typography (tracking, font-mono usage)
- Strategic use of accent colors (emerald for AI/success)

### Verification
- `pnpm build` passes without errors
- `pnpm lint` passes
- Visual inspection shows no regressions
- Plus corners animate on hover where `interactive` is enabled
- Accent colors visible in appropriate contexts

## What We're NOT Doing

- Adding new sections or features to the landing page
- Changing the overall layout or structure
- Modifying ShadCN base components directly
- Adding all 5 accent colors everywhere (just strategic use of emerald)
- Creating wrappers for ShadCN components not yet installed

## Implementation Approach

Incremental phases that can each be verified independently. Each phase is small and testable.

---

## Phase 1: Extract PlusCorner Component

### Overview
Create a standalone, reusable PlusCorner component and update all files that duplicate it.

### Changes Required

#### 1. Create new PlusCorner component

**File**: `src/components/ui/PlusCorner.tsx` (new)

```tsx
import { cn } from "@/lib/utils";

interface PlusCornerProps {
  className?: string;
  interactive?: boolean;
}

export function PlusCorner({ className, interactive = false }: PlusCornerProps) {
  return (
    <svg
      className={cn(
        className,
        interactive && "transition-colors duration-150 group-hover:text-zinc-500 dark:group-hover:text-zinc-500"
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  );
}
```

#### 2. Update PlusCornerCard to use shared component

**File**: `src/components/ui/PlusCornerCard.tsx`

- Remove internal PlusCorner function (lines 9-21)
- Import from `./PlusCorner`
- Add `interactive` prop to interface and pass through to PlusCorner instances
- Add `group` class to container when interactive

#### 3. Update Hero.tsx

**File**: `src/components/Hero.tsx`

- Remove local PlusCorner function (lines 8-21)
- Import `{ PlusCorner }` from `"./ui/PlusCorner"`

#### 4. Update TeamCredentialsSection.tsx

**File**: `src/components/TeamCredentialsSection.tsx`

- Remove local PlusCorner function (lines 12-25)
- Import `{ PlusCorner }` from `"./ui/PlusCorner"`

#### 5. Update FlowSection.tsx

**File**: `src/components/FlowSection.tsx`

- Import `{ PlusCorner }` from `"./ui/PlusCorner"`
- Replace 4 inline SVGs (lines 66-101) with PlusCorner components

### Success Criteria

#### Automated Verification
- [x] TypeScript compiles: `pnpm build`
- [x] Linting passes: `pnpm lint` (pre-existing warnings unrelated to changes)
- [x] No duplicate PlusCorner definitions in codebase

#### Manual Verification
- [ ] Plus corners display correctly on Hero section
- [ ] Plus corners display correctly on TeamCredentialsSection
- [ ] Plus corners display correctly on FlowSection processing box
- [ ] Plus corners display correctly on bento cards (via PlusCornerCard)
- [ ] Dark mode still works for all plus corners

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before proceeding.

---

## Phase 2: Fix Button cn() Usage

### Overview
Replace template literal class composition with proper cn() utility.

### Changes Required

#### 1. Update Button component

**File**: `src/components/ui/Button.tsx`

Add import for cn:
```tsx
import { cn } from "@/lib/utils";
```

Replace line 37:
```tsx
// Before
className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}

// After
className={cn(baseStyles, variants[variant], sizes[size], className)}
```

### Success Criteria

#### Automated Verification
- [x] TypeScript compiles: `pnpm build`
- [x] Linting passes: `pnpm lint` (pre-existing issues unrelated)

#### Manual Verification
- [ ] All button variants render correctly (primary, solid, secondary, ghost)
- [ ] Custom className props still merge correctly

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before proceeding.

---

## Phase 3: Create Accordion Wrapper

### Overview
Create a brand wrapper for the ShadCN Accordion that enforces design system styling.

### Changes Required

#### 1. Create Accordion wrapper

**File**: `src/components/Accordion.tsx` (new)

```tsx
import {
  Accordion as ShadcnAccordion,
  AccordionContent as ShadcnAccordionContent,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger as ShadcnAccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AccordionProps = ComponentProps<typeof ShadcnAccordion>;
type AccordionItemProps = ComponentProps<typeof ShadcnAccordionItem>;
type AccordionTriggerProps = ComponentProps<typeof ShadcnAccordionTrigger>;
type AccordionContentProps = ComponentProps<typeof ShadcnAccordionContent>;

export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <ShadcnAccordion
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <ShadcnAccordionItem
      className={cn(
        "rounded-none border border-zinc-200 dark:border-zinc-800 px-4",
        className
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, ...props }: AccordionTriggerProps) {
  return (
    <ShadcnAccordionTrigger
      className={cn(
        "text-left text-black dark:text-white hover:no-underline py-4",
        className
      )}
      {...props}
    />
  );
}

export function AccordionContent({ className, ...props }: AccordionContentProps) {
  return (
    <ShadcnAccordionContent
      className={cn(
        "text-zinc-500 dark:text-zinc-400 pb-4",
        className
      )}
      {...props}
    />
  );
}
```

#### 2. Update FAQ to use wrapper

**File**: `src/components/FAQ.tsx`

Change import from:
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
```

To:
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
```

Remove inline styling from JSX (lines 52-65) since wrapper handles it.

### Success Criteria

#### Automated Verification
- [x] TypeScript compiles: `pnpm build`
- [x] Linting passes: `pnpm lint` (pre-existing issues unrelated)

#### Manual Verification
- [ ] FAQ accordion opens/closes correctly
- [ ] FAQ styling matches previous appearance
- [ ] Dark mode works for FAQ section

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before proceeding.

---

## Phase 4: Fix Minor Inconsistencies

### Overview
Fix tracking inconsistency and wrong accent color.

### Changes Required

#### 1. Fix tracking in TeamCredentialsSection

**File**: `src/components/TeamCredentialsSection.tsx`

Line 54: Change `tracking-widest` to `tracking-wider`:
```tsx
// Before
<span className="bg-background px-4 text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">

// After
<span className="bg-background px-4 text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
```

#### 2. Fix accent color in FlowSection

**File**: `src/components/FlowSection.tsx`

Line 160: Change `bg-green-500` to `bg-emerald-500`:
```tsx
// Before
<div className="w-4 h-4 bg-green-500 flex items-center justify-center">

// After
<div className="w-4 h-4 bg-emerald-500 flex items-center justify-center">
```

### Success Criteria

#### Automated Verification
- [x] TypeScript compiles: `pnpm build`
- [x] Linting passes: `pnpm lint` (pre-existing issues unrelated)
- [x] No instances of `tracking-widest` in section labels
- [x] No instances of `green-500` (should use emerald-500)

#### Manual Verification
- [ ] TeamCredentialsSection label spacing looks consistent
- [ ] FlowSection checkmark is emerald green (not generic green)

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before proceeding.

---

## Phase 5: Enable Interactive Plus Corners

### Overview
Apply the interactive prop to appropriate PlusCornerCard instances.

### Changes Required

#### 1. Update bento cards to be interactive

**File**: `src/components/BentoFeatures.tsx`

Add `interactive` prop to PlusCornerCard instances that are in the grid:
```tsx
<PlusCornerCard interactive className="...">
```

### Success Criteria

#### Automated Verification
- [x] TypeScript compiles: `pnpm build`
- [x] Linting passes: `pnpm lint` (pre-existing issues unrelated)

#### Manual Verification
- [ ] Hovering over bento cards causes plus corners to change color
- [ ] Transition is smooth (150ms)
- [ ] Works in both light and dark mode

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before proceeding.

---

## Testing Strategy

### Unit Tests
No unit tests needed - these are styling/component organization changes.

### Integration Tests
Not applicable for styling changes.

### Manual Testing Steps
1. Load landing page in browser
2. Scroll through all sections verifying plus corners display
3. Toggle dark mode and verify all elements adapt
4. Hover over bento cards to verify interactive plus corners
5. Open/close FAQ accordion items
6. Verify buttons render correctly in all locations
7. Check FlowSection checkmark is emerald colored

## Performance Considerations

- No performance impact expected
- Shared PlusCorner component may slightly reduce bundle size (deduplication)

## Migration Notes

No data migration needed. These are purely frontend component changes.

## References

- Design System: `docs/design-system.md` (v6.0)
- Previous evaluation: This conversation's earlier analysis
