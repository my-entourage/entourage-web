---
paths: src/components/**/*.{tsx,ts}
---

# Component Development Rules

## Directory Structure

Components must be placed in the correct directory based on their type:

| Type | Location | Description |
|------|----------|-------------|
| Layout | `components/layout/[name]/` | Header, Footer, Sidebar, Nav |
| Sections | `components/sections/[name]/` | Page content blocks (Hero, FAQ, CTA) |
| UI Primitives | `components/ui/` | ShadCN and design system primitives |
| Feature-specific | `components/[feature]/` | Domain-specific (bento/, etc.) |
| Utilities | `components/` root | Small shared utilities (Icon, Logo) |

## File Organization Pattern

Each component directory follows this pattern:
```
components/sections/hero/
├── Hero.tsx        # Main component (PascalCase)
└── index.ts        # Barrel export
```

Index file format:
```typescript
export { Hero } from "./Hero";
```

## ShadCN Component Rules

- **NEVER modify** files in `components/ui/` directly
- Install via: `pnpm dlx shadcn@canary add <component>`
- Create wrappers in `components/` root for brand customization

## When Creating New Components

1. **Page section** (Hero, Features, FAQ-style) → `components/sections/[name]/`
2. **Layout element** (Header, Footer, Nav) → `components/layout/[name]/`
3. **Design primitive** (Button, Card, Input) → Use ShadCN or `components/ui/`
4. **Small utility** (Icon, Logo) → `components/` root

## Styling Rules

- Always use `rounded-none` (no border radius)
- Always include dark mode: `dark:` variants
- Use `cn()` for conditional classNames
- Follow design system in `docs/design-system.md`
