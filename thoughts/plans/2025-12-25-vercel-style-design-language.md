# Vercel-Style Design Language Update

**Date**: December 25, 2025
**Status**: Implemented
**Inspiration**: [Vercel Font Page](https://vercel.com/font)

---

## Overview

Transform the Entourage landing page to match the Vercel font page aesthetic: technical precision, blueprint feel, sharp corners, generous whitespace, and light/dark mode support.

## Current State Analysis

### Rounded Corners (to be removed)
| File | Class | Element |
|------|-------|---------|
| `src/components/ui/Button.tsx` | `rounded-full` | All buttons |
| `src/components/Button.tsx` | `rounded-full` | Wrapper default |
| `src/components/FlowDiagram.tsx` | `rounded-full` | AINode circle |
| `src/components/FlowDiagram.tsx` | `rounded-md` | TaskCard containers |
| `src/components/FlowDiagram.tsx` | `rounded-sm` | Legend dots |
| `src/components/ValueProps.tsx` | `rounded-full` | Icon containers |

### Dark Mode Infrastructure
- CSS variables already defined in `globals.css` with `.dark` selector
- Variables use OKLCH color space
- Not currently activated (no toggle mechanism)

### FlowDiagram Issues
- AINode has unnecessary circle wrapper around E-Block logo
- "Done" task missing a visible completion icon in legend

## Desired End State

1. **Sharp corners everywhere** - No rounded elements except intentional micro-radius (2px max)
2. **Blueprint grid background** - Subtle dashed grid with measurement annotations
3. **Dark mode toggle** - User can switch between light/dark themes
4. **Technical annotations** - Measurement marks, coordinates, precision details
5. **FlowDiagram fixed** - Logo without circle, proper Done icon

### Verification
- All `rounded-full` and `rounded-md` classes removed or replaced with `rounded-none`/`rounded-sm`
- Blueprint grid visible in hero section
- Dark mode toggle functional in header
- Visual inspection matches Vercel font page aesthetic

---

## What We're NOT Doing

- Complete dark mode theme (only landing page for now)
- Custom blueprint SVG patterns (using CSS dashed borders)
- Animation overhaul (keeping current snappy timing)
- Mobile-specific blueprint adjustments
- Favicon/OG image updates

---

## Phase 1: Sharp Corners Update

### Overview
Remove all rounded corners to achieve the technical, architectural aesthetic.

### Changes Required:

#### 1. Button Components

**File**: `src/components/ui/Button.tsx`

Replace all `rounded-full` with `rounded-none`:
```tsx
// Line ~36-37 (default variant classes)
"rounded-none border border-black"
```

**File**: `src/components/Button.tsx`

Update wrapper default:
```tsx
className={cn(
  "rounded-none",  // Changed from rounded-full
  className
)}
```

#### 2. FlowDiagram Component

**File**: `src/components/FlowDiagram.tsx`

AINode - Remove circle, show bare logo:
```tsx
function AINode() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center animate-pulse-slow">
        <LogoMark size={48} />
      </div>
    </div>
  );
}
```

TaskCard - Sharp corners:
```tsx
// Line ~86
<div className="flex items-center gap-2 px-3 py-2 bg-white border border-black rounded-none w-28 md:w-32">
```

Legend dots - Square instead of rounded:
```tsx
// Lines ~113-123
<div className="w-2 h-2 bg-green-500/30" />  // Remove rounded-sm
```

#### 3. ValueProps Component

**File**: `src/components/ValueProps.tsx`

Icon container - Sharp corners:
```tsx
// Line ~16
<div className="mb-4 flex h-12 w-12 items-center justify-center border border-black">
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`
- [ ] No `rounded-full` in components: `grep -r "rounded-full" src/components/`
- [ ] No `rounded-md` in components: `grep -r "rounded-md" src/components/`

#### Manual Verification:
- [ ] All buttons have sharp corners
- [ ] FlowDiagram logo displays without circle
- [ ] TaskCards have sharp corners
- [ ] ValueProps icons have square containers

---

## Phase 2: Blueprint Grid Background

### Overview
Add subtle blueprint-style grid pattern to the hero section, inspired by Vercel's technical aesthetic.

### Changes Required:

#### 1. Create Blueprint Grid Component

**File**: `src/components/BlueprintGrid.tsx` (NEW)

```tsx
"use client";

export function BlueprintGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Horizontal lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 79px,
              rgba(0, 0, 0, 0.05) 79px,
              rgba(0, 0, 0, 0.05) 80px
            )
          `,
        }}
      />
      {/* Vertical lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 79px,
              rgba(0, 0, 0, 0.05) 79px,
              rgba(0, 0, 0, 0.05) 80px
            )
          `,
        }}
      />
      {/* Corner measurement annotation */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-300">
        0,0
      </div>
    </div>
  );
}
```

#### 2. Add Grid to Hero Section

**File**: `src/components/Hero.tsx`

```tsx
import { BlueprintGrid } from "./BlueprintGrid";

export function Hero() {
  // ...existing code...
  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32">
      <BlueprintGrid />
      <Container>
        {/* existing content */}
      </Container>
    </section>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`
- [ ] BlueprintGrid.tsx exists: `ls src/components/BlueprintGrid.tsx`

#### Manual Verification:
- [ ] Grid pattern visible in hero section
- [ ] Grid is subtle (not distracting)
- [ ] Grid extends full width
- [ ] Coordinate annotation visible in corner

---

## Phase 3: Dark Mode Implementation

### Overview
Activate dark mode with a toggle in the header. Infrastructure already exists in CSS variables.

### Changes Required:

#### 1. Create Theme Provider

**File**: `src/components/ThemeProvider.tsx` (NEW)

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Check for saved preference or system preference
    const saved = localStorage.getItem("theme") as Theme | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved) {
      setTheme(saved);
    } else if (systemDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

#### 2. Create Theme Toggle Component

**File**: `src/components/ThemeToggle.tsx` (NEW)

```tsx
"use client";

import { useTheme } from "./ThemeProvider";
import { Icon } from "./Icon";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Icon
        icon={theme === "light" ? "line-md:sun-rising-loop" : "line-md:moon-loop"}
        size={20}
        className="text-black dark:text-white"
      />
    </button>
  );
}
```

#### 3. Update Layout

**File**: `src/app/layout.tsx`

Wrap app in ThemeProvider:
```tsx
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### 4. Add Toggle to Header

**File**: `src/components/Header.tsx`

```tsx
import { ThemeToggle } from "./ThemeToggle";

// In the header nav, add before Join Waitlist button:
<ThemeToggle />
```

#### 5. Update BlueprintGrid for Dark Mode

**File**: `src/components/BlueprintGrid.tsx`

```tsx
// Update opacity for dark mode
style={{
  backgroundImage: `
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 79px,
      var(--grid-color) 79px,
      var(--grid-color) 80px
    )
  `,
}}

// Add CSS variable in globals.css:
:root {
  --grid-color: rgba(0, 0, 0, 0.05);
}
.dark {
  --grid-color: rgba(255, 255, 255, 0.05);
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`
- [ ] ThemeProvider.tsx exists
- [ ] ThemeToggle.tsx exists

#### Manual Verification:
- [ ] Theme toggle visible in header
- [ ] Clicking toggle switches between light/dark
- [ ] Theme persists on page refresh
- [ ] All text readable in dark mode
- [ ] Blueprint grid adapts to dark mode

---

## Phase 4: FlowDiagram Fixes

### Overview
Address specific issues: remove circle around logo, add proper Done icon.

### Changes Required:

#### 1. Fix AINode (remove circle)

Already covered in Phase 1. Verify the logo displays cleanly without the circular border.

#### 2. Add Done Icon to Legend

**File**: `src/components/FlowDiagram.tsx`

Update the "Done" legend entry to include the check icon:
```tsx
// In the legend section (~lines 111-124)
<div className="flex gap-4 mt-3">
  <div className="flex items-center gap-1">
    <Icon icon="line-md:plus" size={10} className="text-green-500" />
    <span className="text-[8px] font-mono text-zinc-400">Add</span>
  </div>
  <div className="flex items-center gap-1">
    <Icon icon="lucide:pencil" size={10} className="text-amber-500" />
    <span className="text-[8px] font-mono text-zinc-400">Edit</span>
  </div>
  <div className="flex items-center gap-1">
    <Icon icon="line-md:check" size={10} className="text-zinc-400" />
    <span className="text-[8px] font-mono text-zinc-400">Done</span>
  </div>
</div>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] E-Block logo displays without circular border
- [ ] Legend shows proper icons for Add, Edit, Done
- [ ] Icons are consistent size in legend

---

## Phase 5: Component Dark Mode Updates

### Overview
Update key components to properly support dark mode colors.

### Changes Required:

#### 1. Update Text Colors

Files to update with `dark:` variants:
- `src/components/Hero.tsx`
- `src/components/ValueProps.tsx`
- `src/components/SecondaryCTA.tsx`
- `src/components/FlowDiagram.tsx`
- `src/components/Footer.tsx`

Pattern:
```tsx
// Primary text
className="text-black dark:text-white"

// Secondary text
className="text-zinc-500 dark:text-zinc-400"

// Muted text
className="text-zinc-400 dark:text-zinc-500"
```

#### 2. Update Border Colors

Pattern:
```tsx
className="border-black dark:border-white"
```

#### 3. Update Background Colors

Pattern:
```tsx
className="bg-white dark:bg-black"
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript passes: `pnpm tsc --noEmit`
- [ ] Build succeeds: `pnpm build`

#### Manual Verification:
- [ ] All sections readable in dark mode
- [ ] Borders visible in dark mode
- [ ] No color contrast issues
- [ ] Blueprint grid visible in dark mode

---

## Phase 6: Verification

### Automated Checks

```bash
# Type check
pnpm tsc --noEmit

# Build
pnpm build

# Check for remaining rounded corners
grep -r "rounded-full\|rounded-md" src/components/ --include="*.tsx"
```

### Manual Verification

- [ ] Sharp corners on all buttons
- [ ] Sharp corners on all cards/containers
- [ ] Blueprint grid visible in hero
- [ ] Dark mode toggle functional
- [ ] Theme persists on refresh
- [ ] All text readable in both modes
- [ ] FlowDiagram logo without circle
- [ ] FlowDiagram legend has icons
- [ ] No visual regressions

---

## Implementation Order

1. **Phase 1** - Sharp corners (foundational change)
2. **Phase 4** - FlowDiagram fixes (quick wins)
3. **Phase 2** - Blueprint grid (visual enhancement)
4. **Phase 3** - Dark mode infrastructure
5. **Phase 5** - Dark mode component updates
6. **Phase 6** - Full verification

---

## References

- Inspiration: [Vercel Font Page](https://vercel.com/font)
- Design Guide: `entourage_design_guide.md`
- Previous Plan: `thoughts/plans/2025-12-25-design-system-update.md`
