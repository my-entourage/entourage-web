---
date: 2025-12-27T12:00:00+02:00
researcher: Claude
git_commit: 78435af38a19e446ccd5f16392ef33af6ea01b2b
branch: main
repository: entourage-web
topic: "Clerk Auth, Supabase Waitlist, and Resend Email Integration"
tags: [research, authentication, clerk, supabase, resend, waitlist, shadcn]
status: complete
last_updated: 2025-12-27
last_updated_by: Claude
---

# Research: Clerk Auth, Supabase Waitlist, and Resend Email Integration

**Date**: 2025-12-27
**Researcher**: Claude
**Git Commit**: 78435af38a19e446ccd5f16392ef33af6ea01b2b
**Branch**: main
**Repository**: entourage-web

## Research Question

How to implement:
1. Clerk authentication as the signing provider with authenticated dashboard pages
2. Supabase for storing waitlist signups
3. Resend for sending email notifications to `iivo.angerpuro@gmail.com`
4. Using ShadCN UI components with wrapper pattern for brand consistency

## Summary

The Entourage codebase is a Next.js 16 marketing landing page with no authentication, backend, or forms currently implemented. The project uses a "Technical Blueprint" design system with sharp corners (rounded-none), monochrome palette, and signature Plus Corner elements.

**Current state:**
- Login button in Header links to non-existent `/sign-in`
- Waitlist CTA links to non-existent `/sign-up`
- Only ShadCN component installed: Accordion (with branded wrapper)
- No form inputs, no validation libraries, no backend integration

**Integration approach:**
- Clerk: Use ClerkProvider with custom appearance matching design system
- Supabase: Database-only for waitlist (no Supabase auth)
- Resend: Simple notification emails on waitlist signup
- ShadCN: Add Input, Label, Form components with branded wrappers

---

## Detailed Findings

### 1. Current Codebase State

#### Header Component (`src/components/layout/header/Header.tsx`)

The Header contains a login button that links to `/sign-in`:

```tsx
// Lines 52-56
<Link href="/sign-in">
  <Button variant="secondary" size="default">
    Login
  </Button>
</Link>
```

Button uses `secondary` variant: transparent bg, black/white border, rounded-none.

#### Hero CTA (`src/components/sections/hero/Hero.tsx`)

```tsx
// Lines 63-68
<Link href="/sign-up">
  <Button variant="solid" size="lg">
    Join the Waitlist
  </Button>
</Link>
```

Uses `solid` variant: black bg with white text (inverted in dark mode).

#### ShadCN Configuration (`components.json`)

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "ui": "@/components/ui"
  }
}
```

#### Existing Wrapper Pattern (`src/components/Accordion.tsx`)

The project uses a wrapper pattern for ShadCN components:

```tsx
export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <ShadcnAccordionItem
      className={cn(
        "rounded-none border border-zinc-200 dark:border-zinc-800 px-4",
        className
      )}
      {...props}
    />
  );
}
```

---

### 2. Clerk Authentication Integration

#### Installation

```bash
pnpm add @clerk/nextjs
```

#### Environment Variables (`.env.local`)

```env
# Clerk API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Auth Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Redirects after auth
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
```

#### Middleware (`middleware.ts`)

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/waitlist(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

#### Root Layout with Entourage Styling (`src/app/layout.tsx`)

```tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: 'clerk', // Required for Tailwind v4
        variables: {
          colorPrimary: '#10B981',      // Emerald accent
          colorDanger: '#F43F5E',       // Rose for errors
          colorSuccess: '#10B981',
          colorWarning: '#F59E0B',      // Amber
          borderRadius: '0rem',         // Sharp corners
          fontFamily: '"Switzer", -apple-system, sans-serif',
        },
        elements: {
          formButtonPrimary:
            'bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white rounded-none hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors',
          card:
            'bg-white dark:bg-black border border-black dark:border-white rounded-none shadow-none',
          headerTitle:
            'text-black dark:text-white font-semibold',
          headerSubtitle:
            'text-zinc-500 dark:text-zinc-400',
          formFieldInput:
            'rounded-none border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black',
          footerActionLink:
            'text-emerald-500 hover:text-emerald-600',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${switzer.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

**Note**: Update `globals.css` for Tailwind v4 CSS layers:
```css
@layer theme, base, clerk, components, utilities;
@import 'tailwindcss';
```

#### Sign-In Page (`src/app/sign-in/[[...sign-in]]/page.tsx`)

```tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-6">
      <SignIn />
    </div>
  )
}
```

#### Sign-Up Page (`src/app/sign-up/[[...sign-up]]/page.tsx`)

```tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-6">
      <SignUp />
    </div>
  )
}
```

#### Dashboard Page (`src/app/dashboard/page.tsx`)

```tsx
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-5xl px-6 md:px-12 py-16">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Dashboard
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          Welcome, {user?.firstName || 'User'}
        </p>
      </div>
    </div>
  )
}
```

#### Updated Header with Clerk (`src/components/layout/header/Header.tsx`)

```tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

// In the header JSX:
<div className="flex items-center gap-2">
  <ThemeToggle />
  <SignedOut>
    <SignInButton mode="modal">
      <Button variant="secondary" size="default">
        Login
      </Button>
    </SignInButton>
  </SignedOut>
  <SignedIn>
    <UserButton afterSignOutUrl="/" />
  </SignedIn>
</div>
```

---

### 3. Supabase Waitlist Integration

#### Installation

```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

#### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Database Schema (Supabase SQL Editor)

```sql
-- Create waitlist table
CREATE TABLE public.waitlist (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  name text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public waitlist)
CREATE POLICY "Allow anonymous inserts" ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

-- Prevent anonymous reads (admin only)
CREATE POLICY "Allow authenticated reads" ON public.waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

#### Supabase Client (`src/lib/supabase/client.ts`)

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### Server Client (`src/lib/supabase/server.ts`)

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

---

### 4. Resend Email Notifications

#### Installation

```bash
pnpm add resend
```

#### Environment Variables

```env
RESEND_API_KEY=re_...
```

#### Waitlist API Route (`src/app/api/waitlist/route.ts`)

```typescript
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Save to Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('waitlist')
      .insert([{ email: email.trim().toLowerCase(), name }])

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json(
          { message: 'You are already on the waitlist!' },
          { status: 200 }
        )
      }
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      )
    }

    // Send notification email
    const { error: emailError } = await resend.emails.send({
      from: 'Entourage <onboarding@resend.dev>', // Use your verified domain in production
      to: 'iivo.angerpuro@gmail.com',
      subject: 'New Waitlist Signup - Entourage',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px;">
          <h2 style="color: #000;">New Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
          <p><strong>Signed up:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    })

    if (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails - signup was successful
    }

    return NextResponse.json(
      { message: 'Successfully joined the waitlist!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

---

### 5. ShadCN UI Components for Forms

#### Installation

```bash
pnpm dlx shadcn@canary add input label form
```

This installs:
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/form.tsx`

Also adds dependencies: `react-hook-form`, `@hookform/resolvers`, `zod`

#### Input Wrapper (`src/components/Input.tsx`)

```tsx
import { Input as ShadcnInput } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

type InputProps = ComponentProps<typeof ShadcnInput>

export function Input({ className, ...props }: InputProps) {
  return (
    <ShadcnInput
      className={cn(
        "rounded-none",
        "border-zinc-300 dark:border-zinc-700",
        "bg-white dark:bg-black",
        "text-black dark:text-white",
        "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
        "focus:border-black dark:focus:border-white",
        "focus:ring-1 focus:ring-black dark:focus:ring-white",
        className
      )}
      {...props}
    />
  )
}
```

#### Label Wrapper (`src/components/Label.tsx`)

```tsx
import { Label as ShadcnLabel } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

type LabelProps = ComponentProps<typeof ShadcnLabel>

export function Label({ className, ...props }: LabelProps) {
  return (
    <ShadcnLabel
      className={cn(
        "text-sm font-medium",
        "text-black dark:text-white",
        className
      )}
      {...props}
    />
  )
}
```

#### Waitlist Form Component (`src/components/WaitlistForm.tsx`)

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus("success")
        setMessage(data.message)
        setEmail("")
        setName("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong")
      }
    } catch {
      setStatus("error")
      setMessage("Failed to submit. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        variant="solid"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Joining..." : "Join the Waitlist"}
      </Button>

      {message && (
        <p className={cn(
          "text-sm text-center",
          status === "success" ? "text-emerald-500" : "text-rose-500"
        )}>
          {message}
        </p>
      )}
    </form>
  )
}
```

---

## Code References

| File | Line | Description |
|------|------|-------------|
| `src/components/layout/header/Header.tsx` | 52-56 | Current login button implementation |
| `src/components/sections/hero/Hero.tsx` | 63-68 | Current waitlist CTA |
| `src/components/ui/Button.tsx` | 20-29 | Button variants (primary, solid, secondary, ghost) |
| `src/components/Accordion.tsx` | 1-61 | Example ShadCN wrapper pattern |
| `components.json` | 1-22 | ShadCN configuration |
| `src/app/layout.tsx` | 1-46 | Root layout (add ClerkProvider here) |

---

## Architecture Documentation

### File Structure After Implementation

```
src/
├── app/
│   ├── layout.tsx              # Add ClerkProvider
│   ├── page.tsx                # Landing page (unchanged)
│   ├── globals.css             # Add clerk CSS layer
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx        # Clerk SignIn component
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx        # Clerk SignUp component
│   ├── dashboard/
│   │   └── page.tsx            # Protected dashboard
│   └── api/
│       └── waitlist/
│           └── route.ts        # Waitlist API endpoint
├── components/
│   ├── ui/                     # ShadCN (DO NOT MODIFY)
│   │   ├── input.tsx           # Add via shadcn
│   │   ├── label.tsx           # Add via shadcn
│   │   └── form.tsx            # Add via shadcn
│   ├── Input.tsx               # Branded wrapper
│   ├── Label.tsx               # Branded wrapper
│   └── WaitlistForm.tsx        # Waitlist form component
├── lib/
│   ├── utils.ts                # Existing cn() utility
│   └── supabase/
│       ├── client.ts           # Browser client
│       └── server.ts           # Server client
└── middleware.ts               # Clerk route protection
```

### Environment Variables Summary

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend
RESEND_API_KEY=re_...
```

---

## Implementation Notes

### Brand Consistency Checklist

- [ ] All borders use `rounded-none`
- [ ] Colors follow monochrome base: black/white with zinc grays
- [ ] Accent colors: emerald (success), rose (error), amber (warning)
- [ ] Dark mode pairs for all elements (`dark:` variants)
- [ ] Typography uses Switzer for UI, Geist Mono for labels
- [ ] Focus states use black ring with offset

### ShadCN Wrapper Pattern

1. Install ShadCN component to `components/ui/`
2. Create wrapper in `components/` root
3. Apply brand styling via `cn()` className merge
4. Export wrapper for use throughout app

### Clerk Customization Strategy

Use `appearance` prop with:
- `cssLayerName: 'clerk'` for Tailwind v4 compatibility
- `variables` for theme-level styling (colors, fonts, radii)
- `elements` for fine-grained component styling with Tailwind classes

---

## External Resources

### Clerk
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [clerkMiddleware() Reference](https://clerk.com/docs/reference/nextjs/clerk-middleware)
- [Appearance Prop Documentation](https://clerk.com/docs/customization/overview)
- [Tailwind CSS v4 Support](https://clerk.com/changelog/2025-06-17-css-layer-name)

### Supabase
- [Supabase Next.js Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Waitlist Tutorial](https://tinloof.com/blog/how-to-build-a-waitlist-with-supabase-and-next-js)
- [DEV Community Waitlist Guide](https://dev.to/charanx/how-to-create-a-simple-waitlist-form-in-nextjs-using-supabase-to-collect-responses-4dpe)

### Resend
- [Resend + Next.js Guide](https://resend.com/docs/send-with-nextjs)
- [React Email Templates](https://react.email/templates)
- [Domain Verification](https://resend.com/docs/dashboard/domains/introduction)

---

## Open Questions

1. **Clerk vs Waitlist flow**: Should the waitlist form be a separate flow from Clerk sign-up? Current plan treats them separately.

2. **Domain verification**: Resend requires domain verification for production. The `onboarding@resend.dev` sender works for testing only.

3. **Supabase + Clerk integration**: If later you want Clerk users synced to Supabase, consider Clerk's Supabase integration via webhooks.

4. **Dashboard content**: The empty dashboard is a placeholder. What features should it display?
