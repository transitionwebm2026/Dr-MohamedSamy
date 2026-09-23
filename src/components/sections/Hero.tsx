"use client";

import { useTranslations } from "next-intl";
import { CalendarHeart, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <PageHero
      titleLine1={t("titleLine1")}
      titleLine2={t("titleLine2")}
      subtitle={t("subtitle")}
      primaryButton={{ label: t("bookNow"), href: "/contact", icon: CalendarHeart }}
      secondaryButton={{ label: t("exploreServices"), href: "/services", icon: Stethoscope }}
    />
  );
}
