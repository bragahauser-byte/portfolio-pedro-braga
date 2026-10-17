import type { Config } from "tailwindcss";

// Design tokens medidos nas referências da Idea Zarvos (referencia de projeto/).
//
// Grid: 12 colunas ≥1280px (margem 80px, gutter 20px), 8 no tablet
// (margem 40px), 4 no mobile (margem 20px, gutter 16px). Valores em CSS vars
// (app/globals.css, --grid-*), lidos pelo Grid.tsx e pelo overlay (tecla G).
//
// Regra da tipografia: todo texto começa SEMPRE na mesma coluna — a 5 no
// desktop, a 3 no tablet, a margem no mobile (ver TEXT_COLUMN em Grid.tsx).
// Só as imagens mudam de posição.
//
// Tamanhos: 12, 14, 16 e daí em múltiplos de 4; entrelinhas e espaçamentos
// sempre em múltiplos de 4 (a escala padrão do Tailwind já é de 4 em 4px).
const tight = "-0.02em";
const tighter = "-0.03em";

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
        ink: "#000000", // texto (medido: #000000)
        paper: "#FFFFFF",
        night: "#000000", // seções escuras
        muted: "#999999", // texto secundário (medido: #999999)
        rule: "#EEEEEE", // fios da ficha técnica (medido: #EEEEEE)
        drawing: "#F4F3F0", // fundo dos desenhos técnicos
      },
      fontFamily: {
        sans: ["var(--font-helvetica-now)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        // [tamanho, { entrelinha, tracking }] — nome = tamanho em px.
        12: ["12px", { lineHeight: "16px" }],
        14: ["14px", { lineHeight: "20px" }],
        16: ["16px", { lineHeight: "24px" }],
        "16-tight": ["16px", { lineHeight: "20px" }],
        20: ["20px", { lineHeight: "24px" }],
        "20-loose": ["20px", { lineHeight: "28px" }],
        24: ["24px", { lineHeight: "32px" }],
        28: ["28px", { lineHeight: "40px" }],
        32: ["32px", { lineHeight: "40px" }],
        40: ["40px", { lineHeight: "44px", letterSpacing: tight }],
        "40-text": ["40px", { lineHeight: "48px" }],
        56: ["56px", { lineHeight: "56px", letterSpacing: tight }],
        80: ["80px", { lineHeight: "80px", letterSpacing: tighter }],
        120: ["120px", { lineHeight: "120px", letterSpacing: tighter }],
      },
      spacing: {
        // complementos da escala de 4px do Tailwind
        30: "120px",
        45: "180px",
        "grid-margin": "var(--grid-margin)",
        gutter: "var(--grid-gutter)",
      },
      borderRadius: {
        image: "0px", // a referência usa cantos retos
      },
      maxWidth: {
        site: "1920px",
        // largura máxima medida das linhas de texto da referência (~680px)
        text: "680px",
        small: "480px",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
