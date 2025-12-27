---
date: 2025-12-25T11:30:00-08:00
git_commit: 389a09d26ba226686f54b260255970bcd9005260
branch: main
repository: entourage-web
topic: "ShadCN UI Migration Research"
tags: [research, shadcn-ui, migration, design-system]
status: complete
last_updated: 2025-12-25
---

# Research: ShadCN UI Migration for Entourage Web

**Date**: 2025-12-25
**Git Commit**: 389a09d26ba226686f54b260255970bcd9005260
**Branch**: main
**Repository**: entourage-web

## Research Question

How to migrate the Entourage Web codebase to use ShadCN UI components while:
1. Following best practices (never modifying ShadCN components directly)
2. Fixing the button hover cursor issue
3. Aligning with the Entourage brand guidelines (Swiss design, outline buttons, Switzer font)

## Summary

The codebase is ready for ShadCN UI migration. Current state uses custom components that can be replaced with ShadCN primitives + wrapper components. The button cursor issue is a known Tailwind v4 behavior change that requires a global CSS fix. The brand guidelines specify outline-style buttons rather than the current filled-black style.

## Detailed Findings

### Current Codebase Analysis

#### Components Structure
```
src/components/
├── ui/
│   ├── Button.tsx      # Custom button (40 lines)
│   └── Container.tsx   # Layout container (15 lines)
├── Header.tsx          # Uses Button (ghost)
├── Hero.tsx            # Uses Button (primary)
├── Footer.tsx          # Social icons only
├── ValueProps.tsx      # Icon cards with motion
├── SecondaryCTA.tsx    # Uses Button (primary)
└── FlowDiagram.tsx     # Complex diagram with icons
```

#### Current Button Issues (`src/components/ui/Button.tsx:16-24`)
1. **Missing cursor-pointer**: No `cursor-pointer` class in button styles
2. **Filled background**: Uses `bg-black text-white` for primary variant
3. **Design mismatch**: Brand guide specifies outline style (black text, white bg, black border)

#### Technology Stack
- Next.js 16.1.1
- React 19.2.3
- Tailwind CSS v4 (CSS-first config)
- Framer Motion 12.23.26
- No ShadCN currently installed

### Button Cursor Issue Analysis

**Root Cause**: Tailwind CSS v4 changed default button cursor from `pointer` to `default` to match native OS behavior.

**Solution**: Add global CSS rule in `globals.css`:
```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

### ShadCN UI Best Practices

#### Installation for Next.js 16 + Tailwind v4
```bash
pnpm dlx shadcn@latest init
# Leave Tailwind config path blank for v4
```

#### Wrapper Component Pattern
- Keep ShadCN components in `components/ui/` unmodified
- Create wrappers in `components/` that extend base components
- Use `forwardRef` and `cn()` utility for className merging
- Apply brand-specific defaults in wrappers

#### Example Wrapper Structure
```tsx
// components/Button.tsx (wrapper)
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Button = forwardRef(({ className, ...props }, ref) => (
  <ShadcnButton
    ref={ref}
    className={cn('rounded-full font-medium', className)}
    {...props}
  />
));
```

### Brand Guidelines Alignment

#### Typography Changes Needed
- **Current**: Geist Sans (UI), Geist Mono (code)
- **Required**: Switzer (UI), Geist Mono (code)
- **Font files**: Already present in `Fonts/WEB/fonts/`

#### Button Style Changes
| Aspect | Current | Required |
|--------|---------|----------|
| Primary | Filled black | Outline (black border, white bg) |
| Ghost | Transparent | Same (keep) |
| Cursor | None | pointer |
| Shape | rounded-full | rounded-full (keep) |

#### Color System
- Black (#000000) - Text, borders, logo
- White (#FFFFFF) - Backgrounds
- Neutral Gray (#F5F5F5) - Secondary backgrounds
- Functional colors for status only (purple=AI, yellow=pending, orange=progress, green=success, red=error)

### Files Created

1. **`CLAUDE.md`** - Development guidelines including ShadCN usage patterns
2. **`MIGRATION_PLAN.md`** - Detailed migration phases and checklist

## Code References

- `src/components/ui/Button.tsx:16-17` - Missing cursor-pointer
- `src/components/ui/Button.tsx:21` - Filled black primary variant
- `src/app/globals.css:1-18` - Current CSS variables
- `src/app/layout.tsx:5-13` - Font configuration
- `entourage_design_guide.md:199-204` - Button design specifications
- `Fonts/WEB/fonts/` - Switzer font files

## Architecture Documentation

### Current Pattern
Custom components built from scratch with inline Tailwind classes.

### Target Pattern
ShadCN primitives in `ui/` + custom wrappers for brand alignment.

### Directory Structure (Target)
```
src/
├── components/
│   ├── ui/           # ShadCN primitives (DO NOT MODIFY)
│   ├── Button.tsx    # Wrapper with brand defaults
│   ├── Header.tsx    # Uses wrapper Button
│   └── ...
├── lib/
│   └── utils.ts      # cn() utility
└── app/
    ├── globals.css   # Brand CSS variables
    └── layout.tsx    # Switzer font setup
```

## Migration Priority

1. **High**: Install ShadCN, add cursor-pointer fix
2. **Medium**: Create Button wrapper with outline defaults
3. **Low**: Setup Switzer font, migrate other components

## Open Questions

1. Should ValueProps cards use ShadCN Card component?
2. Should FlowDiagram TaskCards use ShadCN Card?
3. Priority of Switzer font migration vs component migration?
