"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";

export function CallButton() {
  const t = useTranslations("callButton");
  const { phone } = useSiteSettings();

  return (
    <motion.a
      href={`tel:${phone}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label={t("tooltip")}
      className="gradient-brand group relative flex size-12 items-center sm:size-14 justify-center rounded-full text-white shadow-[0_10px_35px_-8px_rgba(110,75,152,0.75)]"
    >
      <Phone className="size-5 sm:size-6" />
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-brand-dark px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        {t("tooltip")}
      </span>
    </motion.a>
  );
}
