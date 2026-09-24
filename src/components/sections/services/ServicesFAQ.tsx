"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicesFaqs } from "@/lib/data";

export function ServicesFAQ() {
  const t = useTranslations("servicesPage.faq");
  const [openKey, setOpenKey] = useState<string | null>(servicesFaqs[0]?.key ?? null);

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-12 space-y-3">
          {servicesFaqs.map((faq) => {
            const isOpen = openKey === faq.key;
            return (
              <div key={faq.key} className="glass overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpenKey(isOpen ? null : faq.key)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                >
                  <span className="text-sm font-bold text-brand-ink sm:text-base">
                    {t(`items.${faq.key}.question`)}
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
                        {t(`items.${faq.key}.answer`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
