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
      className={cn(
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer",
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
