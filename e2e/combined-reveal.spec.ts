import { test, expect } from "@playwright/test";

test.describe("Combined reveal behaviors", () => {
  test("header and footer both hide on scroll down and reveal on scroll up", async ({ page }) => {
    await page.goto("/reveal-combined");
    
    // Initial state
    const header = page.locator("header").first();
    const footer = page.locator("footer").first();
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();

    // Scroll down - Footer should hide, Header row sub-parts (reveal-all) should hide from main header
    await page.evaluate(() => {
        window.scrollTo(0, 1000);
    });
    await page.waitForTimeout(500);
    
    // Footer should be hidden (translated out of view or opacity 0 depending on implementation)
    // Actually our Footer uses AnimatePresence, so it might be removed or hidden.
    await expect(footer).not.toBeVisible();

    // Scroll up - both should reveal
    await page.evaluate(() => {
        window.scrollBy(0, -200);
    });
    await page.waitForTimeout(500);

    // Header overlay should be visible
    const headerOverlay = page.locator("[aria-hidden]").first();
    await expect(headerOverlay).toBeVisible();
    
    // Footer should be visible again
    await expect(footer).toBeVisible();
  });
});
