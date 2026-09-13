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

  // The active link is already at max contrast — no hover state needed.
  // Inactive links use `.link-hover` (muted → ink/paper on hover *and*
  // keyboard focus). Every link gets `.focus-ring` for the visible
  // :focus-visible outline and `.tap-target` for a >=44px mobile hit area.
  const activeColor = theme === "dark" ? "text-paper" : "text-ink";
  const linkBase = "text-[18px] leading-[22px] sm:text-header-name cursor-pointer focus-ring tap-target";

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
    <header className="sticky top-0 z-50 w-full pb-0 pt-nav-padding-y">
      <Grid as="nav">
        <div className="col-span-2 flex items-center justify-between sm:col-span-6">
          <Link
            href="/"
            className={`${linkBase} ${isHome ? activeColor : "link-hover"}`}
          >
            Pedro Braga
          </Link>
          <div className="flex items-center gap-6 sm:gap-16">
            <Link
              href="/sobre-mim"
              className={`${linkBase} ${isSobre ? activeColor : "link-hover"}`}
            >
              Sobre mim
            </Link>
            <a href="#contato" onClick={handleContatoClick} className={`${linkBase} link-hover`}>
              Contato
            </a>
          </div>
        </div>
      </Grid>
    </header>
  );
}
