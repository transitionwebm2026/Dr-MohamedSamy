"use client";

import { createContext, useContext } from "react";
import { siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/cms/layout";

const fallback: SiteSettings = {
  phone: siteConfig.phone,
  phoneDisplay: siteConfig.phoneDisplay,
  whatsapp: siteConfig.whatsapp,
  email: siteConfig.email,
  socials: siteConfig.socials.map((s) => ({ name: s.name, href: s.href })),
};

const SiteSettingsContext = createContext<SiteSettings>(fallback);

/** Puts the dashboard-controlled contact details in reach of every client component. */
export function SiteSettingsProvider({ value, children }: { value: SiteSettings; children: React.ReactNode }) {
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
