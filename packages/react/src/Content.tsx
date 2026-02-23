import { memo } from "react";
import type { ContentProps } from "./types";
import { cn } from "./cn";

export const Content = memo(function Content({ className, children }: ContentProps) {
  return (
    <main className={cn("flex-1", className)}>
      {children}
    </main>
  );
});
