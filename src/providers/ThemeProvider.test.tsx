import { describe, it, expect, beforeEach } from "vitest";
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
    // localStorage is cleared in setup.ts afterEach, but clear dark class
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
