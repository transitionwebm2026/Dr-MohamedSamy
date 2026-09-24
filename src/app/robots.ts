import type { MetadataRoute } from "next";
import { getSiteUrlFromEnv } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${getSiteUrlFromEnv()}/sitemap.xml`,
  };
}
