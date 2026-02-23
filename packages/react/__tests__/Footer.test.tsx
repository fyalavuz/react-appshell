import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer, FooterItem } from "../src/Footer";
import { AppShellProvider } from "../src/context";

function renderFooter(props: Record<string, any> = {}, children?: any) {
  return render(
    <AppShellProvider>
      <Footer {...props}>
        {children || (
          <>
            <FooterItem icon={<span>H</span>} label="Home" active />
            <FooterItem icon={<span>S</span>} label="Search" />
          </>
        )}
      </Footer>
    </AppShellProvider>
  );
}

describe("Footer", () => {
  describe("tab-bar variant", () => {
    it("renders tab bar items", () => {
      renderFooter({ variant: "tab-bar" });
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("renders footer element", () => {
      const { container } = renderFooter({ variant: "tab-bar" });
      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("highlights active item", () => {
      renderFooter({ variant: "tab-bar" });
      const homeButton = screen.getByText("Home").closest("button");
      expect(homeButton?.className).toContain("text-primary");
    });
  });

  describe("floating variant", () => {
    it("renders floating content", () => {
      renderFooter(
        { variant: "floating", position: "right" },
        <button>+</button>
      );
      expect(screen.getByText("+")).toBeInTheDocument();
    });

    it("applies position class", () => {
      const { container } = renderFooter(
        { variant: "floating", position: "center" },
        <button>FAB</button>
      );
      const wrapper = container.querySelector("[data-footer-floating]");
      expect(wrapper?.className).toContain("justify-center");
    });
  });

  describe("mini variant", () => {
    it("renders mini toolbar content", () => {
      renderFooter(
        { variant: "mini" },
        <div>Now Playing: Song Name</div>
      );
      expect(screen.getByText("Now Playing: Song Name")).toBeInTheDocument();
    });

    it("has compact height", () => {
      const { container } = renderFooter(
        { variant: "mini" },
        <div>Mini</div>
      );
      const footer = container.querySelector("footer");
      expect(footer?.className).toContain("h-12");
    });
  });

  describe("FooterItem", () => {
    it("renders badge", () => {
      render(
        <AppShellProvider>
          <Footer variant="tab-bar">
            <FooterItem icon={<span>B</span>} label="Alerts" badge={5} />
          </Footer>
        </AppShellProvider>
      );
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("calls onClick", () => {
      const onClick = vi.fn();
      render(
        <AppShellProvider>
          <Footer variant="tab-bar">
            <FooterItem icon={<span>C</span>} label="Click" onClick={onClick} />
          </Footer>
        </AppShellProvider>
      );
      fireEvent.click(screen.getByText("Click"));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
