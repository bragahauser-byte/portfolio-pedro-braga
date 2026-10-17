import { CONTACT_LINKS } from "@/lib/contact";
import { Grid } from "./Grid";

/**
 * Rodapé de contato (âncora #contato do header): Email, LinkedIn e
 * Instagram numa linha, 24/32 (20/24 no mobile), alinhados com o header
 * nas margens do grid. `theme="dark"` continua o bloco preto das páginas
 * de projeto e o Sobre mim.
 */
export function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";

  return (
    <footer
      id="contato"
      className={`w-full py-6 md:py-10 ${dark ? "theme-dark bg-night text-paper" : "bg-paper text-ink"}`}
    >
      <Grid>
        <ul className="col-span-full flex flex-wrap items-center gap-x-8 gap-y-2 md:gap-x-16">
          {CONTACT_LINKS.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="link-underline focus-ring tap-target text-20 text-muted md:text-24"
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Grid>
    </footer>
  );
}
