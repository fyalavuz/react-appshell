import { memo } from "react";
import { cn } from "./cn";
import type { NavItemProps } from "./types";

export const NavItem = memo(function NavItem({
  href,
  icon,
  label,
  active = false,
  badge,
  onClick,
  className,
}: NavItemProps) {
  const classes = cn(
    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
    active
      ? "bg-primary/10 text-primary font-medium"
      : "text-muted-foreground hover:bg-accent hover:text-foreground",
    className
  );

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge && <span className="shrink-0">{badge}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
});
