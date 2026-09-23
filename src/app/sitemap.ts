import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

const paths = ["/", "/about", "/services", "/videos", "/reviews", "/articles", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedUrl = (locale: string, path: string) =>
    `${siteConfig.url}/${locale}${path === "/" ? "" : path}`;

  return paths.map((path) => ({
    url: localizedUrl(routing.defaultLocale, path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
      ),
    },
  }));
}
