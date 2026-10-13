"use client";

import { useTranslations } from "next-intl";
import { PhoneCall, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

export function ServicesHero({ content }: { content?: Record<string, unknown> }) {
  const t = useTranslations("servicesPage.hero");
  const imageUrl = typeof content?.imageUrl === "string" ? content.imageUrl : undefined;

  return (
    <PageHero
      backgroundImage={imageUrl}
      titleLine1={t("titleLine1")}
      titleLine2={t("titleLine2")}
      subtitle={t("subtitle")}
      primaryButton={{ label: t("servicesBtn"), href: "#categories", icon: Stethoscope }}
      secondaryButton={{ label: t("contactBtn"), href: "/contact", icon: PhoneCall }}
    />
  );
}
