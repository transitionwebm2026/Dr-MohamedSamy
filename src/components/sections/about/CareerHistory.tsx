"use client";

import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { careerHistory } from "@/lib/data";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.4, rotate: -12 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, mass: 0.8 },
  },
};

const ringVariants: Variants = {
  hidden: { scale: 1, opacity: 0 },
  visible: { scale: [1, 2], opacity: [0.55, 0], transition: { duration: 0.7, ease: "easeOut" } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function CareerHistory() {
  const t = useTranslations("aboutPage.career");
  const isRtl = useLocale() === "ar";

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute top-8 right-0 left-0 hidden h-0.5 bg-white/10 lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{ transformOrigin: isRtl ? "right" : "left" }}
            className="gradient-brand absolute top-8 right-0 left-0 hidden h-0.5 lg:block"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-8 lg:grid-cols-5"
          >
            {careerHistory.map((step) => (
              <motion.div
                key={step.key}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  variants={iconVariants}
                  className="relative z-10 flex size-16 items-center justify-center rounded-2xl"
                >
                  <motion.span variants={ringVariants} className="absolute inset-0 rounded-2xl bg-brand-rose/50" />
                  <span className="gradient-brand glow-border absolute inset-0 rounded-2xl border border-white/25" />
                  <step.icon className="relative z-10 size-7 text-white" />
                  <span
                    dir="ltr"
                    className={cn(
                      "glass absolute -top-2 flex h-6 items-center rounded-full px-2 text-[11px] font-extrabold text-brand-rose",
                      isRtl ? "-start-3" : "-end-3",
                    )}
                  >
                    {step.year}
                  </span>
                </motion.div>
                <motion.h3 variants={textVariants} className="mt-5 text-base font-bold text-brand-ink">
                  {t(`items.${step.key}.title`)}
                </motion.h3>
                <motion.p variants={textVariants} className="mt-1 text-xs font-semibold text-brand-rose">
                  {t(`items.${step.key}.place`)}
                </motion.p>
                <motion.p variants={textVariants} className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
                  {t(`items.${step.key}.description`)}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
