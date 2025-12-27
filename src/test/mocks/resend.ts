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
