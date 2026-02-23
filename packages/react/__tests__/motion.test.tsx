import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { cssMotionAdapter } from "../src/motion-css";
import { MotionProvider, useMotion } from "../src/motion";
import React from "react";

describe("CSS motion adapter", () => {
  it("motion.div renders a div element", () => {
    const MotionDiv = cssMotionAdapter.motion.div;
    const { container } = render(<MotionDiv>content</MotionDiv>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("motion.footer renders a footer element", () => {
    const MotionFooter = cssMotionAdapter.motion.footer;
    const { container } = render(<MotionFooter>content</MotionFooter>);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("motion.nav renders a nav element", () => {
    const MotionNav = cssMotionAdapter.motion.nav;
    render(<MotionNav>content</MotionNav>);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("strips animation props from output", () => {
    const MotionDiv = cssMotionAdapter.motion.div;
    const { container } = render(
      <MotionDiv
        data-testid="motion-el"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        layoutId="test"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        content
      </MotionDiv>
    );
    const el = screen.getByTestId("motion-el");
    expect(el).not.toHaveAttribute("initial");
    expect(el).not.toHaveAttribute("animate");
    expect(el).not.toHaveAttribute("exit");
    expect(el).not.toHaveAttribute("transition");
    expect(el).not.toHaveAttribute("layoutId");
    expect(el).not.toHaveAttribute("whileHover");
    expect(el).not.toHaveAttribute("whileTap");
  });

  it("adds data-motion='css' attribute", () => {
    const MotionDiv = cssMotionAdapter.motion.div;
    render(<MotionDiv data-testid="motion-el">content</MotionDiv>);
    expect(screen.getByTestId("motion-el")).toHaveAttribute(
      "data-motion",
      "css"
    );
  });

  it("forwards non-animation props", () => {
    const MotionDiv = cssMotionAdapter.motion.div;
    render(
      <MotionDiv className="test-class" id="test-id" data-testid="motion-el">
        content
      </MotionDiv>
    );
    const el = screen.getByTestId("motion-el");
    expect(el).toHaveClass("test-class");
    expect(el).toHaveAttribute("id", "test-id");
  });

  it("AnimatePresence renders children", () => {
    const { AnimatePresence } = cssMotionAdapter;
    render(
      <AnimatePresence>
        <span>Visible Child</span>
      </AnimatePresence>
    );
    expect(screen.getByText("Visible Child")).toBeInTheDocument();
  });
});

describe("MotionProvider + useMotion", () => {
  function TestComponent() {
    const { motion } = useMotion();
    return <motion.div data-testid="motion-div">test</motion.div>;
  }

  it("returns CSS adapter by default (no provider)", () => {
    render(<TestComponent />);
    const el = screen.getByTestId("motion-div");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveAttribute("data-motion", "css");
  });

  it("returns provided adapter when MotionProvider present", () => {
    const MockDiv = React.forwardRef<HTMLDivElement, any>(function MockDiv(
      props,
      ref
    ) {
      const { initial, animate, exit, transition, layoutId, whileHover, whileTap, ...rest } = props;
      return <div {...rest} ref={ref} data-motion="mock" />;
    });

    const MockFooter = React.forwardRef<HTMLElement, any>(function MockFooter(
      props,
      ref
    ) {
      return <footer {...props} ref={ref} />;
    });

    const MockNav = React.forwardRef<HTMLElement, any>(function MockNav(
      props,
      ref
    ) {
      return <nav {...props} ref={ref} />;
    });

    const mockAdapter = {
      AnimatePresence: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      ),
      motion: {
        div: MockDiv,
        footer: MockFooter,
        nav: MockNav,
      },
    };

    render(
      <MotionProvider adapter={mockAdapter}>
        <TestComponent />
      </MotionProvider>
    );

    const el = screen.getByTestId("motion-div");
    expect(el).toHaveAttribute("data-motion", "mock");
  });
});
