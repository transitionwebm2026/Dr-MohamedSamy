"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { endoscopyTriggers } from "@/lib/data";

export function SymptomTriggers() {
  const t = useTranslations("servicesPage.triggers");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {endoscopyTriggers.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass relative overflow-hidden rounded-3xl border border-brand-rose/20 p-6 text-center"
            >
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-rose/15 text-brand-rose"
              >
                <item.icon className="size-6" />
              </motion.span>
              <h3 className="mt-4 text-base font-bold text-brand-ink">{t(`items.${item.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
                {t(`items.${item.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
