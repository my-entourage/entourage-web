import { vi } from "vitest";

export const mockEmailSend = vi.fn();

export function resetResendMocks() {
  mockEmailSend.mockReset();
  mockEmailSend.mockResolvedValue({ data: { id: "123" } });
}
