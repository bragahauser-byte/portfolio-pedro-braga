"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Grid } from "./Grid";

type Theme = "light" | "dark";

/**
 * Static by design — no self-contained entrance animation. On Home it's
 * animated externally as the first step of <HomeEntrance>; on every other
 * page, entrance is handled by the whole-screen Shared Axis page
 * transition in PageTransition.tsx. Animating it a second time here would
 * double up and fight those.
 */
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
    <header className="sticky top-0 z-50 w-full pb-0 pt-header-top">
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
    </header>
  );
}
