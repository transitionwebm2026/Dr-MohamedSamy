"use client";

import { useTranslations } from "next-intl";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaImage } from "@/components/ui/MediaImage";
import { categoryDetailItems, serviceCategories } from "@/lib/data";
import { findItem } from "@/lib/cms/helpers";
import type { DynamicItem } from "@/lib/supabase/types";

export function CategoryDetails({
  categoryKey,
  anchor,
  items: dbItems = [],
}: {
  categoryKey: string;
  anchor: string;
  items?: DynamicItem[];
}) {
  const t = useTranslations(`servicesPage.categoryDetails.${categoryKey}`);
  const items = categoryDetailItems[categoryKey] ?? [];
  const category = serviceCategories.find((c) => c.key === categoryKey);

  return (
    <section id={anchor} className="relative scroll-mt-28 py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {category && (
            <span className="gradient-brand mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl">
              <category.icon className="size-6 text-white" />
            </span>
          )}
          <h2 className="text-balance-ar text-2xl font-extrabold leading-tight text-brand-ink sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-ink-muted">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <GlassCard
              key={item.key}
              glow
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <MediaImage
                src={findItem(dbItems, item.key)?.image_url || `/images/services/${item.key}.jpg`}
                alt={t(`items.${item.key}.title`)}
                icon={item.icon}
                ratio="video"
              />
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
