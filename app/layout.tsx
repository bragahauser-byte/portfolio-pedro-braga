import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { GridOverlay } from "@/components/dev/GridOverlay";
import { PageTransition } from "@/components/providers/PageTransition";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { buildMetadata, SITE_URL } from "@/lib/seo";

// Helvetica Now Display — só os dois pesos usados no site (Light nos
// números/títulos grandes, Regular no resto).
const helveticaNow = localFont({
  src: [
    { path: "./fonts/HelveticaNowDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/HelveticaNowDisplay-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-helvetica-now",
  display: "swap",
  preload: true,
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

export function generateMetadata(): Metadata {
  return {
    ...buildMetadata(),
    metadataBase: new URL(SITE_URL),
  };
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={helveticaNow.variable}>
      <body className="font-sans font-normal text-ink">
        {/* schema.org/Person fica na Home (app/page.tsx) — descreve quem o
            site apresenta, não cada página. */}
        {/* Sem JavaScript, nada fica preso no estado inicial das animações. */}
        <noscript>
          <style>{"[data-motion]{clip-path:none!important;opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
        <Cursor />
        {process.env.NODE_ENV === "development" && <GridOverlay />}
      </body>
    </html>
  );
}
