import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NavItem } from "../src/NavItem";

describe("NavItem", () => {
  it("renders as a button by default", () => {
    render(<NavItem label="Home" />);
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
  });

  it("renders as an anchor when href is provided", () => {
    render(<NavItem label="Link" href="/test" />);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });

  it("renders the label text", () => {
    render(<NavItem label="Settings" />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(
      <NavItem label="Home" icon={<span data-testid="icon">🏠</span>} />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(
      <NavItem label="Inbox" badge={<span data-testid="badge">3</span>} />
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("applies active styles when active=true", () => {
    render(<NavItem label="Active" active />);
    const button = screen.getByRole("button", { name: "Active" });
    expect(button.className).toContain("text-accent-foreground");
    expect(button.className).toContain("bg-accent");
    expect(button).toHaveAttribute("data-active", "true");
  });

  it("applies inactive styles when active=false", () => {
    render(<NavItem label="Inactive" active={false} />);
    const button = screen.getByRole("button", { name: "Inactive" });
    expect(button.className).toContain("text-muted-foreground");
  });

  it("calls onClick handler", () => {
    const onClick = vi.fn();
    render(<NavItem label="Clickable" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Clickable" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("sets href on anchor element", () => {
    render(<NavItem label="Docs" href="/docs" />);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("applies custom className", () => {
    render(<NavItem label="Custom" className="custom-class" />);
    const button = screen.getByRole("button", { name: "Custom" });
    expect(button).toHaveClass("custom-class");
  });
});
