# Design System Update Plan

**Date**: December 25, 2025
**Status**: Draft - Awaiting Approval
**Ticket**: Design guide iteration based on landing page review

---

## Summary

This plan updates the Entourage design system based on a detailed review of the current landing page against the design guide. It consolidates decisions made during an interactive design review session.

---

## Key Decisions Made

| Decision | Details |
|----------|---------|
| **Logo** | E-Block mark + wordmark (desktop), mark only (mobile) |
| **Contrast** | Strict black/white - no zinc grays for borders |
| **Icons** | Iconify with Line-MD (animated) + Lucide (fallback) |
| **Audience** | General professionals, not developer-centric |
| **Terminal aesthetic** | Remove from landing page/marketing context |
| **Animations** | 120-150ms (snappy Swiss style) |
| **FlowDiagram** | Iconify icons, flow animation, E-Block as AI node |

---

## Phase 1: Design Guide Update

### 1.1 Update Target Audience Section

**File**: `entourage_design_guide.md`

**Current** (Section 1):
> Digital Swiss Style for Developers

**Change to**:
> Digital Swiss Style for Professionals

Update the philosophy to reflect general professionals (PMs, freelancers, consultants) rather than developers specifically.

- [x] Update section title
- [x] Revise "Code aesthetics as visual language" to be less developer-focused
- [x] Keep precision and objectivity principles

### 1.2 Remove Terminal Aesthetic from Marketing Context

**File**: `entourage_design_guide.md`

**Current** (Section 6):
> Terminal Aesthetic... cursor indicator... text-based progress bars

**Change to**:
- Keep terminal aesthetic for **product/app UI** (Phase 2+)
- Add clarification that **marketing/landing pages** should be polished and accessible
- Remove cursor indicators and ASCII progress bars from landing page scope

- [x] Add "Context: Product vs. Marketing" subsection
- [x] Clarify when terminal aesthetic applies

### 1.3 Add Icon System Section

**File**: `entourage_design_guide.md`

**Add new section** after Section 6 (Component Design):

```markdown
## 7. Icon System

### Primary: Iconify

We use Iconify for all icons, providing access to 200k+ open source icons with consistent styling.

**Installation:**
\`\`\`bash
pnpm add @iconify-icon/react
\`\`\`

**Icon Sets (Priority Order):**

| Set | Prefix | Use Case |
|-----|--------|----------|
| **Line-MD** | `line-md` | Animated icons (preferred where available) |
| **Lucide** | `lucide` | Static fallback (largest coverage) |

**Usage:**
\`\`\`tsx
import { Icon } from "@iconify-icon/react";

// Animated icon
<Icon icon="line-md:check-all" />

// Static fallback
<Icon icon="lucide:message-circle" />
\`\`\`

**Styling:**
- Default size: 24px
- Stroke: Inherits from text color
- Animation: Line-MD icons auto-animate on render

**Do NOT:**
- Mix icon sets within the same component
- Use colored icons (monotone only)
- Create custom SVG icons when Iconify has coverage
```

- [x] Add new Icon System section
- [x] Include installation instructions
- [x] Document icon set priorities

### 1.4 Update Animation Timing

**File**: `entourage_design_guide.md`

**Current** (Section 7):
> | Page transition | 150ms | ease-out |

**Change to**:
- Keep 120-150ms for UI interactions
- Allow 2-3s for ambient/background animations (e.g., diagram pulse)

- [x] Add "Ambient animations" category
- [x] Clarify that diagram pulse (2s) is acceptable

### 1.5 Update Color Application

**File**: `entourage_design_guide.md`

**Add clarification**:
- Use `#000000` and `#FFFFFF` for primary contrast
- Avoid Tailwind's `zinc-100/200` for borders (use `border-black` instead)
- Exception: `zinc-400/500` acceptable for muted text

- [x] Add border color guidance
- [x] Specify when zinc colors are acceptable

---

## Phase 2: Icon System Implementation

### 2.1 Install Iconify

**Commands:**
```bash
pnpm add @iconify-icon/react
```

- [x] Install @iconify-icon/react package
- [x] Verify build passes

### 2.2 Create Icon Wrapper Component

**File**: `src/components/Icon.tsx`

```tsx
"use client";

import { Icon as IconifyIcon } from "@iconify-icon/react";
import type { ComponentProps } from "react";

type IconProps = ComponentProps<typeof IconifyIcon> & {
  size?: number | string;
};

export function Icon({ size = 24, style, ...props }: IconProps) {
  return (
    <IconifyIcon
      style={{ fontSize: size, ...style }}
      {...props}
    />
  );
}
```

- [x] Create Icon wrapper component
- [x] Export from components index

### 2.3 Update FlowDiagram Icons

**File**: `src/components/FlowDiagram.tsx`

Replace custom SVG icons with Iconify:

| Current | Iconify Replacement |
|---------|---------------------|
| MicIcon | `line-md:microphone` |
| ChatIcon | `line-md:chat` |
| MailIcon | `line-md:email` |
| WaveformIcon | `line-md:play` (or `lucide:audio-lines`) |
| PersonIcon | `line-md:account` |
| PlusIcon | `line-md:plus` |
| PencilIcon | `line-md:edit` |
| CheckIcon | `line-md:check` |

- [x] Replace all custom SVG icons
- [x] Verify animations work
- [x] Test reduced motion preference

### 2.4 Update ValueProps Icons

**File**: `src/components/ValueProps.tsx`

Replace geometric shapes with functional icons:

| Current | Iconify Replacement | Rationale |
|---------|---------------------|-----------|
| CircleIcon | `line-md:check-list-3` | "Never Miss" = capture |
| TriangleIcon | `line-md:link` | "Context-Aware" = linked |
| SquareIcon | `line-md:account` | "Human in Loop" = person |

- [x] Replace decorative icons with functional ones
- [x] Maintain consistent sizing (24px)

---

## Phase 3: Logo Implementation

### 3.1 Create E-Block Logo Component

**File**: `src/components/Logo.tsx`

Create the Bold E-Block mark as an SVG component:

```tsx
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-label="Entourage logo"
    >
      {/* Three horizontal bars + vertical spine */}
      {/* Spine: 40% width */}
      <rect x="0" y="0" width="40" height="100" />
      {/* Bar 1 */}
      <rect x="40" y="0" width="60" height="27" />
      {/* Bar 2 */}
      <rect x="40" y="36.5" width="60" height="27" />
      {/* Bar 3 */}
      <rect x="40" y="73" width="60" height="27" />
    </svg>
  );
}

export function LogoFull({ showText = true }: { showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <LogoMark size={32} />
      {showText && (
        <span className="font-mono text-lg font-medium tracking-wide">
          Entourage
        </span>
      )}
    </div>
  );
}
```

- [x] Create Logo.tsx with LogoMark and LogoFull components
- [x] Match spec: 40% spine, 27% bar height, 10% gaps

### 3.2 Update Header with Logo

**File**: `src/components/Header.tsx`

```tsx
import { LogoMark, LogoFull } from "./Logo";

// Desktop: Logo + text
<LogoFull showText className="hidden md:flex" />

// Mobile: Logo only
<LogoMark size={28} className="md:hidden" />
```

- [x] Import new Logo components
- [x] Show full logo on desktop (md+)
- [x] Show mark only on mobile

### 3.3 Update FlowDiagram AI Node

**File**: `src/components/FlowDiagram.tsx`

Replace the "AI / Entourage" text circle with E-Block logo:

```tsx
function AINode() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-black bg-white flex items-center justify-center animate-pulse-slow">
        <LogoMark size={40} />
      </div>
    </div>
  );
}
```

- [x] Replace text with LogoMark
- [x] Keep pulse animation
- [x] Adjust size for circle container

---

## Phase 4: Visual Contrast Update

### 4.1 Update Border Colors

**Files to update:**
- `src/components/Header.tsx`
- `src/components/ValueProps.tsx`
- `src/components/SecondaryCTA.tsx`
- `src/components/Footer.tsx`
- `src/components/FlowDiagram.tsx`

**Changes:**
| Current | Change to |
|---------|-----------|
| `border-zinc-100` | `border-black` |
| `border-zinc-200` | `border-black` |

**Exception**: Keep subtle borders for non-primary elements if full black is too heavy.

- [x] Update Header border
- [x] Update ValueProps icon borders
- [x] Update section dividers
- [x] Update Footer border
- [ ] Visual review after changes

### 4.2 Audit Text Colors

Ensure proper hierarchy:
- Primary text: `text-black` (not `text-foreground` if it resolves to zinc)
- Secondary/muted: `text-zinc-500` or `text-zinc-400` (acceptable)
- Never use colors decoratively

- [x] Audit all text color classes
- [x] Ensure primary text is pure black

---

## Phase 5: Animation Timing Update

### 5.1 Update Framer Motion Durations

**Files to update:**
- `src/components/Hero.tsx`
- `src/components/ValueProps.tsx`
- `src/components/SecondaryCTA.tsx`
- `src/components/FlowDiagram.tsx`

**Changes:**
| Current | Change to |
|---------|-----------|
| `duration: 0.6` | `duration: 0.15` |
| `duration: 0.5` | `duration: 0.12` |
| `duration: 0.4` | `duration: 0.12` |

**Keep as-is:**
- `animate-pulse-slow` (2-3s ambient animation is acceptable)

- [x] Update Hero animation durations
- [x] Update ValueProps stagger
- [x] Update SecondaryCTA reveal
- [ ] Test animations feel snappy but not jarring

---

## Phase 6: Verification

### 6.1 Automated Checks

```bash
# Type check
pnpm tsc --noEmit

# Build
pnpm build

# Lint (if configured)
pnpm lint
```

- [x] TypeScript passes
- [x] Build succeeds
- [x] No lint errors

### 6.2 Manual Verification

- [ ] Desktop: Logo mark + text visible in header
- [ ] Mobile: Only logo mark in header
- [ ] Borders are crisp black (not gray)
- [ ] Animations feel snappy (120-150ms)
- [ ] Iconify icons render and animate
- [ ] FlowDiagram shows E-Block as AI node
- [ ] ValueProps have functional (not decorative) icons
- [ ] Reduced motion preference is respected

---

## Success Criteria

1. Design guide updated with:
   - General professional audience
   - Iconify as icon system
   - Marketing vs. product context distinction
   - Strict black/white guidance

2. Landing page updated with:
   - E-Block logo in header (responsive)
   - Iconify icons throughout
   - Black borders (not zinc grays)
   - 120-150ms animation timing
   - E-Block mark in FlowDiagram AI node

3. All automated checks pass

---

## Out of Scope

- Dark mode implementation
- Additional ShadCN components
- Authentication/waitlist (Phase 3 of landing page PRD)
- Favicon/OG image updates

---

## Dependencies

- `@iconify-icon/react` package
- No breaking changes to existing components

---

## Estimated Effort

| Phase | Effort |
|-------|--------|
| Phase 1: Design Guide Update | ~30 min |
| Phase 2: Icon System | ~1 hour |
| Phase 3: Logo Implementation | ~30 min |
| Phase 4: Visual Contrast | ~30 min |
| Phase 5: Animation Timing | ~20 min |
| Phase 6: Verification | ~20 min |
| **Total** | ~3 hours |

---

## Notes

- The design guide and landing page PRD had conflicting font recommendations (Geist vs Switzer). We're keeping **Switzer** as it's already configured and more distinctive.
- Terminal aesthetic is preserved for future product UI, just removed from marketing context.
- Line-MD animated icons may have gaps in coverage; Lucide provides fallback.
