"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Stethoscope } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export function DoctorMessage() {
  const t = useTranslations("aboutPage.message");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glow-border glass-strong relative rounded-[2.5rem] px-6 py-12 text-center sm:px-14 sm:py-16"
        >
          <Image
            src="/images/doctor-avatar.jpg"
            alt={t("signatureName")}
            width={160}
            height={160}
            className="mx-auto mb-6 size-20 rounded-full object-cover ring-2 ring-brand-rose/60 shadow-[0_10px_30px_-8px_rgba(225,148,159,0.5)]"
          />

          <span className="glass mb-5 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-brand-rose sm:text-sm">
            {t("eyebrow")}
          </span>

          <h2 className="text-balance-ar text-2xl font-extrabold leading-tight text-brand-ink sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-loose text-brand-ink-muted sm:text-lg">
            {t("quote")}
          </p>

          <div className="mx-auto mt-8 flex w-fit items-center gap-3 border-t border-white/10 pt-6">
            <span className="gradient-brand flex size-11 items-center justify-center rounded-full text-white">
              <Stethoscope className="size-5" />
            </span>
            <div className="text-start">
              <p className="font-montserrat text-base font-extrabold italic text-brand-ink">
                {t("signatureName")}
              </p>
              <p className="text-xs text-brand-ink-muted">{t("signatureTitle")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
