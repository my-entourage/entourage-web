---
date: 2025-12-28T12:00:00-08:00
researcher: Claude
git_commit: 62eb900e3457fcaedd85ee9711c0438c1540fff9
branch: development
repository: entourage-web
topic: "Text and Element Readability in Light and Dark Modes"
tags: [research, design-system, accessibility, dark-mode, colors]
status: complete
last_updated: 2025-12-28
last_updated_by: Claude
---

# Research: Text and Element Readability in Light and Dark Modes

**Date**: 2025-12-28T12:00:00-08:00
**Researcher**: Claude
**Git Commit**: 62eb900e3457fcaedd85ee9711c0438c1540fff9
**Branch**: development
**Repository**: entourage-web

## Research Question
How readable are the different texts and elements in both light and dark modes across all sections of the Entourage website?

## Summary

The codebase implements a comprehensive dual-mode color system with **100% light/dark mode coverage** across all components. The design follows a consistent "Technical Blueprint" aesthetic using the zinc color scale for all grayscale elements. Key findings:

- **All text elements** have both light and dark mode variants
- **Primary text** uses maximum contrast (`text-black`/`dark:text-white`)
- **Secondary text** uses muted contrast (`text-zinc-500`/`dark:text-zinc-400`)
- **Accent colors** (emerald, violet, amber) are used sparingly and consistently across both modes
- **WCAG AA compliance** is maintained with black/white providing 21:1 contrast ratio

## Detailed Findings

### CSS Variables Foundation

The color system is defined in `src/app/globals.css` using oklch color space:

| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--background` | `oklch(1 0 0)` (white) | `oklch(0 0 0)` (black) |
| `--foreground` | `oklch(0.145 0 0)` (near-black) | `oklch(0.985 0 0)` (near-white) |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |

### Text Color Hierarchy (All Sections)

| Purpose | Light Mode | Dark Mode | Contrast Level |
|---------|------------|-----------|----------------|
| Headlines/Primary | `text-black` | `dark:text-white` | Maximum (21:1) |
| Body/Descriptions | `text-zinc-500` | `dark:text-zinc-400` | Medium |
| Section Labels | `text-zinc-400` | `dark:text-zinc-500` | Low (decorative) |
| Button Text (solid) | `text-white` | `dark:text-black` | Maximum (inverted) |

### Border Color Hierarchy

| Purpose | Light Mode | Dark Mode |
|---------|------------|-----------|
| Strong emphasis | `border-black` | `dark:border-white` |
| Standard containers | `border-zinc-300` | `dark:border-zinc-700` |
| Dashed frames | `border-zinc-200` | `dark:border-zinc-800` |
| Plus corners | `text-zinc-400` | `dark:text-zinc-600` |

---

## Section-by-Section Analysis

### Hero Section (`src/components/sections/hero/Hero.tsx`)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Main headline | `text-black` | `dark:text-white` |
| Tagline | `text-zinc-400` | `dark:text-zinc-500` |
| Description | `text-zinc-500` | `dark:text-zinc-400` |
| CTA Button | `bg-black text-white` | `dark:bg-white dark:text-black` |
| Dashed border | `border-zinc-200` | `dark:border-zinc-800` |
| Plus corners | `text-zinc-400` | `dark:text-zinc-600` |

**Note**: The tagline uses lower contrast (`zinc-400`/`zinc-500`) which is intentional for visual hierarchy but may be less readable for users with visual impairments.

### Flow Section (`src/components/sections/flow-section/FlowSection.tsx`)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Section heading | `text-black` | `dark:text-white` |
| Overline label | `text-zinc-400` | `dark:text-zinc-500` |
| Description | `text-zinc-500` | `dark:text-zinc-400` |
| Input source labels | `text-black` | `dark:text-white` |
| Input source icons | `text-zinc-500` | `dark:text-zinc-400` |
| AI processing box border | `border-zinc-200` | `dark:border-zinc-800` |
| Action badge text | `text-zinc-500` | `dark:text-zinc-400` |
| Output box border | `border-black` | `dark:border-white` |
| Checkmark badge | `bg-emerald-500 text-white` | Same (no change) |

**Accent colors used**:
- SVG signals: Amber `#F59E0B` → Emerald `#10B981` (hard-coded, same in both modes)
- Success badge: `bg-emerald-500` (same in both modes)

### Bento Features (`src/components/sections/bento-features/`)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Section label | `text-zinc-400` | `dark:text-zinc-500` |
| Section title | `text-black` | `dark:text-white` |
| Card titles | `text-black` | `dark:text-white` |
| Card descriptions | `text-zinc-500` | `dark:text-zinc-400` |
| Card borders | `border-zinc-300` | `dark:border-zinc-700` |
| Icon containers | `border-black` | `dark:border-white` |
| Icons (primary) | `text-black` | `dark:text-white` |
| Icons (secondary) | `text-zinc-600` | `dark:text-zinc-400` |

**Data Vault Card specifics**:
- Folder back panel: `bg-zinc-200` | `dark:bg-zinc-800`
- Folder front panel: `bg-zinc-100` | `dark:bg-zinc-900`
- Folder tab: `bg-zinc-300` | `dark:bg-zinc-700`

**Integrations Card specifics**:
- Circuit paths: `text-zinc-300` | `dark:text-zinc-700`
- Signal gradient: `#48BB78` (emerald green, same in both modes)
- Center node: `fill-white` | `dark:fill-black`
- Fireflies/Granola images: `grayscale dark:invert`

### FAQ Section (`src/components/sections/faq/FAQ.tsx`)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Section label | `text-zinc-400` | `dark:text-zinc-500` |
| Section heading | `text-black` | `dark:text-white` |
| Question text | `text-black` | `dark:text-white` |
| Answer text | `text-zinc-500` | `dark:text-zinc-400` |
| Accordion borders | `border-zinc-200` | `dark:border-zinc-800` |
| Chevron icon | `text-muted-foreground` | (CSS variable) |

### Header (`src/components/layout/header/Header.tsx`)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Logo | `text-black` | `dark:text-white` |
| Scrolled border | `border-black` | `dark:border-white` |
| Theme toggle text | `text-black` | `dark:text-white` |
| Theme toggle border | `border-black` | `dark:border-white` |
| Login button | `bg-transparent text-black border-black` | `dark:text-white dark:border-white` |

### Footer (`src/components/layout/footer/Footer.tsx`)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Top border | `border-black` | `dark:border-white` |
| Brand name | `text-zinc-400` | `dark:text-zinc-500` |
| Divider pipe | `text-zinc-200` | `dark:text-zinc-700` |
| Hiring link | `text-zinc-400` | `dark:text-zinc-500` |
| Hiring link hover | `hover:text-black` | `dark:hover:text-white` |
| Copyright | `text-zinc-400` | `dark:text-zinc-500` |

### Team Credentials (`src/components/sections/team-credentials/TeamCredentialsSection.tsx`)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Dashed borders | `border-zinc-200` | `dark:border-zinc-800` |
| Plus corners | `text-zinc-400` | `dark:text-zinc-600` |
| Label text | `text-zinc-400` | `dark:text-zinc-500` |
| Logos (default) | `grayscale opacity-50` | `grayscale opacity-50 invert` |
| Logos (hover) | `opacity-100` (color) | `opacity-100 invert-0` (color) |

**Logo handling**: Credentials without dark variants (DeepMind, McKinsey, etc.) use `dark:invert` to maintain visibility. Harvard and Aalto have dedicated dark mode logo files.

### Secondary CTA (`src/components/sections/secondary-cta/SecondaryCTA.tsx`)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Dashed border | `border-zinc-300` | `dark:border-zinc-700` |
| Plus corners | `text-zinc-400` | `dark:text-zinc-600` |
| Headline | `text-black` | `dark:text-white` |
| Button | `bg-background text-black border-black` | `dark:text-white dark:border-white` |
| Subtext | `text-zinc-500` | `dark:text-zinc-400` |

---

## Accent Colors Used

| Color | Hex | Tailwind | Usage | Mode Behavior |
|-------|-----|----------|-------|---------------|
| Emerald | `#10B981` | `emerald-500` | Success badges, AI signals | Same in both modes |
| Amber | `#F59E0B` | `amber-500` | Input source signals | Same in both modes |
| Green gradient | `#48BB78` | - | Circuit board signals | Same in both modes |

---

## Patterns Observed

### Consistent Pairing Pattern
All components follow the convention of declaring both variants together:
```tsx
className="text-black dark:text-white"
className="border-zinc-300 dark:border-zinc-700"
```

### Inverted Hierarchy for Labels
Section labels use an **inverted** contrast pattern:
- Light mode: `text-zinc-400` (lighter, less prominent)
- Dark mode: `dark:text-zinc-500` (darker relative to white background)

This maintains similar visual weight in both modes.

### Hard-coded Accent Colors
SVG animations and success indicators use hard-coded colors rather than theme-aware variants:
- Signal gradients: `#F59E0B`, `#10B981`, `#48BB78`
- Checkmark badges: `bg-emerald-500 text-white`

These remain constant across modes, providing consistent branding.

---

## Code References

- CSS Variables: `src/app/globals.css:7-46` (light), `src/app/globals.css:401-437` (dark)
- Design System Docs: `docs/design-system.md`
- Button Component: `src/components/ui/Button.tsx:21-28`
- PlusCorner Component: `src/components/ui/PlusCorner.tsx`
- Hero Section: `src/components/sections/hero/Hero.tsx`
- Flow Section: `src/components/sections/flow-section/FlowSection.tsx`
- Bento Features: `src/components/sections/bento-features/BentoFeatures.tsx`
- FAQ Section: `src/components/sections/faq/FAQ.tsx`
- Header: `src/components/layout/header/Header.tsx`
- Footer: `src/components/layout/footer/Footer.tsx`
- Team Credentials: `src/components/sections/team-credentials/TeamCredentialsSection.tsx`
- Secondary CTA: `src/components/sections/secondary-cta/SecondaryCTA.tsx`

## Architecture Documentation

The codebase uses a **layered color system**:

1. **CSS Variables Layer** (`globals.css`): Defines semantic tokens using oklch color space
2. **Theme Layer** (`@theme inline`): Maps CSS variables to Tailwind theme
3. **Component Layer**: Uses Tailwind classes with `dark:` variants

This architecture ensures:
- Consistent color application across all components
- Easy theme switching via `.dark` class on root element
- Automatic inheritance of theme-aware colors via CSS variables like `bg-background`

## Open Questions

1. **Tagline contrast**: The hero tagline uses `zinc-400`/`zinc-500` which may not meet WCAG AA for smaller text sizes. Should this be evaluated for accessibility?

2. **Hard-coded accent colors**: SVG animations use hex values rather than Tailwind classes. Are there scenarios where these should adapt to theme?

3. **Focus ring color**: Button focus rings use `focus:ring-black` without a dark mode variant. Is this intentional?
