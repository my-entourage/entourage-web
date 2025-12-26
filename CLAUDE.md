# Entourage Web

## Project Overview

**Entourage** is a marketing landing page for an AI-powered task extraction platform. The product concept: automatically extract actionable items from meetings, chats, emails, and documents—then let users review and approve before syncing to their task tools.

**Current state**: Public-facing marketing website. No backend, no auth, no waitlist form yet.

**Tagline**: "Know what needs to be done. Without touching your task list."

## Tech Stack

| Category | Technology | Notes |
|----------|------------|-------|
| Framework | Next.js 16 | App Router |
| UI | React 19 | RSC support |
| Styling | Tailwind CSS v4 | With postcss |
| Animation | Framer Motion | Header, pulse effects |
| Icons | Iconify | Lucide + Simple Icons |
| Fonts | Switzer + Geist Mono | Local + Google |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout, fonts, providers
│   ├── page.tsx        # Landing page (orchestrates sections)
│   └── globals.css     # CSS variables, base styles
├── components/
│   ├── Header.tsx      # Sticky nav, theme toggle
│   ├── Hero.tsx        # Headline + CTA
│   ├── TeamCredentialsSection.tsx  # Logo carousel
│   ├── FlowSection.tsx # AI processing diagram
│   ├── BentoFeatures.tsx  # Feature cards grid
│   ├── FAQ.tsx         # Accordion Q&A
│   ├── SecondaryCTA.tsx
│   ├── Footer.tsx
│   ├── ui/             # Primitives (Button, PlusCornerCard, etc.)
│   └── bento/          # Bento grid card components
├── lib/
│   └── utils.ts        # cn() utility
docs/
└── design-system.md    # Complete design guide (v6.0)
thoughts/shared/
├── plans/              # Implementation plans
├── research/           # Analysis documents
└── handoffs/           # Session handoffs
```

## Design System

See [`docs/design-system.md`](docs/design-system.md) for complete guidelines.

**Identity**: Technical Blueprint — engineering-drawing aesthetic with sharp corners and precision.

**Signature element**: Plus Corners (4 plus signs marking featured container corners)

### Quick Reference

| Element | Pattern |
|---------|---------|
| Primary text | `text-black dark:text-white` |
| Muted text | `text-zinc-500 dark:text-zinc-400` |
| Borders | `border-black dark:border-white` or `border-zinc-300 dark:border-zinc-700` |
| Container | `max-w-5xl mx-auto px-6 md:px-12` |
| Section padding | `py-16 md:py-24` |
| Border radius | Always 0 (`rounded-none`) |

### Accent Colors

| Color | Hex | Use |
|-------|-----|-----|
| Emerald | #10B981 | Success, AI actions |
| Violet | #8B5CF6 | Categories, tags |
| Amber | #F59E0B | Warnings |
| Rose | #F43F5E | Errors |
| Sky | #0EA5E9 | Info, links |

## Component Patterns

### Button Variants

Custom Button component at `src/components/ui/Button.tsx`:

- **primary**: White bg, black text/border (default)
- **solid**: Black bg, white text
- **secondary**: Transparent bg, black text/border
- **ghost**: No border, subtle hover

### Animation

- **UI animations**: Fast (100-150ms) — hover states, transitions
- **Ambient animations**: Slow (2-25s) — logo pulse, carousels
- Always respect `useReducedMotion()`

### Dark Mode

Always pair light/dark variants:
```tsx
className="bg-white dark:bg-black text-black dark:text-white"
```

## ShadCN UI (When Adding Components)

1. Install: `pnpm dlx shadcn@canary add <component>`
2. Components install to `src/components/ui/`
3. **Never modify ShadCN files directly**
4. Create wrapper components for brand customization

Example wrapper:
```tsx
// src/components/Card.tsx
import { Card as ShadcnCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return (
    <ShadcnCard
      className={cn("rounded-none border-black dark:border-white", className)}
      {...props}
    />
  );
}
```

## Code Style

- TypeScript for all components
- React 19: No `forwardRef` needed, ref is a regular prop
- Use `cn()` for conditional classNames
- Use `ComponentProps<typeof X>` for type inference
- Destructure props with defaults

## Current Work

Branch: `feat/design-system`

Landing page redesign in progress. See `thoughts/shared/plans/` for implementation details.
