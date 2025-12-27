import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Entourage/i);
  });

  test("displays hero section with tagline", async ({ page }) => {
    await page.goto("/");

    // Check that the hero section is visible
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();
  });

  test("header is visible with navigation", async ({ page }) => {
    await page.goto("/");

    // Check header is present
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check theme toggle exists
    const themeToggle = page.getByRole("button", { name: /switch to/i });
    await expect(themeToggle).toBeVisible();
  });

  test("theme toggle works", async ({ page }) => {
    await page.goto("/");

    // Get initial state - should be light by default
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    // Click theme toggle
    const themeToggle = page.getByRole("button", { name: /switch to dark mode/i });
    await themeToggle.click();

    // Should now have dark class
    await expect(html).toHaveClass(/dark/);

    // Click again to toggle back
    const lightModeToggle = page.getByRole("button", { name: /switch to light mode/i });
    await lightModeToggle.click();

    // Should no longer have dark class
    await expect(html).not.toHaveClass(/dark/);
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("page has no major accessibility issues on initial load", async ({ page }) => {
    await page.goto("/");

    // Check that all images have alt text
    const imagesWithoutAlt = await page.locator("img:not([alt])").count();
    expect(imagesWithoutAlt).toBe(0);

    // Check buttons have accessible names
    const buttons = page.getByRole("button");
    const buttonCount = await buttons.count();
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const name = await button.getAttribute("aria-label") || await button.textContent();
      expect(name?.trim().length).toBeGreaterThan(0);
    }
  });
});
