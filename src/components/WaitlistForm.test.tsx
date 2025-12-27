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

  it("shows success message after submission", async () => {
    const user = userEvent.setup();

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
  });

  it("shows error message on API failure", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Something went wrong" }),
    });

    render(<WaitlistForm />);

    // Use a valid email format to pass HTML5 validation
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
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
