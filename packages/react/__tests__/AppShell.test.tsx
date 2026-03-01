import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppShell } from "../src/AppShell";
import { Content } from "../src/Content";

describe("AppShell", () => {
  it("renders children", () => {
    render(
      <AppShell>
        <Content>Page</Content>
      </AppShell>
    );
    expect(screen.getByText("Page")).toBeInTheDocument();
  });

  it("wraps with SafeArea when safeArea=true", () => {
    const { container } = render(
      <AppShell safeArea>
        <Content>Content</Content>
      </AppShell>
    );
    // In new implementation, root is div, and SafeArea is a child if safeArea=true
    const safeArea = container.querySelector("[data-safe-area-edges]");
    expect(safeArea).toBeInTheDocument();
    const styleAttr = safeArea?.getAttribute("style") || "";
    // We only apply bottom safe area to the content wrapper now, 
    // Header handles top if present.
    expect(styleAttr).toContain("padding-bottom");
  });

  it("renders without SafeArea by default", () => {
    const { container } = render(
      <AppShell>
        <Content>Content</Content>
      </AppShell>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.hasAttribute("data-safe-area-edges")).toBe(false);
  });

  it("provides AppShell context to children", () => {
    render(
      <AppShell>
        <Content>Works</Content>
      </AppShell>
    );
    expect(screen.getByText("Works")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <AppShell className="my-shell">
        <Content>Content</Content>
      </AppShell>
    );
    // The className is on the inner div, which may be inside a SafeArea wrapper or directly the first child
    const innerDiv = container.querySelector(".my-shell");
    expect(innerDiv).toBeInTheDocument();
  });
});
