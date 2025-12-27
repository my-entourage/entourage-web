# FlowSection Animation Redesign Implementation Plan

## Overview

Redesign FlowSection animations to create a cohesive "data transformation" narrative where signals visually transition from pending (amber/orange) to processed (emerald/green). Replace the color-cycling glow on action badges with a technical pulse animation that matches the "Your Tasks" arrival effect. Add a third "Analyze" badge and input source departure animations.

## Current State Analysis

### What Exists Now

**Signal Dots** (`globals.css`, `FlowSection.tsx:71-76, 110-132`):
- Static emerald radial gradient (`#10B981`)
- Dots animate along paths via SMIL `<animateMotion>`
- Fade in/out at path endpoints

**Action Badges** (`globals.css:201-245`, `FlowSection.tsx:180-187`):
- Two badges: "Extract" (top-left) and "Organize" (bottom-right)
- 4s color-cycling glow: zinc → amber → violet → emerald
- Different keyframes for light/dark modes

**Task Arrival** (`globals.css:248-283`):
- Pulsing emerald ring expanding outward
- Checkmark bounce animation
- Both on 4s cycle, trigger at 70-75%

**Input Badges** (`FlowSection.tsx:136-149, 282-295`):
- Static badges with border and icon
- No animation currently

### Key Discoveries

- All animations use 4s base cycle for synchronization
- Signal duration: 3.5-5s per path (staggered)
- Signal begin time: 1.5s + (index * 0.3s)
- Task pulse triggers at 75% of cycle (3s mark)

## Desired End State

1. **Signal dots** transition from amber glow at start to emerald glow at end
2. **Action badges** (Extract, Analyze, Organize) pulse with a sharp "scan line" effect synchronized with signal arrival, matching the technical blueprint aesthetic
3. **Input badges** emit a brief amber pulse when signals depart
4. Visual narrative: amber (pending) → processing → emerald (complete)

### Verification

- Visual: Signals clearly show color transition along path
- Visual: Action badges pulse in rhythm with signals passing through
- Visual: Input badges flash amber as signals leave
- Technical: All animations remain GPU-optimized
- Accessibility: Animations respect `prefers-reduced-motion`

## What We're NOT Doing

- Changing the path draw-in animation (works well)
- Modifying the task arrival pulse (already good)
- Changing signal timing/duration
- Adding JavaScript-based animations (keeping CSS/SVG only)

## Implementation Approach

Use SVG gradient animation for color transitions and CSS keyframes for badge pulses. Keep all timing synchronized on 4s cycles. Match the "sharp" aesthetic of the existing task pulse.

---

## Phase 1: Signal Color Gradient Transition

### Overview

Change signal dots from static emerald to animated amber→emerald gradient as they travel along paths.

### Changes Required:

#### 1. SVG Gradient Definition

**File**: `src/components/sections/flow-section/FlowSection.tsx`

**Lines 71-76** - Replace static gradient with animated gradient:

```tsx
{/* Current */}
<radialGradient id="flow-signal-gradient" fx="0.5" fy="0.5">
  <stop offset="0%" stopColor="#10B981" />
  <stop offset="100%" stopColor="transparent" />
</radialGradient>

{/* New - Animated gradient */}
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
```

**Timing Rationale**:
- 0-30%: Amber (signal departing input)
- 30-70%: Transition (signal in AI box)
- 70-100%: Emerald (signal approaching output)

#### 2. Mobile Gradient (Same Change)

**Lines 219-222** - Apply identical change to mobile gradient `flow-signal-gradient-mobile`.

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `pnpm tsc --noEmit`
- [x] Lint passes: `pnpm lint` (pre-existing errors in other files, not FlowSection)
- [x] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] Signal dots start amber when leaving input badges
- [ ] Signal dots transition to emerald as they reach AI box
- [ ] Color transition is smooth, not jarring
- [ ] Works in both light and dark mode
- [ ] Mobile layout shows same color transition

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 2.

---

## Phase 2: Action Badge Pulse Animation

### Overview

Replace color-cycling glow with a sharp "scan line" pulse that fires when signals pass through the AI box. More technical, blueprint-feeling.

### Changes Required:

#### 1. New CSS Keyframes

**File**: `src/app/globals.css`

**Replace lines 200-245** with:

```css
/* FlowSection Action Badge - Technical scan pulse */
.flow-action-badge {
  will-change: box-shadow, border-color;
  animation: flow-action-pulse 4s ease-out infinite;
}

@keyframes flow-action-pulse {
  0%, 60% {
    box-shadow: 0 0 0 0 transparent;
    border-color: rgb(228 228 231); /* zinc-200 */
  }
  65% {
    box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.6), 0 0 8px 0 rgba(245, 158, 11, 0.4);
    border-color: rgba(245, 158, 11, 0.8);
  }
  75% {
    box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.6), 0 0 8px 0 rgba(16, 185, 129, 0.4);
    border-color: rgba(16, 185, 129, 0.8);
  }
  85%, 100% {
    box-shadow: 0 0 0 0 transparent;
    border-color: rgb(228 228 231); /* zinc-200 */
  }
}

.dark .flow-action-badge {
  animation: flow-action-pulse-dark 4s ease-out infinite;
}

@keyframes flow-action-pulse-dark {
  0%, 60% {
    box-shadow: 0 0 0 0 transparent;
    border-color: rgb(63 63 70); /* zinc-700 */
  }
  65% {
    box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.5), 0 0 8px 0 rgba(245, 158, 11, 0.3);
    border-color: rgba(245, 158, 11, 0.7);
  }
  75% {
    box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.5), 0 0 8px 0 rgba(16, 185, 129, 0.3);
    border-color: rgba(16, 185, 129, 0.7);
  }
  85%, 100% {
    box-shadow: 0 0 0 0 transparent;
    border-color: rgb(63 63 70); /* zinc-700 */
  }
}
```

**Animation Design**:
- Sharp pulse instead of smooth glow cycling
- Amber flash (65%) → Emerald flash (75%) → Rest
- Matches the "data processed" moment
- Inset shadow creates technical "scan" effect
- Synchronized with task arrival at 75%

#### 2. Staggered Animation Delays for Each Badge

**File**: `src/components/sections/flow-section/FlowSection.tsx`

Add animation delay classes to create sequence:

**Desktop "Extract" badge (line 180)**:
```tsx
{/* Current */}
<div className="flow-action-badge absolute top-3 left-3 ...">

{/* New - add inline style for delay */}
<div className="flow-action-badge absolute top-3 left-3 ..." style={{ animationDelay: '0s' }}>
```

**Desktop "Organize" badge (line 184)**:
```tsx
{/* Add delay */}
<div className="flow-action-badge absolute bottom-3 right-3 ..." style={{ animationDelay: '0.3s' }}>
```

Same pattern for mobile badges (lines 322, 326).

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `pnpm tsc --noEmit`
- [x] Lint passes: `pnpm lint`
- [x] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] Action badges pulse sharply (not gradual glow)
- [ ] Pulse shows amber→emerald color sequence
- [ ] Badges pulse in staggered sequence
- [ ] Animation feels "technical" and matches task arrival
- [ ] Works in both light and dark mode

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 3.

---

## Phase 3: Add "Analyze" Badge

### Overview

Add third action badge "Analyze" at bottom-left of AI Processing box to complete the triad: Extract → Analyze → Organize.

### Changes Required:

#### 1. Desktop Layout

**File**: `src/components/sections/flow-section/FlowSection.tsx`

**After line 187** (after the Organize badge), add:

```tsx
<div
  className="flow-action-badge absolute bottom-3 left-3 border border-zinc-200 dark:border-zinc-700 bg-background px-2 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1"
  style={{ animationDelay: '0.15s' }}
>
  <Icon icon="lucide:scan-search" size={12} />
  <span>Analyze</span>
</div>
```

**Icon choice**: `lucide:scan-search` - represents data analysis/scanning. Alternatives: `lucide:search-code`, `lucide:microscope`.

**Animation delay**: 0.15s (between Extract at 0s and Organize at 0.3s) for sequential pulse effect.

#### 2. Mobile Layout

**After line 329** (after mobile Organize badge), add:

```tsx
<div
  className="flow-action-badge absolute bottom-2 left-2 border border-zinc-200 dark:border-zinc-700 bg-background px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1"
  style={{ animationDelay: '0.15s' }}
>
  <Icon icon="lucide:scan-search" size={10} />
  <span>Analyze</span>
</div>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `pnpm tsc --noEmit`
- [ ] Lint passes: `pnpm lint`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] "Analyze" badge visible at bottom-left of AI box
- [ ] Badge matches styling of Extract/Organize
- [ ] Badge pulses in sequence: Extract → Analyze → Organize
- [ ] Mobile layout shows badge correctly scaled
- [ ] Badge doesn't overlap with other elements

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 4.

---

## Phase 4: Input Source Pulse Animation

### Overview

Add amber pulse animation to input badges (Meetings, Messages, Emails, Documents) that fires when signals depart.

### Changes Required:

#### 1. New CSS Animation

**File**: `src/app/globals.css`

**Add after line 283** (after flow-checkmark-bounce):

```css
/* FlowSection Input Source - departure pulse */
.flow-input-source {
  will-change: box-shadow;
  animation: flow-input-pulse 4s ease-out infinite;
}

/* Staggered delays for each input */
.flow-input-source:nth-child(1) { animation-delay: 0s; }
.flow-input-source:nth-child(2) { animation-delay: 0.3s; }
.flow-input-source:nth-child(3) { animation-delay: 0.6s; }
.flow-input-source:nth-child(4) { animation-delay: 0.9s; }

@keyframes flow-input-pulse {
  0%, 5% {
    box-shadow: 0 0 0 0 transparent;
  }
  10% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.5);
  }
  20% {
    box-shadow: 0 0 0 6px rgba(245, 158, 11, 0);
  }
  25%, 100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

.dark .flow-input-source {
  animation: flow-input-pulse-dark 4s ease-out infinite;
}

/* Staggered delays preserved in dark mode */
.dark .flow-input-source:nth-child(1) { animation-delay: 0s; }
.dark .flow-input-source:nth-child(2) { animation-delay: 0.3s; }
.dark .flow-input-source:nth-child(3) { animation-delay: 0.6s; }
.dark .flow-input-source:nth-child(4) { animation-delay: 0.9s; }

@keyframes flow-input-pulse-dark {
  0%, 5% {
    box-shadow: 0 0 0 0 transparent;
  }
  10% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
  }
  20% {
    box-shadow: 0 0 0 6px rgba(245, 158, 11, 0);
  }
  25%, 100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
```

**Animation Design**:
- Quick amber ring pulse (like signal departing)
- Fires at start of cycle (0-20%)
- Staggered by 0.3s to match signal stagger
- Matches the expanding ring style of task arrival (but amber)

#### 2. Apply Class to Input Badges

**File**: `src/components/sections/flow-section/FlowSection.tsx`

**Desktop input badges (lines 140-148)**:

```tsx
{/* Current */}
{inputSources.map((source) => (
  <div
    key={source.label}
    className="flex items-center justify-center gap-2 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-background"
  >

{/* New - add flow-input-source class */}
{inputSources.map((source) => (
  <div
    key={source.label}
    className="flow-input-source flex items-center justify-center gap-2 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-background"
  >
```

**Mobile input badges (lines 286-294)** - Same change, add `flow-input-source` class.

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `pnpm tsc --noEmit`
- [ ] Lint passes: `pnpm lint`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] Input badges pulse amber at start of animation cycle
- [ ] Pulses are staggered (each badge pulses at different time)
- [ ] Ring expands outward (matches task arrival style)
- [ ] Animation syncs with signal departure timing
- [ ] Works in both light and dark mode

**Implementation Note**: After completing this phase, verify the complete animation sequence flows correctly from inputs → AI box → output.

---

## Testing Strategy

### Unit Tests
N/A - Visual animations, no logic to unit test.

### Integration Tests
N/A - CSS/SVG animations.

### Manual Testing Steps

1. **Full flow test**: Watch complete animation cycle (4s)
   - Input badges pulse amber (0-0.5s staggered)
   - Signals travel from inputs, transitioning amber→emerald
   - Action badges pulse amber→emerald as signals pass (2.5-3.5s)
   - Task output pulses emerald, checkmark bounces (3s)

2. **Dark mode test**: Toggle theme, verify all animations work

3. **Mobile test**: Resize to mobile, verify layout and timing

4. **Reduced motion test**: Enable `prefers-reduced-motion`, verify animations are disabled/reduced

5. **Performance test**: Check for jank using Chrome DevTools Performance tab

## Performance Considerations

- All animations use GPU-optimized properties (`transform`, `box-shadow`, `opacity`)
- `will-change` hints added for box-shadow animations
- No JavaScript animation overhead
- Animations are CSS/SVG declarative (browser-optimized)

## Accessibility

- Animations respect `prefers-reduced-motion` media query
- Colors are not the only indicator (shape, position, labels all provide context)
- Animation timing is slow enough to not cause discomfort (4s cycle)

## References

- Research: `thoughts/shared/research/2025-12-27-flow-section-component.md`
- Design system: `docs/design-system.md` (Accent colors: Amber #F59E0B, Emerald #10B981)
- Component: `src/components/sections/flow-section/FlowSection.tsx`
- Styles: `src/app/globals.css:200-283`
