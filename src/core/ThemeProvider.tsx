"use client";

const Theme = dynamic(() => import("~/components/ThemeChanger").then((mod) => mod.ThemeChanger), {
  ssr: false
});
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
};

export const ThemeChanger = Theme;

export default ThemeProvider;
