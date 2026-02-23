"use client";

import { useEffect, useState } from "react";
import type { SafeAreaEdge } from "../types";

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function useSafeArea(edges: SafeAreaEdge[] = ["top", "bottom", "left", "right"]): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const measure = () => {
      const style = getComputedStyle(document.documentElement);
      setInsets({
        top: edges.includes("top")
          ? parseFloat(style.getPropertyValue("env(safe-area-inset-top)") || "0")
          : 0,
        bottom: edges.includes("bottom")
          ? parseFloat(style.getPropertyValue("env(safe-area-inset-bottom)") || "0")
          : 0,
        left: edges.includes("left")
          ? parseFloat(style.getPropertyValue("env(safe-area-inset-left)") || "0")
          : 0,
        right: edges.includes("right")
          ? parseFloat(style.getPropertyValue("env(safe-area-inset-right)") || "0")
          : 0,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [edges]);

  return insets;
}
