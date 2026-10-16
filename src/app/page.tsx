import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * A language-less `/` needs an actual registered route — Next does NOT
 * serve public/index.html for "/" the way a plain static file host would
 * (that was tried and broke both `next dev` and Vercel with a 404: Vercel
 * runs Next's own router per request even for a static export, so `/`
 * must resolve to a real page). Every real page already lives under /ar
 * or /en (`localePrefix: "always"`), so this just forwards to the default.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
