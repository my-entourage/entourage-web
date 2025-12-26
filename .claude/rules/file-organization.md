---
paths: src/**/*.{tsx,ts,js}
---

# File Organization Rules

## Required Directory Structure

```
src/
├── app/              # Next.js App Router ONLY
├── components/       # React components
│   ├── layout/       # Structural (Header, Footer)
│   ├── sections/     # Page sections (Hero, FAQ)
│   ├── ui/           # ShadCN primitives (DO NOT MODIFY)
│   └── [feature]/    # Feature-specific (bento/)
├── providers/        # React Context providers
├── lib/              # Utilities and helpers
├── hooks/            # Custom React hooks (when needed)
└── types/            # TypeScript definitions (when needed)
```

## File Placement Rules

| File Type | Location | Example |
|-----------|----------|---------|
| Page routes | `app/[route]/page.tsx` | `app/about/page.tsx` |
| Layouts | `app/[route]/layout.tsx` | `app/layout.tsx` |
| Context providers | `providers/[Name]Provider.tsx` | `providers/ThemeProvider.tsx` |
| Utilities | `lib/[name].ts` | `lib/utils.ts` |
| Custom hooks | `hooks/use[Name].ts` | `hooks/useAnimation.ts` |
| Type definitions | `types/[domain].ts` | `types/api.ts` |

## Naming Conventions

- **Components**: PascalCase (`DataVaultCard.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Hooks**: camelCase with `use` prefix (`useAnimation.ts`)
- **Directories**: kebab-case (`flow-section/`)

## Import Patterns

Use barrel exports from index.ts files:

```typescript
// Good - uses barrel export
import { Header, Footer } from "@/components/layout";
import { Hero, FAQ } from "@/components/sections";
import { ThemeProvider } from "@/providers";

// Avoid - direct file imports for organized components
import Header from "@/components/layout/header/Header";
```

## Protected Directories

- `components/ui/` - ShadCN primitives, never modify directly
- `app/fonts/` - Font files, do not add components here
