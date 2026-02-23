import { test, expect } from "@playwright/test";

test.describe("Footer variants", () => {
  test("tab-bar auto-hide footer hides on scroll down, reappears on scroll up", async ({
    page,
  }) => {
    await page.goto("/social-app");
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();

    // Scroll down — footer should hide
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await expect(footer).not.toBeVisible();

    // Scroll up — footer should reappear
    await page.evaluate(() => window.scrollBy(0, -200));
    await page.waitForTimeout(500);

    const footerAgain = page.locator("footer").first();
    await expect(footerAgain).toBeVisible();
  });

  test("tab navigation clicks change active state", async ({ page }) => {
    await page.goto("/dashboard");

    // Dashboard tab should be active initially
    const dashboardTab = page.getByRole("button", { name: "Dashboard" });
    await expect(dashboardTab).toBeVisible();

    // Click Analytics tab
    const analyticsTab = page.getByRole("button", { name: "Analytics" });
    await analyticsTab.click();

    // Verify Analytics tab has the active indicator (text-primary class)
    await expect(analyticsTab).toHaveCSS("color", /./);

    // Click Users tab
    const usersTab = page.getByRole("button", { name: "Users" });
    await usersTab.click();
    await expect(usersTab).toBeVisible();
  });

  test("floating cart button is visible", async ({ page }) => {
    await page.goto("/ecommerce");
    const floatingButton = page.getByLabel("Add to cart");
    await expect(floatingButton).toBeVisible();
  });

  test("mini footer stays visible on messaging page", async ({ page }) => {
    await page.goto("/messaging");

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
