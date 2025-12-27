---
date: 2025-12-28T00:00:00-08:00
researcher: Claude
git_commit: dba186f125e9c4d4838f0a39b40a817673aef8c3
branch: development
repository: entourage-web
topic: "TeamCredentialsSection Component Documentation"
tags: [research, codebase, team-credentials, infinite-slider, landing-page]
status: complete
last_updated: 2025-12-28
last_updated_by: Claude
---

# Research: TeamCredentialsSection Component Documentation

**Date**: 2025-12-28T00:00:00-08:00
**Researcher**: Claude
**Git Commit**: dba186f125e9c4d4838f0a39b40a817673aef8c3
**Branch**: development
**Repository**: entourage-web

## Research Question
Document the structure and implementation of the `src/components/sections/team-credentials/` component.

## Summary
TeamCredentialsSection is a landing page section that displays an infinite-scrolling logo carousel showing company and university logos representing where team members have worked or studied. It uses the design system's signature "Plus Corners" pattern and the `InfiniteSlider` component for smooth horizontal scrolling animation.

## Detailed Findings

### Component Structure

**Location**: `src/components/sections/team-credentials/`

```
team-credentials/
├── TeamCredentialsSection.tsx   # Main component (94 lines)
└── index.ts                     # Barrel export
```

### TeamCredentialsSection.tsx

**Purpose**: Display scrolling logo carousel with "Built by engineers from" label

**Props**:
```typescript
interface TeamCredentialsSectionProps {
  className?: string;
}
```

**Dependencies**:
- `next/image` - Optimized image loading
- `@/lib/utils` - `cn()` utility for classNames
- `../../ui/Container` - Layout wrapper
- `../../InfiniteSlider` - Animation component
- `../../ui/PlusCorner` - Design system decorative element

### Credentials Data

Logos are defined as a static array at the top of the file (lines 16-24):

| Name | Logo | Dark Mode Logo | Custom Class |
|------|------|----------------|--------------|
| DeepMind | `/logos/deepmind.svg` | - | - |
| McKinsey | `/logos/mckinsey.svg` | - | - |
| Bain | `/logos/bain.svg` | - | - |
| Google | `/logos/google.svg` | - | - |
| Boeing | `/logos/boeing.svg` | - | - |
| Harvard | `/logos/harvard.svg` | `/logos/harvard-white-text.svg` | - |
| Aalto | `/logos/aalto.png` | `/logos/aalto-white.svg` | `scale-150` |

**Note**: DeepMind and Google are positioned apart in the array so they're not visible simultaneously (per code comment line 15).

### Visual Design

**Container Layout**:
- Section: `py-12 md:py-16 bg-background`
- Inner container: `max-w-3xl mx-auto px-6 md:px-12` (narrower than standard 5xl)

**Plus Corners Pattern**:
- Four `PlusCorner` components positioned at corners
- Positioned with `-top-2.5 -left-2.5` (etc.) for offset from borders
- Dashed borders: `border-dashed border-zinc-200 dark:border-zinc-800`

**Label**:
- Centered above top border: `absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2`
- Text: "Built by engineers from"
- Styling: `text-[10px] sm:text-xs font-mono uppercase tracking-wider`
- Background masks the border line: `bg-background px-3 sm:px-4`

**Logo Carousel**:
- Edge fade mask: `[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]`
- Wider mask on larger screens: `sm:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]`

### Logo Styling

Each logo has:
- `grayscale opacity-50` default state
- `hover:opacity-100 hover:grayscale-0` on hover
- `transition-all duration-300` for smooth transitions
- Height: `h-6 md:h-8` with auto width

**Dark Mode Handling**:
- Logos without `logoDark`: Apply `dark:invert dark:hover:invert-0`
- Logos with `logoDark`: Show alternate image with `dark:hidden` / `hidden dark:block`

### InfiniteSlider Component

**Location**: `src/components/InfiniteSlider.tsx`

**Props**:
```typescript
type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;        // Default: 16
  duration?: number;   // Default: 25
  direction?: "horizontal" | "vertical";  // Default: "horizontal"
  reverse?: boolean;   // Default: false
  className?: string;
  speed?: number;      // Alternative to duration (100/speed = duration)
};
```

**TeamCredentialsSection Usage**:
```tsx
<InfiniteSlider gap={64} reverse speed={7.5}>
```
- Gap: 64px between logos
- Reverse: Scrolls right-to-left
- Speed: 7.5 (converts to ~13.3s animation duration)

**Animation Mechanism**:
1. Renders children twice (duplicate for seamless loop)
2. Uses CSS animation: `animate-scroll` or `animate-scroll-reverse`
3. Waits for mount via `requestAnimationFrame` before animating
4. Uses stable keys to prevent React reconciliation issues

### CSS Animations

**Location**: `src/app/globals.css` (lines 440-482)

**Keyframes**:
```css
@keyframes scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(calc(-50% - var(--slider-gap, 0px) / 2), 0, 0); }
}

@keyframes scroll-reverse {
  0% { transform: translate3d(calc(-50% - var(--slider-gap, 0px) / 2), 0, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
```

**Animation Classes**:
- `will-change: transform` for GPU acceleration
- `backface-visibility: hidden` to prevent flicker
- `transform: translateZ(0)` prevents sub-pixel rendering issues

**Accessibility**:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-scroll, .animate-scroll-reverse {
    animation: none;
  }
}
```

### Container Component

**Location**: `src/components/ui/Container.tsx`

Simple wrapper providing consistent page margins:
```tsx
<div className={`mx-auto w-full max-w-5xl px-6 md:px-12 ${className}`}>
```

### PlusCorner Component

**Location**: `src/components/ui/PlusCorner.tsx`

SVG plus sign used as decorative element:
```tsx
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
  <path d="M12 6v12m6-6H6" />
</svg>
```

Supports optional `interactive` prop for hover state transitions.

### Page Integration

**Usage in page.tsx** (line 38):
```tsx
import { TeamCredentialsSection } from "@/components/sections";
// ...
<TeamCredentialsSection />
```

Exported via barrel file `src/components/sections/index.ts` (line 4).

## Code References

- `src/components/sections/team-credentials/TeamCredentialsSection.tsx` - Main component
- `src/components/sections/team-credentials/index.ts` - Barrel export
- `src/components/InfiniteSlider.tsx` - Animation wrapper
- `src/components/ui/PlusCorner.tsx` - Decorative SVG
- `src/components/ui/Container.tsx` - Layout wrapper
- `src/app/globals.css:440-482` - Scroll animation keyframes and classes
- `src/app/page.tsx:38` - Component usage
- `public/logos/` - 9 logo assets (SVG and PNG)

## Architecture Documentation

**Pattern**: Section component with infinite scroll carousel

**Design System Elements**:
- Plus Corners at container corners (signature Entourage pattern)
- Dashed borders with light/dark variants
- Monospace uppercase labels
- Background masking for text-over-border effect
- Edge fade gradient masks

**Animation Pattern**:
- Pure CSS animations for performance
- Uses custom CSS properties (`--slider-gap`)
- GPU-accelerated transforms
- Respects `prefers-reduced-motion`

## Historical Context (from thoughts/)

- `thoughts/shared/handoffs/general/2025-12-26_04-02-07_landing-page-redesign.md` - Documents speed reduction from 40 to 5
- `thoughts/shared/plans/2025-12-26-design-system-alignment.md` - References PlusCorner deduplication
- `thoughts/shared/plans/2025-12-26-nextjs-folder-structure-enforcement.md` - Documents move from `components/` root to `sections/team-credentials/`

## Related Research

- `thoughts/shared/research/2025-12-27-font-configurations.md` - References mono font usage in label

## Open Questions

None - component is well-documented and straightforward.
