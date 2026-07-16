import { expect, test } from "@playwright/test";

test.describe("TokenFlow demo (no auth)", () => {
  test("landing -> buy -> success -> dashboard skeleton", async ({ page }) => {
    await page.goto("/tokenflow");

    await expect(page.getByRole("heading", { name: "TokenFlow" })).toBeVisible();
    await expect(page.getByRole("link", { name: /buy tokens/i })).toBeVisible();

    // Buy page
    await page.getByRole("link", { name: /buy tokens/i }).click();
    await expect(page).toHaveURL(/\/tokenflow\/buy$/);
    await expect(page.getByRole("heading", { name: "Buy tokens" })).toBeVisible();
    // Pick the mid-tier plan so we exercise a real selection (not just the default).
    await page.getByRole("radio", { name: /Qwen 3.7 Plus/i }).check();
    await expect(page.getByRole("radio", { name: /Qwen 3.7 Plus/i })).toBeChecked();

    // Success page is reached via the demo action button.
    await page.getByRole("button", { name: /buy .+ for \$/i }).click();
    await expect(page).toHaveURL(/\/tokenflow\/buy\/success/);
    await expect(page.getByRole("heading", { name: /purchase confirmed/i })).toBeVisible();

    // Dashboard skeleton from the success CTA.
    await page.getByRole("link", { name: /view dashboard/i }).click();
    await expect(page).toHaveURL(/\/tokenflow\/dashboard$/);
    await expect(page.getByRole("heading", { name: "TokenFlow dashboard" })).toBeVisible();
    await expect(page.getByText(/Active plan/i)).toBeVisible();
  });
});
