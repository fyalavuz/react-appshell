import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Sidebar } from "../src/Sidebar";

describe("Sidebar", () => {
  it("renders children when open", () => {
    render(
      <Sidebar open onClose={vi.fn()}>
        <span>Sidebar Content</span>
      </Sidebar>
    );
    expect(screen.getByText("Sidebar Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Sidebar open={false} onClose={vi.fn()}>
        <span>Sidebar Content</span>
      </Sidebar>
    );
    expect(screen.queryByText("Sidebar Content")).not.toBeInTheDocument();
  });

  it("renders dialog with correct ARIA attributes", () => {
    render(
      <Sidebar open onClose={vi.fn()}>
        <span>Content</span>
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Navigation menu");
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Sidebar open onClose={onClose}>
        <span>Content</span>
      </Sidebar>
    );
    const backdrop = container.querySelector("[aria-hidden='true']");
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(
      <Sidebar open onClose={onClose}>
        <span>Content</span>
      </Sidebar>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose on Escape when closed", () => {
    const onClose = vi.fn();
    render(
      <Sidebar open={false} onClose={onClose}>
        <span>Content</span>
      </Sidebar>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks body scroll when open", () => {
    render(
      <Sidebar open onClose={vi.fn()}>
        <span>Content</span>
      </Sidebar>
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll on close", () => {
    const { rerender } = render(
      <Sidebar open onClose={vi.fn()}>
        <span>Content</span>
      </Sidebar>
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Sidebar open={false} onClose={vi.fn()}>
        <span>Content</span>
      </Sidebar>
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("applies left side by default", () => {
    render(
      <Sidebar open onClose={vi.fn()}>
        <span>Content</span>
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("left-0");
  });

  it("applies right side when side='right'", () => {
    render(
      <Sidebar open onClose={vi.fn()} side="right">
        <span>Content</span>
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("right-0");
  });

  it("passes custom className", () => {
    render(
      <Sidebar open onClose={vi.fn()} className="my-sidebar">
        <span>Content</span>
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("my-sidebar");
  });
});
