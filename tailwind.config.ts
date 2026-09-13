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
        // Reads via a CSS var (globals.css) so the SAME class stays WCAG AA
        // compliant on both backgrounds: #636363 on white is 6.0:1, but only
        // ~3.3:1 on #0C0C0C (needs 4.5:1) — the .theme-dark scope swaps it
        // for a lighter #8A8A8A (5.67:1) instead of introducing a second class.
        muted: "var(--color-muted)",
        night: "#0C0C0C", // Sobre mim background
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        // [fontSize, { lineHeight, letterSpacing }]
        // Shared by Header AND Footer (nav-level links) — read from this
        // one token in both so they can't drift out of sync again.
        "header-name": ["24px", { lineHeight: "29px" }],
        hero: ["32px", { lineHeight: "39px" }],
        "name-xl": ["96px", { lineHeight: "116px", letterSpacing: "-0.05em" }],
        bio: ["32px", { lineHeight: "39px" }],
        caption: ["20px", { lineHeight: "24px" }],
        // Project pages (Figma "Tela projeto")
        "section-title": ["32px", { lineHeight: "39px" }],
        "stat-number": ["112px", { lineHeight: "136px", letterSpacing: "-0.05em" }],
        "stat-unit": ["48px", { lineHeight: "58px", letterSpacing: "-0.05em" }],
      },
      spacing: {
        "grid-margin": "80px",
        "grid-margin-sm": "16px",
        gutter: "20px",
        "gutter-sm": "16px",
        // Vertical rhythm — applied as real padding-top in document flow
        // (never as a flex/grid gap, so these stay exact and predictable).
        // Shared by Header (pt only — bottom spacing is the 164px content
        // gap below) AND Footer (py, since it's the page's closing block).
        // One token, one value — editing it can't desync the two again.
        "nav-padding-y": "40px",
        "header-to-content": "164px", // header → hero text (Home) / header → bio (Sobre mim)
        "hero-to-image": "132px", // hero text → first project image (Home)
        "section-spacing": "132px", // vertical rhythm between blocks on project pages (Figma)
        // Minimum distance between the last piece of page content and the
        // footer, on every page — one token so it can't drift per-page.
        "before-footer": "232px",
        // Gap between Email/LinkedIn/Instagram in the footer — deliberately
        // its own value, distinct from the header's nav gap (gap-16/64px).
        "footer-gap": "112px",
        // Vertical gap between the two photos in the "assimetrica-aberta"
        // project-gallery variant (Figma: 80-120px, picked the midpoint) —
        // deliberately much larger than the standard 20px gutter, since the
        // two photos must read as separate editorial moments, not a pair.
        "asymmetric-gap": "96px",
      },
      maxWidth: {
        site: "1920px",
      },
    },
  },
  plugins: [],
};
export default config;
