import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { mockInsert, resetSupabaseMocks } from "../__mocks__/supabase-mocks";
import { mockEmailSend, resetResendMocks } from "../__mocks__/resend-mocks";

// Mock next/headers cookies
vi.mock("next/headers", () => ({
  cookies: () => Promise.resolve({
    getAll: () => [],
    set: () => {},
  }),
}));

// Mock @supabase/ssr directly since that's what the server.ts uses
vi.mock("@supabase/ssr", async () => {
  const { mockSupabaseClient } = await import("../__mocks__/supabase-mocks");
  return {
    createServerClient: () => mockSupabaseClient,
  };
});

vi.mock("resend", async () => {
  const { mockEmailSend } = await import("../__mocks__/resend-mocks");
  return {
    Resend: class {
      emails = { send: mockEmailSend };
    },
  };
});

// Import after mocks
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
    resetSupabaseMocks();
    resetResendMocks();

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
    it("inserts email lowercased to database", async () => {
      const req = createRequest({ email: "USER@EXAMPLE.COM" });
      await POST(req);

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
});
