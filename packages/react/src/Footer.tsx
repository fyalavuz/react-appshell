"use client";

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
