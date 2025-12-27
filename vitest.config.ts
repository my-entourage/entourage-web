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
