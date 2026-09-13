import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";
import { buildMetadata, personJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  return {
    ...buildMetadata(),
    metadataBase: new URL("https://pedrobraga.com.br"),
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
        {/* schema.org/Person — helps Google understand who this site is about. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
