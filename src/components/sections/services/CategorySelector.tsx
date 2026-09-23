"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaImage } from "@/components/ui/MediaImage";
import { serviceCategories } from "@/lib/data";

export function CategorySelector() {
  const t = useTranslations("servicesPage.categories");

  const scrollToAnchor = (anchor: string) => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="categories" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category, i) => (
            <GlassCard
              key={category.key}
              glow
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToAnchor(category.anchor)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") scrollToAnchor(category.anchor);
              }}
              className="cursor-pointer text-start"
            >
              <MediaImage
                src={`/images/services/${category.key}.jpg`}
                alt={t(`items.${category.key}.title`)}
                icon={category.icon}
                ratio="video"
              />
              <h3 className="mt-4 text-base font-bold text-brand-ink sm:text-lg">
                {t(`items.${category.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
                {t(`items.${category.key}.description`)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
