"use client";

import { useTranslations } from "next-intl";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";

export function ContactCTA() {
  const t = useTranslations("contactPage.cta");
  const { phone } = useSiteSettings();

  return (
    <ClosingCTA
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
      contactLabel={t("contactUs")}
      contactHref={`tel:${phone}`}
      whatsappLabel={t("whatsapp")}
    />
  );
}
