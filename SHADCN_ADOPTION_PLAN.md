# ShadCN UI Adoption Plan

## Revision Notes

This plan was revised after research revealed critical issues in v1:
- Wrong CLI version for Tailwind v4
- forwardRef deprecated in React 19
- Phase 4.1 violated "never modify ShadCN" principle
- Over-engineering for a simple landing page

## Strategic Decision: Phased Adoption

**Current state**: 8 components, 1 UI primitive (Button), landing page only.

**Recommendation**: Don't install ShadCN yet. Instead:
1. Fix current Button component (already done)
2. Setup infrastructure for future ShadCN adoption
3. Add ShadCN components incrementally when needed (forms, dialogs, etc.)

This avoids:
- Unnecessary abstraction layers
- Bundle size bloat from unused components
- Over-wrapping anti-pattern

---

## Phase 1: Current State Fixes ✓

### 1.1 Button Fixes Applied ✓

- [x] Added `cursor-pointer` to baseStyles
- [x] Changed primary variant from filled to outline style (white bg, black border, black text)

These changes align with the design guide without requiring ShadCN.

---

## Phase 2: Infrastructure Setup ✓

### 2.1 Prerequisites Check ✓

- [x] tsconfig.json has correct alias: `"@/*": ["./src/*"]`

Before running ShadCN init, verify:

```bash
# Check tsconfig.json has correct alias format
# MUST have "./" prefix
grep -A2 '"paths"' tsconfig.json
# Should show: "@/*": ["./src/*"]
```

If missing, add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 2.2 Install ShadCN (Tailwind v4 Compatible) ✓

- [x] Installed with `pnpm dlx shadcn@canary init --defaults --force`
- [x] Created `components.json`, `src/lib/utils.ts`
- [x] Updated `globals.css` with OKLCH CSS variables

```bash
# Use canary for Tailwind v4 support (as of Dec 2025)
pnpm dlx shadcn@canary init

# Options:
# - Style: New York (cleaner, more Swiss-like)
# - Base color: Neutral (closest to black/white brand)
# - CSS variables: Yes
# - Tailwind config: Leave blank (v4 uses CSS)
# - Components: src/components/ui
# - Utils: src/lib/utils
```

### 2.3 Fix CSS Variable Conflicts ✓

- [x] Added cursor-pointer fix to `@layer base`
- [x] ShadCN properly merged CSS variables (no conflicts)

After init, `globals.css` may have conflicting variables. Remove any Next.js defaults BEFORE the ShadCN section:

```css
/* DELETE any existing :root block from Next.js template */
/* KEEP only the ShadCN-generated variables */

@import "tailwindcss";

/* Cursor fix for Tailwind v4 */
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}

:root {
  /* ShadCN variables - customize to brand */
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 0%);
  --primary: hsl(0 0% 0%);
  --primary-foreground: hsl(0 0% 100%);
  /* ... etc */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* Required for Tailwind v4 */
}
```

### 2.4 Configure cn() for Custom Theme Colors ✓

- [x] Extended tailwind-merge to recognize semantic colors
- [x] Added bg-color, text-color, border-color class groups

The default `tailwind-merge` doesn't recognize semantic colors. Update `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Extend tailwind-merge to recognize brand semantic colors
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-color": [
        "bg-background",
        "bg-foreground",
        "bg-primary",
        "bg-secondary",
        "bg-muted",
        "bg-accent",
        "bg-destructive",
      ],
      "text-color": [
        "text-foreground",
        "text-primary",
        "text-secondary",
        "text-muted",
        "text-accent",
        "text-destructive",
      ],
      "border-color": [
        "border-border",
        "border-primary",
        "border-secondary",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Phase 3: Adding Components (As Needed)

### 3.1 Before Adding Any ShadCN Component

1. Check if you actually need it (avoid over-abstraction)
2. Run: `pnpm dlx shadcn@canary add <component>`
3. Component goes to `src/components/ui/` - **NEVER modify this file**

### 3.2 When Customization is Needed

Create a wrapper in `src/components/` using React 19 patterns (no forwardRef):

```tsx
// src/components/Button.tsx
// React 19 pattern - ref is a regular prop now
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof ShadcnButton>;

export function Button({ className, variant = "outline", ...props }: ButtonProps) {
  return (
    <ShadcnButton
      variant={variant}
      className={cn("rounded-full", className)}
      {...props}
    />
  );
}
```

**Key differences from v1 plan**:
- No `forwardRef` (deprecated in React 19)
- No `displayName` needed
- Simpler type inference with `ComponentProps`

### 3.3 Component Decision Matrix

| Need | ShadCN Component | Create Wrapper? |
|------|------------------|-----------------|
| Basic button | Already have custom | No |
| Form inputs | input, label | Yes - add brand border styles |
| Modals/dialogs | dialog | Yes - remove shadows |
| Dropdowns | dropdown-menu | Maybe - depends on usage |
| Toasts | sonner or toast | Yes - use status colors |
| Data tables | table | No - use ShadCN directly |

---

## Phase 4: Font Setup ✓

Switzer font was already configured in a previous session.

### 4.1 Font Location ✓

- [x] Switzer Variable fonts in `src/app/fonts/` (using variable fonts)
- [x] `Switzer-Variable.woff2` and `Switzer-VariableItalic.woff2`

### 4.1 Move Fonts to Public Directory (Reference)

```bash
# Create font directory in public (better for Next.js)
mkdir -p public/fonts
cp Fonts/WEB/fonts/*.woff2 public/fonts/
```

### 4.2 Create Centralized Font Config

Create `src/lib/fonts.ts` (prevents duplicate font instances):

```typescript
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

export const switzer = localFont({
  src: [
    { path: "../../public/fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Switzer-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
  preload: true,
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
```

### 4.3 Update Layout

```tsx
// src/app/layout.tsx
import { switzer, geistMono } from "@/lib/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${switzer.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

---

## What NOT To Do

### Never Modify ShadCN Components

```tsx
// WRONG - editing src/components/ui/button.tsx
const buttonVariants = cva("...", {
  variants: {
    brand: "bg-black text-white", // DON'T add custom variants here
  }
});

// CORRECT - create wrapper with defaults
// src/components/Button.tsx
export function Button({ variant = "outline", ...props }) {
  return <ShadcnButton variant={variant} {...props} />;
}
```

### Avoid Over-Wrapping

```tsx
// WRONG - wrapper that just passes props
export function Card(props: CardProps) {
  return <ShadcnCard {...props} />;  // Pointless wrapper
}

// CORRECT - only wrap when adding value
export function Card({ className, ...props }: CardProps) {
  return (
    <ShadcnCard
      className={cn("border-black shadow-none", className)}  // Brand customization
      {...props}
    />
  );
}
```

---

## Current Status

| Task | Status |
|------|--------|
| Phase 1: Button cursor-pointer | ✓ Done |
| Phase 1: Button outline style | ✓ Done |
| Phase 1: Build verification | ✓ Done |
| Phase 2: ShadCN infrastructure | ✓ Done |
| Phase 2: cn() utility extended | ✓ Done |
| Phase 2: cursor-pointer global fix | ✓ Done |
| Phase 4: Switzer font setup | ✓ Done (in layout.tsx) |
| CLAUDE.md guidelines | ✓ Done |
| Skill for adding components | ✓ Done |

---

## Ready for ShadCN Components

The infrastructure is now in place. Add components as needed:

```bash
pnpm dlx shadcn@canary add <component>
```

Follow the wrapper pattern in Phase 3 when brand customization is needed.
