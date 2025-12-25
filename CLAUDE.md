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

1. **Install components to `src/components/ui/`** - This is the default ShadCN location
2. **NEVER modify files in `src/components/ui/`** - Treat these as read-only primitives
3. **Create wrapper components in `src/components/`** for any customization

### Directory Structure

```
src/components/
├── ui/                    # ShadCN primitives (DO NOT MODIFY)
│   ├── button.tsx         # From: npx shadcn@latest add button
│   ├── card.tsx
│   └── ...
├── Button.tsx             # Custom wrapper around ui/button
├── Header.tsx             # App components
├── Hero.tsx
└── ...
```

### Creating Wrapper Components

When you need custom behavior or styling, create a wrapper:

```tsx
// src/components/Button.tsx (Custom wrapper)
import { forwardRef } from 'react';
import { Button as ShadcnButton, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CustomButtonProps extends ButtonProps {
  // Add custom props here
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        className={cn(
          // Custom default styles aligned with design guide
          'cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```

### Styling Customization Methods

1. **CSS Variables** - For global theme changes in `globals.css`
2. **className prop** - For one-off customizations via `cn()` utility
3. **Wrapper components** - For reusable patterns (preferred)

### Why This Pattern?

- ShadCN updates won't break your customizations
- Clear separation between library code and your code
- Easy to upgrade components with `npx shadcn@latest add [component] --overwrite`
- Consistent patterns across the codebase

## Component Guidelines

### Button Variants (per Design Guide)

- **Primary**: Outline style - black text, white bg, black border
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
- Use `forwardRef` for components that accept refs
- Always destructure props with defaults
- Use `cn()` utility for className merging
- Include `displayName` for forwardRef components
