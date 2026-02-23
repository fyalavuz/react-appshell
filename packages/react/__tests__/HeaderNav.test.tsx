import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderNav, HeaderNavItem } from "../src/HeaderNav";

describe("HeaderNav", () => {
  it("renders children in a nav element", () => {
    render(
      <HeaderNav>
        <span>Child Content</span>
      </HeaderNav>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <HeaderNav className="my-nav">
        <span>Content</span>
      </HeaderNav>
    );
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("my-nav");
  });
});

describe("HeaderNavItem", () => {
  describe("without dropdown", () => {
    it("renders as a button by default", () => {
      render(<HeaderNavItem label="Home" />);
      const button = screen.getByRole("button", { name: "Home" });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });

    it("renders as anchor when href provided", () => {
      render(<HeaderNavItem label="Docs" href="/docs" />);
      const link = screen.getByRole("link", { name: "Docs" });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/docs");
    });

    it("renders label text", () => {
      render(<HeaderNavItem label="Settings" />);
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("applies active styles when active=true", () => {
      render(<HeaderNavItem label="Active" active />);
      const button = screen.getByRole("button", { name: "Active" });
      expect(button.className).toContain("text-foreground");
      expect(button.className).toContain("bg-accent");
    });
  });

  describe("with dropdown", () => {
    it("renders dropdown trigger with aria-haspopup", () => {
      render(
        <HeaderNavItem label="Menu">
          <span>Dropdown content</span>
        </HeaderNavItem>
      );
      const trigger = screen.getByRole("button", { name: /Menu/ });
      expect(trigger).toHaveAttribute("aria-haspopup", "true");
    });

    it("starts with dropdown closed (aria-expanded=false)", () => {
      render(
        <HeaderNavItem label="Menu">
          <span>Dropdown content</span>
        </HeaderNavItem>
      );
      const trigger = screen.getByRole("button", { name: /Menu/ });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("opens dropdown on click", () => {
      render(
        <HeaderNavItem label="Menu">
          <span>Dropdown content</span>
        </HeaderNavItem>
      );
      const trigger = screen.getByRole("button", { name: /Menu/ });

      fireEvent.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("closes dropdown on Escape", () => {
      render(
        <HeaderNavItem label="Menu">
          <span>Dropdown content</span>
        </HeaderNavItem>
      );
      const trigger = screen.getByRole("button", { name: /Menu/ });

      // Open the dropdown
      fireEvent.click(trigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();

      // Press Escape
      fireEvent.keyDown(document, { key: "Escape" });

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("closes dropdown on outside click", () => {
      render(
        <HeaderNavItem label="Menu">
          <span>Dropdown content</span>
        </HeaderNavItem>
      );
      const trigger = screen.getByRole("button", { name: /Menu/ });

      // Open the dropdown
      fireEvent.click(trigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();

      // Click outside (on document body)
      fireEvent.mouseDown(document.body);

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("shows dropdown content when open", () => {
      render(
        <HeaderNavItem label="Menu">
          <span>Item One</span>
          <span>Item Two</span>
        </HeaderNavItem>
      );
      const trigger = screen.getByRole("button", { name: /Menu/ });

      fireEvent.click(trigger);

      const menu = screen.getByRole("menu");
      expect(menu).toBeInTheDocument();
      expect(screen.getByText("Item One")).toBeInTheDocument();
      expect(screen.getByText("Item Two")).toBeInTheDocument();
    });
  });
});
