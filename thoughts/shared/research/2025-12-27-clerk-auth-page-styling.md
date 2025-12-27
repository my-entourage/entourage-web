---
date: 2025-12-27T14:13:38+0000
researcher: Claude
git_commit: c8cf3272fe1f02ec0a04da1a62b9e0226911839b
branch: main
repository: entourage-web
topic: "How to style Clerk auth pages to match waitlist page"
tags: [research, clerk, authentication, styling, design-system]
status: complete
last_updated: 2025-12-27
last_updated_by: Claude
---

# Research: How to Style Clerk Auth Pages to Match Waitlist Page

**Date**: 2025-12-27T14:13:38+0000
**Researcher**: Claude
**Git Commit**: c8cf3272fe1f02ec0a04da1a62b9e0226911839b
**Branch**: main
**Repository**: entourage-web

## Research Question

How to make the Clerk authentication page (sign-in) styled in the same way as the waitlist page?

## Summary

The waitlist page uses the Entourage "Technical Blueprint" design system with distinctive features: Plus Corners, dashed border frame, monospace section label, and sharp corners. To match this style for Clerk auth pages, there are **two levels of customization** needed:

1. **Page Layout (wrapper)** - Add the Plus Corners frame and dashed border around the Clerk SignIn component
2. **Clerk Component Styling (appearance prop)** - Already largely implemented via ClerkProvider in layout.tsx

The current sign-in page is very minimal and lacks the brand framing elements. The Clerk component itself is already styled to match the design system, but the page wrapper needs the Plus Corners treatment.

## Detailed Findings

### Current Waitlist Page Design

**Location**: `src/app/waitlist/page.tsx`

The waitlist page implements the full Entourage design pattern:

```tsx
<div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-6">
  {/* Content wrapper with plus corners */}
  <div className="relative w-full max-w-md px-6 py-12 md:px-8 md:py-16">
    {/* Dashed border */}
    <div className="absolute inset-0 border border-dashed border-zinc-200 dark:border-zinc-800" />

    {/* Plus corners */}
    <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
    <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
    <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
    <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />

    {/* Content */}
    <div className="relative text-center">
      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        Early Access
      </span>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
        Join the Waitlist
      </h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        Be the first to know when we launch.
      </p>
      <div className="mt-8">
        <WaitlistForm />
      </div>
      <Link href="/" className="mt-6 inline-flex items-center gap-1 text-sm text-zinc-500 ...">
        &larr; Back to home
      </Link>
    </div>
  </div>
</div>
```

**Key Design Elements**:
| Element | Implementation |
|---------|----------------|
| Plus Corners | 4x `<PlusCorner>` components at corners with `-top-2.5 -left-2.5` positioning |
| Dashed Frame | Absolute positioned div with `border border-dashed border-zinc-200 dark:border-zinc-800` |
| Section Label | `text-xs font-mono uppercase tracking-wider` text above heading |
| Heading | `text-2xl font-semibold tracking-tight` |
| Container | `relative w-full max-w-md px-6 py-12 md:px-8 md:py-16` |
| Back Link | Arrow with text linking to home |

---

### Current Sign-In Page Design

**Location**: `src/app/sign-in/[[...sign-in]]/page.tsx`

The current sign-in page is minimal:

```tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-6">
      <SignIn />
    </div>
  );
}
```

**What's Missing**:
- Plus Corners frame
- Dashed border
- Section label (e.g., "SIGN IN" or "WELCOME BACK")
- Back to home link

---

### Current Clerk Appearance Configuration

**Location**: `src/app/layout.tsx:39-60`

ClerkProvider already has appearance configuration matching the design system:

```tsx
<ClerkProvider
  appearance={{
    variables: {
      colorPrimary: "#10B981",           // Emerald accent
      colorDanger: "#F43F5E",            // Rose
      colorSuccess: "#10B981",           // Emerald
      colorWarning: "#F59E0B",           // Amber
      borderRadius: "0rem",              // Sharp corners
      fontFamily: '"Switzer", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    elements: {
      formButtonPrimary: "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white rounded-none hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors",
      card: "bg-white dark:bg-black border border-black dark:border-white rounded-none shadow-none",
      headerTitle: "text-black dark:text-white font-semibold",
      headerSubtitle: "text-zinc-500 dark:text-zinc-400",
      formFieldInput: "rounded-none border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black",
      footerActionLink: "text-emerald-500 hover:text-emerald-600",
    },
  }}
>
```

**What's Already Styled**:
| Element | Status |
|---------|--------|
| Sharp corners (borderRadius: 0) | Done |
| Switzer font | Done |
| Primary button (solid black/white) | Done |
| Card container | Done |
| Input fields | Done |
| Footer links (emerald) | Done |
| Dark mode support | Done |

---

### How to Match Styles: Implementation Guide

#### Option 1: Add Plus Corners Wrapper to Sign-In Page (Recommended)

Update `src/app/sign-in/[[...sign-in]]/page.tsx` to match the waitlist page structure:

```tsx
import { SignIn } from "@clerk/nextjs";
import { PlusCorner } from "@/components/ui/PlusCorner";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-6">
      {/* Content wrapper with plus corners */}
      <div className="relative w-full max-w-md px-6 py-12 md:px-8 md:py-16">
        {/* Dashed border */}
        <div className="absolute inset-0 border border-dashed border-zinc-200 dark:border-zinc-800" />

        {/* Plus corners */}
        <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />

        {/* Content */}
        <div className="relative text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Welcome Back
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
            Sign In
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Access your Entourage account.
          </p>
          <div className="mt-8">
            <SignIn
              appearance={{
                elements: {
                  // Hide Clerk's built-in header since we have our own
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                }
              }}
            />
          </div>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Key Changes**:
1. Added Plus Corners frame wrapper
2. Added section label ("Welcome Back")
3. Added custom heading and subtitle
4. Hide Clerk's built-in header (optional, to avoid duplication)
5. Added "Back to home" link

#### Option 2: Create Reusable Auth Frame Component

For consistency across sign-in, sign-up (if added), and other auth pages:

```tsx
// src/components/layout/AuthFrame.tsx
import { PlusCorner } from "@/components/ui/PlusCorner";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthFrameProps {
  label: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthFrame({ label, title, subtitle, children }: AuthFrameProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-6">
      <div className="relative w-full max-w-md px-6 py-12 md:px-8 md:py-16">
        {/* Dashed border */}
        <div className="absolute inset-0 border border-dashed border-zinc-200 dark:border-zinc-800" />

        {/* Plus corners */}
        <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />

        {/* Content */}
        <div className="relative text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {label}
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
          <div className="mt-8">
            {children}
          </div>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

Usage:
```tsx
// src/app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";
import { AuthFrame } from "@/components/layout/AuthFrame";

export default function SignInPage() {
  return (
    <AuthFrame
      label="Welcome Back"
      title="Sign In"
      subtitle="Access your Entourage account."
    >
      <SignIn appearance={{ elements: { headerTitle: "hidden", headerSubtitle: "hidden" } }} />
    </AuthFrame>
  );
}
```

---

### Clerk Theming Deep Dive

#### Available Configuration Options

**Variables** (global styling):
| Variable | Current Value | Notes |
|----------|---------------|-------|
| `colorPrimary` | `#10B981` | Emerald accent |
| `colorDanger` | `#F43F5E` | Rose for errors |
| `colorSuccess` | `#10B981` | Emerald |
| `colorWarning` | `#F59E0B` | Amber |
| `borderRadius` | `0rem` | Sharp corners |
| `fontFamily` | `Switzer` | Brand font |

**Elements** (specific component styling):
| Element Key | Purpose |
|-------------|---------|
| `card` | Main container card |
| `cardBox` | Card wrapper (no shadow) |
| `formButtonPrimary` | Submit buttons |
| `formButtonSecondary` | Secondary actions |
| `formFieldInput` | Input fields |
| `headerTitle` | Card title |
| `headerSubtitle` | Card subtitle |
| `footer` | Footer area |
| `footerActionLink` | Footer links |
| `dividerLine` | "OR" dividers |
| `socialButtonsBlockButton` | OAuth buttons |

#### Hiding Clerk Header (when using custom heading)

```tsx
<SignIn
  appearance={{
    elements: {
      headerTitle: "hidden",
      headerSubtitle: "hidden",
    }
  }}
/>
```

#### Removing Card Border (if Plus Corners frame provides the border)

```tsx
<SignIn
  appearance={{
    elements: {
      card: "bg-transparent border-none shadow-none",
    }
  }}
/>
```

---

### Additional Considerations

#### Width Matching

The Clerk SignIn component has its own max-width. To ensure consistency:

```tsx
// Option A: Let Clerk card define width
<div className="relative w-full max-w-md"> {/* max-w-md = 448px */}

// Option B: Override Clerk card width
<SignIn
  appearance={{
    elements: {
      rootBox: "w-full",
      card: "w-full max-w-none",
    }
  }}
/>
```

#### Social Login Buttons

If using OAuth providers (Google, GitHub, etc.), ensure they match:

```tsx
elements: {
  socialButtonsBlockButton: "rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900",
}
```

---

## Code References

| File | Line(s) | Description |
|------|---------|-------------|
| `src/app/waitlist/page.tsx` | 1-43 | Waitlist page with Plus Corners implementation |
| `src/app/sign-in/[[...sign-in]]/page.tsx` | 1-10 | Current minimal sign-in page |
| `src/app/layout.tsx` | 39-60 | ClerkProvider appearance configuration |
| `src/components/ui/PlusCorner.tsx` | - | Plus Corner SVG component |
| `src/components/WaitlistForm.tsx` | 1-115 | Waitlist form with branded styling |
| `docs/design-system.md` | 382-583 | Plus Corner System documentation |

## Architecture Documentation

The Entourage design system uses a two-layer approach for branded pages:

1. **Page Layout Layer**: The page component (e.g., `waitlist/page.tsx`) provides the branded frame with Plus Corners, dashed borders, section labels, and navigation links.

2. **Component Layer**: The form/content inside (e.g., `<WaitlistForm />` or `<SignIn />`) handles the actual functionality and has its own styling that must align with the design system.

For Clerk components specifically:
- Global appearance is set in `ClerkProvider` (layout.tsx)
- Per-page overrides can be added directly to `<SignIn />` component
- The page wrapper provides brand identity elements that Clerk cannot customize (Plus Corners)

## Related Research

- `thoughts/shared/research/2025-12-27-waitlist-page-design-alignment.md` - Waitlist page design analysis
- `thoughts/shared/research/2025-12-27-clerk-supabase-resend-integration.md` - Clerk integration research
- `thoughts/shared/plans/2025-12-27-signin-page-and-waitlist-flow.md` - Sign-in page implementation plan

## Open Questions

1. Should the Clerk card border be removed when wrapped in Plus Corners frame? (Currently it would have double borders)
2. Should we create a shared `AuthFrame` component for reuse across auth pages?
3. Should Clerk's header be hidden in favor of our custom header for full brand control?
