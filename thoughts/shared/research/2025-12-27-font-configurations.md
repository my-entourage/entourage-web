---
date: 2025-12-27T14:35:19Z
researcher: Claude
git_commit: 4f1585688d563ead1760818eaca3a384ec4fbebc
branch: main
repository: entourage-web
topic: "Current Default Font Configurations"
tags: [research, fonts, typography, tailwind, next-js]
status: complete
last_updated: 2025-12-27
last_updated_by: Claude
---

# Research: Current Default Font Configurations

**Date**: 2025-12-27T14:35:19Z
**Researcher**: Claude
**Git Commit**: 4f1585688d563ead1760818eaca3a384ec4fbebc
**Branch**: main
**Repository**: entourage-web

## Research Question
What are the current default font configurations in the codebase?

## Summary

The application uses a dual-font system:
- **Switzer** - Primary sans-serif font loaded locally via variable font files
- **Geist Mono** - Monospace font loaded from Google Fonts

Both fonts are configured using Next.js font optimization and exposed via CSS variables. Tailwind CSS v4 maps these to `font-sans` and `font-mono` utilities.

## Detailed Findings

### Font Files

**Local Font Files** (`src/app/fonts/`):
- `Switzer-Variable.woff2` - Variable font (normal style)
- `Switzer-VariableItalic.woff2` - Variable font (italic style)

**Remote Font**:
- Geist Mono loaded from Google Fonts CDN (handled by Next.js)

### Font Configuration

#### 1. Next.js Font Setup (`src/app/layout.tsx:8-26`)

```typescript
const switzer = localFont({
  src: [
    {
      path: "./fonts/Switzer-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/Switzer-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

#### 2. Font Application to Document (`src/app/layout.tsx:140-142`)

```tsx
<body className={`${switzer.variable} ${geistMono.variable} antialiased`}>
```

#### 3. Tailwind CSS v4 Theme Integration (`src/app/globals.css:48-54`)

```css
@theme inline {
  --font-sans: var(--font-switzer);
  --font-mono: var(--font-geist-mono);
}
```

#### 4. Body Default Font (`src/app/globals.css:93-95`)

```css
body {
  font-family: var(--font-switzer), system-ui, sans-serif;
}
```

### CSS Variable Mapping

| Variable | Maps To | Font |
|----------|---------|------|
| `--font-switzer` | N/A (source) | Switzer |
| `--font-geist-mono` | N/A (source) | Geist Mono |
| `--font-sans` | `--font-switzer` | Switzer |
| `--font-mono` | `--font-geist-mono` | Geist Mono |

### Tailwind Utility Usage

| Utility | Font Applied |
|---------|--------------|
| `font-sans` | Switzer (via `--font-sans`) |
| `font-mono` | Geist Mono (via `--font-mono`) |

### Usage Patterns in Codebase

#### Default Body Text (Sans-Serif)
All components inherit Switzer by default from the body element. No explicit class needed.

#### Section Labels (Monospace)
Standard pattern found throughout:
```tsx
<span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
  Label text
</span>
```

**Found in**:
- `src/components/sections/flow-section/FlowSection.tsx:50`
- `src/components/bento/DataVaultCard.tsx:23-25`
- `src/components/sections/team-credentials/TeamCredentialsSection.tsx:39-41`

#### Logo Wordmark (Monospace)
```tsx
<span className="font-mono text-lg font-medium tracking-wide">
  Entourage
</span>
```

**Found in**: `src/components/Logo.tsx:48-49`

#### Technical Flow Labels (Monospace)
Used for processing states, action badges, and metadata:
```tsx
<span className="text-sm font-mono text-black dark:text-white">{source.label}</span>
```

**Found in**: `src/components/sections/flow-section/FlowSection.tsx:161-228`

### Clerk Integration

Switzer is also applied to Clerk authentication components:

```typescript
// src/app/layout.tsx:117
appearance: {
  variables: {
    fontFamily: '"Switzer", -apple-system, sans-serif',
  }
}
```

## Code References

- `src/app/layout.tsx:8-21` - Switzer font configuration
- `src/app/layout.tsx:23-26` - Geist Mono font configuration
- `src/app/layout.tsx:140-142` - Font variables applied to body
- `src/app/layout.tsx:117` - Clerk font configuration
- `src/app/globals.css:48-54` - Tailwind theme inline configuration
- `src/app/globals.css:93-95` - Body font-family fallback
- `src/app/fonts/` - Local font files directory

## Architecture Documentation

**Font Loading Strategy**:
1. Next.js font optimization handles loading and caching
2. Switzer loaded locally for performance and control
3. Geist Mono loaded from Google Fonts CDN
4. `display: "swap"` prevents invisible text during load

**Tailwind CSS v4 Integration**:
- No traditional `tailwind.config.js` file
- Theme configured via `@theme inline` directive in globals.css
- Font variables mapped directly to Tailwind utilities

**Fallback Chain**:
- Sans-serif: `var(--font-switzer), system-ui, sans-serif`
- Clerk: `"Switzer", -apple-system, sans-serif`

## Historical Context (from thoughts/)

No prior research documents found specifically about font configuration.

## Related Research

- Design system documentation at `docs/design-system.md` references typography conventions

## Open Questions

None - font configuration is fully documented in the codebase.
