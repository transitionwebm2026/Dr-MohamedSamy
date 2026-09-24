"use client";

import { useTranslations } from "next-intl";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";

export function FinalCTA() {
  const t = useTranslations("finalCta");
  const { phone } = useSiteSettings();

  return (
    <ClosingCTA
      id="booking"
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
      contactLabel={t("contactUs")}
      contactHref={`tel:${phone}`}
      whatsappLabel={t("whatsapp")}
    />
  );
}
