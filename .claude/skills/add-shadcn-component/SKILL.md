---
name: add-shadcn-component
description: Add a new ShadCN UI component with proper wrapper pattern following Entourage brand guidelines. Use when installing ShadCN components like button, card, dialog, input, or any shadcn/ui component. Ensures components are never modified directly and wrappers are created for brand customization.
---

# Add ShadCN Component

Add a new ShadCN UI component with the proper wrapper pattern.

## Usage

```
/add-shadcn-component <component-name>
```

Example: `/add-shadcn-component dialog`

## Process

When this skill is invoked, follow these steps:

### Step 1: Install the ShadCN Component

Run the shadcn CLI to add the component (use canary for Tailwind v4):

```bash
pnpm dlx shadcn@canary add <component-name>
```

This installs the component to `src/components/ui/<component-name>.tsx`.

### Step 2: Verify Installation

Check that the component was created in the correct location:
- Path: `src/components/ui/<component-name>.tsx`
- The file should NOT be modified after installation

### Step 3: Create Wrapper Component (if needed)

Determine if a wrapper is needed:
- **YES** if: The component will be used directly in the app with brand-specific styling
- **NO** if: The component is only used internally by other components (e.g., `alert-dialog` used by a custom `ConfirmButton`)
- **NO** if: The wrapper would just pass props through without adding value (avoid over-wrapping)

If YES, create a wrapper in `src/components/` using React 19 patterns:

```tsx
// src/components/<ComponentName>.tsx
// React 19: ref is a regular prop, no forwardRef needed
import { <ComponentName> as Shadcn<ComponentName> } from "@/components/ui/<component-name>";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type <ComponentName>Props = ComponentProps<typeof Shadcn<ComponentName>>;

export function <ComponentName>({ className, ...props }: <ComponentName>Props) {
  return (
    <Shadcn<ComponentName>
      className={cn(
        // Brand-aligned defaults go here
        className
      )}
      {...props}
    />
  );
}
```

**Note**: This project uses React 19 which deprecated `forwardRef`. Use `ComponentProps` for type inference instead.

### Step 4: Apply Brand Guidelines

When creating the wrapper, apply these Entourage brand defaults:

**Buttons:**
- Use `variant="outline"` as default
- Add `rounded-full` class
- Cursor pointer is handled by global CSS

**Cards:**
- White background
- 1px black border (`border border-black`)
- No shadows (`shadow-none`)
- 16px padding (`p-4`)

**Dialogs:**
- Remove shadows
- Black border
- Minimal styling

**Inputs:**
- Black border on focus (`focus:border-black`)
- No colored focus rings (`focus:ring-0`)

**All Components:**
- Follow 8px spacing grid
- Use Switzer font (inherited from body)
- Use Geist Mono for code/data displays
- No decorative shadows or gradients

### Step 5: Update Imports

If you created a wrapper, update any files that should use the wrapper:

```tsx
// Before (direct ShadCN import - only for internal use)
import { Button } from '@/components/ui/button';

// After (wrapper import - for app-level use)
import { Button } from '@/components/Button';
```

### Step 6: Document

Add the new component to the migration checklist in `MIGRATION_PLAN.md` if applicable.

## Important Rules

1. **NEVER modify files in `src/components/ui/`** - These are ShadCN primitives
2. **Always use `cn()` utility** for className merging in wrappers
3. **Use React 19 patterns** - No forwardRef, use ComponentProps for types
4. **Avoid over-wrapping** - Only create wrappers when adding brand value
5. **Re-export types** from the wrapper if consumers need them

## Quick Reference

| ShadCN Component | Needs Wrapper? | Brand Customization |
|------------------|----------------|---------------------|
| button | Yes | Outline default, rounded-full |
| card | Yes | Black border, no shadow |
| input | Maybe | Black focus border |
| dialog | Yes | No shadow, minimal styling |
| dropdown-menu | Maybe | Black borders |
| select | Maybe | Black borders |
| toast | Yes | Status colors only |

## Anti-Patterns to Avoid

```tsx
// WRONG: Wrapper that just passes props (no value added)
export function Card(props: CardProps) {
  return <ShadcnCard {...props} />;
}

// WRONG: Using forwardRef (deprecated in React 19)
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <ShadcnButton ref={ref} {...props} />
);

// WRONG: Modifying ShadCN source files
// Don't edit src/components/ui/button.tsx!

// CORRECT: Wrapper with brand defaults
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
