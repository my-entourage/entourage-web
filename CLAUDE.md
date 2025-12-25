# Entourage Web - Development Guidelines

## Project Overview

Entourage is an AI-powered task management platform that extracts actionable items from meetings, chats, and communications. Built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

## Design System

Refer to `entourage_design_guide.md` for complete brand guidelines. Key principles:

- **Digital Swiss Style**: Objectivity, precision, information density
- **Typography**: Switzer (UI) + Geist Mono (code/data)
- **Colors**: Functional only - black/white base, status colors for semantics
- **Buttons**: Outline style preferred (black text, white background, border)
- **Spacing**: 8px grid system

## ShadCN UI Usage Guidelines

### Core Principle: Never Modify ShadCN Components Directly

When using ShadCN UI components:

1. **Install with canary**: `pnpm dlx shadcn@canary add <component>` (required for Tailwind v4)
2. **Components go to `src/components/ui/`** - This is the default ShadCN location
3. **NEVER modify files in `src/components/ui/`** - Treat these as read-only primitives
4. **Create wrapper components in `src/components/`** for any customization

### Directory Structure

```
src/components/
├── ui/                    # ShadCN primitives (DO NOT MODIFY)
│   ├── button.tsx         # From: pnpm dlx shadcn@canary add button
│   ├── card.tsx
│   └── ...
├── Button.tsx             # Custom wrapper around ui/button
├── Header.tsx             # App components
├── Hero.tsx
└── ...
```

### Creating Wrapper Components (React 19)

When you need custom behavior or styling, create a wrapper using React 19 patterns:

```tsx
// src/components/Button.tsx (Custom wrapper)
// React 19: ref is a regular prop, no forwardRef needed
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof ShadcnButton>;

export function Button({ className, variant = "outline", ...props }: ButtonProps) {
  return (
    <ShadcnButton
      variant={variant}
      className={cn(
        // Brand-aligned defaults
        "rounded-full",
        className
      )}
      {...props}
    />
  );
}
```

**Note**: React 19 deprecated `forwardRef`. Use `ComponentProps` for type inference instead.

### Styling Customization Methods

1. **CSS Variables** - For global theme changes in `globals.css`
2. **className prop** - For one-off customizations via `cn()` utility
3. **Wrapper components** - For reusable patterns (preferred)

### Why This Pattern?

- ShadCN updates won't break your customizations
- Clear separation between library code and your code
- Easy to upgrade: `pnpm dlx shadcn@canary add [component] --overwrite`
- Consistent patterns across the codebase

### When NOT to Create Wrappers

Avoid over-abstraction. Don't create wrappers that just pass props through:

```tsx
// WRONG - pointless wrapper
export function Card(props: CardProps) {
  return <ShadcnCard {...props} />;
}

// CORRECT - wrapper adds brand value
export function Card({ className, ...props }: CardProps) {
  return (
    <ShadcnCard
      className={cn("border-black shadow-none", className)}
      {...props}
    />
  );
}
```

## Component Guidelines

### Button Variants (per Design Guide)

- **Primary/Outline**: Black text, white bg, black border (default)
- **Ghost**: Transparent bg, text only, subtle hover
- **Success**: Green text + border (for completed actions)

### Animation Guidelines

- Use `useReducedMotion` hook for accessibility
- Animations should inform, not entertain
- Hover states: instant
- Toggle/switch: 120ms ease-in-out
- Page transitions: 150ms ease-out

## Code Style

- Use TypeScript for all components
- React 19: No `forwardRef` needed, ref is a regular prop
- Always destructure props with defaults
- Use `cn()` utility for className merging
- Use `ComponentProps<typeof Component>` for type inference
