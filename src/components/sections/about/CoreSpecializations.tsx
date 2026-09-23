"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { coreSpecializations } from "@/lib/data";

export function CoreSpecializations() {
  const t = useTranslations("aboutPage.specializations");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreSpecializations.map((item, i) => (
            <GlassCard
              key={item.key}
              strong
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="flex flex-col p-4 sm:p-5"
            >
              <MediaPlaceholder icon={item.icon} ratio="square" />
              <h3 className="mt-4 text-base font-bold text-brand-ink">{t(`items.${item.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
                {t(`items.${item.key}.description`)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
