"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Grid } from "./Grid";

type Theme = "light" | "dark";

export function Header({ theme = "light" }: { theme?: Theme }) {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
  const isSobre = pathname === "/sobre-mim";

  // "Active" color follows the current theme; inactive links are always
  // the shared secondary gray, on both light and dark backgrounds.
  const activeColor = theme === "dark" ? "text-paper" : "text-ink";
  const inactiveColor = "text-muted";

  function handleContatoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const footer = document.getElementById("contato");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Footer isn't on this page yet — fall back to navigating home then scrolling.
      router.push("/#contato");
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full py-8"
    >
      <Grid as="nav">
        <div className="col-span-2 flex items-center justify-between sm:col-span-6">
          <Link
            href="/"
            className={`text-[18px] leading-[22px] transition-colors duration-300 sm:text-header-name ${
              isHome ? activeColor : inactiveColor
            }`}
          >
            Pedro Braga
          </Link>
          <div className="flex items-center gap-6 sm:gap-16">
            <Link
              href="/sobre-mim"
              className={`text-[18px] leading-[22px] transition-colors duration-300 sm:text-header-name ${
                isSobre ? activeColor : inactiveColor
              }`}
            >
              Sobre mim
            </Link>
            <a
              href="#contato"
              onClick={handleContatoClick}
              className="text-[18px] leading-[22px] text-muted transition-colors duration-300 sm:text-header-name"
            >
              Contato
            </a>
          </div>
        </div>
      </Grid>
    </motion.header>
  );
}
