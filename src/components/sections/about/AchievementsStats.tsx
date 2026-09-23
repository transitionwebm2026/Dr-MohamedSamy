"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats } from "@/lib/data";

export function AchievementsStats() {
  const t = useTranslations("aboutPage.stats");
  const tStats = useTranslations("stats");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <GlassCard
                key={stat.key}
                strong
                glow
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 p-6 text-center sm:p-8"
              >
                <span className="gradient-brand flex size-14 items-center justify-center rounded-2xl text-white shadow-[0_10px_28px_-10px_rgba(110,75,152,0.65)]">
                  <Icon className="size-6" />
                </span>
                <p className="gradient-brand-text text-3xl font-extrabold sm:text-4xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-semibold text-brand-ink-muted sm:text-sm">{tStats(stat.key)}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
