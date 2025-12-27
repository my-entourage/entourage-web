import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes with clsx syntax", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("handles undefined and null values", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });

  it("handles arrays", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("merges conflicting Tailwind classes (last wins)", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles semantic color classes", () => {
    expect(cn("bg-white", "bg-background")).toBe("bg-background");
    expect(cn("text-black", "text-foreground")).toBe("text-foreground");
    expect(cn("border-gray-200", "border-border")).toBe("border-border");
  });

  it("preserves non-conflicting classes", () => {
    expect(cn("p-4", "m-4", "text-lg")).toBe("p-4 m-4 text-lg");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });
});
