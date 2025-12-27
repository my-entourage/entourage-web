import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { Button } from "./ui/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies default variant and size classes", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button");

    // Default variant (primary) includes rounded-none and background
    expect(button).toHaveClass("rounded-none");
    expect(button).toHaveClass("bg-background");
    // Default size
    expect(button).toHaveClass("h-10");
    expect(button).toHaveClass("px-5");
  });

  it("applies solid variant classes", () => {
    render(<Button variant="solid">Solid</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-black");
    expect(button).toHaveClass("text-white");
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-transparent");
    expect(button).toHaveClass("border-black");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-transparent");
    expect(button).toHaveClass("border-transparent");
  });

  it("applies large size classes", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("h-12");
    expect(button).toHaveClass("px-8");
  });

  it("merges custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });

  it("passes through HTML button attributes", () => {
    render(
      <Button type="submit" disabled data-testid="test-btn">
        Submit
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-testid", "test-btn");
  });
});
