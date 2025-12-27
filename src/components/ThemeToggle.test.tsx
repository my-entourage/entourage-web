import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider, __resetThemeStore } from "@/providers/ThemeProvider";

// Mock the Icon component since it uses web components
vi.mock("./Icon", () => ({
  Icon: ({ icon }: { icon: string }) => <span data-testid="icon" data-icon={icon} />,
}));

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders toggle button", async () => {
    __resetThemeStore();
    renderWithTheme();

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  it("shows sun icon in light mode", async () => {
    __resetThemeStore();
    renderWithTheme();

    await waitFor(() => {
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveAttribute("data-icon", "line-md:sun-rising-loop");
    });
  });

  it("shows moon icon in dark mode", async () => {
    localStorage.setItem("theme", "dark");
    __resetThemeStore();

    renderWithTheme();

    await waitFor(() => {
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveAttribute("data-icon", "line-md:moon-loop");
    });
  });

  it("has accessible label for light mode", async () => {
    __resetThemeStore();
    renderWithTheme();

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Switch to dark mode"
      );
    });
  });

  it("has accessible label for dark mode", async () => {
    localStorage.setItem("theme", "dark");
    __resetThemeStore();

    renderWithTheme();

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Switch to light mode"
      );
    });
  });

  it("toggles theme when clicked", async () => {
    __resetThemeStore();
    const user = userEvent.setup();

    renderWithTheme();

    // Wait for initial render in light mode
    await waitFor(() => {
      expect(screen.getByTestId("icon")).toHaveAttribute(
        "data-icon",
        "line-md:sun-rising-loop"
      );
    });

    // Click to toggle to dark mode
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByTestId("icon")).toHaveAttribute(
        "data-icon",
        "line-md:moon-loop"
      );
    });

    // Click again to toggle back to light mode
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByTestId("icon")).toHaveAttribute(
        "data-icon",
        "line-md:sun-rising-loop"
      );
    });
  });
});
