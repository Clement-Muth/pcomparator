"use client";

import { useEffect, useState } from "react";

export const Meta = () => {
  const [themeColor, setThemeColor] = useState("#eef2ff");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e: any) => {
      if (e.matches) setThemeColor("#1f121b");
      else setThemeColor("#eef2ff");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    handleThemeChange(mediaQuery);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return <meta name="theme-color" content={themeColor} />;
};
