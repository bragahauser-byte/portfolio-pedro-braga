import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  return {
    ...buildMetadata(),
    metadataBase: new URL(SITE_URL),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans font-normal text-ink">
        {/* schema.org/Person lives on the home page (app/page.tsx), not
            here — it describes the entity the site is about, not every
            individual page. */}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
