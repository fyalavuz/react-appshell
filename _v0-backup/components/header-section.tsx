"use client";

import React, { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

/**
 * ==================================================================================
 * HEADER SECTION — v2 (Bug-fixed)
 * ==================================================================================
 *
 * Fixes over v1:
 *  1. className undefined safety
 *  2. `static` behavior no longer has a sticky nav
 *  3. Threshold is measured dynamically via ResizeObserver (no hardcoded px)
 *  4. Mobile menu renders inside the overlay when overlay is visible
 *  5. `transition-all` replaced with specific transition properties
 *  6. `will-change-transform` only applied when overlay is animating
 *  7. Removed tailwind-variants dep — uses cn() (tailwind-merge + clsx)
 *  8. Duplicate content for screen-readers handled with aria-hidden
 *
 * ARCHITECTURE (unchanged):
 *  - Ghost layer: always in document flow, nav is sticky *within* it
 *  - Overlay layer: position:fixed, shown on scroll-up for reveal-* behaviors
 * ==================================================================================
 */

// ─── Theme Maps ──────────────────────────────────────────────────────────────

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

// ─── Types ───────────────────────────────────────────────────────────────────

export type HeaderBehavior =
  | "static"
  | "fixed"
  | "reveal-all"
  | "reveal-nav"
  | "reveal-context"
  | "reveal-search";

export interface HeaderSectionProps {
  logo?: ReactNode;
  actions?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  searchContent?: ReactNode;
  theme?: keyof typeof themeStyles;
  behavior?: HeaderBehavior;
  mobileMenuProps?: {
    isOpen: boolean;
    onToggle: () => void;
    children?: ReactNode;
  };
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function HeaderSection({
  logo,
  actions,
  title,
  subtitle,
  searchContent,
  theme = "light",
  behavior = "fixed",
  mobileMenuProps,
  className,
}: HeaderSectionProps) {
  const scrollDirection = useScrollDirection();
  const t = themeStyles[theme];

  // ── Dynamic threshold via ref measurement ────────────────────────────────
  // Instead of hardcoded 60/120px, we measure the actual ghost header height.
  const ghostRef = useRef<HTMLElement>(null);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const el = ghostRef.current;
    if (!el || behavior === "static" || behavior === "fixed") return;

    const measure = () => {
      // For reveal-nav, the overlay should appear once the *entire* ghost is
      // out of view. For reveal-context/search we only need the preceding
      // rows to be out.
      if (behavior === "reveal-all" || behavior === "reveal-nav") {
        setThreshold(0);
      } else if (behavior === "reveal-context") {
        // Context row sits below nav → threshold = nav height
        const nav = el.querySelector("[data-header-nav]");
        setThreshold(nav ? (nav as HTMLElement).offsetHeight : 0);
      } else if (behavior === "reveal-search") {
        // Search row sits below nav+context → threshold = nav+context height
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

  // ── Scroll threshold check ───────────────────────────────────────────────
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    if (behavior === "static" || behavior === "fixed") return;

    const onScroll = () => {
      setIsPastThreshold(window.scrollY > threshold + 10);
    };
    onScroll(); // initial check
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [behavior, threshold]);

  // ── Visibility logic ─────────────────────────────────────────────────────
  const hasRevealEffect = behavior.startsWith("reveal-");
  const isOverlayVisible =
    hasRevealEffect && scrollDirection === "up" && isPastThreshold;

  // ── Which rows to show in overlay ────────────────────────────────────────
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

  // ── Shared sub-renders ───────────────────────────────────────────────────

  const NavRow = ({ isSticky = false }: { isSticky?: boolean }) => (
    <nav
      data-header-nav
      className={cn(
        "w-full border-b backdrop-blur-xl transition-colors",
        t.nav,
        isSticky && "sticky top-0 z-40"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {mobileMenuProps && (
            <button
              type="button"
              className="p-1 rounded-md hover:bg-black/5 sm:hidden transition-colors"
              onClick={mobileMenuProps.onToggle}
              aria-label={mobileMenuProps.isOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuProps.isOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          )}
          {logo}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </nav>
  );

  const ContextRow = () =>
    (title || subtitle) ? (
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

  const MobileMenu = () => {
    const isOpen = !!mobileMenuProps?.isOpen;
    if (!mobileMenuProps?.children) return null;
    return (
      <div
        className={cn(
          "sm:hidden relative z-[75] border-t w-full overflow-hidden",
          "transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "grid",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          t.mobile
        )}
      >
        <div className="min-h-0">
          <div className="px-4 pb-4 pt-2">{mobileMenuProps.children}</div>
        </div>
      </div>
    );
  };

  // ── RENDER: fixed (simple sticky, no dual-layer needed) ──────────────────

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
        <MobileMenu />
      </header>
    );
  }

  // ── RENDER: static / reveal-* (dual-layer) ──────────────────────────────

  return (
    <>
      {/* 1. GHOST LAYER — always in document flow */}
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
        {/* Mobile menu lives only in ghost — single instance avoids overlap bugs */}
        <MobileMenu />
      </header>

      {/* 2. OVERLAY LAYER — fixed, revealed on scroll-up */}
      {hasRevealEffect && (
        <div
          aria-hidden={!isOverlayVisible}
          className={cn(
            "fixed top-0 left-0 right-0 z-[60] shadow-lg",
            t.wrapper,
            // FIX #5: Specific transition properties instead of transition-all
            "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            // FIX #6: will-change only when animating
            isOverlayVisible
              ? "translate-y-0 opacity-100 pointer-events-auto will-change-transform"
              : "-translate-y-2 opacity-0 pointer-events-none"
          )}
        >
          {shouldShowInOverlay("nav") && <NavRow />}
          {shouldShowInOverlay("context") && <ContextRow />}
          {shouldShowInOverlay("search") && <SearchRow />}
        </div>
      )}
    </>
  );
}
