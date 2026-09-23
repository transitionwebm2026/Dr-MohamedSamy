"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaImage } from "@/components/ui/MediaImage";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { expertiseAreas } from "@/lib/data";

export function ExpertiseAreas() {
  const t = useTranslations("aboutPage.expertise");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expertiseAreas.map((item, i) => (
            <GlassCard
              key={item.key}
              glow
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-start"
            >
              <MediaImage
                src={`/images/about/${item.key}.jpg`}
                alt={t(`items.${item.key}.title`)}
                icon={item.icon}
                ratio="video"
              />
              <h3 className="mt-5 text-base font-bold text-brand-ink sm:text-lg">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
                {t(`items.${item.key}.description`)}
              </p>
            </GlassCard>
          ))}
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
