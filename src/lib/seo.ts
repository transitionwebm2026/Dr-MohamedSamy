import { routing } from "@/i18n/routing";

/**
 * Per-page canonical + hreflang alternates. Relative paths resolve against
 * the root layout's `metadataBase`, so every page needs this — without it,
 * a page silently inherits the layout's own alternates (pointing at the
 * site root), which tells search engines every inner page is a duplicate
 * of the homepage.
 */
export function pageAlternates(locale: string, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
  };
}
