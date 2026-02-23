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
        "flex items-center gap-1 overflow-x-auto scrollbar-hide border-b border-border px-4",
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
        "shrink-0 px-3 py-2.5 text-sm transition-colors",
        active
          ? "text-primary border-b-2 border-primary font-medium"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {label}
    </button>
  );
});
