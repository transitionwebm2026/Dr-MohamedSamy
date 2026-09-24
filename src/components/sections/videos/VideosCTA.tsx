"use client";

import { useTranslations } from "next-intl";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export function VideosCTA() {
  const t = useTranslations("videosPage.cta");

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
