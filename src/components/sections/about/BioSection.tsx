"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DoctorFrame } from "@/components/ui/DoctorFrame";

export function BioSection() {
  const t = useTranslations("aboutPage.bio");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-sm lg:mx-0"
          >
            <DoctorFrame ratio="portrait" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SectionHeader
              align="start"
              compact
              eyebrow={t("eyebrow")}
              title={t("title")}
              className="mx-0 max-w-none"
            />

            <div className="mt-6 space-y-4">
              <p className="text-sm leading-relaxed text-brand-ink-muted sm:text-base">{t("paragraph1")}</p>
              <p className="text-sm leading-relaxed text-brand-ink-muted sm:text-base">{t("paragraph2")}</p>
              <p className="text-sm leading-relaxed text-brand-ink-muted sm:text-base">{t("paragraph3")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
