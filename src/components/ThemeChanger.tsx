"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

export interface ThemeProps {
  children: ReactNode;
}

export const ThemeChanger = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <Sun className="cursor-pointer" onClick={() => setTheme("light")} />
      ) : (
        <Moon className="cursor-pointer" onClick={() => setTheme("dark")} />
      )}
    </div>
  );
};
