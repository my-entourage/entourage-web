import { vi } from "vitest";

export const mockInsert = vi.fn();
export const mockFrom = vi.fn(() => ({ insert: mockInsert }));

export const mockSupabaseClient = {
  from: mockFrom,
};

export function resetSupabaseMocks() {
  mockInsert.mockReset();
  mockFrom.mockReset();
  mockFrom.mockReturnValue({ insert: mockInsert });
  mockInsert.mockResolvedValue({ error: null });
}
