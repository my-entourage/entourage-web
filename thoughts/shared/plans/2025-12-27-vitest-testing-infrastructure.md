# Vitest Testing Infrastructure Implementation Plan

## Overview

Add comprehensive testing infrastructure to entourage-web using Vitest for unit/component tests and Playwright for E2E tests. This covers all testable components from utilities to API routes to full user flows.

## Current State Analysis

- **Framework**: Next.js 16 with React 19, TypeScript
- **Testing**: None - no test files, config, or dependencies exist
- **Key testable units**:
  - API route: `src/app/api/waitlist/route.ts` (validation, Supabase, Resend)
  - Form: `src/components/WaitlistForm.tsx` (state, API integration)
  - Utility: `src/lib/utils.ts` (`cn()` function)
  - Provider: `src/providers/ThemeProvider.tsx` (localStorage, SSR)
  - UI components: Button, InfiniteSlider, Accordion wrappers

## Desired End State

A fully configured testing environment where:
1. `pnpm test` runs all unit and component tests via Vitest
2. `pnpm test:e2e` runs E2E tests via Playwright
3. Tests follow Next.js 16 best practices for folder structure
4. Mocks exist for external services (Supabase, Resend, Next.js navigation)
5. Coverage reports are generated on demand

### Verification:
- All test commands execute without errors
- Tests pass for all critical components
- CI can run tests headlessly

## Test Folder Structure (Next.js 16 Best Practice)

Based on Next.js official docs and community consensus (2025):

```
entourage-web/
├── src/
│   ├── components/
│   │   ├── WaitlistForm.tsx
│   │   ├── WaitlistForm.test.tsx      # ✅ Co-located component test
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Button.test.tsx        # ✅ Co-located unit test
│   ├── lib/
│   │   ├── utils.ts
│   │   └── utils.test.ts              # ✅ Co-located utility test
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeProvider.test.tsx     # ✅ Co-located
│   └── test/                          # Test utilities
│       ├── setup.ts                   # Global test setup (jsdom)
│       └── test-utils.tsx             # Custom render, providers
├── tests/                             # ⚠️ Separate for Node-env tests
│   ├── setup.ts                       # API test setup (node)
│   └── api/
│       └── waitlist.test.ts           # API route tests (Node env)
├── e2e/                               # ✅ Always separate
│   ├── homepage.spec.ts
│   └── waitlist.spec.ts
├── vitest.config.ts                   # Vitest workspace config
└── playwright.config.ts
```

**Key decisions:**
- **Unit/Component tests**: Co-located (`*.test.tsx` next to source)
- **API route tests**: Separate `tests/api/` directory with **Node environment** (not jsdom)
- **E2E tests**: Separate `e2e/` directory (Playwright)

**Why separate API tests?**
> "If you're using vitest with jsdom, note that you should NOT use a dom-like environment to test your API handlers." — next-test-api-route-handler docs

**Why co-located unit tests?**
> "Colocation lowers the friction to write and maintain tests. It makes it clear what is tested and what is not." — React community consensus

## What We're NOT Doing

- Visual regression testing (Chromatic, Percy)
- Snapshot testing (fragile, low value)
- Testing pure ShadCN primitives in `components/ui/` (they're third-party)
- 100% coverage targets (focus on critical paths)
- Unit testing async Server Components (use E2E instead per Next.js docs)

## Implementation Approach

Hybrid test structure with Vitest workspace for multiple environments. Co-located tests for components, separate directory for API routes (Node env), and Playwright for E2E.

---

## Phase 1: Vitest Core Setup

### Overview
Install Vitest and configure it for Next.js 16 with React 19, TypeScript path aliases, and **dual environments** (jsdom for components, node for API routes).

### Changes Required:

#### 1. Install Dependencies

```bash
pnpm add -D vitest @vitejs/plugin-react vite-tsconfig-paths jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
```

Note: `vite-tsconfig-paths` automatically resolves `@/*` path aliases from tsconfig.json.

#### 2. Create Vitest Config with Projects

**File**: `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // Projects configuration for multiple environments (Vitest 4+)
    projects: [
      {
        // Component & Unit tests (jsdom)
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["node_modules", ".next"],
          setupFiles: ["./src/test/setup.ts"],
        },
      },
      {
        // API route tests (node - NOT jsdom)
        extends: true,
        test: {
          name: "api",
          environment: "node",
          include: ["tests/**/*.test.{ts,tsx}"],
          exclude: ["node_modules", ".next"],
          setupFiles: ["./tests/setup.ts"],
        },
      },
    ],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules",
        ".next",
        "src/test",
        "tests",
        "e2e",
        "**/*.config.*",
        "src/components/ui/**", // ShadCN primitives - don't test
      ],
    },
  },
});
```

#### 3. Create Component Test Setup (jsdom)

**File**: `src/test/setup.ts`

```typescript
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock window.matchMedia for theme tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

#### 4. Create API Test Setup (node)

**File**: `tests/setup.ts`

```typescript
import { vi } from "vitest";

// API tests run in Node environment - no DOM mocks needed
// Add any API-specific setup here

// Example: Reset environment variables between tests
beforeEach(() => {
  vi.unstubAllEnvs();
});
```

#### 5. Add TypeScript Types

**File**: `src/test/vitest.d.ts`

```typescript
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
```

#### 6. Update package.json Scripts

Add to `package.json` scripts:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:unit": "vitest run --project unit",
    "test:api": "vitest run --project api",
    "test:coverage": "vitest run --coverage"
  }
}
```

#### 7. Update tsconfig.json

Add test types to `compilerOptions.types`:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

### Success Criteria:

#### Automated Verification:
- [x] `pnpm install` completes without errors
- [x] `pnpm test:run` executes (may show "no tests" initially)
- [x] `pnpm test:unit` runs only component tests
- [x] `pnpm test:api` runs only API tests
- [x] TypeScript recognizes `describe`, `it`, `expect` globals
- [x] `pnpm build` still works (no conflicts)

#### Manual Verification:
- [ ] IDE shows proper IntelliSense for test globals

---

## Phase 2: Testing Utilities and Mocks

### Overview
Create reusable test utilities and mocks for external services.

### Changes Required:

#### 1. Test Render Utility

**File**: `src/test/test-utils.tsx`

```typescript
import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/providers/ThemeProvider";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  theme?: "light" | "dark";
}

function AllProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
export { default as userEvent } from "@testing-library/user-event";
```

#### 2. Supabase Mock

**File**: `src/test/mocks/supabase.ts`

```typescript
import { vi } from "vitest";

export const mockSupabaseInsert = vi.fn();
export const mockSupabaseFrom = vi.fn(() => ({
  insert: mockSupabaseInsert,
}));

export const mockCreateClient = vi.fn(() => ({
  from: mockSupabaseFrom,
}));

// Reset all mocks
export function resetSupabaseMocks() {
  mockSupabaseInsert.mockReset();
  mockSupabaseFrom.mockReset();
  mockCreateClient.mockReset();

  // Re-establish chain
  mockSupabaseFrom.mockReturnValue({ insert: mockSupabaseInsert });
  mockCreateClient.mockResolvedValue({ from: mockSupabaseFrom });
}

vi.mock("@/lib/supabase/server", () => ({
  createClient: mockCreateClient,
}));
```

#### 3. Resend Mock

**File**: `src/test/mocks/resend.ts`

```typescript
import { vi } from "vitest";

export const mockResendSend = vi.fn();

export const MockResend = vi.fn().mockImplementation(() => ({
  emails: {
    send: mockResendSend,
  },
}));

export function resetResendMocks() {
  mockResendSend.mockReset();
  MockResend.mockClear();
}

vi.mock("resend", () => ({
  Resend: MockResend,
}));
```

#### 4. Fetch Mock Helper

**File**: `src/test/mocks/fetch.ts`

```typescript
import { vi } from "vitest";

export function mockFetch(response: unknown, options?: { ok?: boolean; status?: number }) {
  const mockResponse = {
    ok: options?.ok ?? true,
    status: options?.status ?? 200,
    json: vi.fn().mockResolvedValue(response),
  };

  global.fetch = vi.fn().mockResolvedValue(mockResponse);
  return global.fetch as ReturnType<typeof vi.fn>;
}

export function resetFetchMock() {
  vi.restoreAllMocks();
}
```

### Success Criteria:

#### Automated Verification:
- [x] `pnpm test:run` still executes without import errors
- [x] TypeScript compiles test utilities without errors

---

## Phase 3: Unit Tests - Utilities

### Overview
Test the `cn()` utility function and any pure functions.

### Changes Required:

#### 1. cn() Utility Tests

**File**: `src/lib/utils.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes with clsx syntax", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("handles undefined and null values", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });

  it("handles arrays", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("merges conflicting Tailwind classes (last wins)", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles semantic color classes", () => {
    expect(cn("bg-white", "bg-background")).toBe("bg-background");
    expect(cn("text-black", "text-foreground")).toBe("text-foreground");
    expect(cn("border-gray-200", "border-border")).toBe("border-border");
  });

  it("preserves non-conflicting classes", () => {
    expect(cn("p-4", "m-4", "text-lg")).toBe("p-4 m-4 text-lg");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });
});
```

### Success Criteria:

#### Automated Verification:
- [x] `pnpm test:run src/lib/utils.test.ts` passes all tests
- [x] Tests cover edge cases (undefined, null, arrays, conflicts)

---

## Phase 4: Component Tests - ThemeProvider

### Overview
Test theme context, localStorage persistence, and SSR behavior.

### Changes Required:

#### 1. ThemeProvider Tests

**File**: `src/providers/ThemeProvider.test.tsx`

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "./ThemeProvider";

// Test component that exposes theme context
function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("defaults to light theme", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme")).toHaveTextContent("light");
    });
  });

  it("loads saved theme from localStorage", async () => {
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    });
  });

  it("toggles theme and persists to localStorage", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme")).toHaveTextContent("light");
    });

    await user.click(screen.getByText("Toggle"));

    await waitFor(() => {
      expect(screen.getByTestId("theme")).toHaveTextContent("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
    });
  });

  it("applies dark class to document element", async () => {
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });
});

describe("useTheme hook", () => {
  it("returns default values outside of provider", () => {
    function Standalone() {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <button onClick={toggleTheme}>Toggle</button>
        </div>
      );
    }

    render(<Standalone />);
    expect(screen.getByTestId("theme")).toHaveTextContent("light");

    // toggleTheme should be a no-op, not throw
    expect(() => screen.getByText("Toggle").click()).not.toThrow();
  });
});
```

### Success Criteria:

#### Automated Verification:
- [x] `pnpm test:run src/providers/ThemeProvider.test.tsx` passes
- [x] Tests cover localStorage, toggle, and SSR fallback

---

## Phase 5: Component Tests - WaitlistForm

### Overview
Test form interactions, API calls, and state transitions.

### Changes Required:

#### 1. WaitlistForm Tests

**File**: `src/components/WaitlistForm.test.tsx`

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { WaitlistForm } from "./WaitlistForm";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("WaitlistForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("renders all form fields", () => {
    render(<WaitlistForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /join the waitlist/i })).toBeInTheDocument();
  });

  it("submits form with email only", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Successfully joined!" }),
    });
    global.fetch = mockFetch;

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com", name: undefined, company: undefined }),
      });
    });
  });

  it("submits form with all fields", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Successfully joined!" }),
    });
    global.fetch = mockFetch;

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/company/i), "Acme Inc");
    await user.type(screen.getByLabelText(/email/i), "john@acme.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "john@acme.com", name: "John Doe", company: "Acme Inc" }),
      });
    });
  });

  it("shows loading state during submission", async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: unknown) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    global.fetch = vi.fn().mockReturnValue(pendingPromise);

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    expect(screen.getByRole("button")).toHaveTextContent(/joining/i);
    expect(screen.getByLabelText(/email/i)).toBeDisabled();

    // Resolve to cleanup
    resolvePromise!({ ok: true, json: () => Promise.resolve({ message: "Success" }) });
  });

  it("shows success message and redirects", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Successfully joined the waitlist!" }),
    });

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/successfully joined/i)).toBeInTheDocument();
    });

    // Fast-forward past redirect delay
    vi.advanceTimersByTime(1500);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/?waitlist=success");
    });

    vi.useRealTimers();
  });

  it("shows error message on API failure", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Invalid email format" }),
    });

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email/i), "bad-email");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it("shows generic error on network failure", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to submit/i)).toBeInTheDocument();
    });
  });
});
```

### Success Criteria:

#### Automated Verification:
- [x] `pnpm test:run src/components/WaitlistForm.test.tsx` passes
- [x] Tests cover happy path, loading, success, and error states

---

## Phase 6: API Route Tests

### Overview
Test the waitlist API endpoint with mocked Supabase and Resend. These tests run in **Node environment** (not jsdom) and are located in the separate `tests/api/` directory.

### Changes Required:

#### 1. Waitlist API Tests

**File**: `tests/api/waitlist.test.ts`

> **Note**: API tests are in `tests/` directory (not co-located) because they require Node environment, not jsdom. This follows Next.js best practices for API route testing.

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";

// Mock modules before imports
const mockInsert = vi.fn();
const mockFrom = vi.fn(() => ({ insert: mockInsert }));
const mockCreateClient = vi.fn(() => Promise.resolve({ from: mockFrom }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: mockCreateClient,
}));

const mockEmailSend = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockEmailSend },
  })),
}));

// Import after mocks - use full path from tests/ directory
import { POST } from "@/app/api/waitlist/route";

function createRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/waitlist", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInsert.mockResolvedValue({ error: null });
    mockEmailSend.mockResolvedValue({ data: { id: "123" } });

    // Set env for Resend
    vi.stubEnv("RESEND_API_KEY", "test-api-key");
  });

  describe("validation", () => {
    it("returns 400 when email is missing", async () => {
      const req = createRequest({ name: "John" });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("Email is required");
    });

    it("returns 400 for invalid email format", async () => {
      const req = createRequest({ email: "not-an-email" });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("Invalid email format");
    });

    it("accepts valid email formats", async () => {
      const req = createRequest({ email: "user@example.com" });
      const res = await POST(req);

      expect(res.status).toBe(200);
    });
  });

  describe("database operations", () => {
    it("inserts normalized email to database", async () => {
      const req = createRequest({ email: "  USER@EXAMPLE.COM  " });
      await POST(req);

      expect(mockFrom).toHaveBeenCalledWith("waitlist");
      expect(mockInsert).toHaveBeenCalledWith([
        { email: "user@example.com", name: null, company: null },
      ]);
    });

    it("includes name and company when provided", async () => {
      const req = createRequest({
        email: "user@example.com",
        name: "  John Doe  ",
        company: "  Acme Inc  ",
      });
      await POST(req);

      expect(mockInsert).toHaveBeenCalledWith([
        { email: "user@example.com", name: "John Doe", company: "Acme Inc" },
      ]);
    });

    it("returns success message for duplicate email", async () => {
      mockInsert.mockResolvedValue({ error: { code: "23505" } });

      const req = createRequest({ email: "existing@example.com" });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.message).toBe("You are already on the waitlist!");
    });

    it("returns 500 for other database errors", async () => {
      mockInsert.mockResolvedValue({ error: { code: "XXXXX", message: "DB Error" } });

      const req = createRequest({ email: "user@example.com" });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Failed to join waitlist");
    });
  });

  describe("email notifications", () => {
    it("sends notification email on successful signup", async () => {
      const req = createRequest({
        email: "user@example.com",
        name: "John",
        company: "Acme",
      });
      await POST(req);

      expect(mockEmailSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: "Entourage <onboarding@resend.dev>",
          to: "iivo.angerpuro@gmail.com",
          subject: "New Waitlist Signup - Entourage",
        })
      );
    });

    it("succeeds even if email notification fails", async () => {
      mockEmailSend.mockRejectedValue(new Error("Email service down"));

      const req = createRequest({ email: "user@example.com" });
      const res = await POST(req);

      expect(res.status).toBe(200);
    });

    it("skips email when RESEND_API_KEY is not set", async () => {
      vi.stubEnv("RESEND_API_KEY", "");

      const req = createRequest({ email: "user@example.com" });
      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(mockEmailSend).not.toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("returns 500 for unexpected errors", async () => {
      mockCreateClient.mockRejectedValue(new Error("Unexpected"));

      const req = createRequest({ email: "user@example.com" });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Something went wrong");
    });
  });
});
```

### Success Criteria:

#### Automated Verification:
- [ ] `pnpm test:api` passes (runs only API tests in Node env)
- [ ] `pnpm test:run tests/api/waitlist.test.ts` passes
- [ ] Tests cover validation, DB operations, email, and errors

---

## Phase 7: Component Tests - UI Components

### Overview
Test Button variants and other UI components with logic.

### Changes Required:

#### 1. Button Tests

**File**: `src/components/ui/Button.test.tsx`

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-white");
  });

  it("renders solid variant", () => {
    render(<Button variant="solid">Solid</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-black");
    expect(button).toHaveClass("text-white");
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-transparent");
  });

  it("renders ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("border-transparent");
  });

  it("renders large size", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("px-8");
    expect(button).toHaveClass("py-4");
  });

  it("merges custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });

  it("forwards additional props", () => {
    render(<Button disabled data-testid="test-btn">Disabled</Button>);
    const button = screen.getByTestId("test-btn");

    expect(button).toBeDisabled();
  });
});
```

#### 2. ThemeToggle Tests

**File**: `src/components/ThemeToggle.test.tsx`

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "@/providers/ThemeProvider";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders toggle button", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("toggles theme on click", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    // After toggle, theme should be dark
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
```

### Success Criteria:

#### Automated Verification:
- [ ] `pnpm test:run src/components/ui/Button.test.tsx` passes
- [ ] `pnpm test:run src/components/ThemeToggle.test.tsx` passes

---

## Phase 8: E2E Tests with Playwright

### Overview
Set up Playwright for end-to-end testing of critical user flows.

### Changes Required:

#### 1. Install Playwright

```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium
```

#### 2. Playwright Config

**File**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

#### 3. E2E Test: Homepage

**File**: `e2e/homepage.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and displays hero section", async ({ page }) => {
    await page.goto("/");

    // Check hero content
    await expect(page.locator("h1")).toContainText(/know what needs to be done/i);

    // Check CTA button exists
    await expect(page.getByRole("link", { name: /join.*waitlist/i })).toBeVisible();
  });

  test("theme toggle works", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");

    // Initially light
    await expect(html).not.toHaveClass(/dark/);

    // Toggle theme
    await page.getByRole("button", { name: /toggle theme/i }).click();

    // Now dark
    await expect(html).toHaveClass(/dark/);
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");

    // Check header links
    await expect(page.getByRole("link", { name: /features/i })).toBeVisible();
  });
});
```

#### 4. E2E Test: Waitlist Flow

**File**: `e2e/waitlist.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Waitlist Flow", () => {
  test("navigates to waitlist page", async ({ page }) => {
    await page.goto("/");

    // Click CTA
    await page.getByRole("link", { name: /join.*waitlist/i }).first().click();

    // Should be on waitlist page
    await expect(page).toHaveURL(/\/waitlist/);
  });

  test("shows validation for empty email", async ({ page }) => {
    await page.goto("/waitlist");

    // Try to submit without email
    await page.getByRole("button", { name: /join the waitlist/i }).click();

    // HTML5 validation should prevent submission
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeFocused();
  });

  test("shows form fields correctly", async ({ page }) => {
    await page.goto("/waitlist");

    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/company/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /join the waitlist/i })).toBeVisible();
  });
});
```

#### 5. Update package.json Scripts

Add to `package.json` scripts:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

#### 6. Add E2E to .gitignore

Add to `.gitignore`:

```
# Playwright
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
```

### Success Criteria:

#### Automated Verification:
- [ ] `pnpm test:e2e` runs and passes
- [ ] Tests verify homepage loads
- [ ] Tests verify waitlist page navigation

#### Manual Verification:
- [ ] `pnpm test:e2e:ui` opens Playwright UI
- [ ] Can visually see tests running in browser

---

## Phase 9: CI Integration

### Overview
Add GitHub Actions workflow for running tests on PRs.

### Changes Required:

#### 1. GitHub Actions Workflow

**File**: `.github/workflows/test.yml`

```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm test:run

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps chromium

      - name: Run E2E tests
        run: pnpm test:e2e

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

### Success Criteria:

#### Automated Verification:
- [ ] Workflow file is valid YAML
- [ ] CI runs on push to main and PRs

#### Manual Verification:
- [ ] CI badge shows passing status
- [ ] Failed tests block PR merge

---

## Testing Strategy Summary

### Test Types & Locations

| Type | Location | Environment | Command |
|------|----------|-------------|---------|
| Unit (utils) | `src/**/*.test.ts` | jsdom | `pnpm test:unit` |
| Component | `src/**/*.test.tsx` | jsdom | `pnpm test:unit` |
| API Routes | `tests/api/*.test.ts` | **node** | `pnpm test:api` |
| E2E | `e2e/*.spec.ts` | browser | `pnpm test:e2e` |

### Unit Tests (Vitest - jsdom):
- `src/lib/utils.test.ts` - `cn()` utility, class merging edge cases
- Pure functions and utilities

### Component Tests (Vitest + RTL - jsdom):
- `src/providers/ThemeProvider.test.tsx` - localStorage, SSR, toggle
- `src/components/WaitlistForm.test.tsx` - form state, API calls, errors
- `src/components/ui/Button.test.tsx` - variant class application
- `src/components/ThemeToggle.test.tsx` - integration with provider

### API Route Tests (Vitest - node):
- `tests/api/waitlist.test.ts` - POST validation, DB, email, error handling

### E2E Tests (Playwright):
- `e2e/homepage.spec.ts` - load and navigation
- `e2e/waitlist.spec.ts` - waitlist flow

### Manual Testing:
- Cross-browser visual consistency
- Mobile responsiveness
- Real API integration (staging)

---

## References

- Next.js Testing Guide: https://nextjs.org/docs/app/guides/testing/vitest
- Vitest Workspace: https://vitest.dev/guide/workspace
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro
- Playwright: https://playwright.dev/
- Related source files:
  - `src/app/api/waitlist/route.ts:15-90` - API endpoint
  - `src/components/WaitlistForm.tsx:10-115` - Form component
  - `src/lib/utils.ts:44-46` - cn() utility
  - `src/providers/ThemeProvider.tsx:18-62` - Theme context
