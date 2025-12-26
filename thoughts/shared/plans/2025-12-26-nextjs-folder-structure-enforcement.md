# NextJS Folder Structure Enforcement Implementation Plan

## Overview

Reorganize the project to follow NextJS 16 recommended folder structure and add Claude Code configuration to enforce these conventions automatically in future sessions.

## Current State Analysis

**Current structure:**
```
src/
├── app/                    # Routing only (correct)
├── components/             # Flat structure with 13 root-level files
│   ├── ui/                 # ShadCN primitives (correct)
│   ├── bento/              # Feature-specific (correct)
│   ├── Header.tsx          # Should be in layout/
│   ├── Footer.tsx          # Should be in layout/
│   ├── Hero.tsx            # Should be in sections/
│   ├── FlowSection.tsx     # Should be in sections/
│   ├── BentoFeatures.tsx   # Should be in sections/
│   ├── FAQ.tsx             # Should be in sections/
│   ├── SecondaryCTA.tsx    # Should be in sections/
│   ├── TeamCredentialsSection.tsx  # Should be in sections/
│   ├── ThemeProvider.tsx   # Should be in providers/
│   ├── Icon.tsx            # Stays at root
│   ├── Logo.tsx            # Stays at root
│   └── ThemeToggle.tsx     # Stays at root
├── lib/                    # Utilities (correct)
└── providers/              # Does not exist
```

**Claude Code config:**
- `.claude/settings.json` - Has hooks, no file placement rules
- `.claude/rules/` - Does not exist
- `CLAUDE.md` - Exists but lacks explicit file placement rules

## Desired End State

**Target structure:**
```
src/
├── app/                    # Routing only
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── fonts/
├── components/
│   ├── layout/             # Structural components
│   │   ├── header/
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   ├── footer/
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── sections/           # Page content blocks
│   │   ├── hero/
│   │   │   ├── Hero.tsx
│   │   │   └── index.ts
│   │   ├── flow-section/
│   │   │   ├── FlowSection.tsx
│   │   │   └── index.ts
│   │   ├── bento-features/
│   │   │   ├── BentoFeatures.tsx
│   │   │   └── index.ts
│   │   ├── team-credentials/
│   │   │   ├── TeamCredentialsSection.tsx
│   │   │   └── index.ts
│   │   ├── faq/
│   │   │   ├── FAQ.tsx
│   │   │   └── index.ts
│   │   ├── secondary-cta/
│   │   │   ├── SecondaryCTA.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── ui/                 # Design system primitives
│   ├── bento/              # Bento grid cards
│   ├── Icon.tsx            # Utility components at root
│   ├── Logo.tsx
│   └── ThemeToggle.tsx
├── providers/              # Client contexts
│   ├── ThemeProvider.tsx
│   └── index.ts
└── lib/                    # Utilities
    └── utils.ts
```

**Claude Code enforcement:**
- `.claude/rules/components.md` - Component placement rules
- `.claude/rules/file-organization.md` - General structure rules
- Updated `CLAUDE.md` - Explicit file placement conventions
- Updated `.claude/settings.json` - Protection for ui/ directory

### Verification

After implementation:
1. All imports resolve correctly: `pnpm build`
2. App renders without errors: `pnpm dev`
3. TypeScript has no errors: `pnpm typecheck` (if available) or build succeeds
4. Claude Code sessions follow placement rules when creating new files

## What We're NOT Doing

- NOT adding route groups `(marketing)/` (single page, not needed yet)
- NOT adding `features/` directory (no business logic yet)
- NOT adding `instrumentation.ts` or `proxy.ts` (no observability/auth yet)
- NOT modifying any component logic, only moving files
- NOT changing the ui/ or bento/ directories

## Implementation Approach

Move files incrementally, updating imports after each move. Add Claude Code enforcement rules last to avoid conflicts during migration.

---

## Phase 1: Create Directory Structure

### Overview

Create the new directories and barrel export files.

### Changes Required:

#### 1. Create providers directory

```bash
mkdir -p src/providers
```

**File**: `src/providers/index.ts`
```typescript
export { ThemeProvider } from "./ThemeProvider";
```

#### 2. Create layout directory structure

```bash
mkdir -p src/components/layout/header
mkdir -p src/components/layout/footer
```

**File**: `src/components/layout/index.ts`
```typescript
export { Header } from "./header";
export { Footer } from "./footer";
```

**File**: `src/components/layout/header/index.ts`
```typescript
export { default as Header } from "./Header";
```

**File**: `src/components/layout/footer/index.ts`
```typescript
export { default as Footer } from "./Footer";
```

#### 3. Create sections directory structure

```bash
mkdir -p src/components/sections/hero
mkdir -p src/components/sections/flow-section
mkdir -p src/components/sections/bento-features
mkdir -p src/components/sections/team-credentials
mkdir -p src/components/sections/faq
mkdir -p src/components/sections/secondary-cta
```

**File**: `src/components/sections/index.ts`
```typescript
export { Hero } from "./hero";
export { FlowSection } from "./flow-section";
export { BentoFeatures } from "./bento-features";
export { TeamCredentialsSection } from "./team-credentials";
export { FAQ } from "./faq";
export { SecondaryCTA } from "./secondary-cta";
```

**File**: `src/components/sections/hero/index.ts`
```typescript
export { default as Hero } from "./Hero";
```

**File**: `src/components/sections/flow-section/index.ts`
```typescript
export { default as FlowSection } from "./FlowSection";
```

**File**: `src/components/sections/bento-features/index.ts`
```typescript
export { default as BentoFeatures } from "./BentoFeatures";
```

**File**: `src/components/sections/team-credentials/index.ts`
```typescript
export { default as TeamCredentialsSection } from "./TeamCredentialsSection";
```

**File**: `src/components/sections/faq/index.ts`
```typescript
export { default as FAQ } from "./FAQ";
```

**File**: `src/components/sections/secondary-cta/index.ts`
```typescript
export { default as SecondaryCTA } from "./SecondaryCTA";
```

### Success Criteria:

#### Automated Verification:
- [x] All directories created: `ls -la src/providers src/components/layout src/components/sections`
- [x] All index.ts files exist (will have import errors until Phase 2)

#### Manual Verification:
- [ ] Directory structure matches plan

---

## Phase 2: Move Files and Update Imports

### Overview

Move component files to their new locations and update all import statements.

### Changes Required:

#### 1. Move ThemeProvider to providers/

```bash
mv src/components/ThemeProvider.tsx src/providers/ThemeProvider.tsx
```

**Update imports in**: `src/app/layout.tsx`
```typescript
// Before
import { ThemeProvider } from "@/components/ThemeProvider";

// After
import { ThemeProvider } from "@/providers";
```

#### 2. Move Header and Footer to layout/

```bash
mv src/components/Header.tsx src/components/layout/header/Header.tsx
mv src/components/Footer.tsx src/components/layout/footer/Footer.tsx
```

**Update imports in**: `src/app/page.tsx`
```typescript
// Before
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// After
import { Header, Footer } from "@/components/layout";
```

#### 3. Move section components

```bash
mv src/components/Hero.tsx src/components/sections/hero/Hero.tsx
mv src/components/FlowSection.tsx src/components/sections/flow-section/FlowSection.tsx
mv src/components/BentoFeatures.tsx src/components/sections/bento-features/BentoFeatures.tsx
mv src/components/TeamCredentialsSection.tsx src/components/sections/team-credentials/TeamCredentialsSection.tsx
mv src/components/FAQ.tsx src/components/sections/faq/FAQ.tsx
mv src/components/SecondaryCTA.tsx src/components/sections/secondary-cta/SecondaryCTA.tsx
```

**Update imports in**: `src/app/page.tsx`
```typescript
// Before
import Hero from "@/components/Hero";
import TeamCredentialsSection from "@/components/TeamCredentialsSection";
import FlowSection from "@/components/FlowSection";
import BentoFeatures from "@/components/BentoFeatures";
import SecondaryCTA from "@/components/SecondaryCTA";
import FAQ from "@/components/FAQ";

// After
import {
  Hero,
  FlowSection,
  BentoFeatures,
  TeamCredentialsSection,
  FAQ,
  SecondaryCTA,
} from "@/components/sections";
```

#### 4. Update internal imports within moved files

Check each moved file for imports that reference other moved files:

**Header.tsx** - Check for imports of:
- ThemeToggle (stays at root, update if needed)
- Logo (stays at root)

**BentoFeatures.tsx** - Check for imports of:
- bento/ components (path unchanged, should work)

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `pnpm build`
- [x] Dev server starts: `pnpm dev`
- [x] No import errors in terminal

#### Manual Verification:
- [ ] Landing page renders correctly at http://localhost:3000
- [ ] All sections visible (Hero, Flow, Features, FAQ, etc.)
- [ ] Header and Footer render
- [ ] Theme toggle works

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation that the site renders correctly before proceeding to Phase 3.

---

## Phase 3: Add Claude Code Enforcement Rules

### Overview

Create `.claude/rules/` files to enforce folder structure in future Claude Code sessions.

### Changes Required:

#### 1. Create components rule file

**File**: `.claude/rules/components.md`

```markdown
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
export { default as Hero } from "./Hero";
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
```

#### 2. Create file organization rule file

**File**: `.claude/rules/file-organization.md`

```markdown
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
```

#### 3. Update settings.json with protection rules

**File**: `.claude/settings.json`

Add to existing permissions:
```json
{
  "permissions": {
    "deny": [
      "Edit(./.claude/hooks/**)",
      "Write(./.claude/hooks/**)",
      "Edit(./src/components/ui/**)",
      "Write(./src/components/ui/**)"
    ]
  },
  "hooks": {
    // ... existing hooks unchanged
  }
}
```

### Success Criteria:

#### Automated Verification:
- [x] Rule files exist: `ls -la .claude/rules/`
- [x] Settings.json is valid JSON: `cat .claude/settings.json | jq .`

#### Manual Verification:
- [ ] Start new Claude Code session and verify rules are loaded
- [ ] Ask Claude to create a new section component - should go to `components/sections/`

---

## Phase 4: Update Documentation

### Overview

Update CLAUDE.md and related documentation to reflect the new structure.

### Changes Required:

#### 1. Update CLAUDE.md Project Structure section

**File**: `CLAUDE.md`

Replace the Project Structure section with:

```markdown
## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout, fonts, providers
│   ├── page.tsx        # Landing page (orchestrates sections)
│   ├── globals.css     # CSS variables, base styles
│   └── fonts/          # Local font files
├── components/
│   ├── layout/         # Structural components
│   │   ├── header/     # Header component
│   │   └── footer/     # Footer component
│   ├── sections/       # Page content blocks
│   │   ├── hero/
│   │   ├── flow-section/
│   │   ├── bento-features/
│   │   ├── team-credentials/
│   │   ├── faq/
│   │   └── secondary-cta/
│   ├── ui/             # ShadCN primitives (DO NOT MODIFY)
│   ├── bento/          # Bento grid card components
│   ├── Icon.tsx        # Icon utility
│   ├── Logo.tsx        # Logo component
│   └── ThemeToggle.tsx # Theme toggle button
├── providers/
│   └── ThemeProvider.tsx  # Theme context
├── lib/
│   └── utils.ts        # cn() utility
docs/
└── design-system.md    # Complete design guide
thoughts/shared/
├── plans/              # Implementation plans
├── research/           # Analysis documents
└── handoffs/           # Session handoffs
```

## File Placement Conventions

| Component Type | Location | Example |
|----------------|----------|---------|
| Page sections | `components/sections/[name]/` | `sections/hero/Hero.tsx` |
| Layout (Header/Footer) | `components/layout/[name]/` | `layout/header/Header.tsx` |
| UI primitives | `components/ui/` | `ui/button.tsx` |
| Context providers | `providers/` | `providers/ThemeProvider.tsx` |
| Utilities | `lib/` | `lib/utils.ts` |

### Creating New Components

1. **Page section** (Hero, Features, FAQ-style):
   ```bash
   mkdir src/components/sections/[name]
   # Create [Name].tsx and index.ts
   ```

2. **Layout component** (Header, Footer, Nav):
   ```bash
   mkdir src/components/layout/[name]
   # Create [Name].tsx and index.ts
   ```

3. **ShadCN component**:
   ```bash
   pnpm dlx shadcn@canary add [component]
   # Creates in components/ui/ - DO NOT MODIFY
   # Create wrapper in components/ if needed
   ```
```

### Success Criteria:

#### Automated Verification:
- [x] CLAUDE.md is valid markdown
- [x] Build still succeeds: `pnpm build`

#### Manual Verification:
- [ ] Documentation accurately reflects new structure
- [ ] New Claude Code sessions understand file placement

---

## Testing Strategy

### Automated Tests:
- Build succeeds without errors
- Dev server starts correctly
- All imports resolve

### Manual Testing Steps:
1. Run `pnpm dev` and verify landing page renders
2. Check all sections are visible and styled correctly
3. Verify theme toggle works
4. Verify Header sticky behavior
5. Verify Footer renders at bottom
6. Start new Claude Code session and ask it to create a component

## References

- Research document: `thoughts/shared/research/2025-12-26-nextjs-folder-structure-comparison.md`
- NextJS 16 folder structure guidelines (provided by user)
- Claude Code documentation for rules and settings
