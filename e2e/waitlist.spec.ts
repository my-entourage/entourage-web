import { test, expect } from "@playwright/test";

test.describe("Waitlist Page", () => {
  test("displays waitlist form", async ({ page }) => {
    await page.goto("/waitlist");

    // Check form fields exist
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/company/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /join/i })).toBeVisible();
  });

  test("shows validation for empty email", async ({ page }) => {
    await page.goto("/waitlist");

    // Try to submit without email
    const submitButton = page.getByRole("button", { name: /join/i });
    await submitButton.click();

    // HTML5 validation should prevent submission
    const emailInput = page.getByLabel(/email/i);
    const isValid = await emailInput.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValid).toBe(false);
  });

  test("shows validation for invalid email", async ({ page }) => {
    await page.goto("/waitlist");

    // Enter invalid email
    const emailInput = page.getByLabel(/email/i);
    await emailInput.fill("not-an-email");

    const submitButton = page.getByRole("button", { name: /join/i });
    await submitButton.click();

    // HTML5 validation should prevent submission
    const isValid = await emailInput.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValid).toBe(false);
  });

  test("form is accessible", async ({ page }) => {
    await page.goto("/waitlist");

    // Check form inputs are properly labeled
    const nameInput = page.getByLabel(/name/i);
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute("id");

    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("id");
    await expect(emailInput).toHaveAttribute("type", "email");
  });
});
