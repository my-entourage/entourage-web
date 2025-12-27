# FlowSection Smooth Animation Implementation Plan

## Overview

Restructure FlowSection to use a fixed aspect ratio container with CSS `offset-path` animations (like IntegrationsCard), eliminating the `preserveAspectRatio="none"` stretching that causes visual inconsistencies.

## Current State Analysis

**Problems with current implementation:**
1. `preserveAspectRatio="none"` stretches SVG non-uniformly, causing signals to move at inconsistent speeds
2. SVG `animateMotion` is less performant than CSS `offset-path`
3. CSS effects use `width`/`height` animation (triggers layout) instead of `transform` (GPU)
4. Separate opacity animation can drift out of sync with motion
5. Mask/dot size ratio (4px/12px) too loose - signals appear diffuse

**IntegrationsCard's superior approach:**
- `preserveAspectRatio="xMidYMid meet"` maintains uniform scaling
- CSS `offset-path` for GPU-accelerated path animation
- Unified keyframes for position + opacity
- Tighter mask (2px) with larger dot (16px) for focused appearance
- Custom easing: `cubic-bezier(0.75, -0.01, 0, 0.99)`

## Desired End State

A FlowSection where:
1. All animations run at consistent 60fps
2. Signals travel at visually uniform speed along paths
3. Processing rings use GPU-accelerated `transform: scale()`
4. Task arrival uses `transform` instead of `box-shadow` expansion
5. Layout maintains proper proportions on all screen sizes
6. Mobile (2x2) and desktop (4-column) both work correctly

### Verification:
- Visual: Signals move smoothly without speed variation
- Performance: No jank when viewing in browser DevTools Performance tab
- Responsive: Layout looks correct from 320px to 1920px width

## What We're NOT Doing

- Adding color transformation (amber → green) - keep simple green signals
- Complex segmented animations - single continuous path per signal
- Framer Motion - stick with CSS/SVG for this component
- Changing the overall visual design - just improving smoothness

## Implementation Approach

Use a **fixed aspect ratio container** approach:
1. Container has CSS `aspect-ratio` matching SVG viewBox
2. SVG uses `xMidYMid meet` (uniform scaling)
3. HTML elements positioned absolutely with percentages that match SVG coordinates
4. CSS `offset-path` animations in globals.css

---

## Phase 1: Restructure Layout with Fixed Aspect Ratio

### Overview
Replace the current flexible layout with a fixed aspect ratio container where HTML positions match SVG coordinates.

### Changes Required:

#### 1. Update FlowSection.tsx Layout Structure

**File**: `src/components/sections/flow-section/FlowSection.tsx`

Replace the current layout with aspect-ratio based positioning:

```tsx
// Coordinate system (matching viewBox 0 0 400 500):
// Desktop badge centers: x = 50, 150, 250, 350 (12.5%, 37.5%, 62.5%, 87.5%)
// Badge top: y ≈ 10 (2%)
// AI Box: y = 120-340 (24%-68%)
// Tasks: y ≈ 420 (84%)

const desktopPaths = [
  "M 50 45 v 40 q 0 8 8 8 h 134 q 8 0 8 8 v 240 q 0 8 -8 8 h -134 q -8 0 -8 8 v 60",
  "M 150 45 v 40 q 0 8 8 8 h 34 q 8 0 8 8 v 240 q 0 8 -8 8 h -34 q -8 0 -8 8 v 60",
  "M 250 45 v 40 q 0 8 -8 8 h -34 q -8 0 -8 8 v 240 q 0 8 8 8 h 34 q 8 0 8 8 v 60",
  "M 350 45 v 40 q 0 8 -8 8 h -134 q -8 0 -8 8 v 240 q 0 8 8 8 h 134 q 8 0 8 8 v 60",
];

// Mobile paths (viewBox 0 0 400 600):
// Badge positions: Row 1 at x=100,300 y=10; Row 2 at x=100,300 y=80
const mobilePaths = [
  "M 100 45 v 50 q 0 8 8 8 h 84 q 8 0 8 8 v 200 q 0 8 -8 8 h -84 q -8 0 -8 8 v 80",
  "M 300 45 v 50 q 0 8 -8 8 h -84 q -8 0 -8 8 v 200 q 0 8 8 8 h 84 q 8 0 8 8 v 80",
  "M 100 115 v 50 q 0 8 8 8 h 84 q 8 0 8 8 v 130 q 0 8 -8 8 h -84 q -8 0 -8 8 v 80",
  "M 300 115 v 50 q 0 8 -8 8 h -84 q -8 0 -8 8 v 130 q 0 8 8 8 h 84 q 8 0 8 8 v 80",
];
```

**New component structure:**

```tsx
export function FlowSection({ className }: FlowSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-background", className)}>
      <Container>
        {/* Header text - outside the fixed aspect container */}
        <div className="text-center mb-12">
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

        {/* Fixed aspect ratio container - desktop */}
        <div className="hidden md:block relative mx-auto max-w-2xl aspect-[4/5]">
          {/* SVG with paths and signals */}
          <svg
            className="absolute inset-0 w-full h-full text-zinc-300 dark:text-zinc-700"
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Static paths */}
            {/* Signal masks */}
            {/* Gradients */}
          </svg>

          {/* Absolutely positioned HTML elements */}
          {/* Badges at top */}
          {/* AI Processing box in middle */}
          {/* Tasks at bottom */}

          {/* CSS-animated signal dots (outside SVG) */}
          <div className="flow-signal flow-signal-desktop-1" />
          <div className="flow-signal flow-signal-desktop-2" />
          <div className="flow-signal flow-signal-desktop-3" />
          <div className="flow-signal flow-signal-desktop-4" />
        </div>

        {/* Fixed aspect ratio container - mobile */}
        <div className="md:hidden relative mx-auto max-w-sm aspect-[2/3]">
          {/* Similar structure for mobile */}
        </div>
      </Container>
    </section>
  );
}
```

#### 2. Position HTML Elements with Percentages

**Badge positions (desktop):**
```tsx
{/* Desktop badges - positioned to match SVG coordinates */}
<div className="absolute grid grid-cols-4 gap-4 px-[5%]" style={{ top: '2%', left: 0, right: 0 }}>
  {inputSources.map((source) => (
    <div
      key={source.label}
      className="flex items-center justify-center gap-2 px-3 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-background text-sm font-mono"
    >
      <Icon icon={source.icon} size={16} className="text-zinc-500" />
      <span className="text-black dark:text-white">{source.label}</span>
    </div>
  ))}
</div>
```

**AI Processing box (desktop):**
```tsx
<div
  className="absolute left-1/2 -translate-x-1/2 w-[70%] max-w-md"
  style={{ top: '24%', height: '44%' }}
>
  {/* Processing box content */}
</div>
```

**Tasks box (desktop):**
```tsx
<div
  className="absolute left-1/2 -translate-x-1/2"
  style={{ top: '84%' }}
>
  {/* Tasks content */}
</div>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `pnpm tsc --noEmit`
- [ ] No lint errors: `pnpm lint`
- [ ] Dev server runs: `pnpm dev`

#### Manual Verification:
- [ ] Desktop (1024px+): Badges align with SVG path start points
- [ ] Mobile (< 768px): 2x2 grid badges align with mobile paths
- [ ] Resize browser: Layout maintains proportions smoothly

---

## Phase 2: Implement CSS offset-path Animations

### Overview
Replace SVG `animateMotion` with CSS `offset-path` for GPU-accelerated smooth animation.

### Changes Required:

#### 1. Add Signal Elements to HTML (not SVG)

**File**: `src/components/sections/flow-section/FlowSection.tsx`

Add signal dots as HTML divs that will be animated with CSS:

```tsx
{/* Signal dots - CSS animated */}
{desktopPaths.map((_, i) => (
  <div
    key={`signal-${i}`}
    className={`flow-signal flow-signal-desktop-${i + 1}`}
  />
))}
```

#### 2. Add CSS offset-path Animations

**File**: `src/app/globals.css`

```css
/* ==========================================================================
   FlowSection Signal Animations (CSS offset-path)
   ========================================================================== */

/* Base signal dot styling */
.flow-signal {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(circle, #10B981 0%, #10B981 40%, transparent 70%);
  pointer-events: none;
  offset-anchor: center;
  animation: flow-signal-path 4s cubic-bezier(0.75, -0.01, 0, 0.99) infinite;
}

/* Desktop signal paths - must match SVG paths exactly */
.flow-signal-desktop-1 {
  offset-path: path("M 50 45 v 40 q 0 8 8 8 h 134 q 8 0 8 8 v 240 q 0 8 -8 8 h -134 q -8 0 -8 8 v 60");
  animation-delay: 0s;
}

.flow-signal-desktop-2 {
  offset-path: path("M 150 45 v 40 q 0 8 8 8 h 34 q 8 0 8 8 v 240 q 0 8 -8 8 h -34 q -8 0 -8 8 v 60");
  animation-delay: 0.5s;
}

.flow-signal-desktop-3 {
  offset-path: path("M 250 45 v 40 q 0 8 -8 8 h -34 q -8 0 -8 8 v 240 q 0 8 8 8 h 34 q 8 0 8 8 v 60");
  animation-delay: 0.3s;
}

.flow-signal-desktop-4 {
  offset-path: path("M 350 45 v 40 q 0 8 -8 8 h -134 q -8 0 -8 8 v 240 q 0 8 8 8 h 134 q 8 0 8 8 v 60");
  animation-delay: 0.8s;
}

/* Mobile signal paths */
.flow-signal-mobile-1 {
  offset-path: path("M 100 45 v 50 q 0 8 8 8 h 84 q 8 0 8 8 v 200 q 0 8 -8 8 h -84 q -8 0 -8 8 v 80");
  animation-delay: 0s;
}

.flow-signal-mobile-2 {
  offset-path: path("M 300 45 v 50 q 0 8 -8 8 h -84 q -8 0 -8 8 v 200 q 0 8 8 8 h 84 q 8 0 8 8 v 80");
  animation-delay: 0.5s;
}

.flow-signal-mobile-3 {
  offset-path: path("M 100 115 v 50 q 0 8 8 8 h 84 q 8 0 8 8 v 130 q 0 8 -8 8 h -84 q -8 0 -8 8 v 80");
  animation-delay: 0.3s;
}

.flow-signal-mobile-4 {
  offset-path: path("M 300 115 v 50 q 0 8 -8 8 h -84 q -8 0 -8 8 v 130 q 0 8 8 8 h 84 q 8 0 8 8 v 80");
  animation-delay: 0.8s;
}

/* Unified keyframes - position and opacity together */
@keyframes flow-signal-path {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  88% {
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}
```

#### 3. Update SVG to Only Contain Static Paths

**File**: `src/components/sections/flow-section/FlowSection.tsx`

SVG now only draws the static circuit lines (no animated elements):

```tsx
<svg
  className="absolute inset-0 w-full h-full text-zinc-300 dark:text-zinc-700"
  viewBox="0 0 400 500"
  preserveAspectRatio="xMidYMid meet"
>
  {/* Static path lines with draw-in animation */}
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
</svg>
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS compiles without errors
- [ ] Dev server shows no console errors

#### Manual Verification:
- [ ] Signals follow paths smoothly at consistent speed
- [ ] No visible speed variation in horizontal vs vertical segments
- [ ] Fade in/out is synchronized with position
- [ ] DevTools Performance tab shows smooth 60fps

---

## Phase 3: Fix Processing Ring Animation (GPU-Accelerated)

### Overview
Replace `width`/`height` animation with `transform: scale()` for GPU acceleration.

### Changes Required:

**File**: `src/app/globals.css`

Replace current processing ring animation:

```css
/* FlowSection Processing Animation - GPU accelerated */
.flow-processing-ring {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #8B5CF6;
  opacity: 0;
  transform: scale(0.6);
  animation: flow-processing-pulse 4s ease-out infinite;
}

.flow-processing-ring-1 { animation-delay: 0s; }
.flow-processing-ring-2 { animation-delay: 1.3s; }
.flow-processing-ring-3 { animation-delay: 2.6s; }

@keyframes flow-processing-pulse {
  0% {
    opacity: 0.6;
    transform: scale(0.6);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS valid

#### Manual Verification:
- [ ] Rings expand smoothly from logo
- [ ] No jank or stutter
- [ ] Purple color visible against both light and dark backgrounds

---

## Phase 4: Fix Task Arrival Animation (GPU-Accelerated)

### Overview
Replace `box-shadow` animation with `transform: scale()` on a pseudo-element.

### Changes Required:

**File**: `src/app/globals.css`

```css
/* FlowSection Task Arrival - GPU accelerated pulse ring */
.flow-task-arrive {
  position: relative;
}

.flow-task-arrive::before {
  content: '';
  position: absolute;
  inset: -4px;
  border: 2px solid #10B981;
  opacity: 0;
  transform: scale(1);
  animation: flow-task-pulse 4s ease-out infinite;
  pointer-events: none;
}

@keyframes flow-task-pulse {
  0%, 75% {
    opacity: 0;
    transform: scale(1);
  }
  80% {
    opacity: 0.6;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}

/* Checkmark bounce - already using transform, just refine timing */
.flow-checkmark-bounce {
  animation: flow-checkmark-bounce 4s ease-out infinite;
}

@keyframes flow-checkmark-bounce {
  0%, 75% {
    transform: scale(1);
  }
  82% {
    transform: scale(1.3);
  }
  88% {
    transform: scale(0.9);
  }
  94% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS valid

#### Manual Verification:
- [ ] Green pulse ring expands from Tasks box
- [ ] Checkmark bounces in sync with pulse
- [ ] Animation feels satisfying and polished

---

## Phase 5: Final Polish and Cleanup

### Overview
Remove unused code, verify all animations work together, test responsive behavior.

### Changes Required:

#### 1. Remove Unused CSS
Delete any old FlowSection CSS that's no longer used.

#### 2. Verify Timing Coordination
Ensure all animations work together visually:
- Path draw-in: 1.5s (plays once on load)
- Signal travel: 4s loop with staggered starts
- Processing rings: 4s loop (always running)
- Task arrival: 4s loop (always running)

#### 3. Test Edge Cases
- Very wide screens (1920px+)
- Very narrow screens (320px)
- Reduced motion preference

### Success Criteria:

#### Automated Verification:
- [ ] `pnpm build` succeeds
- [ ] No TypeScript errors
- [ ] No unused CSS warnings

#### Manual Verification:
- [ ] All animations smooth at 60fps
- [ ] Mobile layout correct
- [ ] Desktop layout correct
- [ ] Dark mode looks good
- [ ] Light mode looks good
- [ ] `prefers-reduced-motion` respected (if implemented)

---

## Testing Strategy

### Performance Testing:
1. Open Chrome DevTools → Performance tab
2. Record while watching FlowSection
3. Verify consistent 60fps
4. Check for layout thrashing (should be none)

### Visual Testing:
1. Desktop Chrome, Firefox, Safari
2. Mobile Safari (iOS)
3. Mobile Chrome (Android)
4. Resize window to test responsive breakpoints

### Accessibility:
- Animations should not be essential for understanding
- Consider adding `prefers-reduced-motion` support

## References

- IntegrationsCard implementation: `src/components/bento/IntegrationsCard.tsx`
- IntegrationsCard CSS: `src/app/globals.css:113-198`
- Current FlowSection: `src/components/sections/flow-section/FlowSection.tsx`
- CSS offset-path MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
