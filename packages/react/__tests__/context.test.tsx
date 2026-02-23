import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppShellProvider, useAppShell } from "../src/context";

function Consumer() {
  const ctx = useAppShell();
  return (
    <div>
      <span data-testid="header">{String(ctx.headerVisible)}</span>
      <span data-testid="footer">{String(ctx.footerVisible)}</span>
      <span data-testid="scroll">{String(ctx.scrollDirection)}</span>
    </div>
  );
}

describe("AppShellContext", () => {
  it("provides default values", () => {
    render(
      <AppShellProvider>
        <Consumer />
      </AppShellProvider>
    );
    expect(screen.getByTestId("header").textContent).toBe("true");
    expect(screen.getByTestId("footer").textContent).toBe("true");
    expect(screen.getByTestId("scroll").textContent).toBe("null");
  });

  it("throws when used outside provider", () => {
    // Suppress React error boundary noise
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow();
    spy.mockRestore();
  });
});
