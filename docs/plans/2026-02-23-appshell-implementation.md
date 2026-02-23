# AppShell Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the @appshell/react open-source component library with monorepo structure, full test coverage, documentation site, and GitHub Pages deployment.

**Architecture:** Turborepo monorepo with pnpm workspaces. Library in `packages/react` built with tsup (ESM+CJS). Fumadocs site in `apps/docs` with static export for GitHub Pages. Fullscreen examples in `apps/examples`. Shared context via React Context for header/footer visibility coordination.

**Tech Stack:** React 19, Tailwind CSS v4, Framer Motion (motion.dev), tsup, Vitest, Playwright, Fumadocs, Turborepo, pnpm, GitHub Actions.

---

## Phase 1: Monorepo Scaffolding

### Task 1.1: Convert to pnpm workspace monorepo

**Files:**
- Modify: `package.json` (root)
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `.npmrc`

**Step 1: Create pnpm-workspace.yaml**

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

**Step 2: Create turbo.json**

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "test:e2e": {
      "dependsOn": ["build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

**Step 3: Update root package.json**

Replace current root package.json with monorepo root config:

```json
{
  "name": "appshell",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "test:e2e": "turbo run test:e2e",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^2.5.0",
    "typescript": "^5.7.3"
  },
  "packageManager": "pnpm@9.15.0"
}
```

**Step 4: Create .npmrc**

```ini
auto-install-peers=true
strict-peer-dependencies=false
```

**Step 5: Create directory structure**

Run:
```bash
mkdir -p packages/react/src packages/react/src/hooks packages/react/__tests__
mkdir -p apps/docs apps/examples
```

**Step 6: Move existing files out of root temporarily**

The existing app/, components/, hooks/, lib/, styles/, public/ are from the v0 demo. We'll repurpose them into the examples app later. For now, move them:

```bash
mkdir -p _v0-backup
mv app components hooks lib styles public next.config.mjs postcss.config.mjs components.json tsconfig.json _v0-backup/
```

**Step 7: Remove old pnpm-lock.yaml and reinstall**

```bash
rm pnpm-lock.yaml
pnpm install
```

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold turborepo monorepo structure"
```

---

### Task 1.2: Set up packages/react library package

**Files:**
- Create: `packages/react/package.json`
- Create: `packages/react/tsconfig.json`
- Create: `packages/react/tsup.config.ts`
- Create: `packages/react/src/cn.ts`
- Create: `packages/react/src/types.ts`
- Create: `packages/react/src/index.ts`

**Step 1: Create packages/react/package.json**

```json
{
  "name": "@appshell/react",
  "version": "0.1.0",
  "description": "Mobile-first app shell components for React — Header, Footer, TabBar, SafeArea",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist", "README.md", "LICENSE"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "framer-motion": ">=11.0.0",
    "tailwindcss": ">=4.0.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "framer-motion": "^12.6.0",
    "jsdom": "^26.1.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwind-merge": "^3.3.0",
    "clsx": "^2.1.0",
    "tsup": "^8.4.0",
    "vitest": "^3.2.0",
    "typescript": "^5.7.3"
  }
}
```

**Step 2: Create packages/react/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationDir": "./dist",
    "outDir": "./dist",
    "rootDir": "./src",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
```

**Step 3: Create packages/react/tsup.config.ts**

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion"],
  treeshake: true,
  minify: false,
});
```

**Step 4: Create packages/react/src/cn.ts**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 5: Create packages/react/src/types.ts**

```ts
import type { ReactNode } from "react";

export type ScrollDirection = "up" | "down" | null;

export type HeaderBehavior =
  | "static"
  | "fixed"
  | "reveal-all"
  | "reveal-nav"
  | "reveal-context"
  | "reveal-search";

export type HeaderTheme = "light" | "primary" | "dark";

export type FooterVariant = "tab-bar" | "floating" | "mini";

export type FooterBehavior = "static" | "auto-hide";

export type FooterPosition = "center" | "left" | "right";

export type SafeAreaEdge = "top" | "bottom" | "left" | "right";

export interface AppShellContextValue {
  headerVisible: boolean;
  footerVisible: boolean;
  scrollDirection: ScrollDirection;
  setHeaderVisible: (visible: boolean) => void;
  setFooterVisible: (visible: boolean) => void;
}

export interface HeaderProps {
  logo?: ReactNode;
  actions?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  searchContent?: ReactNode;
  theme?: HeaderTheme;
  behavior?: HeaderBehavior;
  mobileMenu?: ReactNode;
  onVisibilityChange?: (visible: boolean) => void;
  className?: string;
}

export interface FooterProps {
  variant?: FooterVariant;
  behavior?: FooterBehavior;
  position?: FooterPosition;
  className?: string;
  children: ReactNode;
}

export interface FooterItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  className?: string;
}

export interface SafeAreaProps {
  edges?: SafeAreaEdge[];
  className?: string;
  children: ReactNode;
}

export interface ContentProps {
  className?: string;
  children: ReactNode;
}

export interface AppShellProps {
  safeArea?: boolean;
  className?: string;
  children: ReactNode;
}
```

**Step 6: Create packages/react/src/index.ts (minimal barrel)**

```ts
export { AppShell } from "./AppShell";
export { Header } from "./Header";
export { Footer, FooterItem } from "./Footer";
export { SafeArea } from "./SafeArea";
export { Content } from "./Content";
export { AppShellProvider, useAppShell } from "./context";
export { useScrollDirection } from "./hooks/use-scroll-direction";
export { useSafeArea } from "./hooks/use-safe-area";

export type {
  HeaderBehavior,
  HeaderTheme,
  HeaderProps,
  FooterVariant,
  FooterBehavior,
  FooterPosition,
  FooterProps,
  FooterItemProps,
  SafeAreaEdge,
  SafeAreaProps,
  ContentProps,
  AppShellProps,
  AppShellContextValue,
  ScrollDirection,
} from "./types";
```

**Step 7: Install dependencies and verify build config**

```bash
cd packages/react && pnpm install
```

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: set up @appshell/react package with tsup build"
```

---

## Phase 2: Core Components

### Task 2.1: Context & Hooks

**Files:**
- Create: `packages/react/src/context.ts`
- Create: `packages/react/src/hooks/use-scroll-direction.ts`
- Create: `packages/react/src/hooks/use-safe-area.ts`
- Test: `packages/react/__tests__/context.test.tsx`
- Test: `packages/react/__tests__/hooks/use-scroll-direction.test.ts`

**Step 1: Write failing test for AppShellContext**

Create `packages/react/__tests__/context.test.tsx`:

```tsx
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
    expect(() => render(<Consumer />)).toThrow();
  });
});
```

**Step 2: Create vitest config**

Create `packages/react/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./__tests__/setup.ts"],
    include: ["__tests__/**/*.test.{ts,tsx}"],
  },
});
```

Create `packages/react/__tests__/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

**Step 3: Run test to verify it fails**

```bash
cd packages/react && pnpm test
```

Expected: FAIL — module `../src/context` not found or no exports.

**Step 4: Implement AppShellContext**

Create `packages/react/src/context.ts`:

```tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { AppShellContextValue, ScrollDirection } from "./types";

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  const value = useMemo<AppShellContextValue>(
    () => ({
      headerVisible,
      footerVisible,
      scrollDirection,
      setHeaderVisible,
      setFooterVisible,
      _setScrollDirection: setScrollDirection,
    }),
    [headerVisible, footerVisible, scrollDirection]
  );

  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  );
}

export function useAppShell(): AppShellContextValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    throw new Error("useAppShell must be used within an <AppShellProvider>");
  }
  return ctx;
}
```

**Step 5: Run test to verify it passes**

```bash
cd packages/react && pnpm test
```

Expected: PASS

**Step 6: Implement use-scroll-direction hook**

Create `packages/react/src/hooks/use-scroll-direction.ts`:

```ts
"use client";

import { useEffect, useRef, useState } from "react";
import type { ScrollDirection } from "../types";

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastY.current;

        if (Math.abs(diff) >= threshold) {
          setDirection(diff > 0 ? "down" : "up");
          lastY.current = currentY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
```

**Step 7: Implement use-safe-area hook**

Create `packages/react/src/hooks/use-safe-area.ts`:

```ts
"use client";

import { useEffect, useState } from "react";
import type { SafeAreaEdge } from "../types";

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function useSafeArea(edges: SafeAreaEdge[] = ["top", "bottom", "left", "right"]): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const measure = () => {
      const style = getComputedStyle(document.documentElement);
      setInsets({
        top: edges.includes("top")
          ? parseFloat(style.getPropertyValue("env(safe-area-inset-top)") || "0")
          : 0,
        bottom: edges.includes("bottom")
          ? parseFloat(style.getPropertyValue("env(safe-area-inset-bottom)") || "0")
          : 0,
        left: edges.includes("left")
          ? parseFloat(style.getPropertyValue("env(safe-area-inset-left)") || "0")
          : 0,
        right: edges.includes("right")
          ? parseFloat(style.getPropertyValue("env(safe-area-inset-right)") || "0")
          : 0,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [edges]);

  return insets;
}
```

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add AppShellContext, useScrollDirection, useSafeArea"
```

---

### Task 2.2: SafeArea & Content components

**Files:**
- Create: `packages/react/src/SafeArea.tsx`
- Create: `packages/react/src/Content.tsx`
- Test: `packages/react/__tests__/SafeArea.test.tsx`
- Test: `packages/react/__tests__/Content.test.tsx`

**Step 1: Write failing test for SafeArea**

Create `packages/react/__tests__/SafeArea.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SafeArea } from "../src/SafeArea";

describe("SafeArea", () => {
  it("renders children", () => {
    render(<SafeArea>Hello</SafeArea>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies padding for all edges by default", () => {
    const { container } = render(<SafeArea>Content</SafeArea>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.paddingTop).toBe("env(safe-area-inset-top, 0px)");
    expect(el.style.paddingBottom).toBe("env(safe-area-inset-bottom, 0px)");
    expect(el.style.paddingLeft).toBe("env(safe-area-inset-left, 0px)");
    expect(el.style.paddingRight).toBe("env(safe-area-inset-right, 0px)");
  });

  it("applies padding only for specified edges", () => {
    const { container } = render(<SafeArea edges={["top", "bottom"]}>Content</SafeArea>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.paddingTop).toBe("env(safe-area-inset-top, 0px)");
    expect(el.style.paddingBottom).toBe("env(safe-area-inset-bottom, 0px)");
    expect(el.style.paddingLeft).toBe("");
    expect(el.style.paddingRight).toBe("");
  });

  it("applies custom className", () => {
    const { container } = render(<SafeArea className="custom">Content</SafeArea>);
    expect(container.firstElementChild).toHaveClass("custom");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
cd packages/react && pnpm test -- SafeArea
```

**Step 3: Implement SafeArea**

Create `packages/react/src/SafeArea.tsx`:

```tsx
import type { SafeAreaProps, SafeAreaEdge } from "./types";
import { cn } from "./cn";

const edgeMap: Record<SafeAreaEdge, string> = {
  top: "paddingTop",
  bottom: "paddingBottom",
  left: "paddingLeft",
  right: "paddingRight",
};

const envMap: Record<SafeAreaEdge, string> = {
  top: "env(safe-area-inset-top, 0px)",
  bottom: "env(safe-area-inset-bottom, 0px)",
  left: "env(safe-area-inset-left, 0px)",
  right: "env(safe-area-inset-right, 0px)",
};

export function SafeArea({
  edges = ["top", "bottom", "left", "right"],
  className,
  children,
}: SafeAreaProps) {
  const style: React.CSSProperties = {};
  for (const edge of edges) {
    (style as Record<string, string>)[edgeMap[edge]] = envMap[edge];
  }

  return (
    <div className={cn(className)} style={style}>
      {children}
    </div>
  );
}
```

**Step 4: Run test to verify it passes**

```bash
cd packages/react && pnpm test -- SafeArea
```

**Step 5: Write failing test for Content**

Create `packages/react/__tests__/Content.test.tsx`:

```tsx
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
```

**Step 6: Implement Content**

Create `packages/react/src/Content.tsx`:

```tsx
import type { ContentProps } from "./types";
import { cn } from "./cn";

export function Content({ className, children }: ContentProps) {
  return (
    <main className={cn("flex-1", className)}>
      {children}
    </main>
  );
}
```

**Step 7: Run all tests**

```bash
cd packages/react && pnpm test
```

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add SafeArea and Content components"
```

---

### Task 2.3: Header component (refactor from existing)

**Files:**
- Create: `packages/react/src/Header.tsx`
- Test: `packages/react/__tests__/Header.test.tsx`

**Step 1: Write failing tests for Header**

Create `packages/react/__tests__/Header.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "../src/Header";
import { AppShellProvider } from "../src/context";

function renderHeader(props = {}) {
  return render(
    <AppShellProvider>
      <Header {...props} />
    </AppShellProvider>
  );
}

describe("Header", () => {
  it("renders with default props", () => {
    renderHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders logo", () => {
    renderHeader({ logo: <span>MyApp</span> });
    expect(screen.getByText("MyApp")).toBeInTheDocument();
  });

  it("renders actions", () => {
    renderHeader({ actions: <button>Login</button> });
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders title and subtitle", () => {
    renderHeader({ title: "Dashboard", subtitle: "Overview" });
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("renders search content", () => {
    renderHeader({ searchContent: <input placeholder="Search..." /> });
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("applies light theme by default", () => {
    const { container } = renderHeader();
    const header = container.querySelector("header");
    expect(header?.className).toContain("bg-white");
  });

  it("applies dark theme", () => {
    const { container } = renderHeader({ theme: "dark" });
    const header = container.querySelector("header");
    expect(header?.className).toContain("bg-gray-900");
  });

  it("renders mobile menu toggle", () => {
    renderHeader({ mobileMenu: <nav>Menu</nav> });
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("toggles mobile menu on click", () => {
    renderHeader({ mobileMenu: <nav>Mobile Nav</nav> });
    const toggle = screen.getByLabelText("Open menu");
    fireEvent.click(toggle);
    expect(screen.getByText("Mobile Nav")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = renderHeader({ className: "my-header" });
    const header = container.querySelector("header");
    expect(header).toHaveClass("my-header");
  });

  describe("behaviors", () => {
    it("renders static header without sticky", () => {
      const { container } = renderHeader({ behavior: "static" });
      const header = container.querySelector("header");
      expect(header?.className).not.toContain("sticky");
    });

    it("renders fixed header with sticky", () => {
      const { container } = renderHeader({ behavior: "fixed" });
      const header = container.querySelector("header");
      expect(header?.className).toContain("sticky");
    });
  });
});
```

**Step 2: Run test to verify it fails**

```bash
cd packages/react && pnpm test -- Header
```

**Step 3: Implement Header**

Create `packages/react/src/Header.tsx`. This is a refactored version of the existing `header-section.tsx` from the v0 backup, adapted to use Framer Motion and the AppShell context:

```tsx
"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./cn";
import { useScrollDirection } from "./hooks/use-scroll-direction";
import type { HeaderProps, HeaderBehavior } from "./types";

const themeStyles = {
  light: {
    wrapper: "bg-white text-gray-900",
    nav: "bg-white/95 border-gray-200",
    context: "bg-white/95 border-gray-200",
    search: "bg-white/95 border-gray-200",
    mobile: "bg-white text-gray-900 border-gray-200",
  },
  primary: {
    wrapper: "bg-primary text-primary-foreground",
    nav: "bg-primary border-primary/80",
    context: "bg-primary border-primary/80",
    search: "bg-primary border-primary/80",
    mobile: "bg-primary text-primary-foreground border-primary/80",
  },
  dark: {
    wrapper: "bg-gray-900 text-white",
    nav: "bg-gray-900 border-gray-800",
    context: "bg-gray-900 border-gray-800",
    search: "bg-gray-900 border-gray-800",
    mobile: "bg-gray-900 text-white border-gray-800",
  },
} as const;

export function Header({
  logo,
  actions,
  title,
  subtitle,
  searchContent,
  theme = "light",
  behavior = "fixed",
  mobileMenu,
  onVisibilityChange,
  className,
}: HeaderProps) {
  const scrollDirection = useScrollDirection();
  const t = themeStyles[theme];
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dynamic threshold measurement
  const ghostRef = useRef<HTMLElement>(null);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const el = ghostRef.current;
    if (!el || behavior === "static" || behavior === "fixed") return;

    const measure = () => {
      if (behavior === "reveal-all" || behavior === "reveal-nav") {
        setThreshold(0);
      } else if (behavior === "reveal-context") {
        const nav = el.querySelector("[data-header-nav]");
        setThreshold(nav ? (nav as HTMLElement).offsetHeight : 0);
      } else if (behavior === "reveal-search") {
        const nav = el.querySelector("[data-header-nav]");
        const ctx = el.querySelector("[data-header-context]");
        const navH = nav ? (nav as HTMLElement).offsetHeight : 0;
        const ctxH = ctx ? (ctx as HTMLElement).offsetHeight : 0;
        setThreshold(navH + ctxH);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [behavior]);

  // Scroll threshold check
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    if (behavior === "static" || behavior === "fixed") return;

    const onScroll = () => {
      setIsPastThreshold(window.scrollY > threshold + 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [behavior, threshold]);

  // Visibility logic
  const hasRevealEffect = behavior.startsWith("reveal-");
  const isOverlayVisible =
    hasRevealEffect && scrollDirection === "up" && isPastThreshold;

  useEffect(() => {
    onVisibilityChange?.(behavior === "fixed" || !hasRevealEffect || isOverlayVisible);
  }, [isOverlayVisible, behavior, hasRevealEffect, onVisibilityChange]);

  const shouldShowInOverlay = useCallback(
    (row: "nav" | "context" | "search") => {
      if (behavior === "reveal-all") return true;
      if (behavior === "reveal-nav" && row === "nav") return true;
      if (behavior === "reveal-context" && row === "context") return true;
      if (behavior === "reveal-search" && row === "search") return true;
      return false;
    },
    [behavior]
  );

  // Mobile menu toggle
  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  // Sub-renders
  const MenuIcon = () => (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const NavRow = ({ isSticky = false }: { isSticky?: boolean }) => (
    <nav
      data-header-nav
      className={cn(
        "w-full border-b backdrop-blur-xl transition-colors",
        t.nav,
        isSticky && "sticky top-0 z-40"
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {mobileMenu && (
            <button
              type="button"
              className="p-1 rounded-md hover:bg-black/5 sm:hidden transition-colors"
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
          {logo}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </nav>
  );

  const ContextRow = () =>
    title || subtitle ? (
      <div
        data-header-context
        className={cn(
          "w-full border-b backdrop-blur-xl transition-colors relative z-30",
          t.context
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 flex flex-col justify-center py-4">
          {title && (
            <h1 className="text-base md:text-2xl font-bold leading-tight text-balance">
              {title}
            </h1>
          )}
          {subtitle && <p className="mt-1 text-sm opacity-80">{subtitle}</p>}
        </div>
      </div>
    ) : null;

  const SearchRow = () =>
    searchContent ? (
      <div
        data-header-search
        className={cn(
          "w-full border-b backdrop-blur-sm transition-colors relative z-20",
          t.search
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-2">
          {searchContent}
        </div>
      </div>
    ) : null;

  const MobileMenuPanel = () => (
    <AnimatePresence>
      {mobileMenu && mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "sm:hidden overflow-hidden border-t w-full",
            t.mobile
          )}
        >
          <div className="px-4 pb-4 pt-2">{mobileMenu}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // RENDER: fixed
  if (behavior === "fixed") {
    return (
      <header
        className={cn(
          "w-full sticky top-0 z-50 transition-colors duration-300",
          t.wrapper,
          className
        )}
      >
        <NavRow />
        <ContextRow />
        <SearchRow />
        <MobileMenuPanel />
      </header>
    );
  }

  // RENDER: static / reveal-*
  return (
    <>
      <header
        ref={ghostRef}
        className={cn(
          "w-full relative z-50 transition-colors duration-300",
          t.wrapper,
          className
        )}
      >
        <NavRow isSticky={behavior !== "static"} />
        <ContextRow />
        <SearchRow />
        <MobileMenuPanel />
      </header>

      {hasRevealEffect && (
        <AnimatePresence>
          {isOverlayVisible && (
            <motion.div
              key="header-overlay"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
              className={cn(
                "fixed top-0 left-0 right-0 z-[60] shadow-lg",
                t.wrapper
              )}
            >
              {shouldShowInOverlay("nav") && <NavRow />}
              {shouldShowInOverlay("context") && <ContextRow />}
              {shouldShowInOverlay("search") && <SearchRow />}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
```

**Step 4: Run tests**

```bash
cd packages/react && pnpm test -- Header
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Header component with 6 scroll behaviors and Framer Motion"
```

---

### Task 2.4: Footer component (TabBar, Floating, Mini)

**Files:**
- Create: `packages/react/src/Footer.tsx`
- Test: `packages/react/__tests__/Footer.test.tsx`

**Step 1: Write failing tests for Footer**

Create `packages/react/__tests__/Footer.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer, FooterItem } from "../src/Footer";
import { AppShellProvider } from "../src/context";

function renderFooter(props: any = {}, children?: any) {
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

    it("renders with safe area padding", () => {
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
```

**Step 2: Run test to verify failure**

```bash
cd packages/react && pnpm test -- Footer
```

**Step 3: Implement Footer**

Create `packages/react/src/Footer.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./cn";
import { useScrollDirection } from "./hooks/use-scroll-direction";
import type { FooterProps, FooterItemProps } from "./types";

export function FooterItem({
  icon,
  label,
  active = false,
  badge,
  onClick,
  className,
}: FooterItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors relative",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <span className="relative">
        {icon}
        {badge != null && badge > 0 && (
          <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </span>
      <span className="text-[10px] font-medium leading-tight">{label}</span>
      {active && (
        <motion.div
          layoutId="footer-active-indicator"
          className="absolute -bottom-0.5 h-0.5 w-4 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}

export function Footer({
  variant = "tab-bar",
  behavior = "static",
  position = "center",
  className,
  children,
}: FooterProps) {
  const scrollDirection = useScrollDirection();
  const shouldHide = behavior === "auto-hide" && scrollDirection === "down";

  if (variant === "floating") {
    const positionClass = {
      center: "justify-center",
      left: "justify-start pl-4",
      right: "justify-end pr-4",
    }[position];

    return (
      <div
        data-footer-floating
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex pb-6 pointer-events-none",
          positionClass,
          className
        )}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
      >
        <AnimatePresence>
          {!shouldHide && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "mini") {
    return (
      <AnimatePresence>
        {!shouldHide && (
          <motion.footer
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            exit={{ y: 48 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 h-12 border-t bg-background/95 backdrop-blur-xl",
              className
            )}
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="mx-auto flex h-full max-w-7xl items-center px-4">
              {children}
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    );
  }

  // tab-bar (default)
  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.footer
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-xl",
            className
          )}
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="mx-auto flex max-w-lg items-stretch">
            {children}
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}
```

**Step 4: Run tests**

```bash
cd packages/react && pnpm test -- Footer
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Footer component with tab-bar, floating, and mini variants"
```

---

### Task 2.5: AppShell wrapper component

**Files:**
- Create: `packages/react/src/AppShell.tsx`
- Test: `packages/react/__tests__/AppShell.test.tsx`

**Step 1: Write failing test**

Create `packages/react/__tests__/AppShell.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppShell } from "../src/AppShell";
import { Header } from "../src/Header";
import { Content } from "../src/Content";
import { Footer, FooterItem } from "../src/Footer";

describe("AppShell", () => {
  it("renders children in correct order", () => {
    const { container } = render(
      <AppShell>
        <Header logo={<span>Logo</span>} />
        <Content>Page</Content>
        <Footer variant="tab-bar">
          <FooterItem icon={<span>H</span>} label="Home" />
        </Footer>
      </AppShell>
    );
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Page")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("wraps with SafeArea when safeArea=true", () => {
    const { container } = render(
      <AppShell safeArea>
        <Content>Content</Content>
      </AppShell>
    );
    // The outermost div should have safe area padding styles
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.paddingTop).toBe("env(safe-area-inset-top, 0px)");
  });

  it("renders without SafeArea by default", () => {
    const { container } = render(
      <AppShell>
        <Content>Content</Content>
      </AppShell>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.paddingTop).toBe("");
  });

  it("provides AppShell context to children", () => {
    // If no error is thrown, context is provided
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
    expect(container.firstElementChild).toHaveClass("my-shell");
  });
});
```

**Step 2: Implement AppShell**

Create `packages/react/src/AppShell.tsx`:

```tsx
"use client";

import { cn } from "./cn";
import { AppShellProvider } from "./context";
import { SafeArea } from "./SafeArea";
import type { AppShellProps } from "./types";

function AppShellInner({ safeArea = false, className, children }: AppShellProps) {
  const content = (
    <div className={cn("flex min-h-dvh flex-col", className)}>
      {children}
    </div>
  );

  if (safeArea) {
    return <SafeArea edges={["top", "bottom"]}>{content}</SafeArea>;
  }

  return content;
}

export function AppShell(props: AppShellProps) {
  return (
    <AppShellProvider>
      <AppShellInner {...props} />
    </AppShellProvider>
  );
}

// Attach sub-components for compound API
AppShell.displayName = "AppShell";
```

**Step 3: Run all tests**

```bash
cd packages/react && pnpm test
```

**Step 4: Verify library builds**

```bash
cd packages/react && pnpm build
```

Expected: `dist/` folder with `index.js`, `index.cjs`, `index.d.ts`

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add AppShell wrapper with SafeArea integration and context"
```

---

## Phase 3: Examples App

### Task 3.1: Set up examples app with Next.js

**Files:**
- Create: `apps/examples/package.json`
- Create: `apps/examples/next.config.mjs`
- Create: `apps/examples/tsconfig.json`
- Create: `apps/examples/postcss.config.mjs`
- Create: `apps/examples/app/layout.tsx`
- Create: `apps/examples/app/globals.css`
- Create: `apps/examples/app/page.tsx`

**Step 1: Create apps/examples/package.json**

```json
{
  "name": "@appshell/examples",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start --port 3001",
    "lint": "eslint ."
  },
  "dependencies": {
    "@appshell/react": "workspace:*",
    "framer-motion": "^12.6.0",
    "lucide-react": "^0.564.0",
    "next": "^16.1.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "postcss": "^8.5.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.3"
  }
}
```

**Step 2: Create next.config.mjs**

```js
/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  transpilePackages: ["@appshell/react"],
};

export default config;
```

**Step 3: Create postcss.config.mjs**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@appshell/react": ["../../packages/react/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 5: Create app/globals.css**

Copy the CSS variables from `_v0-backup/app/globals.css` into `apps/examples/app/globals.css`. Same Tailwind v4 setup with shadcn-style CSS variables (--background, --foreground, --primary, etc.).

**Step 6: Create app/layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppShell Examples",
  description: "Fullscreen examples of @appshell/react components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

**Step 7: Create app/page.tsx (example picker)**

```tsx
import Link from "next/link";

const examples = [
  { slug: "social-app", title: "Social App", desc: "Instagram/Twitter style with reveal-nav header and auto-hide tab bar" },
  { slug: "ecommerce", title: "E-commerce", desc: "Shopify style with fixed header and floating cart button" },
  { slug: "messaging", title: "Messaging", desc: "WhatsApp style with static header and mini input bar" },
  { slug: "music-player", title: "Music Player", desc: "Spotify style with reveal-all header and mini now-playing bar" },
  { slug: "dashboard", title: "Dashboard", desc: "Admin panel with fixed header and static tab bar" },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">AppShell Examples</h1>
        <p className="text-muted-foreground mb-8">Fullscreen demos of every variant combination.</p>
        <div className="space-y-3">
          {examples.map((ex) => (
            <Link
              key={ex.slug}
              href={`/${ex.slug}`}
              className="block rounded-xl border bg-card p-5 hover:bg-accent transition-colors"
            >
              <h2 className="font-semibold">{ex.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{ex.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: set up examples app with Next.js and example picker"
```

---

### Task 3.2: Social App example (reveal-nav + auto-hide tab bar)

**Files:**
- Create: `apps/examples/app/social-app/page.tsx`

**Step 1: Create the Social App example**

```tsx
"use client";

import { useState } from "react";
import { AppShell, Header, Content, Footer, FooterItem } from "@appshell/react";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

export default function SocialAppExample() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-nav"
        theme="light"
        logo={<span className="text-lg font-bold tracking-tight">socialapp</span>}
        actions={
          <div className="flex items-center gap-3">
            <Heart className="size-5" />
            <div className="size-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400" />
          </div>
        }
        searchContent={
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border border-border bg-muted/50 py-2 px-4 text-sm outline-none placeholder:text-muted-foreground"
          />
        }
      />

      <Content className="pb-20">
        <div className="mx-auto max-w-lg px-4 py-4 space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="rounded-xl border bg-card overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                <div>
                  <div className="h-3.5 w-24 rounded bg-muted" />
                  <div className="h-2.5 w-16 rounded bg-muted mt-1" />
                </div>
              </div>
              <div className="aspect-square bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </Content>

      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home className="size-5" />} label="Home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <FooterItem icon={<Search className="size-5" />} label="Explore" active={activeTab === "explore"} onClick={() => setActiveTab("explore")} />
        <FooterItem icon={<PlusSquare className="size-5" />} label="Create" active={activeTab === "create"} onClick={() => setActiveTab("create")} />
        <FooterItem icon={<Heart className="size-5" />} label="Activity" active={activeTab === "activity"} onClick={() => setActiveTab("activity")} />
        <FooterItem icon={<User className="size-5" />} label="Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
      </Footer>
    </AppShell>
  );
}
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add social app fullscreen example"
```

---

### Task 3.3: E-commerce example (fixed + floating)

**Files:**
- Create: `apps/examples/app/ecommerce/page.tsx`

Create the e-commerce example with fixed header (title + search), floating cart button, product grid with skeleton cards. Follow the same pattern as social app.

**Commit:**
```bash
git add -A
git commit -m "feat: add e-commerce fullscreen example"
```

---

### Task 3.4: Messaging example (static + mini)

**Files:**
- Create: `apps/examples/app/messaging/page.tsx`

Create the messaging example with static header (context row showing chat partner name), mini footer with text input. Chat bubble skeleton content.

**Commit:**
```bash
git add -A
git commit -m "feat: add messaging fullscreen example"
```

---

### Task 3.5: Music Player example (reveal-all + mini)

**Files:**
- Create: `apps/examples/app/music-player/page.tsx`

Create the music player example with reveal-all header, mini now-playing footer bar with play/pause controls. Track list skeleton content.

**Commit:**
```bash
git add -A
git commit -m "feat: add music player fullscreen example"
```

---

### Task 3.6: Dashboard example (fixed + static tab-bar)

**Files:**
- Create: `apps/examples/app/dashboard/page.tsx`

Create the dashboard example with fixed header, static tab-bar footer. Dashboard cards skeleton content.

**Commit:**
```bash
git add -A
git commit -m "feat: add dashboard fullscreen example"
```

---

## Phase 4: Documentation Site (Fumadocs)

### Task 4.1: Initialize Fumadocs app

**Files:**
- Create: `apps/docs/package.json`
- Create: `apps/docs/next.config.mjs`
- Create: `apps/docs/source.config.ts`
- Create: `apps/docs/app/layout.tsx`
- Create: `apps/docs/app/layout.config.tsx`
- Create: `apps/docs/app/docs/layout.tsx`
- Create: `apps/docs/app/docs/[[...slug]]/page.tsx`
- Create: `apps/docs/app/page.tsx` (landing)
- Create: `apps/docs/tsconfig.json`
- Create: `apps/docs/postcss.config.mjs`

**Step 1: Create apps/docs/package.json**

```json
{
  "name": "@appshell/docs",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3002",
    "build": "next build",
    "start": "next start --port 3002",
    "lint": "eslint ."
  },
  "dependencies": {
    "@appshell/react": "workspace:*",
    "framer-motion": "^12.6.0",
    "fumadocs-core": "^15.0.0",
    "fumadocs-mdx": "^11.0.0",
    "fumadocs-ui": "^15.0.0",
    "lucide-react": "^0.564.0",
    "next": "^16.1.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "@types/mdx": "^2.0.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "postcss": "^8.5.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.3"
  }
}
```

**Step 2: Create source.config.ts**

```ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig();
```

**Step 3: Create next.config.mjs**

```js
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  transpilePackages: ["@appshell/react"],
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
```

**Step 4: Set up app/layout.tsx, app/layout.config.tsx, docs layout, docs page**

Follow Fumadocs standard setup with source config. The layout.config.tsx defines the sidebar navigation and links. The docs layout wraps content with `DocsLayout` from fumadocs-ui. The `[[...slug]]/page.tsx` renders MDX pages.

**Step 5: Create landing page (app/page.tsx)**

Create a hero section with:
- AppShell logo and tagline
- Install command: `pnpm add @appshell/react`
- Feature grid (Header, Footer, SafeArea, Context)
- Links to docs and examples

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: set up Fumadocs documentation site"
```

---

### Task 4.2: Write documentation MDX pages

**Files:**
- Create: `apps/docs/content/docs/index.mdx` (getting started)
- Create: `apps/docs/content/docs/components/header.mdx`
- Create: `apps/docs/content/docs/components/footer.mdx`
- Create: `apps/docs/content/docs/components/safe-area.mdx`
- Create: `apps/docs/content/docs/components/app-shell.mdx`
- Create: `apps/docs/content/docs/hooks.mdx`
- Create: `apps/docs/content/docs/theming.mdx`
- Create: `apps/docs/content/docs/examples.mdx`
- Create: `apps/docs/content/docs/meta.json` (sidebar order)

Each MDX page should contain:
1. Title and description frontmatter
2. Installation/import instructions
3. Props table (manual markdown table matching TypeScript types)
4. Usage examples with code blocks
5. Variant documentation (for Header behaviors, Footer variants)
6. iframe embed of relevant fullscreen example from examples app

The `meta.json` controls sidebar ordering:

```json
{
  "pages": [
    "---Getting Started---",
    "index",
    "---Components---",
    "components/app-shell",
    "components/header",
    "components/footer",
    "components/safe-area",
    "---API---",
    "hooks",
    "theming",
    "---Demos---",
    "examples"
  ]
}
```

**Commit after each page or batch:**

```bash
git add -A
git commit -m "docs: add component documentation pages"
```

---

## Phase 5: E2E Tests

### Task 5.1: Set up Playwright

**Files:**
- Create: `e2e/playwright.config.ts`
- Create: `e2e/package.json`

**Step 1: Create e2e/package.json**

```json
{
  "name": "@appshell/e2e",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui"
  },
  "devDependencies": {
    "@playwright/test": "^1.52.0"
  }
}
```

**Step 2: Create e2e/playwright.config.ts**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "pnpm --filter @appshell/examples dev",
    port: 3001,
    reuseExistingServer: !process.env.CI,
    cwd: "..",
  },
});
```

**Step 3: Install Playwright**

```bash
cd e2e && pnpm install && pnpm exec playwright install chromium
```

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: set up Playwright E2E test infrastructure"
```

---

### Task 5.2: Header behavior E2E tests

**Files:**
- Create: `e2e/header-behaviors.spec.ts`

```ts
import { test, expect } from "@playwright/test";

test.describe("Header behaviors", () => {
  test("fixed header stays visible on scroll", async ({ page }) => {
    await page.goto("/dashboard");
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);

    await expect(header).toBeVisible();
  });

  test("reveal-nav header hides on scroll down, reveals on scroll up", async ({ page }) => {
    await page.goto("/social-app");

    // Scroll down — header should hide
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);

    // Scroll up — overlay should appear
    await page.evaluate(() => window.scrollBy(0, -200));
    await page.waitForTimeout(500);

    const overlay = page.locator("[aria-hidden]").first();
    await expect(overlay).toBeVisible();
  });

  test("static header scrolls away with content", async ({ page }) => {
    await page.goto("/messaging");
    const header = page.locator("header").first();

    const initialBox = await header.boundingBox();
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(300);

    const scrolledBox = await header.boundingBox();
    if (initialBox && scrolledBox) {
      expect(scrolledBox.y).toBeLessThan(initialBox.y);
    }
  });
});
```

**Commit:**
```bash
git add -A
git commit -m "test: add header behavior E2E tests"
```

---

### Task 5.3: Footer E2E tests

**Files:**
- Create: `e2e/footer-variants.spec.ts`

Test auto-hide on scroll, tab navigation clicks, floating button visibility, mini bar persistence.

**Commit:**
```bash
git add -A
git commit -m "test: add footer variant E2E tests"
```

---

### Task 5.4: Responsive E2E tests

**Files:**
- Create: `e2e/responsive.spec.ts`

Test mobile breakpoint shows hamburger menu, desktop hides it. Mobile menu opens/closes. Tab bar renders on mobile. Use the mobile-chrome project.

**Commit:**
```bash
git add -A
git commit -m "test: add responsive layout E2E tests"
```

---

## Phase 6: CI/CD & Open Source Files

### Task 6.1: GitHub Actions CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo build
      - run: pnpm turbo test
      - run: pnpm turbo lint
      - name: Install Playwright
        run: cd e2e && pnpm exec playwright install --with-deps chromium
      - name: Run E2E tests
        run: cd e2e && pnpm test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: e2e/playwright-report/
```

**Commit:**
```bash
git add -A
git commit -m "ci: add GitHub Actions CI workflow"
```

---

### Task 6.2: GitHub Pages docs deployment

**Files:**
- Create: `.github/workflows/docs.yml`

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: apps/docs/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Commit:**
```bash
git add -A
git commit -m "ci: add GitHub Pages docs deployment workflow"
```

---

### Task 6.3: npm release workflow

**Files:**
- Create: `.github/workflows/release.yml`

Triggered on git tag push (`v*`). Builds the library, runs tests, publishes to npm with `NPM_TOKEN` secret, creates GitHub Release.

**Commit:**
```bash
git add -A
git commit -m "ci: add npm release workflow"
```

---

### Task 6.4: Open source files

**Files:**
- Create: `LICENSE` (MIT)
- Create: `README.md`
- Create: `CONTRIBUTING.md`
- Update: `.gitignore`

**Step 1: Create LICENSE**

MIT License with current year.

**Step 2: Create README.md**

Standard open source README:
- Hero banner/logo
- One-line description
- Installation (`pnpm add @appshell/react`)
- Quick start code example
- Features list (Header behaviors, Footer variants, SafeArea, Context)
- Link to docs site
- Link to examples
- Contributing link
- License badge

**Step 3: Create CONTRIBUTING.md**

- How to set up local dev (`pnpm install`, `pnpm dev`)
- How to run tests (`pnpm test`, `pnpm test:e2e`)
- PR guidelines
- Code style (Tailwind, Framer Motion conventions)

**Step 4: Update .gitignore**

Add monorepo-specific entries: `node_modules`, `dist`, `.next`, `out`, `.turbo`, `playwright-report`, `test-results`.

**Step 5: Commit**

```bash
git add -A
git commit -m "docs: add README, LICENSE, CONTRIBUTING, and update gitignore"
```

---

## Phase 7: Final Verification

### Task 7.1: Full build and test sweep

**Step 1:** Run full monorepo build:
```bash
pnpm install && pnpm turbo build
```

**Step 2:** Run all unit tests:
```bash
pnpm turbo test
```

**Step 3:** Run E2E tests:
```bash
cd e2e && pnpm test
```

**Step 4:** Verify docs site builds and examples app builds for static export.

**Step 5:** Manual smoke test — run `pnpm dev` and check each example in browser.

---

## Execution Order Summary

| Phase | Tasks | Estimated commits |
|-------|-------|-------------------|
| 1. Monorepo Scaffolding | 1.1, 1.2 | 2 |
| 2. Core Components | 2.1–2.5 | 5 |
| 3. Examples App | 3.1–3.6 | 6 |
| 4. Documentation | 4.1–4.2 | 2 |
| 5. E2E Tests | 5.1–5.4 | 4 |
| 6. CI/CD & OSS | 6.1–6.4 | 4 |
| 7. Final Verification | 7.1 | 0 |
| **Total** | **23 tasks** | **~23 commits** |
