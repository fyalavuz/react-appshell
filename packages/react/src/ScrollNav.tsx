"use client";

import { memo } from "react";
import { cn } from "./cn";
import type { ScrollNavProps, ScrollNavItemProps } from "./types";

export const ScrollNav = memo(function ScrollNav({
  className,
  children,
}: ScrollNavProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto scrollbar-hide",
        className
      )}
    >
      {children}
    </div>
  );
});

export const ScrollNavItem = memo(function ScrollNavItem({
  label,
  active = false,
  onClick,
  className,
}: ScrollNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active || undefined}
      className={cn(
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        active
          ? "bg-foreground text-background shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        className
      )}
    >
      {label}
    </button>
  );
});
