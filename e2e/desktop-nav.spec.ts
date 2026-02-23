import { test, expect } from "@playwright/test";

test.describe("Desktop navigation", () => {
  test("HeaderNav is visible on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/desktop-nav");

    // Nav element should be visible
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();

    // Should have nav items
    const homeLink = page.getByRole("link", { name: "Home" }).or(
      page.getByRole("button", { name: "Home" })
    );
    await expect(homeLink.first()).toBeVisible();
  });

  test("dropdown opens on hover and has role menu", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/desktop-nav");
    await page.waitForTimeout(500);

    // Find the container div that has the mouseenter handler
    // It's a div.relative wrapping the dropdown trigger button
    const dropdownContainer = page.locator("button[aria-haspopup='true']").first().locator("..");
    await expect(dropdownContainer).toBeVisible();

    // Hover the container to open dropdown (desktop UX pattern)
    await dropdownContainer.hover();
    await page.waitForTimeout(300);

    // Menu should appear with role="menu"
    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();

    // Verify aria-expanded is true
    const trigger = page.locator("button[aria-haspopup='true']").first();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Escape to close
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(menu).not.toBeVisible();
  });
});
