"use client";

import {
  memo,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { cn } from "./cn";
import { useMotion } from "./motion";
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

export const Header = memo(function Header({
  logo,
  actions,
  nav,
  title,
  subtitle,
  searchContent,
  theme = "light",
  behavior = "fixed",
  mobileMenu,
  onVisibilityChange,
  className,
}: HeaderProps) {
  const { motion, AnimatePresence } = useMotion();
  const scrollDirection = useScrollDirection();
  const t = themeStyles[theme];
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

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
              className="p-1 rounded-md hover:bg-black/5 md:hidden transition-colors"
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
          {logo}
        </div>
        {nav && <div className="hidden md:flex items-center">{nav}</div>}
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
            "md:hidden overflow-hidden border-t w-full",
            t.mobile
          )}
        >
          <div className="px-4 pb-4 pt-2">{mobileMenu}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );

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
});
