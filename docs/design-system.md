# ENTOURAGE DESIGN SYSTEM

**Identity**: Technical Blueprint — engineering-drawing aesthetic with sharp corners, precision, and Plus Corner motifs.

**Stack**: Next.js 16, React 19, ShadcnUI, Tailwind CSS v4, Framer Motion, Iconify

---

## Core Principles

| Principle | Description |
|-----------|-------------|
| Objectivity | Information over emotion |
| Precision | Grid-based, consistent spacing, sharp corners (0px radius) |
| Clarity | High contrast, readable typography |
| Density | Information-rich, respects user's time |
| Intentionality | Every element has purpose |

---

## Colors

### Monochrome Base

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Background | `#FFFFFF` | `#000000` |
| Foreground | `#000000` | `#FFFFFF` |
| Muted text | `zinc-500` | `zinc-400` |
| Labels | `zinc-400` | `zinc-500` |
| Plus corners | `zinc-400` | `zinc-600` |
| Borders (primary) | `black` | `white` |
| Borders (subtle) | `zinc-300` | `zinc-700` |
| Dashed frames | `zinc-200`/`zinc-300` | `zinc-700`/`zinc-800` |
| Hover bg | `zinc-100` | `zinc-800`/`zinc-900` |

### Accent Palette

| Color | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| Emerald | `#10B981` | `emerald-500` | Success, AI actions, active states |
| Violet | `#8B5CF6` | `violet-500` | Categories, tags, special |
| Amber | `#F59E0B` | `amber-500` | Warnings, pending |
| Rose | `#F43F5E` | `rose-500` | Errors, destructive |
| Sky | `#0EA5E9` | `sky-500` | Info, links |

**Rules**: Never decorative. Pair with text/icon. Use `color-500/10` for backgrounds.

---

## Typography

### Fonts

```css
--font-sans: 'Switzer', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Monaco', monospace;
```

### Scale

| Size | Tailwind | Use |
|------|----------|-----|
| 12px | `text-xs` | Labels, tags |
| 14px | `text-sm` | Secondary text |
| 16px | `text-base` | Body |
| 18px | `text-lg` | Card titles |
| 24px | `text-2xl` | Section headings (mobile) |
| 30px | `text-3xl` | Section headings (desktop) |
| 48px | `text-5xl` | Hero (tablet) |
| 60px | `text-6xl` | Hero (desktop) |

### Patterns

```tsx
// Hero headline
<h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-black dark:text-white">

// Section label (WCAG AA compliant)
<span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">

// Section title
<h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">

// Body
<p className="text-base text-zinc-500 dark:text-zinc-400">

// Monospace
<span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
```

---

## Spacing & Layout

**Base**: 8px grid

| Token | Pixels | Use |
|-------|--------|-----|
| `2` | 8px | Standard padding, icon gaps |
| `4` | 16px | Component padding |
| `6` | 24px | Section inner padding |
| `8` | 32px | Component margins |
| `12` | 48px | Section gaps |
| `16` | 64px | Large section padding |
| `24` | 96px | Hero spacing |

### Container

```tsx
<div className="mx-auto w-full max-w-5xl px-6 md:px-12">
```

### Section Padding

| Type | Classes |
|------|---------|
| Hero | `pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32` |
| Standard | `py-16 md:py-24` |
| Compact | `py-12 md:py-16` |
| Footer | `py-8` |

### Breakpoints

| Name | Width | Prefix |
|------|-------|--------|
| Mobile | < 640px | (default) |
| Small | ≥ 640px | `sm:` |
| Medium | ≥ 768px | `md:` |
| Large | ≥ 1024px | `lg:` |

---

## Plus Corner System

Signature decorative element — plus signs at container corners.

### Specs

| Property | Value |
|----------|-------|
| Size | `w-5 h-5` (20px) |
| Position | `-top-2.5 -left-2.5` (10px offset) |
| Color (light) | `text-zinc-400` |
| Color (dark) | `text-zinc-600` |

### Component

```tsx
function PlusCorner({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 6v12m6-6H6" />
    </svg>
  );
}

// Usage with all 4 corners
<div className="group relative border border-dashed border-zinc-300 dark:border-zinc-700">
  <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
  <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
  <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
  <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
  {children}
</div>
```

### When to Use

| Use | Don't Use |
|-----|-----------|
| Hero sections | Buttons |
| Feature cards | Form inputs |
| Bento grid items | Toast/tooltips |
| Media frames | Navigation items |
| Section dividers | Small components (<80px) |

---

## Borders

| Type | Class | Use |
|------|-------|-----|
| Solid | `border` | Cards, buttons |
| Dashed | `border-dashed` | Featured frames, hero |
| Dotted | `border-dotted` | Embedded graphics |

| Context | Light | Dark |
|---------|-------|------|
| Primary | `border-black` | `border-white` |
| Cards | `border-zinc-300` | `border-zinc-700` |
| Dashed frames | `border-zinc-200` | `border-zinc-800` |

---

## Shadows

Minimal shadows — flat design preferred.

| Token | Value | Use |
|-------|-------|-----|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | Subtle elevation |
| `shadow-card` | `0 1px 3px rgba(0,0,0,0.06)` | Cards at rest |
| `shadow-card-hover` | `0 4px 6px rgba(0,0,0,0.06)` | Card hover |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.08)` | Dropdowns |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Modals |

**Use for**: Floating elements, dropdowns, modals. **Avoid on**: Static cards, buttons, navigation.

---

## Components

### Button

```tsx
// src/components/ui/Button.tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "solid" | "secondary" | "ghost";
  size?: "default" | "lg";
  loading?: boolean;
}

const variants = {
  primary: "bg-white text-black border border-black hover:bg-zinc-100 dark:bg-black dark:text-white dark:border-white dark:hover:bg-zinc-800 rounded-none",
  solid: "bg-black text-white border border-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:border-white dark:hover:bg-zinc-100 rounded-none",
  secondary: "bg-transparent text-black border border-black hover:bg-zinc-100 dark:text-white dark:border-white dark:hover:bg-zinc-800 rounded-none",
  ghost: "bg-transparent text-black hover:bg-zinc-100 border border-transparent hover:border-zinc-200 dark:text-white dark:hover:bg-zinc-800 rounded-none",
};

const sizes = {
  default: "h-10 px-5 text-sm min-w-[44px]",
  lg: "h-12 px-8 text-base min-w-[44px]",
};
```

| Context | Variant |
|---------|---------|
| Primary CTA | `solid` |
| Header nav | `secondary` |
| Card actions | `primary` |
| Tertiary | `ghost` |

### Card Types

| Type | Border | Plus Corners |
|------|--------|--------------|
| Primary | `border-black` | No |
| Featured | `border-dashed border-zinc-300` | Yes |
| Bento | `border-zinc-300` | Yes |

### ShadcnUI Wrapper Pattern

**Never modify `components/ui/` directly.** Create wrappers:

```tsx
// src/components/Card.tsx
import { Card as ShadcnCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return (
    <ShadcnCard className={cn("rounded-none border-black dark:border-white", className)} {...props} />
  );
}
```

---

## Icons

**System**: Iconify (`@iconify-icon/react`)

| Set | Prefix | Use |
|-----|--------|-----|
| Lucide | `lucide:` | Primary UI |
| Simple Icons | `simple-icons:` | Brand logos |

| Context | Size |
|---------|------|
| Inline | 16-18px |
| Cards | 20-24px |
| Featured | 24-32px |
| Logo | 32-48px |

```tsx
<Icon icon="lucide:check" size={24} className="text-black dark:text-white" />
```

---

## Animation

### UI Animations (Fast)

| Interaction | Duration |
|-------------|----------|
| Hover state | Instant |
| Color transition | 150ms |
| Toggle | 120ms |
| Scroll reveal | 120ms |

### Ambient Animations (Slow)

| Animation | Duration |
|-----------|----------|
| Logo pulse | 2-3s |
| Circuit signals | 3-5s |
| Infinite scroll | 20-25s |
| Plus corner reveal | 150-200ms |

### Reduced Motion

```tsx
import { useReducedMotion } from "framer-motion";
const prefersReducedMotion = useReducedMotion();
if (prefersReducedMotion) return <StaticVersion />;
```

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Contrast | WCAG AA 4.5:1 (black/white = 21:1) |
| Focus | `focus:ring-2 focus:ring-black focus:ring-offset-2` |
| Touch targets | 44×44px minimum |
| Motion | Respect `prefers-reduced-motion` |
| Color alone | Never sole indicator — pair with text/icon |

```tsx
// Icon-only buttons
<button aria-label="Toggle dark mode"><Icon icon="lucide:moon" /></button>

// Decorative elements
<div aria-hidden="true" className="plus-corner" />
```

---

## Dark Mode

Always pair light/dark:

```tsx
className="bg-white dark:bg-black"
className="text-black dark:text-white"
className="text-zinc-500 dark:text-zinc-400"
className="border-black dark:border-white"
className="border-zinc-300 dark:border-zinc-700"
className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
```

---

## Quick Reference

### Common Patterns

| Element | Classes |
|---------|---------|
| Hero headline | `text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-black dark:text-white` |
| Section label | `text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400` |
| Section title | `text-2xl md:text-3xl font-semibold text-black dark:text-white` |
| Body text | `text-base text-zinc-500 dark:text-zinc-400` |
| Container | `mx-auto w-full max-w-5xl px-6 md:px-12` |
| Section padding | `py-16 md:py-24` |
| Dashed frame | `border border-dashed border-zinc-300 dark:border-zinc-700` |
| Plus corners | `w-5 h-5 text-zinc-400 dark:text-zinc-600` at `-top-2.5 -left-2.5` |

### Accent Classes

| Color | Text | BG | BG Tint | Border |
|-------|------|----|---------|----|
| Emerald | `text-emerald-500` | `bg-emerald-500` | `bg-emerald-500/10` | `border-emerald-500` |
| Violet | `text-violet-500` | `bg-violet-500` | `bg-violet-500/10` | `border-violet-500` |
| Amber | `text-amber-500` | `bg-amber-500` | `bg-amber-500/10` | `border-amber-500` |
| Rose | `text-rose-500` | `bg-rose-500` | `bg-rose-500/10` | `border-rose-500` |
| Sky | `text-sky-500` | `bg-sky-500` | `bg-sky-500/10` | `border-sky-500` |

---

**Version**: 6.1 (Compact) | **Last Updated**: December 2025
