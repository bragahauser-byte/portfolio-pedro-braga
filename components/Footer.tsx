import { FadeIn } from "./motion/FadeIn";
import { CONTACT_LINKS, EMAIL } from "@/lib/contact";
import { Grid } from "./Grid";

/**
 * Rodapé de contato (âncora #contato do header): o e-mail grande e
 * clicável, e LinkedIn / Instagram em linha. `theme="dark"` continua o
 * bloco preto de fechamento das páginas de projeto.
 */
export function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  const social = CONTACT_LINKS.filter((item) => item.label !== "Email");

  return (
    <footer
      id="contato"
      className={`w-full pb-space-4 pt-space-7 md:pt-space-8 ${dark ? "theme-dark bg-night text-paper" : "bg-paper text-ink"}`}
    >
      <Grid>
        <FadeIn className="col-span-full">
          <h2 className="text-caption text-muted">Contato</h2>
          <a
            href={`mailto:${EMAIL}`}
            className="link-underline focus-ring mt-space-2 inline-block break-all text-h1 font-light"
          >
            {EMAIL}
          </a>
        </FadeIn>
        <div className={`col-span-full mt-space-6 flex flex-wrap items-center gap-x-space-4 gap-y-space-1 border-t ${dark ? "border-white/15" : "border-rule"} pt-space-3 md:mt-space-7`}>
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline focus-ring tap-target text-nav text-muted"
            >
              {item.label}
            </a>
          ))}
        </div>
      </Grid>
    </footer>
  );
}
