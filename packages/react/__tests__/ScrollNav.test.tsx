import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ScrollNav, ScrollNavItem } from "../src/ScrollNav";

describe("ScrollNav", () => {
  it("renders children", () => {
    render(
      <ScrollNav>
        <ScrollNavItem label="Tab 1" />
        <ScrollNavItem label="Tab 2" />
        <ScrollNavItem label="Tab 3" />
      </ScrollNav>
    );
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("has horizontal scroll container", () => {
    const { container } = render(
      <ScrollNav>
        <ScrollNavItem label="Item" />
      </ScrollNav>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("overflow-x-auto");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ScrollNav className="my-scroll-nav">
        <ScrollNavItem label="Item" />
      </ScrollNav>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass("my-scroll-nav");
  });
});

describe("ScrollNavItem", () => {
  it("renders label text", () => {
    render(<ScrollNavItem label="Overview" />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("renders as a button", () => {
    render(<ScrollNavItem label="Details" />);
    expect(screen.getByRole("button", { name: "Details" })).toBeInTheDocument();
  });

  it("applies active styles", () => {
    render(<ScrollNavItem label="Active Tab" active />);
    const button = screen.getByRole("button", { name: "Active Tab" });
    expect(button.className).toContain("text-primary");
    expect(button.className).toContain("border-primary");
  });

  it("applies inactive styles", () => {
    render(<ScrollNavItem label="Inactive Tab" active={false} />);
    const button = screen.getByRole("button", { name: "Inactive Tab" });
    expect(button.className).toContain("text-muted-foreground");
  });

  it("calls onClick handler", () => {
    const onClick = vi.fn();
    render(<ScrollNavItem label="Clickable" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Clickable" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies custom className", () => {
    render(<ScrollNavItem label="Custom" className="tab-custom" />);
    const button = screen.getByRole("button", { name: "Custom" });
    expect(button).toHaveClass("tab-custom");
  });
});
