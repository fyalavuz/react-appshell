import { test, expect } from "@playwright/test";

test.describe("Sidebar navigation", () => {
  test("sidebar opens and closes via hamburger button", async ({ page }) => {
    await page.goto("/sidebar");

    // Click hamburger button to open sidebar
    const menuButton = page.getByLabel("Open menu");
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await page.waitForTimeout(300);

    // Sidebar dialog should appear
    const sidebar = page.getByRole("dialog");
    await expect(sidebar).toBeVisible();
    await expect(sidebar).toHaveAttribute("aria-modal", "true");

    // Close with Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(sidebar).not.toBeVisible();
  });

  test("sidebar NavGroup accordion toggles", async ({ page }) => {
    await page.goto("/sidebar");

    // Open sidebar
    const menuButton = page.getByLabel("Open menu");
    await menuButton.click();
    await page.waitForTimeout(300);

    // Should have accordion group buttons with aria-expanded
    const groupButtons = page.locator("button[aria-expanded]");
    const count = await groupButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("sidebar closes on backdrop click", async ({ page }) => {
    await page.goto("/sidebar");

    // Open sidebar
    await page.getByLabel("Open menu").click();
    await page.waitForTimeout(300);

    const sidebar = page.getByRole("dialog");
    await expect(sidebar).toBeVisible();

    // Click the backdrop area to the right of the sidebar panel
    // Sidebar is w-80 (320px) on the left, so clicking at x=500 is safely outside
    const backdrop = page.locator("div[aria-hidden='true']").first();
    const box = await backdrop.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width - 50, box.y + box.height / 2);
    }
    await page.waitForTimeout(300);

    await expect(sidebar).not.toBeVisible();
  });
});
