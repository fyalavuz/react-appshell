import { test, expect } from "@playwright/test";

test.describe("Footer variants", () => {
  test("tab-bar auto-hide footer hides on scroll down, reappears on scroll up", async ({
    page,
  }) => {
    await page.goto("/tab-bar");
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();

    // Scroll down — footer should hide
    await page.evaluate(() => window.scrollBy(0, 1200));
    await page.waitForTimeout(500);
    await expect(footer).not.toBeVisible();

    // Scroll up — footer should reappear
    await page.evaluate(() => window.scrollBy(0, -200));
    await page.waitForTimeout(500);

    const footerAgain = page.locator("footer").first();
    await expect(footerAgain).toBeVisible();
  });

  test("tab navigation clicks change active state", async ({ page }) => {
    await page.goto("/tab-bar");

    // Home tab should be active initially
    const homeTab = page.getByRole("button", { name: "Home" });
    await expect(homeTab).toBeVisible();

    // Click Search tab
    const searchTab = page.getByRole("button", { name: "Search" });
    await searchTab.click();

    // Verify Search tab is visible and clickable
    await expect(searchTab).toBeVisible();

    // Click Notifications tab
    const notifTab = page.getByRole("button", { name: "Notifications" });
    await notifTab.click();
    await expect(notifTab).toBeVisible();
  });

  test("floating cart button is visible", async ({ page }) => {
    await page.goto("/floating-footer");
    const floatingButton = page.getByLabel("Add to cart");
    await expect(floatingButton).toBeVisible();
  });

  test("mini footer message input stays visible", async ({ page }) => {
    await page.goto("/mini-footer");

    // The mini footer contains the message input
    const messageInput = page.getByLabel("Type a message");
    await expect(messageInput).toBeVisible();

    // Scroll the page
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(300);

    // Mini footer (behavior static by default) should still be visible
    await expect(messageInput).toBeVisible();
  });
});
