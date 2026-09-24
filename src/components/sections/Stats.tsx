"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats } from "@/lib/data";
import { extraNumber, extraString, findItem } from "@/lib/cms/helpers";
import type { DynamicItem } from "@/lib/supabase/types";

export function Stats({ items = [] }: { items?: DynamicItem[] }) {
  const t = useTranslations("stats");

  return (
    <section className="relative py-16 sm:py-20">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-6 sm:p-10 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const dbItem = findItem(items, stat.key);
            const value = extraNumber(dbItem, "value", stat.value);
            const suffix = extraString(dbItem, "suffix", stat.suffix);
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="gradient-brand flex size-14 items-center justify-center rounded-2xl text-white shadow-[0_10px_28px_-10px_rgba(110,75,152,0.65)]">
                  <Icon className="size-6" />
                </span>
                <p className="gradient-brand-text text-3xl font-extrabold sm:text-4xl">
                  <StatCounter value={value} suffix={suffix} />
                </p>
                <p className="text-xs font-semibold text-brand-ink-muted sm:text-sm">{t(stat.key)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
