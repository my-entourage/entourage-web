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
