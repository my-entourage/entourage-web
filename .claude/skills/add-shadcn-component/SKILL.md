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

Run the shadcn CLI to add the component:

```bash
pnpm dlx shadcn@latest add <component-name>
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

If YES, create a wrapper in `src/components/`:

```tsx
// src/components/<ComponentName>.tsx
import { forwardRef } from 'react';
import {
  <ComponentName> as Shadcn<ComponentName>,
  type <ComponentName>Props
} from '@/components/ui/<component-name>';
import { cn } from '@/lib/utils';

export interface Custom<ComponentName>Props extends <ComponentName>Props {
  // Add any custom props here
}

export const <ComponentName> = forwardRef<HTML<Element>Element, Custom<ComponentName>Props>(
  ({ className, ...props }, ref) => {
    return (
      <Shadcn<ComponentName>
        ref={ref}
        className={cn(
          // Brand-aligned defaults go here
          className
        )}
        {...props}
      />
    );
  }
);
<ComponentName>.displayName = '<ComponentName>';
```

### Step 4: Apply Brand Guidelines

When creating the wrapper, apply these Entourage brand defaults:

**Buttons:**
- Use `variant="outline"` as default
- Add `rounded-full` class
- Ensure `cursor-pointer` is applied (global CSS handles this)

**Cards:**
- White background
- 1px black border (`border border-black`)
- No shadows
- 16px padding (`p-4`)

**Inputs:**
- Black border on focus
- No colored focus rings

**All Components:**
- Follow 8px spacing grid
- Use Switzer font (inherited from body)
- Use Geist Mono for code/data displays

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
3. **Use `forwardRef`** for components that accept refs
4. **Include `displayName`** for React DevTools
5. **Re-export types** from the wrapper if consumers need them

## Quick Reference

| ShadCN Component | Needs Wrapper? | Brand Customization |
|------------------|----------------|---------------------|
| button | Yes | Outline default, rounded-full |
| card | Yes | Black border, no shadow |
| input | Maybe | Black focus border |
| dialog | Yes | Minimal styling |
| dropdown-menu | Maybe | Black borders |
| select | Maybe | Black borders |
| toast | Yes | Status colors only |
