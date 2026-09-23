"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { academicTrack } from "@/lib/data";

export function AcademicTimeline() {
  const t = useTranslations("aboutPage.academic");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute top-0 bottom-0 start-7 w-0.5 bg-white/10" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="gradient-brand absolute top-0 bottom-0 start-7 w-0.5"
          />

          <div className="space-y-8">
            {academicTrack.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative flex items-start gap-6 ps-[3.75rem]"
              >
                <span className="gradient-brand glow-border absolute start-0 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/25 text-white">
                  <item.icon className="size-6" />
                </span>

                <GlassCard hover={false} className="flex-1 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      dir="ltr"
                      className="glass inline-flex items-center rounded-full px-3 py-1 font-montserrat text-xs font-extrabold text-brand-rose"
                    >
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold text-brand-ink sm:text-lg">
                      {t(`items.${item.key}.title`)}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
                    {t(`items.${item.key}.description`)}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
