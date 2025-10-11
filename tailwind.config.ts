import type { Config } from "tailwindcss";

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
          DEFAULT: "#0A3D91", // primary BlueNord colour (existing)
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

          /* --- Subtle additions from approved design -------------------- */
          deep:   "#0A2A6A",  // hero overlay / title-box navy
          accent: "#00A3E0",  // bright cyan accent
          light:  "#8CE0FF",  // light aqua highlight (use sparingly)
        },

        /* --- Semantic helpers (optional, for consistency) ---------------- */
        ink: {
          heading: "#0A2A4A",  // slightly softer than black for H1–H3
          body:    "#0f172a",  // base body text (matching current)
          muted:   "#475569",  // secondary text
        },
        surface: {
          card:   "#FFFFFF",
          tint:   "#F7FAFF",                // very light blue wash
          overlay: "rgba(10,42,106,0.08)",  // subtle blue tint overlay
        },
        line: {
          DEFAULT: "#E5E7EB",  // borders you already use
          strong:  "#C7D2E1",  // a touch stronger for emphasis
        },
        nav: {
          // translucent deep-blue for sticky headers / drawers
          bg: "rgba(10,42,106,0.85)",
        },
      },
    },
  },
  plugins: [],
};

export default config;