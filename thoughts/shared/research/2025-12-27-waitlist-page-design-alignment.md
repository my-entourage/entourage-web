# Waitlist Page Design System Alignment Research

**Date**: 2025-12-27
**Status**: Complete
**Purpose**: Analyze waitlist page against design system and identify improvements

---

## Current State Analysis

### Waitlist Page (`src/app/waitlist/page.tsx`)

```tsx
<div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-6">
  <div className="w-full max-w-md text-center">
    <h1 className="text-2xl font-semibold text-black dark:text-white md:text-3xl">
    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
    <div className="mt-8">
      <WaitlistForm />
    </div>
    <Link className="mt-6 inline-block text-sm text-zinc-500 hover:text-black ...">
```

### WaitlistForm (`src/components/WaitlistForm.tsx`)

```tsx
<form className="w-full max-w-md space-y-4">
  <Label> + <Input>  // Uses branded wrappers
  <Button variant="solid" size="lg" className="w-full">
  <p className="text-emerald-500" | "text-rose-500">  // Success/error colors
```

---

## Design System Gaps Identified

### 1. Missing Plus Corner Frame (Featured Section)

**Design System Says**:
> "Hero section: Yes - Dashed border + corners"
> "Featured Frame: border-dashed border-zinc-300, Plus Corners: Yes"

**Current**: No plus corners, no dashed frame around the form content area.

**Recommendation**: Wrap the content in a PlusCornerCard or manual dashed frame with plus corners, similar to how Hero.tsx does it.

### 2. Missing Section Label / Monospace Accent

**Design System Says**:
> "Section Label: `text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500`"

**Current**: No monospace label above the heading.

**Recommendation**: Add a small label like "EARLY ACCESS" or "WAITLIST" above the h1.

### 3. Heading Could Use Tracking

**Design System Says**:
> "Section title: `text-2xl md:text-3xl font-semibold text-black dark:text-white`"
> "Headlines: `tracking-tight`"

**Current**: Missing `tracking-tight`.

**Recommendation**: Add `tracking-tight` to h1.

### 4. Back Link Could Be More Prominent

**Design System Says**:
> "Muted text: `text-zinc-500 dark:text-zinc-400`"

**Current**: Uses correct muted colors but could benefit from an arrow icon using Iconify for consistency.

**Recommendation**: Consider using the Icon component with `lucide:arrow-left` for visual consistency.

### 5. Form Labels Could Use Monospace

**Design System Says**:
> "Monospace Label: `font-mono text-sm text-zinc-500 dark:text-zinc-400`"

**Current**: Label wrapper exists but may not apply monospace.

**Recommendation**: Check Label wrapper, consider `font-mono` for form labels or keep as-is (labels are typically sans-serif in forms).

---

## Recommended Changes

### Waitlist Page Improvements

| Change | Priority | Impact |
|--------|----------|--------|
| Add dashed frame with Plus Corners | High | Brand consistency |
| Add section label (monospace) | Medium | Visual hierarchy |
| Add `tracking-tight` to heading | Low | Typography polish |
| Use Icon component for back arrow | Low | Consistency |

### Proposed Updated Structure

```tsx
import { WaitlistForm } from "@/components/WaitlistForm";
import { PlusCorner } from "@/components/ui/PlusCorner";
import Link from "next/link";

export default function WaitlistPage() {
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
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <span>&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## Sign-in Page Comparison

The sign-in page is minimal because it renders Clerk's component which has its own styling via ClerkProvider's `appearance` prop. The waitlist page is fully custom, so it should follow our design patterns more closely.

---

## Summary

The waitlist page functions correctly but lacks the signature "Technical Blueprint" brand elements:

1. **Plus Corners** - Entourage's signature decorative element
2. **Dashed Frame** - Featured content container pattern
3. **Monospace Label** - Section identification pattern
4. **Tracking-tight** - Headline typography

Implementing these changes would make the waitlist page feel cohesive with the rest of the landing page (Hero, BentoFeatures, etc.).
