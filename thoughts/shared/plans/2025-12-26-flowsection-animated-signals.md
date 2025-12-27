# FlowSection Animated Signals Implementation Plan

## Overview

Implement animated green signal lines in the FlowSection ("How it works") component, matching the circuit board animation style from IntegrationsCard. Also remove the "ENTOURAGE" text from the IntegrationsCard center node.

## Current State Analysis

### FlowSection (`src/components/FlowSection.tsx`)
- Uses static CSS border elements for connectors (dashed lines with `▼` arrows)
- No SVG-based path animations
- Framer Motion pulse rings exist around the logo (lines 82-97)
- "Your Tasks" has an emerald checkmark (lines 129-131)

### IntegrationsCard (`src/components/bento/IntegrationsCard.tsx`)
- Has working green signal animation using CSS `offset-path`
- Center node displays LogoMark + "ENTOURAGE" text (lines 208-211)
- Uses SVG with masks and gradients for signal effect

### CSS Animations (`src/app/globals.css`)
- `.circuit-signal` classes (lines 113-197) - working, used by IntegrationsCard
- `.flow-signal` classes (lines 199-232) - defined but unused

### Key Discoveries:
- IntegrationsCard center node at `src/components/bento/IntegrationsCard.tsx:206-213`
- Flow connectors at `src/components/FlowSection.tsx:57-61` and `123-125`
- Signal gradient uses `#48BB78` (emerald-400)
- CSS offset-path animation pattern is well-established

## Desired End State

After implementation:
1. IntegrationsCard shows only the LogoMark (no "ENTOURAGE" text underneath)
2. FlowSection has 4 animated green signals flowing from input sources to Entourage with staggered timing
3. FlowSection has 1 animated signal flowing from Entourage to "Your Tasks" after a delay
4. When signal reaches "Your Tasks", the emerald checkmark pulses

### Visual Flow:
```
[Meetings] [Messages] [Emails] [Documents]
    \         \         /         /
     ↘        ↘       ↙        ↙   (4 animated green signals, staggered)
          [Entourage]
              |
              ↓                    (1 animated green signal, delayed)
         [Your Tasks] ← checkmark pulses when signal arrives
```

## What We're NOT Doing

- NOT changing the overall FlowSection layout or structure
- NOT modifying the Framer Motion pulse rings around the logo
- NOT changing colors or design tokens
- NOT adding mobile-specific animation variants
- NOT adding accessibility motion preferences (can be added later)

## Implementation Approach

Convert FlowSection's HTML/CSS connectors to an SVG overlay system that spans the entire diagram. Use the same CSS `offset-path` animation pattern as IntegrationsCard, with new signal paths calculated for the FlowSection layout.

The SVG will be positioned absolutely to overlay the existing flex layout, with paths calculated to connect the visual elements.

---

## Phase 1: Remove "ENTOURAGE" Text from IntegrationsCard

### Overview
Simple removal of the text span from the center node.

### Changes Required:

#### 1. IntegrationsCard Center Node

**File**: `src/components/bento/IntegrationsCard.tsx`

**Changes**: Remove lines 209-211 (the ENTOURAGE span) and adjust the foreignObject height.

**Before** (lines 206-213):
```tsx
<foreignObject x="168" y="78" width="64" height="44">
  <div className="w-full h-full flex flex-col items-center justify-center">
    <LogoMark size={22} className="text-black dark:text-white" />
    <span className="text-[6px] font-semibold text-black dark:text-white font-mono tracking-wider mt-0.5">
      ENTOURAGE
    </span>
  </div>
</foreignObject>
```

**After**:
```tsx
<foreignObject x="168" y="78" width="64" height="44">
  <div className="w-full h-full flex items-center justify-center">
    <LogoMark size={22} className="text-black dark:text-white" />
  </div>
</foreignObject>
```

Also update the center rect to be smaller (no need for text space):
- Change `height="44"` to `height="36"` on both rect (line 191) and foreignObject (line 206)
- Adjust `y="78"` to `y="82"` to re-center vertically

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `pnpm tsc --noEmit`
- [x] Linting passes: `pnpm lint`
- [x] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] IntegrationsCard shows only the LogoMark (E-block) in center
- [ ] Center node is visually centered in the circuit board
- [ ] No text visible under the logo
- [ ] Dark mode displays correctly

**Implementation Note**: After completing this phase, pause for manual verification before proceeding.

---

## Phase 2: Add SVG Overlay Structure to FlowSection

### Overview
Add an absolutely-positioned SVG that overlays the FlowSection diagram. This SVG will contain all signal paths and animated circles.

### Changes Required:

#### 1. FlowSection Component Structure

**File**: `src/components/FlowSection.tsx`

**Changes**: Add SVG element with signal paths. The paths need to be calculated based on the responsive layout.

**Add after line 37** (inside the `relative flex flex-col items-center` div):
```tsx
{/* Signal animation overlay - hidden on mobile for performance */}
<svg
  className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
  preserveAspectRatio="xMidYMid meet"
>
  <defs>
    {/* Signal gradient - same as IntegrationsCard */}
    <radialGradient id="flow-signal-gradient" fx="0.5" fy="0.5">
      <stop offset="0%" stopColor="#48BB78" />
      <stop offset="100%" stopColor="transparent" />
    </radialGradient>

    {/* Path masks for input signals */}
    <mask id="flow-mask-1">
      <path d="M 12.5% 8% v 12% q 0 2% 2% 2% h 25% q 2% 0 2% 2% v 8%" strokeWidth="3" stroke="white" fill="none" />
    </mask>
    <mask id="flow-mask-2">
      <path d="M 37.5% 8% v 10% q 0 2% 2% 2% h 8% q 2% 0 2% 2% v 8%" strokeWidth="3" stroke="white" fill="none" />
    </mask>
    <mask id="flow-mask-3">
      <path d="M 62.5% 8% v 10% q 0 2% -2% 2% h -8% q -2% 0 -2% 2% v 8%" strokeWidth="3" stroke="white" fill="none" />
    </mask>
    <mask id="flow-mask-4">
      <path d="M 87.5% 8% v 12% q 0 2% -2% 2% h -25% q -2% 0 -2% 2% v 8%" strokeWidth="3" stroke="white" fill="none" />
    </mask>

    {/* Path mask for output signal */}
    <mask id="flow-mask-output">
      <path d="M 50% 62% v 15%" strokeWidth="3" stroke="white" fill="none" />
    </mask>
  </defs>

  {/* Static paths (dashed lines) */}
  <g stroke="currentColor" fill="none" strokeWidth="1" strokeDasharray="4 4" className="text-zinc-200 dark:text-zinc-800">
    <path d="M 12.5% 8% v 12% q 0 2% 2% 2% h 25% q 2% 0 2% 2% v 8%" />
    <path d="M 37.5% 8% v 10% q 0 2% 2% 2% h 8% q 2% 0 2% 2% v 8%" />
    <path d="M 62.5% 8% v 10% q 0 2% -2% 2% h -8% q -2% 0 -2% 2% v 8%" />
    <path d="M 87.5% 8% v 12% q 0 2% -2% 2% h -25% q -2% 0 -2% 2% v 8%" />
    <path d="M 50% 62% v 15%" />
  </g>

  {/* Animated signal circles - input to Entourage */}
  <g mask="url(#flow-mask-1)">
    <circle className="flow-input-signal flow-input-signal-1" cx="0" cy="0" r="10" fill="url(#flow-signal-gradient)" />
  </g>
  <g mask="url(#flow-mask-2)">
    <circle className="flow-input-signal flow-input-signal-2" cx="0" cy="0" r="10" fill="url(#flow-signal-gradient)" />
  </g>
  <g mask="url(#flow-mask-3)">
    <circle className="flow-input-signal flow-input-signal-3" cx="0" cy="0" r="10" fill="url(#flow-signal-gradient)" />
  </g>
  <g mask="url(#flow-mask-4)">
    <circle className="flow-input-signal flow-input-signal-4" cx="0" cy="0" r="10" fill="url(#flow-signal-gradient)" />
  </g>

  {/* Animated signal circle - Entourage to output */}
  <g mask="url(#flow-mask-output)">
    <circle className="flow-output-signal" cx="0" cy="0" r="10" fill="url(#flow-signal-gradient)" />
  </g>
</svg>
```

**Note**: The percentage-based paths above are conceptual. The actual implementation will use a `viewBox` with fixed coordinates calculated from the layout dimensions. See Phase 3 for the final path calculations.

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `pnpm tsc --noEmit`
- [x] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] SVG overlay is visible on desktop
- [ ] SVG overlay is hidden on mobile (performance)
- [ ] Dashed path lines are visible (matching current style)
- [ ] Layout is not disrupted

**Implementation Note**: After completing this phase, pause for manual verification before proceeding.

---

## Phase 3: Add CSS Animation Classes

### Overview
Create CSS animation classes for the flow signals in globals.css. Two animation sets: input signals (4 paths) and output signal (1 path).

### Changes Required:

#### 1. CSS Animation Classes

**File**: `src/app/globals.css`

**Changes**: Replace the unused `.flow-signal` classes (lines 199-232) with new classes for the FlowSection animation.

**Replace lines 199-232 with**:
```css
/* FlowSection input signal animations (4 sources to Entourage) */
.flow-input-signal {
  offset-anchor: 10px 0px;
  animation: flow-input-signal-path 4s cubic-bezier(0.75, -0.01, 0, 0.99) infinite;
}

.flow-input-signal-1 {
  offset-path: path("M 80 40 v 60 q 0 10 10 10 h 150 q 10 0 10 10 v 40");
  animation-delay: 0s;
}

.flow-input-signal-2 {
  offset-path: path("M 200 40 v 50 q 0 10 10 10 h 30 q 10 0 10 10 v 50");
  animation-delay: 0.5s;
}

.flow-input-signal-3 {
  offset-path: path("M 320 40 v 50 q 0 10 -10 10 h -30 q -10 0 -10 10 v 50");
  animation-delay: 1s;
}

.flow-input-signal-4 {
  offset-path: path("M 440 40 v 60 q 0 10 -10 10 h -150 q -10 0 -10 10 v 40");
  animation-delay: 1.5s;
}

@keyframes flow-input-signal-path {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

/* FlowSection output signal animation (Entourage to Your Tasks) */
.flow-output-signal {
  offset-anchor: 10px 0px;
  offset-path: path("M 260 280 v 80");
  animation: flow-output-signal-path 3s cubic-bezier(0.75, -0.01, 0, 0.99) infinite;
  animation-delay: 3s; /* Start after input signals reach center */
}

@keyframes flow-output-signal-path {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}
```

**Note**: The exact path coordinates will be determined during implementation based on the actual SVG viewBox dimensions. The paths above assume a 520x400 viewBox.

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `pnpm build`
- [x] No CSS syntax errors

#### Manual Verification:
- [ ] Green signals animate from input badges toward center
- [ ] Signals have staggered timing (0s, 0.5s, 1s, 1.5s delays)
- [ ] Signals fade in at start and fade out at end
- [ ] Output signal starts ~3s after page load
- [ ] Animation loops infinitely

**Implementation Note**: After completing this phase, pause for manual verification before proceeding.

---

## Phase 4: Add Checkmark Pulse Effect

### Overview
Add a Framer Motion pulse animation to the emerald checkmark that triggers when the output signal reaches "Your Tasks".

### Changes Required:

#### 1. Checkmark Component with Pulse

**File**: `src/components/FlowSection.tsx`

**Changes**: Wrap the checkmark div with a Framer Motion animation that pulses in sync with the output signal arrival.

**Replace lines 129-131**:
```tsx
<div className="w-4 h-4 bg-emerald-500 flex items-center justify-center">
  <Icon icon="lucide:check" size={10} className="text-white" />
</div>
```

**With**:
```tsx
<motion.div
  className="w-4 h-4 bg-emerald-500 flex items-center justify-center"
  animate={{
    scale: [1, 1, 1.3, 1],
    boxShadow: [
      "0 0 0 0 rgba(16, 185, 129, 0)",
      "0 0 0 0 rgba(16, 185, 129, 0)",
      "0 0 0 8px rgba(16, 185, 129, 0.4)",
      "0 0 0 0 rgba(16, 185, 129, 0)"
    ]
  }}
  transition={{
    duration: 7, // Total cycle: 4s input + 3s output
    repeat: Infinity,
    times: [0, 0.85, 0.92, 1], // Pulse at ~6s into cycle (when signal arrives)
  }}
>
  <Icon icon="lucide:check" size={10} className="text-white" />
</motion.div>
```

**Timing breakdown**:
- Input signals take 4s to reach center
- Output signal starts at 3s delay, takes 3s to travel
- Total cycle is 7s (same as combined animation)
- Pulse at 85-92% of cycle = ~6-6.5s (when signal reaches target)

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `pnpm tsc --noEmit`
- [x] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] Checkmark pulses with scale and glow effect
- [ ] Pulse timing roughly coincides with signal arrival
- [ ] Animation is smooth and not jarring
- [ ] Works correctly in both light and dark modes

**Implementation Note**: After completing this phase, pause for final manual verification.

---

## Phase 5: Final SVG Path Calibration

### Overview
Fine-tune the SVG paths to precisely align with the FlowSection layout. This requires measuring the actual rendered positions and adjusting coordinates.

### Changes Required:

This phase involves iterative adjustment of:
1. SVG viewBox dimensions to match container
2. Path coordinates to align with badge centers
3. Mask paths matching signal paths exactly
4. CSS offset-path values matching SVG paths

**Process**:
1. Inspect rendered FlowSection in browser dev tools
2. Note positions of: input badges, Entourage box, "Your Tasks" box
3. Calculate relative positions as percentages or fixed coordinates
4. Update all path definitions to match

### Success Criteria:

#### Manual Verification:
- [ ] Signals visually originate from center of input badges
- [ ] Signals converge at center of Entourage box
- [ ] Output signal travels straight down to "Your Tasks"
- [ ] No visual misalignment or offset issues
- [ ] Animation smooth at all viewport widths (desktop only)

---

## Testing Strategy

### Manual Testing Steps:

1. **IntegrationsCard**:
   - Navigate to landing page
   - Scroll to bento features section
   - Verify IntegrationsCard shows only LogoMark, no text
   - Toggle dark mode, verify appearance

2. **FlowSection Input Signals**:
   - Navigate to "How it works" section
   - Observe 4 green signals starting from input badges
   - Verify staggered timing (not all starting at once)
   - Verify signals converge toward center Entourage box

3. **FlowSection Output Signal**:
   - Watch for signal traveling from Entourage to "Your Tasks"
   - Verify it starts after input signals have traveled (~3s)

4. **Checkmark Pulse**:
   - Observe emerald checkmark for pulse effect
   - Verify pulse occurs roughly when signal "arrives"
   - Check that pulse has scale and glow

5. **Animation Loop**:
   - Watch full animation cycle restart
   - Verify smooth looping with no visual glitches

6. **Responsive Behavior**:
   - Resize to mobile width
   - Verify SVG animations are hidden (performance)
   - Verify base layout still displays correctly

## Performance Considerations

- SVG animations hidden on mobile (`hidden md:block`) to prevent performance issues
- CSS `offset-path` is GPU-accelerated
- Framer Motion pulse uses `animate` prop (not `useSpring`) for simplicity
- Signal circles use radial gradient (not blur filter) for performance

## References

- Research document: `thoughts/shared/research/2025-12-26-flowsection-animation-research.md`
- IntegrationsCard implementation: `src/components/bento/IntegrationsCard.tsx:92-122`
- Circuit signal CSS: `src/app/globals.css:113-197`
