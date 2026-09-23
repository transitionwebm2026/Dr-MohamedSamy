"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/utils";
import { videoLibrary, videoCategoryIcons } from "@/lib/data";

export function VideoGallery() {
  const t = useTranslations("videosPage.gallery");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openVideo = videoLibrary.find((v) => v.key === openKey);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoLibrary.map((video, i) => {
            const CategoryIcon = videoCategoryIcons[video.category];
            return (
              <motion.button
                key={video.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setOpenKey(video.key)}
                aria-label={t("playAria")}
                className="group relative block overflow-hidden rounded-3xl border border-white/20 text-start shadow-[0_10px_30px_-15px_rgba(21,7,38,0.6)] transition-shadow duration-300 hover:shadow-[0_25px_50px_-15px_rgba(110,75,152,0.55)]"
              >
                <MediaPlaceholder icon={Play} ratio="portrait" iconClassName="opacity-0" />

                {/* category badge */}
                <span
                  className={cn(
                    "absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur-md",
                    video.category === "endoscopy" && "border-brand-primary/40 bg-brand-primary/25 text-brand-ink",
                    video.category === "liver" && "border-brand-rose/40 bg-brand-rose/25 text-brand-ink",
                    video.category === "prevention" && "border-brand-light/40 bg-brand-light/25 text-brand-ink",
                  )}
                >
                  <CategoryIcon className="size-3" />
                  {t(`categories.${video.category}`)}
                </span>

                {/* duration badge */}
                <span
                  dir="ltr"
                  className="absolute end-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm"
                >
                  {video.duration}
                </span>

                {/* play button, glows on hover */}
                <span className="glass-strong absolute left-1/2 top-[42%] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-[0_0_0_0_rgba(225,148,159,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_35px_10px_rgba(225,148,159,0.45)]">
                  <Play className="size-6 fill-current" />
                </span>

                {/* bottom title + description scrim */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent px-4 pb-4 pt-12">
                  <h3 className="text-sm font-bold text-white">{t(`items.${video.key}.title`)}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">
                    {t(`items.${video.key}.description`)}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenKey(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-surface/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-sm rounded-3xl p-3"
            >
              <button
                onClick={() => setOpenKey(null)}
                className="glass absolute -top-4 -end-4 flex size-10 items-center justify-center rounded-full text-brand-ink"
                aria-label={t("closeAria")}
              >
                <X className="size-5" />
              </button>
              <MediaPlaceholder icon={Play} ratio="portrait" className="rounded-2xl" iconClassName="size-14" />
              <p className="mt-3 px-1 text-sm font-bold text-brand-ink">{t(`items.${openVideo.key}.title`)}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
