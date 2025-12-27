# Sign-in Page and Waitlist Flow Implementation Plan

## Overview

Change the authentication flow to use dedicated pages instead of modals, remove sign-up functionality entirely, and create a proper waitlist page flow where users are redirected back to home after submission.

## Current State Analysis

| Component | Current Behavior | File |
|-----------|------------------|------|
| Header Login | Opens Clerk modal | `src/components/layout/header/Header.tsx:59` |
| Sign-up page | Exists with Clerk SignUp | `src/app/sign-up/[[...sign-up]]/page.tsx` |
| Hero CTA | Links to `/sign-up` | `src/components/sections/hero/Hero.tsx:38` |
| SecondaryCTA | Links to `/sign-up` | `src/components/sections/secondary-cta/SecondaryCTA.tsx:21,58` |
| proxy.ts | `/sign-up(.*)` is public | `src/proxy.ts:6` |
| .env.example | Has sign-up URL vars | `.env.example:5,7` |

## Desired End State

1. **Login button** → Navigates to `/sign-in` page (not modal)
2. **"Join the Waitlist" buttons** → Navigate to `/waitlist` page
3. **Waitlist page** → Form submission → Redirect to home with success message
4. **No sign-up functionality** → Page deleted, routes cleaned up

## What We're NOT Doing

- Not changing the Clerk sign-in page styling (already done)
- Not modifying the waitlist API endpoint (already works)
- Not changing the WaitlistForm component logic (just adding redirect)

---

## Phase 1: Change Header Login to Page Redirect

### Overview
Change the login button from opening a Clerk modal to navigating to the `/sign-in` page.

### Changes Required:

#### 1. Update Header Component
**File**: `src/components/layout/header/Header.tsx`
**Changes**: Replace `SignInButton mode="modal"` with a Link to `/sign-in`

```tsx
// Change from:
<SignedOut>
  <SignInButton mode="modal">
    <Button variant="secondary" size="default">
      Login
    </Button>
  </SignInButton>
</SignedOut>

// Change to:
<SignedOut>
  <Link href="/sign-in">
    <Button variant="secondary" size="default">
      Login
    </Button>
  </Link>
</SignedOut>
```

Also remove the unused `SignInButton` import.

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `pnpm build`
- [ ] No TypeScript errors: `pnpm tsc --noEmit`

#### Manual Verification:
- [ ] Login button navigates to `/sign-in` page
- [ ] Sign-in page displays correctly with brand styling

---

## Phase 2: Remove Sign-up Functionality

### Overview
Delete the sign-up page and clean up related configuration.

### Changes Required:

#### 1. Delete Sign-up Page
**Action**: Delete the entire directory `src/app/sign-up/`

#### 2. Update proxy.ts
**File**: `src/proxy.ts`
**Changes**: Remove `/sign-up(.*)` from public routes, add `/waitlist`

```typescript
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/waitlist",
  "/api/waitlist(.*)",
]);
```

#### 3. Update .env.example
**File**: `.env.example`
**Changes**: Remove sign-up related environment variables

```env
# Clerk Authentication (get from clerk.com dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard

# Supabase (get from supabase.com project settings > API)
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Resend (get from resend.com dashboard)
RESEND_API_KEY=YOUR_RESEND_API_KEY
```

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `pnpm build`
- [ ] `/sign-up` route no longer exists in build output

#### Manual Verification:
- [ ] Navigating to `/sign-up` shows 404

---

## Phase 3: Create Waitlist Page and Update CTAs

### Overview
Create a dedicated `/waitlist` page and update all "Join the Waitlist" buttons to link there. The form redirects back to home on successful submission.

### Changes Required:

#### 1. Create Waitlist Page
**File**: `src/app/waitlist/page.tsx` (new file)

```tsx
import { WaitlistForm } from "@/components/WaitlistForm";
import Link from "next/link";

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-black dark:text-white md:text-3xl">
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
          className="mt-6 inline-block text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
```

#### 2. Update WaitlistForm to Redirect on Success
**File**: `src/components/WaitlistForm.tsx`
**Changes**: Add redirect to home after successful submission with a brief delay to show success message

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { cn } from "@/lib/utils";

export function WaitlistForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
        setName("");
        // Redirect to home after showing success message
        setTimeout(() => {
          router.push("/?waitlist=success");
        }, 1500);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to submit. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="waitlist-name">Name (optional)</Label>
        <Input
          id="waitlist-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading" || status === "success"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="waitlist-email">Email</Label>
        <Input
          id="waitlist-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading" || status === "success"}
        />
      </div>

      <Button
        type="submit"
        variant="solid"
        size="lg"
        className="w-full"
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading" ? "Joining..." : status === "success" ? "Redirecting..." : "Join the Waitlist"}
      </Button>

      {message && (
        <p
          className={cn(
            "text-sm text-center",
            status === "success" ? "text-emerald-500" : "text-rose-500"
          )}
        >
          {message}
        </p>
      )}
    </form>
  );
}
```

#### 3. Update Hero CTA
**File**: `src/components/sections/hero/Hero.tsx`
**Changes**: Change link from `/sign-up` to `/waitlist`

```tsx
// Change from:
<Link href="/sign-up">

// Change to:
<Link href="/waitlist">
```

#### 4. Update SecondaryCTA
**File**: `src/components/sections/secondary-cta/SecondaryCTA.tsx`
**Changes**: Change both link instances from `/sign-up` to `/waitlist`

```tsx
// Change both instances from:
<Link href="/sign-up">

// Change to:
<Link href="/waitlist">
```

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `pnpm build`
- [ ] `/waitlist` route exists in build output

#### Manual Verification:
- [ ] "Join the Waitlist" buttons navigate to `/waitlist` page
- [ ] Waitlist page displays correctly with brand styling
- [ ] Form submission works and shows success message
- [ ] After success, user is redirected to home page
- [ ] "Back to home" link works

---

## Testing Strategy

### Manual Testing Steps:
1. Click "Login" in header → should go to `/sign-in` page
2. Click "Join the Waitlist" in Hero → should go to `/waitlist` page
3. Click "Join the Waitlist" in SecondaryCTA → should go to `/waitlist` page
4. On waitlist page, submit valid email → should show success and redirect to home
5. Navigate to `/sign-up` → should show 404
6. Complete sign-in flow → should redirect to dashboard

## Files Changed Summary

| Action | File |
|--------|------|
| Modify | `src/components/layout/header/Header.tsx` |
| Delete | `src/app/sign-up/[[...sign-up]]/page.tsx` |
| Modify | `src/proxy.ts` |
| Modify | `.env.example` |
| Create | `src/app/waitlist/page.tsx` |
| Modify | `src/components/WaitlistForm.tsx` |
| Modify | `src/components/sections/hero/Hero.tsx` |
| Modify | `src/components/sections/secondary-cta/SecondaryCTA.tsx` |
