import type { Config } from "tailwindcss"
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#d3d3ff",
            "50": "#f3f3ff",
            "100": "#e9e8ff",
            "200": "#d3d3ff",
            "300": "#b6b3ff",
            "400": "#9288fd",
            "500": "#6e58fa",
            "600": "#5a36f1",
            "700": "#4c24dd",
            "800": "#3f1dba",
            "900": "#351a98"
          }
        }
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#E6FAFE"
          }
        }
      }
    }
  })]
}

export default config