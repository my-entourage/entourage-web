# Entourage Web

Marketing website for Entourage — an AI-powered task extraction platform that automatically identifies actionable items from meetings, chats, emails, and documents.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16 |
| UI | React | 19 |
| Styling | Tailwind CSS | 4 |
| Animation | Framer Motion | 12 |
| Auth | Clerk | 6 |
| Database | Supabase | - |
| Analytics | PostHog | - |
| Email | Resend | - |
| Testing | Vitest + Playwright | - |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── layout/       # Header, Footer
│   ├── sections/     # Page sections (Hero, FAQ, etc.)
│   ├── ui/           # ShadCN primitives
│   └── bento/        # Bento grid cards
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
├── providers/        # React Context providers
└── test/             # Test utilities
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests (watch mode) |
| `pnpm test:run` | Run all tests once |
| `pnpm test:e2e` | Run Playwright E2E tests |

## Documentation

- [Design System](docs/design-system.md) — Colors, typography, components
- [CLAUDE.md](CLAUDE.md) — AI assistant instructions

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Resend Email
RESEND_API_KEY=
```
