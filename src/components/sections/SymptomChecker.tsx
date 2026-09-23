"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { symptomCards } from "@/lib/data";

export function SymptomChecker() {
  const t = useTranslations("symptoms");

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {symptomCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <GlassCard
                key={card.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="flex flex-col p-5 sm:p-6"
              >
                <MediaPlaceholder icon={Icon} ratio="video" />
                <h3 className="mt-5 text-xl font-bold text-brand-ink">{t(`items.${card.key}.title`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-ink-muted">
                  {t(`items.${card.key}.description`)}
                </p>
              </GlassCard>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <LiquidButton href="/services" variant="primary" icon={ArrowLeft} iconPosition="end">
            {t("cta")}
          </LiquidButton>
        </motion.div>
      </div>
    </section>
  );
}
