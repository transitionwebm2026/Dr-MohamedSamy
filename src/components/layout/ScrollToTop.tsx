"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Global CSS sets `scroll-behavior: smooth` for in-page anchor jumps (e.g.
 * `#booking`). That same setting makes Next.js's automatic scroll-to-top on
 * route change animate too, so navigating away from the bottom of a long
 * page visibly scrolls back up instead of landing on the new page's hero
 * instantly. Passing an explicit "instant" behavior here bypasses the CSS
 * setting for this one call, per the CSSOM View scroll spec.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
