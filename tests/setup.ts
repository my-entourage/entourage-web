import { beforeEach, vi } from "vitest";

// API tests run in Node environment - no DOM mocks needed
// Add any API-specific setup here

// Reset environment variables between tests
beforeEach(() => {
  vi.unstubAllEnvs();
});
