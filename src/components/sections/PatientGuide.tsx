"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown, ListChecks, Sparkle } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { patientGuideBefore, patientGuideAfter } from "@/lib/data";

function AccordionGroup({
  phase,
  items,
  label,
}: {
  phase: "before" | "after";
  items: { key: string }[];
  label: string;
}) {
  const t = useTranslations(`guide.${phase}`);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="glass-strong rounded-3xl p-5 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="gradient-brand flex size-10 items-center justify-center rounded-xl">
          <ListChecks className="size-5 text-white" />
        </span>
        <h3 className="text-lg font-extrabold text-brand-ink sm:text-xl">{label}</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.key} className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
              >
                <span className="flex items-center gap-3">
                  <Sparkle className="size-4 shrink-0 text-brand-rose" />
                  <span className="text-sm font-bold text-brand-ink sm:text-base">
                    {t(`${item.key}.title`)}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-brand-ink-muted"
                >
                  <ChevronDown className="size-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-brand-ink-muted">
                      {t(`${item.key}.content`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PatientGuide() {
  const t = useTranslations("guide");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <AccordionGroup phase="before" items={patientGuideBefore} label={t("beforeLabel")} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <AccordionGroup phase="after" items={patientGuideAfter} label={t("afterLabel")} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
