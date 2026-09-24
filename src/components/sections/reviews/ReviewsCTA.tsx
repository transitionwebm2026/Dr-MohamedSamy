"use client";

import { useTranslations } from "next-intl";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export function ReviewsCTA() {
  const t = useTranslations("reviewsPage.cta");

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
