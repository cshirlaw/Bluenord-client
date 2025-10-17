import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* --- Core brand scale (kept) ------------------------------------- */
        brand: {
          DEFAULT: "#0A3D91",
          50:  "#EEF3FB",
          100: "#DCE7F6",
          200: "#B7CEF0",
          300: "#8CB3E7",
          400: "#5A90D9",
          500: "#2D6EC8",
          600: "#1F56A9",
          700: "#184484",
          800: "#123362",
          900: "#0C2547",
          deep:   "#0A2A6A",
          accent: "#00A3E0",
          light:  "#8CE0FF",
        },
        ink: {
          heading: "#0A2A4A",
          body:    "#0f172a",
          muted:   "#475569",
        },
        surface: {
          card:   "#FFFFFF",
          tint:   "#F7FAFF",
          overlay: "rgba(10,42,106,0.08)",
        },
        line: {
          DEFAULT: "#E5E7EB",
          strong:  "#C7D2E1",
        },
        nav: { bg: "rgba(10,42,106,0.85)" },
      },

      // Optional: tweak default prose styles slightly
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.ink.body"),
            h1: { color: theme("colors.ink.heading") },
            h2: { color: theme("colors.ink.heading") },
            h3: { color: theme("colors.ink.heading") },
            a:  { color: theme("colors.brand.700"), textDecoration: "none" },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;