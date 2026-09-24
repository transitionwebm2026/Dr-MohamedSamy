import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { applyMessageOverrides } from "@/lib/cms/overrides";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const staticMessages = (await import(`../../messages/${locale}.json`)).default;
  const messages = await applyMessageOverrides(locale, staticMessages);

  return { locale, messages };
});
