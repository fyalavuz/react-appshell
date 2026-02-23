"use client";

import React, {
  createContext,
  useContext,
  type ReactNode,
  type ForwardRefExoticComponent,
} from "react";
import { cssMotionAdapter } from "./motion-css";

/** Shape that both framer-motion and CSS fallback adapters satisfy. */
export interface MotionAdapter {
  AnimatePresence: React.ComponentType<any>;
  motion: {
    div: ForwardRefExoticComponent<any>;
    footer: ForwardRefExoticComponent<any>;
    nav: ForwardRefExoticComponent<any>;
  };
}

const MotionContext = createContext<MotionAdapter | null>(null);

/**
 * Provide a MotionAdapter to enable richer animations.
 *
 * Without this provider, all components use CSS transitions (zero JS animation deps).
 *
 * @example
 * import { framerMotionAdapter } from "@appshell/react/motion-framer";
 * <MotionProvider adapter={framerMotionAdapter}>
 *   <AppShell>…</AppShell>
 * </MotionProvider>
 */
export function MotionProvider({
  adapter,
  children,
}: {
  adapter: MotionAdapter;
  children: ReactNode;
}) {
  return (
    <MotionContext.Provider value={adapter}>{children}</MotionContext.Provider>
  );
}

/** Returns the active motion adapter (framer-motion or CSS fallback). */
export function useMotion(): MotionAdapter {
  return useContext(MotionContext) ?? cssMotionAdapter;
}
