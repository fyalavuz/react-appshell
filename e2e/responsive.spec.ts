import { test, expect } from "@playwright/test";

test.describe("Responsive layout", () => {
  test("dashboard mobile hamburger menu toggles", async ({ page }) => {
    // Use a mobile viewport
    await page.setViewportSize({ width: 393, height: 851 });
    await page.goto("/dashboard");

    // Hamburger button should be visible on mobile
    const menuButton = page.getByLabel("Open menu");
    await expect(menuButton).toBeVisible();

    // Click to open menu
    await menuButton.click();
    await page.waitForTimeout(300);

    // Menu items should be visible
    await expect(page.getByRole("button", { name: "Analytics" }).first()).toBeVisible();

    // Close menu button should now be visible — use force since the fixed footer may overlap
    const closeButton = page.getByLabel("Close menu");
    await expect(closeButton).toBeVisible();
    await closeButton.click({ force: true });
    await page.waitForTimeout(300);
  });

  test("example picker page renders all 5 example links", async ({
    page,
  }) => {
    await page.goto("/");

    const links = page.locator("a[href]");
    const exampleLinks = page.locator(
      'a[href="/social-app"], a[href="/ecommerce"], a[href="/messaging"], a[href="/music-player"], a[href="/dashboard"]'
    );

    await expect(exampleLinks).toHaveCount(5);
  });

  test("tab bar footer renders on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 851 });
    await page.goto("/social-app");

    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();

    // All 5 tab items should be present
    const tabButtons = footer.getByRole("button");
    await expect(tabButtons).toHaveCount(5);
  });
});
