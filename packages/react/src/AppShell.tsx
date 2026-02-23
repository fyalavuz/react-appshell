"use client";

import { memo } from "react";
import { cn } from "./cn";
import { AppShellProvider } from "./context";
import { SafeArea } from "./SafeArea";
import type { AppShellProps } from "./types";

function AppShellInner({ safeArea = false, className, children }: AppShellProps) {
  const content = (
    <div className={cn("flex min-h-dvh flex-col", className)}>
      {children}
    </div>
  );

  if (safeArea) {
    return <SafeArea edges={["top", "bottom"]}>{content}</SafeArea>;
  }

  return content;
}

export const AppShell = memo(function AppShell(props: AppShellProps) {
  return (
    <AppShellProvider>
      <AppShellInner {...props} />
    </AppShellProvider>
  );
});

AppShell.displayName = "AppShell";
