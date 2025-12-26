---
date: 2025-12-26T13:25:05Z
researcher: Claude
git_commit: f554d1a3eb6cfb116ee066d0f16f325ee02bcf9d
branch: feat/design-system
repository: entourage-web
topic: "Compare styling configs with design system documentation"
tags: [research, codebase, styling, design-system, tailwind, css-variables]
status: complete
last_updated: 2025-12-26
last_updated_by: Claude
---

# Research: Styling Configuration vs Design System Comparison

**Date**: 2025-12-26T13:25:05Z
**Researcher**: Claude
**Git Commit**: f554d1a3eb6cfb116ee066d0f16f325ee02bcf9d
**Branch**: feat/design-system
**Repository**: entourage-web

## Research Question

Compare the actual styling configurations in the codebase with what is documented in `docs/design-system.md`.

## Summary

The codebase uses Tailwind CSS v4 with CSS-based configuration. Several discrepancies exist between the actual implementation in `src/app/globals.css` and the documentation in `docs/design-system.md`.

## Configuration Files Analyzed

| File | Purpose |
|------|---------|
| `src/app/globals.css:1-297` | Main CSS variables and animations |
| `src/app/layout.tsx:1-47` | Font configuration |
| `postcss.config.mjs:1-8` | PostCSS/Tailwind v4 plugin |
| `components.json:1-23` | ShadCN UI configuration |

## Detailed Findings

### 1. Color Format Difference

**Design System (lines 146-181)** specifies hex colors:
```css
--background: #FFFFFF;
--foreground: #171717;
--primary: #171717;
--muted-foreground: #737373;
```

**Actual globals.css (lines 6-39)** uses OKLCH color space:
```css
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
--primary: oklch(0.205 0 0);
--muted-foreground: oklch(0.556 0 0);
```

**Impact**: Functionally equivalent for grayscale, but documentation doesn't reflect actual format.

### 2. Border Radius - MAJOR DISCREPANCY

**Design System** states throughout:
- "Sharp corners (0px radius everywhere)" (line 37)
- "Border radius: Always 0 (`rounded-none`)" (line 1501)

**Actual globals.css (lines 9, 75-78)**:
```css
--radius: 0.625rem;
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
```

**Impact**: Components using `rounded-*` classes will have rounded corners, contradicting the "Technical Blueprint" aesthetic.

### 3. Dark Mode Background

**Design System (line 166)** specifies pure black:
```css
--background: #000000;
```

**Actual globals.css (line 224)**:
```css
--background: oklch(0.145 0 0);  /* ≈ #242424, dark gray */
```

**Impact**: Dark mode is not true black as documented.

### 4. Card Background in Dark Mode

**Design System (line 169)** specifies:
```css
--card: #171717;
```

**Actual globals.css (line 226)**:
```css
--card: oklch(0.205 0 0);  /* ≈ #333333, different shade */
```

### 5. Font Configuration - MATCHES

**Design System (lines 198-211)**:
```tsx
const switzer = localFont({
  src: [...],
  variable: "--font-switzer",
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

**Actual layout.tsx (lines 7-25)**: Identical implementation.

### 6. Shadow System - NOT IMPLEMENTED

**Design System (lines 342-354)** documents shadow tokens:
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.06), ...;
--shadow-card-hover: ...;
--shadow-lg: ...;
--shadow-xl: ...;
```

**Actual globals.css**: No shadow CSS variables defined.

**Impact**: Components rely on Tailwind's default shadows rather than documented custom values.

### 7. Animation Definitions - MATCHES

**Design System (lines 1273-1297)** describes:
```css
@keyframes pulse-subtle { ... }
.animate-pulse-slow { animation: pulse-subtle 3s ease-in-out infinite; }
@keyframes scroll { ... }
.animate-scroll { animation: scroll linear infinite; }
```

**Actual globals.css (lines 86-282)**: Implements these plus additional circuit-signal and flow-signal animations not documented in the design system.

### 8. ShadCN Configuration

**components.json** settings:
- Style: `new-york`
- Base color: `neutral`
- CSS variables: enabled
- Icon library: `lucide`

**Design System** references:
- Uses Zinc color scale (lines 72-84), but ShadCN is configured with `neutral`
- Documents ShadcnUI as base (line 48)

### 9. Theme Configuration - MATCHES

**@theme inline block (globals.css lines 41-79)** correctly maps CSS variables to Tailwind v4 theme using:
```css
@theme inline {
  --color-background: var(--background);
  --font-sans: var(--font-switzer);
  --font-mono: var(--font-geist-mono);
  ...
}
```

### 10. Base Layer Styles - MATCHES

**globals.css (lines 284-296)**:
```css
@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
```

Properly applies background and text colors to body.

## Comparison Table

| Setting | Design System | Actual Config | Status |
|---------|---------------|---------------|--------|
| Color format | Hex | OKLCH | Different |
| Border radius | 0px | 0.625rem | **MISMATCH** |
| Dark background | #000000 | ~#242424 | **MISMATCH** |
| Dark card | #171717 | ~#333333 | **MISMATCH** |
| Font stack | Switzer + Geist Mono | Switzer + Geist Mono | Match |
| Shadow tokens | Defined | Not defined | **MISSING** |
| Pulse animation | 3s ease-in-out | 3s ease-in-out | Match |
| Scroll animation | linear infinite | linear infinite | Match |

## Code References

- `src/app/globals.css:9` - Border radius set to 0.625rem
- `src/app/globals.css:224` - Dark mode background not pure black
- `src/app/globals.css:226` - Dark mode card different shade
- `src/app/layout.tsx:7-25` - Font configuration
- `components.json:9` - ShadCN base color is "neutral"
- `docs/design-system.md:37` - Documents "sharp corners"
- `docs/design-system.md:166` - Documents pure black background

## Architecture Documentation

The project uses:
1. **Tailwind CSS v4** with CSS-based configuration (no tailwind.config.js)
2. **PostCSS** with `@tailwindcss/postcss` plugin
3. **OKLCH color space** for all CSS variables
4. **ShadCN UI** "new-york" style with "neutral" base color
5. **next-themes** for dark mode via ThemeProvider

## Open Questions

1. Should `--radius` be set to `0` to match the design system's "sharp corners" principle?
2. Should dark mode background be true `oklch(0 0 0)` (#000000)?
3. Should shadow CSS variables be added to globals.css?
4. Should documentation be updated to reflect OKLCH color format?
5. Is the ShadCN "neutral" base color intentional vs the documented "zinc" scale?
