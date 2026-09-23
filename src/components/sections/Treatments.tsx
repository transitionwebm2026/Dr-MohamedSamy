"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { Link } from "@/i18n/navigation";
import { treatments } from "@/lib/data";

export function Treatments() {
  const t = useTranslations("treatments");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((item, i) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={item.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="flex flex-col p-5 sm:p-6"
              >
                <MediaPlaceholder icon={Icon} ratio="video" />
                <h3 className="mt-5 text-xl font-bold text-brand-ink">{t(`items.${item.key}.title`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-ink-muted">
                  {t(`items.${item.key}.description`)}
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-rose transition-colors hover:text-brand-ink"
                >
                  {t("readMore")}
                  <ArrowLeft className="size-4 ltr:-scale-x-100" />
                </Link>
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
