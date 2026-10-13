"use client";

import { useTranslations } from "next-intl";
import { CalendarHeart, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

export function Hero({ content }: { content?: Record<string, unknown> }) {
  const t = useTranslations("hero");
  const imageUrl = typeof content?.imageUrl === "string" ? content.imageUrl : undefined;

  return (
    <PageHero
      backgroundImage={imageUrl}
      titleLine1={t("titleLine1")}
      titleLine2={t("titleLine2")}
      subtitle={t("subtitle")}
      primaryButton={{ label: t("bookNow"), href: "/contact", icon: CalendarHeart }}
      secondaryButton={{ label: t("exploreServices"), href: "/services", icon: Stethoscope }}
    />
  );
}
