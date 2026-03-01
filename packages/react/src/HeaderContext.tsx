"use client";

import { createContext, useContext } from "react";
import type { HeaderTheme } from "./types";

interface HeaderContextValue {
  theme: HeaderTheme;
}

const HeaderContext = createContext<HeaderContextValue>({ theme: "light" });

export const HeaderProvider = HeaderContext.Provider;

export const useHeaderTheme = () => useContext(HeaderContext).theme;
