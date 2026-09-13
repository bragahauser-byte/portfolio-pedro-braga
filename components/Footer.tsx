import { Grid } from "./Grid";

// TODO: replace with Pedro's real links once provided.
const CONTACT_LINKS = [
  { label: "Email", href: "mailto:contato@pedrobraga.com.br" }, // TODO: link real
  { label: "LinkedIn", href: "#" }, // TODO: link real
  { label: "Instagram", href: "#" }, // TODO: link real
];

// Typography, vertical padding, and item gap read from the exact same
// tokens as Header.tsx (text-header-name, py-nav-padding-y, gap-6/gap-16)
// so the two can't drift out of sync again.
export function Footer() {
  return (
    <footer id="contato" className="w-full py-nav-padding-y">
      <Grid>
        <div className="col-span-2 flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-6 sm:gap-x-16">
          {CONTACT_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="link-hover focus-ring tap-target cursor-pointer text-[18px] leading-[22px] sm:text-header-name"
            >
              {item.label}
            </a>
          ))}
        </div>
      </Grid>
    </footer>
  );
}
