import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, localeAlternates } from "@/lib/site";

// The home page, once per locale, each entry carrying its hreflang alternates so
// search engines group the four language versions together. (No legal or other
// subpaths on the clean site yet; add them here when they land.)
const PATHS = [""] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: localeAlternates(path) },
    })),
  );
}
