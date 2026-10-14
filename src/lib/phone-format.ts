// Pure string helpers, no imports — safe to use from both server code
// (src/lib/cms/layout.ts) and client components (SiteSettingsProvider).

/** "+201000000000" -> "01000000000", the way the site has always displayed it. */
export function displayPhone(phone: string): string {
  const compact = phone.replace(/\s+/g, "");
  return compact.startsWith("+20") ? `0${compact.slice(3)}` : compact;
}

/** "https://wa.me/201000000000" -> "01000000000" — the WhatsApp number is a
 * full wa.me link, not a `+20...` string, so it needs its own extraction. */
export function displayWhatsapp(url: string): string {
  const digits = url.match(/(\d+)\/?$/)?.[1] ?? "";
  return digits.startsWith("20") ? `0${digits.slice(2)}` : digits;
}
