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
