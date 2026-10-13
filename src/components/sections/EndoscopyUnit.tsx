"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaImage } from "@/components/ui/MediaImage";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { endoscopyTypes } from "@/lib/data";
import { findItem } from "@/lib/cms/helpers";
import type { DynamicItem } from "@/lib/supabase/types";

// Shows the same endoscopy procedures managed on the Services page (the
// first few of the same list) instead of a separately-authored set.
const homeProcedures = endoscopyTypes.slice(0, 3);

export function EndoscopyUnit({ items = [] }: { items?: DynamicItem[] }) {
  const t = useTranslations("endoscopy");
  const tServices = useTranslations("servicesPage.endoscopyTypes");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeProcedures.map((item, i) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={item.key}
                strong
                glow
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="flex flex-col p-5 sm:p-6"
              >
                <MediaImage
                  src={findItem(items, item.key)?.image_url || `/images/services/${item.key}.jpg`}
                  alt={tServices(`items.${item.key}.title`)}
                  icon={Icon}
                  ratio="video"
                />
                <h3 className="mt-5 text-xl font-bold text-brand-ink">{tServices(`items.${item.key}.title`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-ink-muted">
                  {tServices(`items.${item.key}.description`)}
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
