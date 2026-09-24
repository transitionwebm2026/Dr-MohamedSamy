"use client";

import { useTranslations } from "next-intl";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export function AboutCTA() {
  const t = useTranslations("aboutPage.cta");

  return (
    <ClosingCTA
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
      contactLabel={t("contactUs")}
      contactHref="/contact"
      whatsappLabel={t("whatsapp")}
    />
  );
}
