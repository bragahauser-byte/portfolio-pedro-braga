import { CONTACT_LINKS, EMAIL } from "@/lib/contact";
import { Grid, TEXT_COLUMN, TEXT_COLUMN_WIDE } from "./Grid";
import { FadeIn } from "./motion/FadeIn";

/**
 * Rodapé de contato (âncora #contato do header), na coluna da tipografia:
 * rótulo cinza, e-mail grande clicável e LinkedIn / Instagram.
 * `theme="dark"` continua o bloco preto das páginas de projeto.
 */
export function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  const social = CONTACT_LINKS.filter((item) => item.label !== "Email");

  return (
    <footer
      id="contato"
      className={`w-full pb-10 pt-20 md:pt-30 xl:pt-40 ${dark ? "theme-dark bg-night text-paper" : "bg-paper text-ink"}`}
    >
      <Grid>
        <FadeIn className={TEXT_COLUMN_WIDE}>
          <h2 className="text-14 text-muted">Contato</h2>
          <a
            href={`mailto:${EMAIL}`}
            className="link-underline focus-ring mt-4 inline-block break-all text-24 md:text-40-text"
          >
            {EMAIL}
          </a>
        </FadeIn>
        <ul className={`${TEXT_COLUMN} mt-16 flex flex-wrap gap-x-8 gap-y-2 md:mt-24`}>
          {social.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline focus-ring tap-target text-14 text-muted"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Grid>
    </footer>
  );
}
