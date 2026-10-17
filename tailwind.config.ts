import type { Config } from "tailwindcss";

// Design tokens do redesign editorial (referências: Paravela / Idea Zarvos).
// Grid: 12 colunas ≥1280px (margem 48px, gutter 20px), 8 colunas no tablet
// (margem 32px), 4 no mobile (margem 20px, gutter 14px) — os valores vivem
// como CSS vars em app/globals.css (--grid-*), lidos pelo Grid.tsx e pelo
// overlay de conferência (tecla G em dev).
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
        ink: "#0A0A0A", // texto principal sobre fundo claro
        paper: "#FFFFFF",
        night: "#000000", // seções escuras (Sobre mim, fechamento do projeto)
        // Cinza secundário via CSS var — muda com .theme-dark para manter
        // contraste AA nos dois fundos (ver globals.css).
        muted: "var(--color-muted)",
        rule: "#E6E6E6", // fio de 1px da ficha técnica
        drawing: "#F4F3F0", // fundo off-white dos desenhos técnicos
      },
      fontFamily: {
        sans: ["var(--font-helvetica-now)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        // [fontSize, { lineHeight, letterSpacing }] — clamp() faz a escala
        // fluida entre mobile e desktop sem um breakpoint por token.
        display: ["clamp(56px, 7.2vw, 104px)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        h1: ["clamp(40px, 4.6vw, 68px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["clamp(20px, 1.5vw, 22px)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        lead: ["clamp(22px, 1.95vw, 28px)", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        body: ["16px", { lineHeight: "26px" }],
        caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.01em" }],
        nav: ["16px", { lineHeight: "24px" }],
      },
      spacing: {
        // Ritmo vertical: 8 / 16 / 24 / 40 / 64 / 96 / 160 / 240
        "space-1": "8px",
        "space-2": "16px",
        "space-3": "24px",
        "space-4": "40px",
        "space-5": "64px",
        "space-6": "96px",
        "space-7": "160px",
        "space-8": "240px",
        "grid-margin": "var(--grid-margin)",
        gutter: "var(--grid-gutter)",
        "stack-gap": "12px", // gap entre as imagens empilhadas da abertura
      },
      borderRadius: {
        image: "6px",
      },
      maxWidth: {
        site: "1920px",
        measure: "65ch",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
