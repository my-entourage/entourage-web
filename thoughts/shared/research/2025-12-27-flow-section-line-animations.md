---
date: 2025-12-27T12:00:00-08:00
researcher: Claude
git_commit: 4904e04
branch: main
repository: entourage-web
topic: "How FlowSection handles line animations"
tags: [research, codebase, flow-section, animations, svg, smil]
status: complete
last_updated: 2025-12-27
last_updated_by: Claude
---

# Research: How FlowSection Handles Line Animations

**Date**: 2025-12-27
**Researcher**: Claude
**Git Commit**: 4904e04
**Branch**: main
**Repository**: entourage-web

## Research Question
How does the "How it works" section (FlowSection) handle the line animations?

## Summary

The FlowSection uses **SVG SMIL animations** for circuit-board style animated lines. It renders two separate SVGs (desktop and mobile) that position themselves absolutely behind the HTML content. Each SVG contains:
1. Static circuit paths that draw-in on page load
2. Animated signal dots that travel along the paths continuously

The animation system uses three SMIL elements: `<animate>` for path draw-in and opacity, and `<animateMotion>` for signal movement along paths.

## Detailed Findings

### Component Structure (`src/components/sections/flow-section/FlowSection.tsx`)

The FlowSection renders this hierarchy:
```
<section>
  <Container>
    <header text>
    <div.relative> (animation container)
      <svg desktop> (hidden md:block, absolute inset-0)
      <svg mobile>  (md:hidden, absolute inset-0)
      <div.z-10> Input badges (Meetings, Messages, etc.)
      <div.h-12> Spacer
      <div.z-10> AI Processing box
      <div.h-12> Spacer
      <div.z-10> Tasks output
```

### Path Definitions (Lines 20-53)

**Desktop Paths** (viewBox 400x500):
- 4 paths for 4-column layout
- X positions: 50, 150, 250, 350 (12.5%, 37.5%, 62.5%, 87.5%)
- Pattern: Drop down 60 units → curve with 5px bezier radius → horizontal to center (x=200) → curve down → vertical to bottom

```javascript
const desktopPaths = [
  "M 50 0 v 60 q 0 5 5 5 h 140 q 5 0 5 5 v 390",   // leftmost
  "M 150 0 v 60 q 0 5 5 5 h 40 q 5 0 5 5 v 390",   // center-left
  "M 250 0 v 60 q 0 5 -5 5 h -40 q -5 0 -5 5 v 390", // center-right
  "M 350 0 v 60 q 0 5 -5 5 h -140 q -5 0 -5 5 v 390", // rightmost
];
```

**Mobile Paths** (viewBox 400x550):
- 4 paths for 2x2 grid layout
- Row 1: x=100, 300 starting at y=0
- Row 2: x=100, 300 starting at y=70

```javascript
const mobilePaths = [
  "M 100 0 v 60 q 0 5 5 5 h 90 q 5 0 5 5 v 440",    // top-left
  "M 300 0 v 60 q 0 5 -5 5 h -90 q -5 0 -5 5 v 440", // top-right
  "M 100 70 v 60 q 0 5 5 5 h 90 q 5 0 5 5 v 370",   // bottom-left
  "M 300 70 v 60 q 0 5 -5 5 h -90 q -5 0 -5 5 v 370", // bottom-right
];
```

### Animation Timing (Lines 30-53)

```javascript
const desktopTiming = [
  { dur: "4s", delay: "1.5s" },
  { dur: "3.5s", delay: "2s" },
  { dur: "3.5s", delay: "1.8s" },
  { dur: "4s", delay: "2.2s" },
];
```

Staggered delays create visual interest with signals starting at different times.

### Animation 1: Path Draw-In (Lines 85-98)

Uses `stroke-dasharray` + `stroke-dashoffset` animation to create a drawing effect:

```jsx
<g stroke="currentColor" fill="none" strokeWidth="1"
   strokeDasharray="600 600" pathLength="600">
  {desktopPaths.map((d, i) => (
    <path key={i} d={d}>
      <animate
        attributeName="stroke-dashoffset"
        from="600" to="0"
        dur="1.5s"
        fill="freeze"
        calcMode="spline"
        keySplines="0.25,0.1,0.5,1"
        keyTimes="0; 1"
      />
    </path>
  ))}
</g>
```

- `pathLength="600"` normalizes path length
- `strokeDasharray="600 600"` creates dash pattern matching path length
- Animating `stroke-dashoffset` from 600→0 reveals the stroke
- `fill="freeze"` keeps final state after animation completes
- `keySplines` creates eased motion

### Animation 2: Signal Dots (Lines 100-127)

Each signal is a masked circle with two animations:

```jsx
<g mask={`url(#desktop-mask-${i})`}>
  <circle cx="0" cy="0" r="6" fill="url(#flow-signal-gradient-desktop)">
    <animateMotion
      path={d}
      dur={desktopTiming[i].dur}
      begin={desktopTiming[i].delay}
      repeatCount="indefinite"
      calcMode="spline"
      keySplines="0.75 -0.01 0 0.99"
      keyTimes="0;1"
    />
    <animate
      attributeName="opacity"
      values="0;1;1;0"
      keyTimes="0;0.1;0.85;1"
      dur={desktopTiming[i].dur}
      begin={desktopTiming[i].delay}
      repeatCount="indefinite"
    />
  </circle>
</g>
```

**`<animateMotion>`**: Moves circle along path
- `path={d}` - same path as visible line
- `calcMode="spline"` with custom keySplines for eased motion
- `repeatCount="indefinite"` for continuous looping

**`<animate>` for opacity**: Fade in/out
- `values="0;1;1;0"` - fade in, hold, fade out
- `keyTimes="0;0.1;0.85;1"` - 10% fade in, 75% visible, 15% fade out

### SVG Masks (Lines 128-133)

Masks constrain the radial gradient circle to only show along the path stroke:

```jsx
<mask id={`desktop-mask-${i}`}>
  <path d={d} strokeWidth="3" stroke="white" fill="none" />
</mask>
```

The mask is 3px wide, matching approximately the signal dot's visible area.

### Radial Gradient (Lines 134-137)

```jsx
<radialGradient id="flow-signal-gradient-desktop" fx="0.5" fy="0.5">
  <stop offset="0%" stopColor="#10B981" />
  <stop offset="100%" stopColor="transparent" />
</radialGradient>
```

Creates a glowing emerald (#10B981) dot that fades to transparent at edges.

### SVG Positioning (Lines 73-76)

```jsx
<svg
  className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
  viewBox="0 0 400 500"
  preserveAspectRatio="none"
>
```

- `absolute inset-0 w-full h-full` - covers entire container
- `preserveAspectRatio="none"` - stretches SVG to match container dimensions
- `pointer-events-none` - allows clicks to pass through to elements below
- `hidden md:block` / `md:hidden` - shows appropriate SVG per viewport

## Code References

- `src/components/sections/flow-section/FlowSection.tsx:20-53` - Path and timing definitions
- `src/components/sections/flow-section/FlowSection.tsx:73-139` - Desktop SVG with animations
- `src/components/sections/flow-section/FlowSection.tsx:141-208` - Mobile SVG with animations
- `src/app/globals.css:200` - Comment indicating FlowSection uses SVG animateMotion

## Architecture Documentation

### Animation Pattern
FlowSection uses pure SVG SMIL animations rather than CSS animations. This differs from IntegrationsCard which uses CSS `offset-path` for signal movement. The SMIL approach was chosen because:
- `preserveAspectRatio="none"` stretches the SVG coordinate system
- CSS `offset-path` coordinates don't scale with SVG transformations
- SMIL `<animateMotion>` stays in SVG coordinate space and scales correctly

### Responsive Strategy
Two completely separate SVGs handle desktop vs mobile:
- Desktop: 4-column grid → 4 paths converging to center
- Mobile: 2x2 grid → 4 paths from 2 rows converging to center

### Related Pattern: IntegrationsCard
`src/components/bento/IntegrationsCard.tsx` uses a similar circuit-board animation pattern but with CSS `offset-path` animations defined in `globals.css`. It uses `preserveAspectRatio="xMidYMid meet"` which maintains aspect ratio, allowing CSS coordinates to work correctly.

## Historical Context (from thoughts/)

No existing research documents found for FlowSection animations.

## Related Research

- `thoughts/shared/research/2025-12-26-design-system-documentation.md` - Design system context

## Open Questions

None - implementation is fully documented.
