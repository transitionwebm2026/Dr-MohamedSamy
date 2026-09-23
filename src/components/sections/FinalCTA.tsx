"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const t = useTranslations("finalCta");

  return (
    <section id="booking" className="relative overflow-hidden py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-[2.5rem] px-6 py-14 sm:px-14"
        >
          <h2 className="text-balance-ar text-3xl font-extrabold leading-tight text-brand-ink sm:text-4xl md:text-5xl">
            {t("title")}
            <span className="mt-2 block gradient-brand-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-ink-muted sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LiquidButton href={`tel:${siteConfig.phone}`} variant="primary" icon={PhoneCall} iconPosition="start">
              {t("contactUs")}
            </LiquidButton>
            <LiquidButton href={siteConfig.whatsapp} variant="whatsapp" icon={FaWhatsapp} iconPosition="start">
              {t("whatsapp")}
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
