"use client";

import { useTranslations } from "next-intl";
import { Check, PhoneCall } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaImage } from "@/components/ui/MediaImage";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { endoscopyTypes } from "@/lib/data";
import { findItem } from "@/lib/cms/helpers";
import type { DynamicItem } from "@/lib/supabase/types";

export function EndoscopyTypes({ items = [] }: { items?: DynamicItem[] }) {
  const t = useTranslations("servicesPage.endoscopyTypes");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {endoscopyTypes.map((item, i) => {
            const applications = t.raw(`items.${item.key}.applications`) as string[];
            return (
              <GlassCard
                key={item.key}
                strong
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex flex-col p-5 sm:p-7"
              >
                <MediaImage
                  src={findItem(items, item.key)?.image_url || `/images/services/${item.key}.jpg`}
                  alt={t(`items.${item.key}.title`)}
                  icon={item.icon}
                  ratio="video"
                />
                <h3 className="mt-5 text-xl font-bold text-brand-ink">{t(`items.${item.key}.title`)}</h3>
                <p className="mt-4 text-xs font-bold tracking-wide text-brand-rose">{t("applicationsLabel")}</p>
                <ul className="mt-2 flex-1 space-y-2">
                  {applications.map((app) => (
                    <li key={app} className="flex items-start gap-2 text-sm leading-relaxed text-brand-ink-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-rose" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
                <LiquidButton
                  href="/contact"
                  variant="primary"
                  icon={PhoneCall}
                  iconPosition="start"
                  className="mt-6 w-fit px-5 py-2.5 text-sm"
                >
                  {t("bookBtn")}
                </LiquidButton>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
