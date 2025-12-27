---
date: 2025-12-26T17:45:00-08:00
researcher: Claude
git_commit: 4f1e082c73872090ac04bd1fc8434436a34ce773
branch: feat/design-system
repository: entourage-web
topic: "FlowSection Animation Patterns and IntegrationsCard Entourage Text"
tags: [research, codebase, FlowSection, IntegrationsCard, animations, circuit-signals]
status: complete
last_updated: 2025-12-26
last_updated_by: Claude
---

# Research: FlowSection Animation Patterns and IntegrationsCard Entourage Text

**Date**: 2025-12-26T17:45:00-08:00
**Researcher**: Claude
**Git Commit**: 4f1e082c73872090ac04bd1fc8434436a34ce773
**Branch**: feat/design-system
**Repository**: entourage-web

## Research Question

1. Where is the "ENTOURAGE" text located under the logo in the integrations feature?
2. How does the "How it works" (FlowSection) work and what animation patterns exist for moving green signals along paths?

## Summary

The IntegrationsCard component contains the "ENTOURAGE" text at `src/components/bento/IntegrationsCard.tsx:209-210`. The FlowSection currently uses simple dashed lines with arrows and Framer Motion pulse rings, but does NOT use the CSS offset-path signal animations. There are pre-defined CSS classes for flow signals (`flow-signal-1` through `flow-signal-4`) in globals.css that are currently unused.

## Detailed Findings

### IntegrationsCard - "ENTOURAGE" Text Location

**File**: `src/components/bento/IntegrationsCard.tsx`

The "ENTOURAGE" text is rendered inside the center node at lines 206-212:

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

**Key details**:
- Located at line 209-210
- Uses 6px font size with monospace font
- Has `mt-0.5` margin-top spacing from the LogoMark
- Inside a `foreignObject` SVG element positioned at x="168" y="78"
- The center node is a 64x44 pixel rectangle

### FlowSection - Current Implementation

**File**: `src/components/FlowSection.tsx`

#### Structure (top to bottom):

1. **Input Sources** (lines 39-55): Grid of 4 badges (Meetings, Messages, Emails, Documents)

2. **First Connector** (lines 57-61):
   ```tsx
   <div className="flex flex-col items-center py-4">
     <div className="h-6 w-px border-l border-dashed border-zinc-200 dark:border-zinc-800" />
     <div className="text-zinc-400 dark:text-zinc-600 text-xs">▼</div>
   </div>
   ```
   - Simple dashed vertical line with down arrow
   - No animation

3. **AI Processing Box** (lines 63-120):
   - Wrapped in PlusCorner decorations
   - Contains pulse ring animations (Framer Motion)
   - Center LogoMark with "Entourage" text
   - "Extract" and "Organize" floating badges

4. **Second Connector** (lines 123-125):
   ```tsx
   <div className="h-6 w-px border-l border-dashed border-zinc-200 dark:border-zinc-800" />
   <div className="text-zinc-400 dark:text-zinc-600 text-xs">▼</div>
   ```
   - Same simple dashed line pattern

5. **Your Tasks Output** (lines 126-135):
   ```tsx
   <div className="mt-4 flex items-center gap-3 border border-black dark:border-white bg-background px-4 py-2">
     <Icon icon="lucide:clipboard-check" size={20} className="text-black dark:text-white" />
     <span className="text-sm font-mono text-black dark:text-white">Your Tasks</span>
     <div className="w-4 h-4 bg-emerald-500 flex items-center justify-center">
       <Icon icon="lucide:check" size={10} className="text-white" />
     </div>
   </div>
   ```
   - Has emerald-500 checkmark indicator
   - Solid border (not dashed) indicating emphasis

#### Pulse Ring Animation (lines 82-97):

Three Framer Motion animated divs create concentric pulsing square rings:

```tsx
<motion.div
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-zinc-200 dark:border-zinc-800"
  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
  transition={{ duration: 2, repeat: Infinity }}
/>
```

- Sizes: 24x24, 32x32, 40x40 pixels
- Scale animation: 1 → 1.1 → 1
- Opacity oscillation
- Staggered delays: 0s, 0.3s, 0.6s
- 2-second duration, infinite repeat

### Circuit Signal Animation Pattern (IntegrationsCard)

**Files**:
- `src/components/bento/IntegrationsCard.tsx` (lines 92-122)
- `src/app/globals.css` (lines 112-197)

This is the working green signal animation used in IntegrationsCard.

#### SVG Structure:
- 10 SVG paths connecting integration icons to center
- Each path uses quadratic bezier curves (`q`) for rounded corners
- Green gradient signal circles (`r="8"`) animated along paths

#### CSS Animation Pattern:

Base class (globals.css:113-120):
```css
.circuit-signal {
  offset-anchor: 8px 0px;
  animation: circuit-signal-path;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.75, -0.01, 0, 0.99);
  animation-duration: 4s;
  animation-delay: 1.5s;
}
```

Individual path classes define `offset-path` with the same SVG path data:
```css
.circuit-signal-1 {
  offset-path: path("M 60 30 v 35 q 0 5 5 5 h 115 q 5 0 5 5 v 25");
  animation-delay: 1.5s;
  animation-duration: 3s;
}
```

Keyframe animation (globals.css:182-197):
```css
@keyframes circuit-signal-path {
  0% { offset-distance: 0%; opacity: 0; }
  10% { opacity: 1; }
  85% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
```

**Key aspects**:
- Uses CSS `offset-path` for GPU-accelerated path animation
- Staggered delays (1.5s - 2.5s) prevent synchronized movement
- Variable durations (3s - 5s) create organic feel
- Fade-in/fade-out at path endpoints
- Green color: `#48BB78` (emerald-400 equivalent)

### Unused Flow Signal CSS Classes

**File**: `src/app/globals.css` (lines 199-232)

There are pre-defined CSS classes that are NOT currently used:

```css
.flow-signal {
  offset-anchor: 10px 0px;
  animation: flow-signal-path;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-duration: 4s;
  animation-delay: 1s;
}

.flow-signal-1 {
  offset-path: path("M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 25");
}
/* ... flow-signal-2, 3, 4 */
```

**Differences from circuit-signal**:
- Larger offset-anchor (10px vs 8px)
- Different easing (ease-out vs custom)
- Simpler keyframes (no opacity fading)
- 4 paths instead of 10
- All share same timing (4s duration, 1s delay)

### Connection from Entourage to Your Tasks

**Current state**: Simple dashed line with arrow (FlowSection.tsx:123-125)

There is NO animated signal on this connection currently. The line is static.

## Code References

| File | Lines | Description |
|------|-------|-------------|
| `src/components/bento/IntegrationsCard.tsx` | 209-210 | "ENTOURAGE" text element |
| `src/components/bento/IntegrationsCard.tsx` | 206-213 | Center node with logo and text |
| `src/components/bento/IntegrationsCard.tsx` | 92-122 | Signal circle elements |
| `src/components/bento/IntegrationsCard.tsx` | 27-90 | SVG path definitions |
| `src/components/FlowSection.tsx` | 57-61 | First connector (input→processing) |
| `src/components/FlowSection.tsx` | 123-125 | Second connector (processing→output) |
| `src/components/FlowSection.tsx` | 126-132 | "Your Tasks" output element |
| `src/components/FlowSection.tsx` | 82-97 | Framer Motion pulse rings |
| `src/app/globals.css` | 113-120 | `.circuit-signal` base class |
| `src/app/globals.css` | 122-180 | `.circuit-signal-1` through `-10` |
| `src/app/globals.css` | 182-197 | `@keyframes circuit-signal-path` |
| `src/app/globals.css` | 199-207 | `.flow-signal` base class (unused) |
| `src/app/globals.css` | 209-223 | `.flow-signal-1` through `-4` (unused) |

## Architecture Documentation

### Animation Patterns

| Pattern | Location | Technology | Status |
|---------|----------|------------|--------|
| Circuit signals | IntegrationsCard | CSS offset-path | Active |
| Flow signals | globals.css | CSS offset-path | Defined but unused |
| Pulse rings | FlowSection | Framer Motion | Active |
| Pulse subtle | globals.css | CSS keyframes | Defined |

### Signal Color

The green signal uses emerald gradient `#48BB78` (lighter than design system's `#10B981`):
```css
<radialGradient id="signal-gradient">
  <stop offset="0%" stopColor="#48BB78" />
  <stop offset="100%" stopColor="transparent" />
</radialGradient>
```

### SVG Path Syntax Used

- `M` - Move to (start point)
- `v` - Vertical line (relative)
- `h` - Horizontal line (relative)
- `q` - Quadratic bezier curve (creates rounded corners)

Example: `M 60 30 v 35 q 0 5 5 5 h 115 q 5 0 5 5 v 25`
- Start at (60,30)
- Draw vertical line down 35 units
- Round corner with 5px radius
- Draw horizontal line right 115 units
- Round corner with 5px radius
- Draw vertical line down 25 units

## Historical Context (from thoughts/)

- `thoughts/shared/research/2025-12-25-flowdiagram-improvements.md` - Previous research on FlowDiagram improvements
- `thoughts/shared/plans/2025-12-26-landing-page-redesign.md` - Landing page redesign plan including FlowSection
- `thoughts/shared/handoffs/general/2025-12-25_16-30-54_design-system-flowdiagram-improvements.md` - Session handoff for FlowDiagram work

## Related Research

- `thoughts/shared/research/2025-12-26-design-system-documentation.md` - Design system documentation

## Open Questions

1. Should the flow signal animation use the same fade-in/fade-out pattern as circuit signals?
2. What should happen when the signal reaches "Your Tasks" - pulse the entire element, just the checkmark, or the border?
3. Should signals travel from input sources to Entourage, then from Entourage to Your Tasks in sequence?
