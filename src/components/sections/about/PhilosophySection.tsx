"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { philosophyPoints } from "@/lib/data";

export function PhilosophySection() {
  const t = useTranslations("aboutPage.philosophy");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {philosophyPoints.map((point, i) => (
            <motion.div
              key={point.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glow-border glass group relative flex items-start gap-5 overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-brand-rose/50 sm:p-7"
            >
              <motion.span
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="gradient-brand flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-[0_10px_28px_-10px_rgba(110,75,152,0.65)]"
              >
                <point.icon className="size-6 text-white" />
              </motion.span>
              <div>
                <h3 className="text-lg font-bold text-brand-ink">{t(`items.${point.key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
                  {t(`items.${point.key}.description`)}
                </p>
              </div>

              <span className="pointer-events-none absolute -end-10 -top-10 size-32 rounded-full bg-brand-rose/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
