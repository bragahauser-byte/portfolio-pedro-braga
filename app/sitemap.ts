import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// NOTE: intentionally lists only routes that actually resolve today.
// Once /projetos/[slug]/page.tsx exists, map over `projects` from
// data/projects.ts here to add each project URL — don't list them
// before the pages exist (that would submit 404s to Google).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/sobre-mim`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
