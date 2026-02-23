import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Content } from "../src/Content";

describe("Content", () => {
  it("renders children", () => {
    render(<Content>Page content</Content>);
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders as main element", () => {
    render(<Content>Content</Content>);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Content className="px-4">Content</Content>);
    expect(screen.getByRole("main")).toHaveClass("px-4");
  });
});
