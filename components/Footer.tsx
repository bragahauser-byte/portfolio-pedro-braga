import { Grid } from "./Grid";

// TODO: replace with Pedro's real links once provided.
const CONTACT_LINKS = [
  { label: "Email", href: "mailto:contato@pedrobraga.com.br" }, // TODO: link real
  { label: "LinkedIn", href: "#" }, // TODO: link real
  { label: "Instagram", href: "#" }, // TODO: link real
];

export function Footer() {
  return (
    <footer id="contato" className="w-full py-16">
      <Grid>
        <div className="col-span-2 flex flex-wrap items-center gap-x-10 gap-y-3 sm:col-span-6">
          {CONTACT_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-muted transition-opacity duration-300 hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </div>
      </Grid>
    </footer>
  );
}
