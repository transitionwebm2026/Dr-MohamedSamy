import { headers } from "next/headers";
import { siteConfig } from "@/lib/site-config";

const trimSlash = (url: string) => url.replace(/\/+$/, "");

/**
 * Build-time / env-only resolution, for places with no request (sitemap, robots):
 * an explicit NEXT_PUBLIC_SITE_URL wins (set it to the custom domain), then
 * Vercel's production domain, then the static fallback.
 */
export function getSiteUrlFromEnv(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return trimSlash(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return siteConfig.url;
}

/**
 * The public origin of the site as the visitor (or a link-preview crawler)
 * reached it. Social crawlers only read an og:image whose absolute URL
 * resolves, so it has to point at the host actually serving the site — never a
 * hardcoded placeholder domain.
 */
export async function getSiteUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return trimSlash(process.env.NEXT_PUBLIC_SITE_URL);

  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) {
      const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);
      const proto = h.get("x-forwarded-proto")?.split(",")[0].trim() ?? (isLocal ? "http" : "https");
      return `${proto}://${host}`;
    }
  } catch {
    // no request context (e.g. static generation) — fall through to env
  }
  return getSiteUrlFromEnv();
}
