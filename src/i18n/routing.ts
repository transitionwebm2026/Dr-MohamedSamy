import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
  // Arabic is the real default for this clinic's visitors, not just a
  // fallback — without this, a visitor (or crawler) with an English
  // browser/Accept-Language setting gets auto-redirected to /en instead.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
