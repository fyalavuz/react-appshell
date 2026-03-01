import { test, expect } from "@playwright/test";

test.describe("Combined reveal behaviors", () => {
  test("header and footer both hide on scroll down and reveal on scroll up", async ({ page }) => {
    await page.goto("/reveal-combined");
    
    // Initial state
    const header = page.locator("header").first();
    const footer = page.locator("footer").first();
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();

    // Scroll down incrementally to reliably trigger scroll-direction detection.
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(200);
    }
    
    // Footer should be removed by AnimatePresence
    await expect(footer).not.toBeVisible({ timeout: 5000 });

    // Scroll up incrementally
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, -400));
      await page.waitForTimeout(200);
    }

    // Header overlay should be visible
    const headerOverlay = page.locator("[aria-hidden]").first();
    await expect(headerOverlay).toBeVisible({ timeout: 5000 });
    
    // Footer should be visible again
    await expect(footer).toBeVisible({ timeout: 5000 });
  });
});
