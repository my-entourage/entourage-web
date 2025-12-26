---
date: 2025-12-26T12:00:00-08:00
researcher: Claude
git_commit: f554d1a3eb6cfb116ee066d0f16f325ee02bcf9d
branch: feat/design-system
repository: entourage-web
topic: "NextJS 16 Folder Structure Comparison"
tags: [research, codebase, folder-structure, nextjs, architecture]
status: complete
last_updated: 2025-12-26
last_updated_by: Claude
---

# Research: NextJS 16 Folder Structure Comparison

**Date**: 2025-12-26T12:00:00-08:00
**Researcher**: Claude
**Git Commit**: f554d1a3eb6cfb116ee066d0f16f325ee02bcf9d
**Branch**: feat/design-system
**Repository**: entourage-web

## Research Question

Document the current folder structure and compare it against the NextJS 16 recommended folder structure to understand alignment and gaps.

## Summary

The project currently uses a minimal folder structure appropriate for a single-page marketing site. It has 3 top-level directories under `src/` (`app/`, `components/`, `lib/`) compared to the recommended 6+ directories. The app has exactly one route (root `/`) with no advanced routing patterns.

## Current Structure vs Recommended

### Side-by-Side Comparison

```
RECOMMENDED                          CURRENT
src/                                 src/
├── app/                             ├── app/
│   ├── (marketing)/                 │   ├── fonts/
│   │   ├── blog/                    │   ├── favicon.ico
│   │   │   ├── [slug]/              │   ├── globals.css
│   │   │   │   └── page.tsx         │   ├── layout.tsx
│   │   │   └── page.tsx             │   └── page.tsx
│   │   └── layout.tsx               │
│   ├── (dashboard)/                 │
│   │   ├── @modal/                  │
│   │   │   ├── (.)settings/         │
│   │   │   │   └── page.tsx         │
│   │   │   └── default.tsx          │
│   │   └── settings/                │
│   │       └── page.tsx             │
│   ├── api/                         │   (none)
│   ├── global-error.tsx             │   (none)
│   └── layout.tsx                   │
├── components/                      ├── components/
│   └── ui/                          │   ├── ui/
│                                    │   ├── bento/
│                                    │   └── (13 root-level files)
├── features/                        │   (does not exist)
│   ├── auth/                        │
│   │   ├── actions.ts               │
│   │   └── components/              │
│   └── billing/                     │
├── lib/                             ├── lib/
│                                    │   └── utils.ts
├── providers/                       │   (does not exist)
│   └── root-provider.tsx            │
├── instrumentation.ts               │   (does not exist)
└── proxy.ts                         │   (does not exist)
```

## Detailed Findings

### Current `src/app/` Structure

**Files present:**
- `src/app/layout.tsx` - Root layout with fonts and ThemeProvider
- `src/app/page.tsx` - Landing page orchestrating all sections
- `src/app/globals.css` - CSS variables and base styles
- `src/app/favicon.ico` - Site favicon
- `src/app/fonts/` - Contains Switzer font files

**Files NOT present:**
- `global-error.tsx` - No global error handler
- `not-found.tsx` - No custom 404 page
- `loading.tsx` - No loading skeleton
- `error.tsx` - No error boundary
- `api/` directory - No API route handlers

**Routing patterns NOT used:**
| Pattern | Example | Status |
|---------|---------|--------|
| Route Groups | `(marketing)/` | Not used |
| Dynamic Routes | `[slug]/` | Not used |
| Parallel Routes | `@modal/` | Not used |
| Intercepting Routes | `(.)settings/` | Not used |
| Private Folders | `_folder/` | Not used |

### Current `src/components/` Structure

**Organization:**
```
src/components/
├── bento/                    # Domain-specific (bento cards)
│   ├── DataVaultCard.tsx
│   └── IntegrationsCard.tsx
├── ui/                       # UI primitives
│   ├── accordion.tsx
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── InfiniteSlider.tsx
│   └── PlusCornerCard.tsx
├── Header.tsx                # Landing page sections
├── Hero.tsx
├── FlowSection.tsx
├── BentoFeatures.tsx
├── TeamCredentialsSection.tsx
├── SecondaryCTA.tsx
├── FAQ.tsx
├── Footer.tsx
├── Icon.tsx                  # Utility components
├── Logo.tsx
├── ThemeProvider.tsx         # Should be in providers/
└── ThemeToggle.tsx
```

**Notes:**
- `ThemeProvider.tsx` lives in `components/` rather than a dedicated `providers/` directory
- Landing page sections are at root level rather than grouped (e.g., in `landing/` or `sections/`)
- `ui/` contains both ShadCN components and custom primitives

### Current `src/lib/` Structure

**Files:**
- `src/lib/utils.ts` - Contains only `cn()` utility

**Recommended additions (when needed):**
- Database clients
- External service configs (Stripe, etc.)
- Singleton instances

### Missing Recommended Directories

| Directory | Purpose | Current State |
|-----------|---------|---------------|
| `src/features/` | Domain-driven business logic | Does not exist |
| `src/providers/` | Client contexts | ThemeProvider in components/ |
| `instrumentation.ts` | Server startup hooks | Does not exist |
| `proxy.ts` | Network boundary (middleware replacement) | Does not exist |
| `middleware.ts` | Traditional Next.js middleware | Does not exist |

## Code References

- `src/app/layout.tsx:32-46` - Root layout implementation
- `src/app/page.tsx:10-25` - Landing page component
- `src/components/ThemeProvider.tsx` - Theme context (should move to providers/)
- `src/lib/utils.ts` - cn() utility function

## Architecture Documentation

### Current State

The project is structured as a **minimal marketing site** with:
- Single page architecture (only `/` route exists)
- Flat component hierarchy
- No API routes or server actions
- No authentication or protected routes
- Theme system via ThemeProvider

### When Advanced Patterns Become Relevant

| Pattern | When to Use | Current Need |
|---------|-------------|--------------|
| Route Groups `(folder)` | Multiple distinct layouts (marketing vs app) | Not yet needed |
| Dynamic Routes `[slug]` | Blog posts, user profiles | Not yet needed |
| Parallel Routes `@slot` | Dashboard with modals, sidebars | Not yet needed |
| Intercepting `(.)route` | Modal overlays with direct URLs | Not yet needed |
| `features/` directory | Business logic separation | Not yet needed |
| `providers/` directory | Multiple contexts | Could organize ThemeProvider here |
| `instrumentation.ts` | OpenTelemetry, Sentry init | When observability added |
| `proxy.ts` | Auth checks, redirects | When auth added |

## Alignment Summary

### Currently Aligned ✓

1. **`src/` directory** - Application code separated from config files
2. **`app/` for routing** - Only routing/layout concerns in app/
3. **`components/ui/`** - Shared UI primitives in dedicated folder
4. **`lib/`** - Utilities and configs isolated

### Gaps to Address When Scaling

1. **`src/providers/`** - Create and move ThemeProvider there
2. **`src/features/`** - Create when business logic grows
3. **Route Groups** - Add `(marketing)/` when dashboard routes are added
4. **`instrumentation.ts`** - Add when observability is needed
5. **Error handling** - Add `global-error.tsx`, `not-found.tsx` when needed

## Open Questions

1. Should `ThemeProvider.tsx` move to `src/providers/` now for consistency?
2. Should landing page section components be grouped (e.g., `components/sections/`)?
3. When is the right time to introduce the `features/` directory pattern?
