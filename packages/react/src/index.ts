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
