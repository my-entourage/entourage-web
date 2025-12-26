---
date: 2025-12-26T20:45:00-08:00
author: Claude
git_commit: 4f1e082
branch: feat/design-system
repository: entourage-web
topic: "Fix Next.js Image aspect ratio warnings in TeamCredentialsSection"
tags: [fix, next-image, team-credentials, logos]
status: ready
---

# Fix Plan: Logo Image Aspect Ratio Warnings

**Date**: 2025-12-26
**Branch**: feat/design-system
**File**: `src/components/TeamCredentialsSection.tsx`

## Problem

Browser console shows warnings for logo images:

```
Image with src "/logos/deepmind.svg" has either width or height modified,
but not the other. If you use CSS to change the size of your image, also
include the styles 'width: "auto"' or 'height: "auto"' to maintain the
aspect ratio.
```

Affected images: `deepmind.svg`, `mckinsey.svg`, `bain.svg`, `google.svg`, `aalto.png`, `harvard.svg`

## Root Cause

The current implementation at lines 54-64 and 67-76:

```tsx
<Image
  src={cred.logo}
  alt={cred.name}
  width={120}
  height={32}
  className={cn(
    "h-6 md:h-8 w-auto object-contain",
    // ...
  )}
/>
```

**Issue**: Next.js `Image` adds inline `width: 120px` and `height: 32px` styles from the props. CSS then overrides height (`h-6 md:h-8`) but the inline `width: 120px` remains fixed, breaking aspect ratio.

The CSS `w-auto` class doesn't override the inline style because inline styles have higher specificity.

## Solution

Add `style={{ width: 'auto', height: 'auto' }}` to both Image components. This:
1. Removes Next.js inline dimension enforcement
2. Allows CSS classes to fully control sizing
3. Maintains aspect ratio via `object-contain`

## Implementation

### Step 1: Update light mode Image (lines 54-64)

```tsx
<Image
  src={cred.logo}
  alt={cred.name}
  width={120}
  height={32}
  style={{ width: 'auto', height: 'auto' }}
  className={cn(
    "h-6 md:h-8 w-auto object-contain",
    cred.logoDark ? "dark:hidden" : "",
    cred.className
  )}
/>
```

### Step 2: Update dark mode Image (lines 67-76)

```tsx
<Image
  src={cred.logoDark}
  alt={cred.name}
  width={120}
  height={32}
  style={{ width: 'auto', height: 'auto' }}
  className={cn(
    "h-6 md:h-8 w-auto object-contain hidden dark:block",
    cred.className
  )}
/>
```

## Why Keep width/height Props?

The `width` and `height` props are still needed because:
1. Next.js uses them to calculate aspect ratio for layout shift prevention
2. They provide intrinsic size hints for the browser
3. Required by Next.js Image component (unless using `fill`)

## Testing

1. Run `pnpm dev`
2. Open browser console
3. Verify no image aspect ratio warnings appear
4. Visually confirm logos display correctly in both light/dark modes
5. Test responsive sizing (h-6 on mobile, h-8 on desktop)

## Files Changed

- `src/components/TeamCredentialsSection.tsx` (2 edits)
