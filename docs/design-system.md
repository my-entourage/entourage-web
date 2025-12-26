# ENTOURAGE DESIGN GUIDE

## Visual Identity System v6.0

**Version:** 6.0
**Last Updated:** December 2025
**Foundation:** ShadcnUI + Tailwind CSS v4
**Audience:** Designers, Developers, AI Agents

---

## Overview

Entourage's design language is **Technical Blueprint** — an interface aesthetic inspired by engineering drawings, schematics, and precision instruments. The system features a distinctive **Plus Corner** motif as its signature brand element.

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Objectivity** | Information over emotion. Let the data speak. |
| **Precision** | Grid-based layouts, consistent spacing, sharp corners. |
| **Clarity** | High contrast, readable typography, functional color. |
| **Density** | Information-rich interfaces that respect the user's time. |
| **Intentionality** | Every element has purpose. Brand elements (Plus Corners) create consistency; UI elements enable action. |

### Design Inspiration

| Source | What We Borrow |
|--------|----------------|
| **Engineering drawings** | Sharp corners, measurement markers, construction guides |
| **Vercel** | Technical precision, developer focus |
| **Linear** | Dense information display, keyboard-first, monospace accents |

### The Technical Blueprint Aesthetic

Think of Entourage's interface as a technical drawing:
- Sharp corners (0px radius everywhere)
- Dashed/dotted borders as construction guides
- Plus signs (+) as signature corner markers
- Monospace text for data and labels
- High contrast black/white with a vibrant accent palette

### Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16, React 19 |
| Components | ShadcnUI (base) → Custom wrappers |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Iconify (Lucide primary, Simple Icons for brands) |
| Fonts | Switzer (UI), Geist Mono (code/data) |

---

## Color System

### Design Methodology

Colors are **functional signals**, not decoration. We use a strictly monochromatic base with semantic colors for status only.

### Primary Palette: Monochrome

```css
/* Core — Brand foundation */
--color-black:       #000000;   /* Primary text, borders (light mode) */
--color-white:       #FFFFFF;   /* Backgrounds (light mode) */
```

### Gray Scale (Zinc)

| Token | Hex | Light Mode Use | Dark Mode Use |
|-------|-----|----------------|---------------|
| **zinc-50** | #FAFAFA | Subtle backgrounds | — |
| **zinc-100** | #F4F4F5 | Section backgrounds | — |
| **zinc-200** | #E4E4E7 | Dashed borders | — |
| **zinc-300** | #D4D4D8 | Dotted borders, input borders | — |
| **zinc-400** | #A1A1AA | Plus corners, labels | — |
| **zinc-500** | #71717A | Muted text | Body text |
| **zinc-600** | #52525B | — | Plus corners |
| **zinc-700** | #3F3F46 | — | Dotted borders |
| **zinc-800** | #27272A | — | Dashed borders |
| **zinc-900** | #18181B | — | Backgrounds |

### Accent Palette

Entourage uses a vibrant, distinguishable accent palette for both brand expression and color coding within the service. These colors are carefully chosen to be visually distinct from each other and accessible on both light and dark backgrounds.

| Color | Hex | Tailwind | Primary Use |
|-------|-----|----------|-------------|
| **Emerald** | #10B981 | emerald-500 | Primary accent, success, AI actions, active states |
| **Violet** | #8B5CF6 | violet-500 | Categories, tags, special elements |
| **Amber** | #F59E0B | amber-500 | Warnings, attention, pending states |
| **Rose** | #F43F5E | rose-500 | Errors, destructive actions, urgent |
| **Sky** | #0EA5E9 | sky-500 | Information, links, secondary actions |

### Semantic Mapping

Colors serve double duty: brand expression AND functional meaning.

| Semantic | Color | Use Cases |
|----------|-------|-----------|
| **Success** | Emerald | Completed tasks, active status, confirmations |
| **AI/Processing** | Emerald | AI-powered features, processing indicators |
| **Warning** | Amber | Pending review, attention needed |
| **Error** | Rose | Failed actions, validation errors |
| **Info** | Sky | Informational messages, links |
| **Special** | Violet | Tags, categories, premium features |

### Color Coding Guidelines

When using colors for categorization or tagging:
- Use the full palette for maximum distinction
- Pair color with text labels for accessibility
- Maintain consistent meaning across the product
- Use 10% opacity backgrounds with full-color text/borders

### Color Pairing Rules

| Context | Background | Text | Border | Hover BG |
|---------|------------|------|--------|----------|
| **Page (light)** | white | black | — | — |
| **Page (dark)** | black | white | — | — |
| **Card (light)** | white | black | black or zinc-300 | zinc-50 |
| **Card (dark)** | black | white | white or zinc-700 | zinc-900 |
| **Primary Button** | white | black | black | zinc-100 |
| **Solid Button** | black | white | black | zinc-800 |
| **Muted Text (light)** | — | zinc-500 | — | — |
| **Muted Text (dark)** | — | zinc-400 | — | — |
| **Labels (light)** | — | zinc-400 | — | — |
| **Labels (dark)** | — | zinc-500 | — | — |
| **Plus Corners (light)** | — | zinc-400 | — | — |
| **Plus Corners (dark)** | — | zinc-600 | — | — |
| **Dashed Frames (light)** | — | — | zinc-200 | — |
| **Dashed Frames (dark)** | — | — | zinc-800 | — |

### Color Application Rules

1. **Never use color decoratively** — Every color must have semantic meaning
2. **Pair color with context** — A colored element alone isn't enough; add text or icon
3. **Use tints for backgrounds** — Full color for text/borders, 10% opacity for backgrounds
4. **Maintain contrast** — All text must meet WCAG AA (4.5:1 minimum)

### CSS Variables (globals.css)

```css
:root {
  /* Light mode */
  --background: #FFFFFF;
  --foreground: #171717;
  --card: #FFFFFF;
  --card-foreground: #171717;
  --primary: #171717;
  --primary-foreground: #FAFAFA;
  --secondary: #F5F5F5;
  --secondary-foreground: #171717;
  --muted: #F5F5F5;
  --muted-foreground: #737373;
  --border: #E5E5E5;
  --input: #E5E5E5;
  --ring: #A3A3A3;
  --destructive: #DC2626;
}

.dark {
  /* Dark mode */
  --background: #000000;
  --foreground: #FAFAFA;
  --card: #171717;
  --card-foreground: #FAFAFA;
  --primary: #E5E5E5;
  --primary-foreground: #171717;
  --secondary: #262626;
  --secondary-foreground: #FAFAFA;
  --muted: #262626;
  --muted-foreground: #A3A3A3;
  --border: rgba(255, 255, 255, 0.1);
  --input: rgba(255, 255, 255, 0.15);
  --ring: #737373;
}
```

---

## Typography

### Font Stack

```css
--font-sans: 'Switzer', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Monaco', monospace;
```

### Font Loading

```tsx
// src/app/layout.tsx
const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-Variable.woff2", style: "normal" },
    { path: "./fonts/Switzer-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

### Type Scale

| Size | Tailwind | Pixels | Use |
|------|----------|--------|-----|
| xs | text-xs | 12px | Labels, tags, metadata |
| sm | text-sm | 14px | Secondary text, descriptions |
| base | text-base | 16px | Body text, paragraphs |
| lg | text-lg | 18px | Large body, card titles |
| xl | text-xl | 20px | Section subtitles |
| 2xl | text-2xl | 24px | Section headings (mobile) |
| 3xl | text-3xl | 30px | Section headings (desktop) |
| 4xl | text-4xl | 36px | Hero text (mobile) |
| 5xl | text-5xl | 48px | Hero text (tablet) |
| 6xl | text-6xl | 60px | Hero text (desktop) |

### Font Weights

| Weight | Tailwind | Use |
|--------|----------|-----|
| 400 | font-normal | Body text, descriptions |
| 500 | font-medium | Emphasized body, buttons, labels |
| 600 | font-semibold | Headings, titles |
| 700 | font-bold | Hero headlines, CTAs |

### Typography Patterns

**Hero Headline:**
```tsx
<h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-black dark:text-white">
```

**Hero Subheadline (muted):**
```tsx
<p className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-zinc-400 dark:text-zinc-500">
```

**Section Label:**
```tsx
<span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
```

**Section Title:**
```tsx
<h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
```

**Body Text:**
```tsx
<p className="text-base text-zinc-500 dark:text-zinc-400">
```

**Monospace Label:**
```tsx
<span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
```

### Line Heights & Letter Spacing

| Context | Line Height | Letter Spacing |
|---------|-------------|----------------|
| Headlines | leading-tight (1.2) | tracking-tight (-0.01em) |
| Body text | leading-relaxed (1.4) | tracking-normal (0) |
| Labels | leading-normal (1.5) | tracking-wider (0.05em) |
| Uppercase labels | leading-normal (1.5) | tracking-widest (0.1em) |

---

## Spacing & Layout

### Base Unit: 8px Grid

All spacing snaps to an 8px grid.

| Unit | Pixels | Tailwind | Use |
|------|--------|----------|-----|
| 0.5 | 2px | 0.5 | Micro adjustments |
| 1 | 4px | 1 | Tight inline gaps |
| 2 | 8px | 2 | Standard padding, icon gaps |
| 3 | 12px | 3 | Small component gaps |
| 4 | 16px | 4 | Component padding, margins |
| 6 | 24px | 6 | Section inner padding |
| 8 | 32px | 8 | Component margins |
| 12 | 48px | 12 | Section gaps |
| 16 | 64px | 16 | Large section padding |
| 24 | 96px | 24 | Hero spacing |

### Container

```tsx
<div className="mx-auto w-full max-w-5xl px-6 md:px-12">
  {children}
</div>
```

| Property | Value |
|----------|-------|
| Maximum width | 1024px (max-w-5xl) |
| Horizontal padding (mobile) | 24px (px-6) |
| Horizontal padding (desktop) | 48px (md:px-12) |

### Section Padding

| Pattern | Class | Use |
|---------|-------|-----|
| **Hero** | `pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32` | First section with nav offset |
| **Standard** | `py-16 md:py-24` | Most content sections |
| **Compact** | `py-12 md:py-16` | Secondary sections |
| **Footer** | `py-8` | Footer content |

### Responsive Breakpoints

| Breakpoint | Width | Prefix |
|------------|-------|--------|
| Mobile | < 640px | (default) |
| Small | ≥ 640px | sm: |
| Medium | ≥ 768px | md: |
| Large | ≥ 1024px | lg: |
| XL | ≥ 1280px | xl: |

---

## Shadow System

### Philosophy

Shadows in Entourage are **minimal and purposeful**. The blueprint aesthetic favors flat design, but subtle shadows can indicate elevation when needed.

### Shadow Tokens

```css
/* Light mode shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-card-hover: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04);

/* Dark mode shadows (deeper, less visible) */
--shadow-card-dark: 0 1px 3px rgba(0, 0, 0, 0.3);
--shadow-card-hover-dark: 0 4px 8px rgba(0, 0, 0, 0.4);
--shadow-lg-dark: 0 10px 20px rgba(0, 0, 0, 0.5);
```

### Shadow Usage

| Element | Shadow | Use Case |
|---------|--------|----------|
| **Buttons** | none | Flat by default (use borders) |
| **Cards at rest** | shadow-sm or none | Minimal elevation |
| **Cards on hover** | shadow-card-hover | Subtle lift effect |
| **Dropdowns** | shadow-lg | Floating above content |
| **Modals** | shadow-xl | Highest elevation |
| **Toasts** | shadow-lg | Notification prominence |

### When to Use Shadows

**Use shadows for:**
- Floating elements (dropdowns, popovers, modals)
- Interactive card hover states
- Toast notifications

**Avoid shadows on:**
- Static cards (prefer borders)
- Buttons (use border states)
- Navigation elements
- Within the main content flow

---

## Plus Corner System

### Concept

The Plus Corner is Entourage's **signature decorative element** — four plus signs (+) that mark the corners of featured containers. This is derived from technical blueprints where plus marks indicate measurement points.

```
   +───────────────────────────+
   ╎                           ╎
   ╎     Content Area          ╎
   ╎                           ╎
   +───────────────────────────+
```

### Plus Corner Component

```tsx
// src/components/ui/PlusCorner.tsx
function PlusCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  );
}
```

### Specifications

| Property | Value |
|----------|-------|
| Size | 20px × 20px (w-5 h-5) |
| Position offset | 10px from corner (-top-2.5 -left-2.5) |
| Stroke width | 1px |
| Color (light) | zinc-400 (#A1A1AA) |
| Color (dark) | zinc-600 (#52525B) |

### Opacity Tiers

Three-tier system for consistent application:

| Tier | Opacity | Use Case |
|------|---------|----------|
| **Subtle** | 50% (opacity-50) | Background decoration, static frames |
| **Default** | 100% | Standard cards, featured sections |
| **Emphasis** | 100% + scale | Hover states with slight grow effect |

### Animation (Staggered Reveal)

For enhanced interactivity, Plus Corners can animate in with a stagger effect:

```css
.plus-corner {
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 200ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Stagger delays */
.plus-corner--tl { transition-delay: 0ms; }
.plus-corner--tr { transition-delay: 50ms; }
.plus-corner--bl { transition-delay: 100ms; }
.plus-corner--br { transition-delay: 150ms; }

/* Visible state */
.group:hover .plus-corner {
  opacity: 1;
  transform: scale(1);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .plus-corner {
    transition: opacity 0ms;
    transform: none;
  }
}
```

### Hover Enhancement (Optional)

For interactive cards, Plus Corners can subtly shift color on hover:

```tsx
<PlusCorner
  className={cn(
    "absolute -top-2.5 -left-2.5 w-5 h-5",
    "text-zinc-400 dark:text-zinc-600",
    "transition-colors duration-150",
    "group-hover:text-zinc-500 dark:group-hover:text-zinc-500"
  )}
/>
```

### Full Implementation

```tsx
// src/components/ui/PlusCornerCard.tsx
import { cn } from "@/lib/utils";

interface PlusCornerCardProps {
  children: React.ReactNode;
  className?: string;
  dashed?: boolean;
  interactive?: boolean;
}

function PlusCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  );
}

export function PlusCornerCard({
  children,
  className,
  dashed = true,
  interactive = false
}: PlusCornerCardProps) {
  const cornerClass = cn(
    "absolute w-5 h-5 text-zinc-400 dark:text-zinc-600",
    interactive && "transition-colors duration-150 group-hover:text-zinc-500 dark:group-hover:text-zinc-500"
  );

  return (
    <div
      className={cn(
        "group relative",
        dashed
          ? "border border-dashed border-zinc-300 dark:border-zinc-700"
          : "border border-zinc-300 dark:border-zinc-700",
        "bg-white dark:bg-black",
        className
      )}
    >
      <PlusCorner className={cn(cornerClass, "-top-2.5 -left-2.5")} />
      <PlusCorner className={cn(cornerClass, "-top-2.5 -right-2.5")} />
      <PlusCorner className={cn(cornerClass, "-bottom-2.5 -left-2.5")} />
      <PlusCorner className={cn(cornerClass, "-bottom-2.5 -right-2.5")} />
      {children}
    </div>
  );
}
```

### SVG Implementation (Embedded Graphics)

When Plus Corners appear inside an SVG:

```svg
<g class="stroke-zinc-400 dark:stroke-zinc-600" stroke-width="1" fill="none">
  <!-- Plus at position (x, y) with 5px arms -->
  <path d="M x y-5 v 10 M x-5 y h 10" />
</g>
```

### Exclusion List (When NOT to Use)

Do **not** apply Plus Corners to:

| Element | Reason |
|---------|--------|
| Body text/paragraphs | Decorative noise |
| Icons | Too small, cluttered |
| Inline links | Disrupts reading flow |
| Buttons | Use border states instead |
| Navigation items | Use underline/color |
| Toast notifications | Keep minimal |
| Tooltips | Too small |
| Very small components (< 80px) | Corners overwhelm content |
| Footer | Keep simple |
| Form inputs | Use focus states |

### Application Contexts

| Element | Plus Corners | Style |
|---------|--------------|-------|
| **Hero section** | Yes | Dashed border + corners |
| **Feature cards** | Yes | Dashed or solid |
| **Bento grid items** | Yes | Default opacity |
| **Images/media frames** | Yes, subtle | 50% opacity |
| **Section dividers** | Optional | At endpoints only |
| **Buttons** | No | — |
| **Inputs** | No | — |

---

## Borders & Dividers

### Border Styles

| Type | Class | Use |
|------|-------|-----|
| **Solid** | `border` | Cards, buttons, primary containers |
| **Dashed** | `border-dashed` | Featured frames, hero sections |
| **Dotted** | `border-dotted` or SVG | Embedded graphics, construction guides |

### Border Colors

| Context | Light Mode | Dark Mode |
|---------|------------|-----------|
| **Primary borders** | border-black | border-white |
| **Card borders** | border-zinc-300 | border-zinc-700 |
| **Dashed frames** | border-zinc-200 or border-zinc-300 | border-zinc-700 or border-zinc-800 |
| **Subtle dividers** | border-zinc-200 | border-zinc-800 |

### Border Width

| Width | Class | Use |
|-------|-------|-----|
| 1px | border | Standard borders |
| 2px | border-2 | Emphasis, focus states |

---

## Components (ShadcnUI Patterns)

### Component Wrapper Philosophy

**Never edit ShadcnUI components directly.** Create wrapper components that apply brand styling.

```
src/components/
├── ui/                    # ShadcnUI primitives (DO NOT MODIFY)
│   ├── button.tsx         # Raw ShadcnUI
│   ├── dialog.tsx
│   └── ...
├── Button.tsx             # Entourage wrapper (CUSTOMIZE HERE)
├── Dialog.tsx             # Entourage wrapper
└── ...
```

### Button

**Base:** Custom implementation following Entourage brand.

```tsx
// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "solid" | "secondary" | "ghost";
  size?: "default" | "lg";
  loading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-medium",
    "transition-colors cursor-pointer",
    "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  );

  const variants = {
    primary:
      "bg-white text-black border border-black hover:bg-zinc-100 dark:bg-black dark:text-white dark:border-white dark:hover:bg-zinc-800 rounded-none",
    solid:
      "bg-black text-white border border-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:border-white dark:hover:bg-zinc-100 rounded-none",
    secondary:
      "bg-transparent text-black border border-black hover:bg-zinc-100 dark:text-white dark:border-white dark:hover:bg-zinc-800 rounded-none",
    ghost:
      "bg-transparent text-black hover:bg-zinc-100 border border-transparent hover:border-zinc-200 dark:text-white dark:hover:bg-zinc-800 dark:hover:border-zinc-700 rounded-none",
  };

  const sizes = {
    default: "h-10 px-5 text-sm min-w-[44px]",
    lg: "h-12 px-8 text-base min-w-[44px]",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
```

**Button States:**

| State | Visual |
|-------|--------|
| Default | As specified by variant |
| Hover | Background shifts (zinc-100/zinc-800) |
| Focus | 2px black ring with offset |
| Disabled | 50% opacity, not-allowed cursor |
| Loading | Spinner icon, disabled state |

**Button Usage:**

| Context | Recommended Variant |
|---------|---------------------|
| Primary CTA (Join Waitlist) | solid |
| Header navigation | secondary |
| Card actions | primary |
| Inline/tertiary actions | ghost |

### Dialog (Modal)

**Base:** ShadcnUI Dialog with Entourage styling.

```tsx
// src/components/Dialog.tsx
import {
  Dialog as ShadcnDialog,
  DialogContent as ShadcnDialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type DialogContentProps = ComponentProps<typeof ShadcnDialogContent>;

export function DialogContent({
  className,
  children,
  ...props
}: DialogContentProps) {
  return (
    <ShadcnDialogContent
      className={cn(
        "rounded-none",
        "border border-black dark:border-white",
        "bg-white dark:bg-black",
        "shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </ShadcnDialogContent>
  );
}

export {
  ShadcnDialog as Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
};
```

**Dialog Usage:**

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Description text explaining the dialog purpose.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button variant="solid">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Table

**Base:** ShadcnUI Table with Entourage styling.

```tsx
// src/components/Table.tsx
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow as ShadcnTableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type TableProps = ComponentProps<typeof ShadcnTable>;
type TableRowProps = ComponentProps<typeof ShadcnTableRow>;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="border border-black dark:border-white">
      <ShadcnTable className={cn("rounded-none", className)} {...props} />
    </div>
  );
}

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <ShadcnTableRow
      className={cn(
        "border-b border-zinc-200 dark:border-zinc-800",
        "hover:bg-zinc-50 dark:hover:bg-zinc-900",
        "transition-colors",
        className
      )}
      {...props}
    />
  );
}

export { TableBody, TableCell, TableHead, TableHeader };
```

**Table Usage:**

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="font-mono text-xs uppercase tracking-wider">
        Task
      </TableHead>
      <TableHead className="font-mono text-xs uppercase tracking-wider">
        Status
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Review PR #123</TableCell>
      <TableCell>
        <span className="text-green-600">Complete</span>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Toast (Sonner)

**Installation:**
```bash
pnpm dlx shadcn@canary add sonner
```

**Configuration:**

```tsx
// src/app/layout.tsx
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: cn(
              "rounded-none",
              "border border-black dark:border-white",
              "bg-white dark:bg-black",
              "text-black dark:text-white",
              "shadow-lg"
            ),
          }}
        />
      </body>
    </html>
  );
}
```

**Usage:**

```tsx
import { toast } from "sonner";

// Success
toast.success("Task completed successfully");

// Error
toast.error("Failed to save changes");

// Custom
toast("Processing...", {
  description: "This may take a moment",
  action: {
    label: "Cancel",
    onClick: () => console.log("Cancelled"),
  },
});
```

**Toast Rules:**
- Toasts do NOT get Plus Corners (exclusion list)
- Keep messages concise (< 60 characters)
- Use semantic variants (success, error, warning)
- Position: bottom-right (default)

---

## Loading States

### Skeleton

**Base:** ShadcnUI Skeleton with Entourage styling.

```tsx
// src/components/Skeleton.tsx
import { Skeleton as ShadcnSkeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SkeletonProps = ComponentProps<typeof ShadcnSkeleton>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <ShadcnSkeleton
      className={cn(
        "rounded-none",
        "bg-zinc-200 dark:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}
```

### Skeleton Patterns

**Card Skeleton:**

```tsx
export function CardSkeleton() {
  return (
    <div className="border border-zinc-300 dark:border-zinc-700 p-6 space-y-4">
      <Skeleton className="h-40 w-full" />     {/* Image */}
      <Skeleton className="h-4 w-24" />        {/* Label */}
      <Skeleton className="h-6 w-3/4" />       {/* Title */}
      <Skeleton className="h-4 w-full" />      {/* Description line 1 */}
      <Skeleton className="h-4 w-1/2" />       {/* Description line 2 */}
    </div>
  );
}
```

**Table Skeleton:**

```tsx
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border border-black dark:border-white">
      <div className="border-b border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="border-b border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Loader (Spinner)

```tsx
// src/components/Loader.tsx
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function Loader({ size = "md", className }: LoaderProps) {
  return (
    <Loader2
      className={cn(
        "animate-spin text-zinc-500 dark:text-zinc-400",
        sizes[size],
        className
      )}
    />
  );
}

// Full page loader
export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader size="lg" />
    </div>
  );
}
```

### Next.js Loading Patterns

**Route-level loading (loading.tsx):**

```tsx
// app/dashboard/loading.tsx
import { CardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
```

**Component-level with Suspense:**

```tsx
import { Suspense } from "react";
import { CardSkeleton } from "@/components/Skeleton";

async function TaskCards() {
  const tasks = await fetchTasks();
  return tasks.map(task => <TaskCard key={task.id} task={task} />);
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <TaskCards />
    </Suspense>
  );
}
```

**Button loading state:**

```tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  return (
    <Button loading={loading} onClick={handleSubmit}>
      {loading ? "Submitting..." : "Submit"}
    </Button>
  );
}
```

---

## Cards & Containers

### Card Types

| Type | Border | Background | Plus Corners | Use |
|------|--------|------------|--------------|-----|
| **Primary Card** | border-black | bg-white | No | Main containers |
| **Featured Frame** | border-dashed border-zinc-300 | bg-white | Yes | Hero, highlights |
| **Bento Card** | border-zinc-300 | bg-white | Yes | Grid layouts |
| **Input/Badge** | border-zinc-300 | bg-white | No | Form elements |

### Card Patterns

**Primary Card:**
```tsx
<div className="border border-black dark:border-white bg-white dark:bg-black p-4">
  {/* Content */}
</div>
```

**Featured Frame with Plus Corners:**
```tsx
<PlusCornerCard className="p-6 md:p-12">
  {/* Content */}
</PlusCornerCard>
```

**Icon Container:**
```tsx
<div className="flex h-12 w-12 items-center justify-center border border-black dark:border-white">
  <Icon icon="lucide:check" size={24} className="text-black dark:text-white" />
</div>
```

---

## Icons

### Icon System: Iconify

We use Iconify for access to 200,000+ open source icons.

#### Recommended Sets

| Set | Prefix | Use Case |
|-----|--------|----------|
| **Lucide** | lucide: | Primary UI icons |
| **Simple Icons** | simple-icons: | Brand/product logos |
| **MDI** | mdi: | Additional coverage |
| **Line-MD** | line-md: | Animated icons |

#### Icon Component

```tsx
// src/components/Icon.tsx
import { Icon as IconifyIcon } from "@iconify-icon/react";

interface IconProps {
  icon: string;
  size?: number;
  className?: string;
}

export function Icon({ icon, size = 24, className }: IconProps) {
  return (
    <IconifyIcon
      icon={icon}
      width={size}
      height={size}
      className={className}
    />
  );
}
```

#### Icon Sizes

| Context | Size | Example |
|---------|------|---------|
| Inline with text | 16-18px | Menu items |
| Card icons | 20-24px | Feature cards |
| Featured icons | 24-32px | Hero elements |
| Logo size | 32-48px | Header |

#### Icon Colors

Icons inherit text color:
- `text-black dark:text-white` — Primary icons
- `text-zinc-500 dark:text-zinc-400` — Muted icons
- Status colors for semantic icons

---

## Animation & Motion

### Philosophy

Entourage uses two distinct animation categories:

1. **UI Animations** — Fast, functional, inform the user about state changes. These should feel instant and purposeful.
2. **Ambient Animations** — Slow, atmospheric, create brand presence. These run in the background and establish visual rhythm without demanding attention.

UI animations prioritize clarity. Ambient animations prioritize feel.

### UI Animation Timing

| Interaction | Duration | Easing | Purpose |
|-------------|----------|--------|---------|
| Hover state | Instant | — | Immediate feedback |
| Color transitions | 150ms | ease-out | Smooth visual change |
| Toggle/switch | 120ms | ease-in-out | Clear state change |
| Page transition | 150ms | ease-out | Visual continuity |
| Scroll reveal | 120ms | ease-out | Content appearance |
| Button press | 100ms | ease-in | Tactile feedback |

### Ambient Animation Timing

Ambient animations create visual interest and brand atmosphere. They should be subtle enough to ignore but present enough to notice.

| Animation | Duration | Use Case |
|-----------|----------|----------|
| Logo pulse | 2-3s | Subtle brand presence, hero sections |
| Circuit signals | 3-5s | Data flow visualization, diagrams |
| Infinite scroll | 20-25s | Logo carousels, social proof |
| Plus Corner reveal | 150-200ms | Staggered entrance on card hover |

### Framer Motion Patterns

**Fade Up Entrance:**
```tsx
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      delay: prefersReducedMotion ? 0 : delay,
      ease: "easeOut",
    },
  },
});
```

**Staggered Children:**
```tsx
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.12, ease: "easeOut" },
  },
};
```

### CSS Animations

```css
/* Subtle pulse for logos */
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 0.85;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}

.animate-pulse-slow {
  animation: pulse-subtle 3s ease-in-out infinite;
}

/* Infinite scroll for carousels */
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll linear infinite;
}
```

### Reduced Motion

Always respect user preferences:

```tsx
import { useReducedMotion } from "framer-motion";

export function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticVersion />;
  }

  return <AnimatedVersion />;
}
```

---

## Dark Mode

### Implementation

Dark mode is fully supported using Tailwind's dark variant and CSS custom properties.

### Color Mapping

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | white (#FFFFFF) | black (#000000) |
| Foreground text | black (#000000) | white (#FFFFFF) |
| Muted text | zinc-500 (#71717A) | zinc-400 (#A1A1AA) |
| Label text | zinc-400 (#A1A1AA) | zinc-500 (#71717A) |
| Primary borders | black | white |
| Dashed borders | zinc-200/zinc-300 | zinc-700/zinc-800 |
| Plus corners | zinc-400 | zinc-600 |
| Hover backgrounds | zinc-100 | zinc-800/zinc-900 |

### Pattern

Always pair light and dark variants:

```tsx
// Text
className="text-black dark:text-white"
className="text-zinc-500 dark:text-zinc-400"

// Backgrounds
className="bg-white dark:bg-black"
className="hover:bg-zinc-100 dark:hover:bg-zinc-800"

// Borders
className="border-black dark:border-white"
className="border-zinc-300 dark:border-zinc-700"
```

---

## Accessibility

Accessibility is a core requirement, not an afterthought. Every component must be usable by everyone.

### Requirements

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color contrast | WCAG AA 4.5:1 | Black on white, high contrast palette |
| Focus indicators | Visible 2px | Ring with offset on all interactives |
| Keyboard navigation | Logical tab order | Semantic HTML, proper focus management |
| Screen readers | ARIA labels | Native elements, aria-label where needed |
| Motion sensitivity | prefers-reduced-motion | useReducedMotion hook |
| Touch targets | 44×44px minimum | All interactive elements |

### Contrast Ratios (Verified)

| Combination | Ratio | Passes |
|-------------|-------|--------|
| Black (#000) on White (#FFF) | 21:1 | AAA ✓ |
| White (#FFF) on Black (#000) | 21:1 | AAA ✓ |
| zinc-500 (#71717A) on White | 4.6:1 | AA ✓ |
| zinc-400 (#A1A1AA) on Black | 7.4:1 | AAA ✓ |
| Emerald (#10B981) on White | 3.1:1 | Large text only |
| Emerald (#10B981) on Black | 6.8:1 | AA ✓ |
| Rose (#F43F5E) on White | 3.9:1 | Large text only |
| Rose (#F43F5E) on Black | 5.4:1 | AA ✓ |

**Note**: For accent colors that don't pass AA on white backgrounds, use with icons/large text, or pair with text labels.

### Color Blindness Considerations

The accent palette is designed for distinguishability across color vision types:

| Color | Protanopia | Deuteranopia | Tritanopia |
|-------|------------|--------------|------------|
| Emerald | Appears yellowish | Appears brownish | Distinct ✓ |
| Violet | Distinct ✓ | Distinct ✓ | Appears pinkish |
| Amber | Distinct ✓ | Distinct ✓ | Appears pinkish |
| Rose | Appears dark | Appears brownish | Distinct ✓ |
| Sky | Distinct ✓ | Distinct ✓ | Appears greenish |

**Guidelines**:
- Never rely on color alone to convey meaning
- Always pair color with text labels, icons, or patterns
- Use shape + color for status indicators (e.g., ✓ green, ✗ red)
- Test with color blindness simulators before shipping

### Cognitive Accessibility

| Principle | Implementation |
|-----------|----------------|
| **Reduce complexity** | One primary action per view, clear hierarchy |
| **Consistent patterns** | Same interactions work the same way everywhere |
| **Clear feedback** | Every action has visible, immediate response |
| **Forgiving input** | Allow corrections, confirm destructive actions |
| **Scannable content** | Headlines, bullets, short paragraphs |

### Focus States

```tsx
className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
```

### Screen Reader Considerations

```tsx
// Icon-only buttons
<button aria-label="Toggle dark mode">
  <Icon icon="lucide:moon" />
</button>

// Decorative elements (Plus Corners, ambient graphics)
<div aria-hidden="true" className="plus-corner" />

// Status with color
<span className="text-emerald-500">
  <span className="sr-only">Status: </span>
  Complete ✓
</span>
```

### Testing Checklist

Before shipping any feature:
- [ ] Keyboard-only navigation works (Tab, Enter, Escape, Arrow keys)
- [ ] Screen reader announces content correctly (test with VoiceOver/NVDA)
- [ ] Color contrast passes WCAG AA (use browser DevTools audit)
- [ ] Touch targets are 44×44px minimum
- [ ] Reduced motion preference is respected
- [ ] Focus is visible and logical
- [ ] Color is not the only indicator of state

---

## Voice & Tone

### Principles

| Principle | Description |
|-----------|-------------|
| **Rational** | Facts over feelings, data over hype |
| **Technical** | Precise language, no marketing fluff |
| **Direct** | Say what you mean, no hedging |
| **Authoritative** | Confident but not arrogant |

### Writing Guidelines

**Headlines:**
- Active voice, present tense
- Benefit-focused
- 3-8 words optimal

```
✓ "Know what needs to be done."
✗ "Our AI-powered platform helps you manage tasks."
```

**Error Messages:**
- State the problem clearly
- Provide actionable next steps
- No cutesy language

```
✓ "Failed to parse transcript. Check format and try again."
✗ "Oops! Something went wrong. Please try again later!"
```

---

## Quick Reference Card

Copy-paste patterns for common use cases.

### Common Patterns

| Element | Classes |
|---------|---------|
| Hero headline | `text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-black dark:text-white` |
| Section label | `text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500` |
| Section title | `text-2xl md:text-3xl font-semibold text-black dark:text-white` |
| Body text | `text-base text-zinc-500 dark:text-zinc-400` |
| Container | `mx-auto w-full max-w-5xl px-6 md:px-12` |
| Section padding | `py-16 md:py-24` |
| Dashed frame | `border border-dashed border-zinc-300 dark:border-zinc-700` |
| Plus corners | `w-5 h-5 text-zinc-400 dark:text-zinc-600` at `-top-2.5 -left-2.5` |

### Accent Color Classes

| Color | Text | Background | Border |
|-------|------|------------|--------|
| Emerald | `text-emerald-500` | `bg-emerald-500` `bg-emerald-500/10` | `border-emerald-500` |
| Violet | `text-violet-500` | `bg-violet-500` `bg-violet-500/10` | `border-violet-500` |
| Amber | `text-amber-500` | `bg-amber-500` `bg-amber-500/10` | `border-amber-500` |
| Rose | `text-rose-500` | `bg-rose-500` `bg-rose-500/10` | `border-rose-500` |
| Sky | `text-sky-500` | `bg-sky-500` `bg-sky-500/10` | `border-sky-500` |

### Tailwind Config Additions

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-switzer)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Monaco', 'monospace'],
      },
      borderRadius: {
        none: '0px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
      },
    },
  },
};
```

---

## Changelog

### Version 6.0 (December 2025)
- **Identity clarification**: Renamed from "Digital Swiss Style" to "Technical Blueprint"
- **Principle update**: Changed "No decoration for decoration's sake" to "Intentionality" — acknowledging Plus Corners as brand elements
- **Accent palette**: Added vibrant 5-color accent palette (Emerald, Violet, Amber, Rose, Sky) for brand expression and color coding
- **Animation philosophy**: Rewrote to honestly distinguish UI animations (fast, functional) from ambient animations (slow, atmospheric)
- **Accessibility expansion**: Added contrast ratio testing, color blindness considerations, cognitive accessibility, and testing checklist
- **Quick Reference trimmed**: Removed redundant CSS variables, added accent color classes
- Addressed external design review feedback

### Version 5.0 (December 2025)
- Restructured for implementation-focused format (inspired by Viran design guide)
- Added Shadow System section with complete token documentation
- Expanded Plus Corner System with opacity tiers, stagger animation, hover enhancement, exclusion list
- Added complete ShadcnUI wrapper component examples (Dialog, Table, Toast)
- Added Loading States section (Skeleton, Loader, Next.js patterns)
- Converted all color values to hex format
- Added Color Pairing Rules table
- Added CSS Variables quick reference with hex values
- Added Tailwind Config additions section
- Reorganized Quick Reference Card for faster lookups

### Version 4.0 (December 26, 2025)
- Complete rewrite based on comprehensive codebase analysis
- Added exhaustive documentation for all patterns
- Documented actual implementation over theoretical guidelines
- Added hex color values throughout
- Expanded animation timing documentation
- Added voice & tone section
- Added implementation reference section

### Version 3.0 (December 26, 2025)
- Rewrote based on landing page implementation patterns
- Standardized plus corner patterns
- Documented section templates

### Version 2.0 (December 25, 2025)
- Added Icon System (Iconify)
- Updated audience, marketing vs product context
- Added animation timing, border rules

### Version 1.0 (Initial)
- Core brand guidelines
- Logo specifications
- Color palette
- Typography scale

---

**Maintained by**: Entourage Design Team
**Last Updated**: December 2025
**Repository**: entourage-web
