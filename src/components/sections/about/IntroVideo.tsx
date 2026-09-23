"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play, Stethoscope, X } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export function IntroVideo() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("aboutPage.video");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onClick={() => setOpen(true)}
          aria-label={t("playAria")}
          className="group relative mt-14 block w-full overflow-hidden rounded-[2.5rem]"
        >
          <div className="glow-border glass-strong w-full rounded-[2.5rem] p-2 sm:p-3">
            <MediaPlaceholder
              icon={Stethoscope}
              ratio="video"
              className="min-h-[50vh] w-full rounded-[2rem] sm:min-h-[65vh] lg:min-h-[80vh]"
              iconClassName="size-16 sm:size-20"
            />
          </div>
          <span className="glass-strong absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110 sm:size-20">
            <Play className="size-7 fill-current sm:size-8" />
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-surface/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-4xl rounded-3xl p-3"
            >
              <button
                onClick={() => setOpen(false)}
                className="glass absolute -top-4 -end-4 flex size-10 items-center justify-center rounded-full text-brand-ink"
                aria-label={t("closeAria")}
              >
                <X className="size-5" />
              </button>
              <MediaPlaceholder icon={Play} ratio="video" className="rounded-2xl" iconClassName="size-14" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
