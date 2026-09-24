"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const { whatsapp } = useSiteSettings();

  return (
    <motion.a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label={t("tooltip")}
      className="group relative flex size-12 items-center sm:size-14 justify-center rounded-full bg-gradient-to-br from-[#3ee083] to-brand-whatsapp text-white shadow-[0_10px_35px_-8px_rgba(37,211,102,0.75)]"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-whatsapp/60" />
      <FaWhatsapp className="size-5 sm:size-6" />
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-brand-dark px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        {t("tooltip")}
      </span>
    </motion.a>
  );
}
