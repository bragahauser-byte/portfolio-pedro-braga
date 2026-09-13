import type { Config } from "tailwindcss";

// Design tokens extracted from the Figma file.
// Grid: 80px side margin, 6 columns, 20px gutter (desktop).
// On smaller screens the grid collapses proportionally — see Grid.tsx.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base
        ink: "#000000", // primary text on light backgrounds
        paper: "#FFFFFF", // Home background / text on dark backgrounds
        muted: "#636363", // secondary text, disabled links, footer text (both themes)
        night: "#0C0C0C", // Sobre mim background
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        // [fontSize, { lineHeight, letterSpacing }]
        "header-name": ["24px", { lineHeight: "29px" }],
        hero: ["32px", { lineHeight: "39px" }],
        "name-xl": ["96px", { lineHeight: "116px", letterSpacing: "-0.05em" }],
        bio: ["32px", { lineHeight: "39px" }],
        caption: ["20px", { lineHeight: "24px" }],
      },
      spacing: {
        "grid-margin": "80px",
        "grid-margin-sm": "24px",
        gutter: "20px",
        "gutter-sm": "16px",
      },
      maxWidth: {
        site: "1920px",
      },
    },
  },
  plugins: [],
};
export default config;
