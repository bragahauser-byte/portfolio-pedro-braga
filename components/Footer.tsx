import { Grid } from "./Grid";

const CONTACT_LINKS = [
  { label: "Email", href: "mailto:phbraga93@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pedro-braga10/" },
  { label: "Instagram", href: "https://www.instagram.com/ph_braga10/" },
];

// Typography and vertical padding read from the exact same tokens as
// Header.tsx (text-header-name, py-nav-padding-y) so the two can't drift
// out of sync again. The item gap (112px) is footer-specific — the
// header's own nav gap (64px) is a different, unrelated value.
export function Footer() {
  return (
    <footer id="contato" className="w-full py-nav-padding-y">
      <Grid>
        <div className="col-span-2 flex flex-wrap items-center gap-x-8 gap-y-3 sm:col-span-6 sm:gap-x-footer-gap">
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
