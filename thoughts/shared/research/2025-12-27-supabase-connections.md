---
date: 2025-12-27T12:00:00-08:00
researcher: Claude
git_commit: 4904e04d824a9b8214f17c372f7a6f66d4283c48
branch: main
repository: entourage-web
topic: "Supabase Connections in Codebase"
tags: [research, codebase, supabase, database, api, waitlist]
status: complete
last_updated: 2025-12-27
last_updated_by: Claude
---

# Research: Supabase Connections in Codebase

**Date**: 2025-12-27T12:00:00-08:00
**Researcher**: Claude
**Git Commit**: 4904e04d824a9b8214f17c372f7a6f66d4283c48
**Branch**: main
**Repository**: entourage-web

## Research Question
Find all Supabase connections in the codebase - the user hasn't updated Supabase at all.

## Summary

The codebase has a complete Supabase integration for a **waitlist feature**. There are 4 implementation files, 2 packages installed, and 2 environment variables required. The integration uses the `@supabase/ssr` pattern for Next.js with separate client/server factories.

### Quick Reference

| Category | Count | Details |
|----------|-------|---------|
| Implementation files | 4 | 2 client factories + 1 API route + 1 env example |
| NPM packages | 2 | `@supabase/ssr` + `@supabase/supabase-js` |
| Environment variables | 2 | URL + anon key (both public) |
| Database tables used | 1 | `waitlist` |
| API endpoints | 1 | `POST /api/waitlist` |

## Detailed Findings

### 1. Package Dependencies

**File**: `package.json:16-17`

```json
"@supabase/ssr": "^0.8.0",
"@supabase/supabase-js": "^2.89.0"
```

- `@supabase/ssr` - Server-side rendering support for Next.js (handles cookies)
- `@supabase/supabase-js` - Core Supabase JavaScript client

### 2. Client-Side Supabase Client

**File**: `src/lib/supabase/client.ts` (8 lines)

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Purpose**: Factory function for browser-side Supabase operations (Client Components)

**Key aspects**:
- Uses `createBrowserClient` from `@supabase/ssr`
- Requires two public environment variables
- Simple synchronous factory function
- No cookie handling needed on client side

### 3. Server-Side Supabase Client

**File**: `src/lib/supabase/server.ts` (29 lines)

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
```

**Purpose**: Factory function for server-side Supabase operations (Server Components, Route Handlers)

**Key aspects**:
- Uses `createServerClient` from `@supabase/ssr`
- **Async function** - must be awaited
- Implements cookie handlers for session management
- Error handling for Server Component edge case (setAll may fail in RSC)
- Same environment variables as client-side

### 4. Waitlist API Route

**File**: `src/app/api/waitlist/route.ts` (90 lines)

This is the **only active usage** of Supabase in the codebase.

```typescript
import { createClient } from "@/lib/supabase/server";

// ... inside POST handler:
const supabase = await createClient();
const { error: dbError } = await supabase
  .from("waitlist")
  .insert([{
    email: email.trim().toLowerCase(),
    name: name?.trim() || null,
    company: company?.trim() || null
  }]);
```

**Purpose**: Saves waitlist signups to Supabase database

**Database operation**:
- Table: `waitlist`
- Operation: `INSERT`
- Fields: `email` (required), `name` (optional), `company` (optional)

**Error handling**:
- Code `23505` = unique constraint violation (already on waitlist)
- Returns 200 for duplicates with friendly message
- Returns 500 for other database errors

### 5. Environment Variables

**File**: `.env.example:7-9`

```bash
# Supabase (get from supabase.com project settings > API)
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Both variables are prefixed with `NEXT_PUBLIC_` meaning they are:
- Accessible in browser JavaScript
- Safe to expose (anon key has RLS protections)
- Required for both client and server clients

## Code References

| File | Lines | Description |
|------|-------|-------------|
| `src/lib/supabase/client.ts` | 1-8 | Browser client factory |
| `src/lib/supabase/server.ts` | 1-29 | Server client factory with cookie handling |
| `src/app/api/waitlist/route.ts` | 1, 33-51 | Import and Supabase insert operation |
| `package.json` | 16-17 | Supabase package dependencies |
| `.env.example` | 7-9 | Required environment variables |

## Architecture Documentation

### File Structure

```
src/lib/supabase/
├── client.ts    # Browser client (for Client Components)
└── server.ts    # Server client (for Server Components & API routes)
```

### Usage Pattern

1. **Server-side operations** (recommended): Use `createClient()` from `@/lib/supabase/server`
2. **Client-side operations**: Use `createClient()` from `@/lib/supabase/client`

### Database Schema (Inferred)

Based on the code, the `waitlist` table has:

| Column | Type | Constraints |
|--------|------|-------------|
| email | text/varchar | NOT NULL, UNIQUE |
| name | text/varchar | NULLABLE |
| company | text/varchar | NULLABLE |

The unique constraint on `email` is confirmed by error code `23505` handling.

## Historical Context (from thoughts/)

Related planning and research documents:

- `thoughts/shared/plans/2025-12-27-clerk-supabase-resend-integration.md` - Integration plan for Clerk, Supabase, and Resend
- `thoughts/shared/plans/2025-12-27-signin-page-and-waitlist-flow.md` - Sign-in page and waitlist flow documentation
- `thoughts/shared/research/2025-12-27-clerk-supabase-resend-integration.md` - Research on integration approach

These documents indicate the waitlist/Supabase integration is part of a larger authentication flow being developed.

## What Exists vs What's Missing

### Currently Implemented
- Client/server Supabase client factories
- Waitlist table insert operation
- Error handling for duplicates
- Environment variable configuration

### Not Present in Codebase
- No Supabase Auth usage (Clerk is used for auth instead)
- No database queries (SELECT, UPDATE, DELETE)
- No RLS policies in code (would be in Supabase dashboard)
- No Supabase middleware
- No Supabase realtime subscriptions
- No Supabase storage usage
- No TypeScript types generated from Supabase

## Open Questions

1. Does the `waitlist` table exist in the Supabase project?
2. Are RLS policies configured for the waitlist table?
3. Is the Supabase project connected and credentials set in `.env`?
