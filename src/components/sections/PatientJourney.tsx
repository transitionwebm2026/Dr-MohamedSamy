"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { journeySteps } from "@/lib/data";

export function PatientJourney() {
  const t = useTranslations("journey");
  const isRtl = useLocale() === "ar";

  return (
    <section id="journey" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="relative mt-16">
          {/* connecting line */}
          <div
            className={cn(
              "absolute top-8 right-0 left-0 hidden h-0.5 via-brand-primary/60 lg:block",
              isRtl ? "bg-gradient-to-l from-brand-rose/60 to-brand-dark/40" : "bg-gradient-to-r from-brand-rose/60 to-brand-dark/40",
            )}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ transformOrigin: isRtl ? "right" : "left" }}
            className="absolute top-8 right-0 left-0 hidden h-0.5 gradient-brand lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-4">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex size-16 items-center justify-center rounded-2xl">
                  <span className="gradient-brand glow-border absolute inset-0 rounded-2xl border border-white/25" />
                  <step.icon className="relative z-10 size-7 text-white" />
                  <span className="glass absolute -top-2 -end-2 flex size-7 items-center justify-center rounded-full text-xs font-extrabold text-brand-rose">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand-ink">{t(`steps.${step.key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
                  {t(`steps.${step.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
