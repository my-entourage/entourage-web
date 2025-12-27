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
