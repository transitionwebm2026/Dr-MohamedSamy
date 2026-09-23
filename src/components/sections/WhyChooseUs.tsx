"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DoctorFrame } from "@/components/ui/DoctorFrame";
import { whyChooseUsPoints } from "@/lib/data";

export function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <DoctorFrame ratio="portrait" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-strong absolute -bottom-5 left-1/2 flex w-[85%] -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3"
            >
              <span className="gradient-brand flex size-11 shrink-0 items-center justify-center rounded-xl">
                <ShieldCheck className="size-5 text-white" />
              </span>
              <div>
                <p className="text-sm font-bold text-brand-ink">{t("badgeTitle")}</p>
                <p className="text-xs text-brand-ink-muted">{t("badgeSubtitle")}</p>
              </div>
            </motion.div>
          </motion.div>

          <div>
            <SectionHeader
              align="start"
              compact
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              className="mx-0 max-w-none"
            />

            <div className="mt-8 space-y-4">
              {whyChooseUsPoints.map((point, i) => (
                <motion.div
                  key={point.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="glow-border glass flex items-start gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-brand-rose/50"
                >
                  <span className="gradient-brand flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <point.icon className="size-5 text-white" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-brand-ink">{t(`points.${point.key}.title`)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-muted">
                      {t(`points.${point.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
