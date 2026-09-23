"use client";

import { useTranslations } from "next-intl";
import { PhoneCall, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

export function AboutHero() {
  const t = useTranslations("aboutPage.hero");

  return (
    <PageHero
      titleLine1={t("titleLine1")}
      titleLine2={t("titleLine2")}
      subtitle={t("subtitle")}
      primaryButton={{ label: t("servicesBtn"), href: "/services", icon: Stethoscope }}
      secondaryButton={{ label: t("contactBtn"), href: "/contact", icon: PhoneCall }}
    />
  );
}
