import { test, expect } from "@playwright/test";

test.describe("Layout combinations", () => {
  test("header-only page has header but no Footer component", async ({ page }) => {
    await page.goto("/header-only");

    // Header should be present
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    // No AppShell Footer component (fixed bottom footer) should exist
    // Note: semantic <footer> inside <blockquote> is fine, we check for the fixed-bottom footer
    const fixedFooter = page.locator("footer.fixed, footer[class*='fixed']");
    await expect(fixedFooter).toHaveCount(0);
  });

  test("footer-only page has no header", async ({ page }) => {
    await page.goto("/footer-only");

    // Footer should be present
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();

    // No header element should exist
    const header = page.locator("header");
    await expect(header).toHaveCount(0);
  });

  test("content-only page has no header or footer", async ({ page }) => {
    await page.goto("/content-only");

    // Neither header nor footer
    const header = page.locator("header");
    const footer = page.locator("footer");
    await expect(header).toHaveCount(0);
    await expect(footer).toHaveCount(0);
  });

  test("scroll-nav tabs are interactive", async ({ page }) => {
    await page.goto("/scroll-nav");

    // ScrollNav items should be clickable buttons
    const allTab = page.getByRole("button", { name: "All" });
    await expect(allTab).toBeVisible();

    // Click Technology tab
    const techTab = page.getByRole("button", { name: "Technology" });
    await techTab.click();
    await expect(techTab).toBeVisible();
  });
});
