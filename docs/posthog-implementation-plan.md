# PostHog Analytics Implementation Plan

## Overview

Add PostHog analytics to Entourage Web to track user behavior on the marketing landing page. This enables data-driven optimization of the conversion funnel from landing page visit to waitlist signup.

## Current State

- **Analytics**: None configured
- **Framework**: Next.js 16 with App Router
- **Auth**: Clerk (for user identification)
- **Key pages**: Home, Waitlist, Careers, Sign-in, Dashboard

## Desired End State

PostHog fully integrated with:
- Automatic pageview and pageleave tracking
- Custom events for key user interactions
- User identification via Clerk
- Session recordings enabled
- Web vitals captured

## What We're NOT Doing

- Server-side analytics (not needed for marketing site)
- Feature flags (can add later)
- A/B testing setup (can add later)
- Custom dashboards (use PostHog defaults)

---

## Phase 1: Core PostHog Setup

### 1.1 Install Dependencies

```bash
pnpm add posthog-js
```

### 1.2 Environment Variables

Add to `.env.local`:
```
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Add to `.env.example` (for documentation):
```
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 1.3 Create PostHog Provider

**File**: `src/providers/PostHogProvider.tsx`

```tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, type ReactNode } from "react";

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        defaults: "2025-11-30", // Latest defaults with auto pageview/pageleave
        capture_pageview: "history_change", // Auto-capture on route changes
        capture_pageleave: true, // Track time on page and scroll depth
        autocapture: true, // Capture clicks, inputs, etc.
        persistence: "localStorage+cookie",
        // Respect user privacy
        respect_dnt: true,
        // Session recording (optional - can enable later)
        disable_session_recording: false,
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
```

### 1.4 Update Providers Barrel Export

**File**: `src/providers/index.ts`

```ts
export { ThemeProvider, useTheme } from "./ThemeProvider";
export { PostHogProvider } from "./PostHogProvider";
```

### 1.5 Add Provider to Root Layout

**File**: `src/app/layout.tsx`

Update imports:
```tsx
import { ThemeProvider, PostHogProvider } from "@/providers";
```

Update body:
```tsx
<body className={`${switzer.variable} ${geistMono.variable} antialiased`}>
  <PostHogProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </PostHogProvider>
</body>
```

### Success Criteria - Phase 1 ✅ COMPLETED

#### Automated Verification:
- [x] Build passes: `pnpm build`
- [x] No TypeScript errors: `pnpm typecheck`
- [ ] Lint passes: `pnpm lint`

#### Manual Verification:
- [ ] Visit site in browser, check Network tab for PostHog requests
- [ ] Verify pageview event in PostHog dashboard
- [ ] Navigate between pages, confirm route change tracking

---

## Phase 2: User Identification (Clerk Integration)

### 2.1 Create User Identification Hook

**File**: `src/hooks/usePostHogIdentify.ts`

```tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export function usePostHogIdentify() {
  const { user, isLoaded } = useUser();
  const posthog = usePostHog();

  useEffect(() => {
    if (!isLoaded || !posthog) return;

    if (user) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        created_at: user.createdAt,
      });
    } else {
      posthog.reset();
    }
  }, [user, isLoaded, posthog]);
}
```

### 2.2 Create Hooks Barrel Export

**File**: `src/hooks/index.ts`

```ts
export { usePostHogIdentify } from "./usePostHogIdentify";
```

### 2.3 Add Identification to PostHog Provider

Update `src/providers/PostHogProvider.tsx` to include:

```tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, type ReactNode } from "react";
import { usePostHogIdentify } from "@/hooks";

// ... existing init code ...

function PostHogIdentifier() {
  usePostHogIdentify();
  return null;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  // ... existing useEffect ...

  return (
    <PHProvider client={posthog}>
      <PostHogIdentifier />
      {children}
    </PHProvider>
  );
}
```

### Success Criteria - Phase 2 ✅ COMPLETED

#### Automated Verification:
- [x] Build passes: `pnpm build`
- [x] No TypeScript errors: `pnpm typecheck`

#### Manual Verification:
- [ ] Sign in with Clerk
- [ ] Verify user appears identified in PostHog with email
- [ ] Sign out and verify posthog.reset() called

---

## Phase 3: Custom Event Tracking

### 3.1 Create Analytics Utility

**File**: `src/lib/analytics.ts`

```ts
import posthog from "posthog-js";

// Type-safe event tracking
export const analytics = {
  // CTA Clicks
  ctaClicked: (location: "hero" | "secondary_cta" | "header") => {
    posthog.capture("cta_clicked", { location });
  },

  // Waitlist Form
  waitlistFormStarted: () => {
    posthog.capture("waitlist_form_started");
  },
  waitlistFormSubmitted: (hasCompany: boolean) => {
    posthog.capture("waitlist_form_submitted", { has_company: hasCompany });
  },
  waitlistFormSuccess: () => {
    posthog.capture("waitlist_form_success");
  },
  waitlistFormError: (error: string) => {
    posthog.capture("waitlist_form_error", { error });
  },

  // FAQ Interactions
  faqOpened: (question: string) => {
    posthog.capture("faq_opened", { question });
  },

  // Theme
  themeToggled: (newTheme: "light" | "dark") => {
    posthog.capture("theme_toggled", { theme: newTheme });
  },

  // External Links
  externalLinkClicked: (destination: string) => {
    posthog.capture("external_link_clicked", { destination });
  },

  // Sign In
  signInStarted: () => {
    posthog.capture("sign_in_started");
  },
  signInSuccess: () => {
    posthog.capture("sign_in_success");
  },
  signInError: (error: string) => {
    posthog.capture("sign_in_error", { error });
  },
};
```

### 3.2 Add Tracking to Hero CTA

**File**: `src/components/sections/hero/Hero.tsx`

```tsx
import { analytics } from "@/lib/analytics";

// In the button onClick or as Link wrapper:
<Link
  href="/waitlist"
  onClick={() => analytics.ctaClicked("hero")}
>
  Join waitlist
</Link>
```

### 3.3 Add Tracking to Secondary CTA

**File**: `src/components/sections/secondary-cta/SecondaryCTA.tsx`

```tsx
import { analytics } from "@/lib/analytics";

<Link
  href="/waitlist"
  onClick={() => analytics.ctaClicked("secondary_cta")}
>
  Join waitlist
</Link>
```

### 3.4 Add Tracking to WaitlistForm

**File**: `src/components/WaitlistForm.tsx`

```tsx
import { analytics } from "@/lib/analytics";

// On first input focus:
onFocus={() => {
  if (!formStarted) {
    analytics.waitlistFormStarted();
    setFormStarted(true);
  }
}}

// On submit:
analytics.waitlistFormSubmitted(!!company);

// On success:
analytics.waitlistFormSuccess();

// On error:
analytics.waitlistFormError(error.message);
```

### 3.5 Add Tracking to FAQ

**File**: `src/components/sections/faq/FAQ.tsx`

```tsx
import { analytics } from "@/lib/analytics";

// In Accordion onValueChange:
onValueChange={(value) => {
  if (value) {
    const question = faqItems.find(item => item.id === value)?.question;
    if (question) analytics.faqOpened(question);
  }
}}
```

### 3.6 Add Tracking to Theme Toggle

**File**: `src/components/ThemeToggle.tsx`

```tsx
import { analytics } from "@/lib/analytics";

const handleToggle = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  toggleTheme();
  analytics.themeToggled(newTheme);
};
```

### 3.7 Add Tracking to Footer External Links

**File**: `src/components/layout/footer/Footer.tsx`

```tsx
import { analytics } from "@/lib/analytics";

<a
  href="https://x.com"
  onClick={() => analytics.externalLinkClicked("twitter")}
>
  Twitter
</a>
```

### Success Criteria - Phase 3 ✅ COMPLETED

#### Automated Verification:
- [x] Build passes: `pnpm build`
- [x] No TypeScript errors: `pnpm typecheck`

#### Manual Verification:
- [ ] Click Hero CTA, verify `cta_clicked` event with `location: hero`
- [ ] Click Secondary CTA, verify event with `location: secondary_cta`
- [ ] Start filling waitlist form, verify `waitlist_form_started`
- [ ] Submit waitlist form, verify `waitlist_form_submitted`
- [ ] Open FAQ item, verify `faq_opened` with question text
- [ ] Toggle theme, verify `theme_toggled` event
- [ ] Click external link, verify `external_link_clicked`

---

## Event Reference

| Event Name | Properties | Trigger |
|------------|------------|---------|
| `$pageview` | (auto) | Page load/route change |
| `$pageleave` | (auto) | Page exit |
| `$autocapture` | (auto) | Clicks, inputs |
| `cta_clicked` | `location` | CTA button click |
| `waitlist_form_started` | - | First form input focus |
| `waitlist_form_submitted` | `has_company` | Form submission |
| `waitlist_form_success` | - | Successful signup |
| `waitlist_form_error` | `error` | Signup failure |
| `faq_opened` | `question` | FAQ accordion open |
| `theme_toggled` | `theme` | Theme switch |
| `external_link_clicked` | `destination` | External link click |
| `sign_in_started` | - | Sign in form focus |
| `sign_in_success` | - | Successful auth |
| `sign_in_error` | `error` | Auth failure |

---

## Key Metrics to Track in PostHog

1. **Conversion Funnel**: Pageview → CTA Click → Form Start → Form Submit → Success
2. **Time to Convert**: Time from first visit to waitlist signup
3. **FAQ Engagement**: Which questions are most viewed
4. **Theme Preference**: Light vs Dark mode usage
5. **Traffic Sources**: UTM parameters (auto-captured)

---

## References

- [PostHog Next.js Docs](https://posthog.com/docs/libraries/next-js)
- [PostHog React Hooks](https://posthog.com/docs/libraries/react)
