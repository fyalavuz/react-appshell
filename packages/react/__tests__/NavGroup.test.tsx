import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NavGroup } from "../src/NavGroup";

describe("NavGroup", () => {
  it("renders title text", () => {
    render(<NavGroup title="Settings">Items</NavGroup>);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(
      <NavGroup title="Files" icon={<span data-testid="icon">icon</span>}>
        Items
      </NavGroup>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("starts collapsed by default", () => {
    const { container } = render(
      <NavGroup title="Section">
        <span>Child Item</span>
      </NavGroup>
    );
    const button = screen.getByRole("button", { name: /Section/ });
    expect(button).toHaveAttribute("aria-expanded", "false");

    const contentWrapper = container.querySelector(".max-h-0");
    expect(contentWrapper).toBeInTheDocument();
  });

  it("starts expanded when defaultOpen=true", () => {
    const { container } = render(
      <NavGroup title="Section" defaultOpen>
        <span>Child Item</span>
      </NavGroup>
    );
    const button = screen.getByRole("button", { name: /Section/ });
    expect(button).toHaveAttribute("aria-expanded", "true");

    const contentWrapper = container.querySelector(".max-h-\\[500px\\]");
    expect(contentWrapper).toBeInTheDocument();
  });

  it("toggles open/closed on click", () => {
    render(
      <NavGroup title="Section">
        <span>Child Item</span>
      </NavGroup>
    );
    const button = screen.getByRole("button", { name: /Section/ });
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("renders children when expanded", () => {
    render(
      <NavGroup title="Section" defaultOpen>
        <span>Child Item</span>
      </NavGroup>
    );
    expect(screen.getByText("Child Item")).toBeInTheDocument();
  });

  it("hides children when collapsed", () => {
    const { container } = render(
      <NavGroup title="Section">
        <span>Child Item</span>
      </NavGroup>
    );
    const contentWrapper = container.querySelector(".overflow-hidden.max-h-0");
    expect(contentWrapper).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <NavGroup title="Section" className="my-group">
        Items
      </NavGroup>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass("my-group");
  });
});
