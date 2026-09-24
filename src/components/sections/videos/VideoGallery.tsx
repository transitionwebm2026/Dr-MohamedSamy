"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaImage } from "@/components/ui/MediaImage";
import { VideoModal } from "@/components/ui/VideoModal";
import { cn } from "@/lib/utils";
import { videoLibrary, videoCategoryIcons } from "@/lib/data";
import { extraString, findItem } from "@/lib/cms/helpers";
import type { DynamicItem } from "@/lib/supabase/types";

export function VideoGallery({ items = [] }: { items?: DynamicItem[] }) {
  const t = useTranslations("videosPage.gallery");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openVideo = videoLibrary.find((v) => v.key === openKey);
  const openDbItem = openKey ? findItem(items, openKey) : undefined;
  const openVideoUrl = openDbItem ? extraString(openDbItem, "videoUrl", "") : "";

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoLibrary.map((video, i) => {
            const CategoryIcon = videoCategoryIcons[video.category];
            const dbItem = findItem(items, video.key);
            const duration = extraString(dbItem, "duration", video.duration);
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
                <MediaImage
                  src={dbItem?.image_url ?? ""}
                  alt={t(`items.${video.key}.title`)}
                  icon={Play}
                  ratio="portrait"
                  iconClassName="opacity-0"
                />

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
                  {duration}
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

      <VideoModal
        open={!!openVideo}
        videoUrl={openVideoUrl}
        title={openVideo ? t(`items.${openVideo.key}.title`) : undefined}
        onClose={() => setOpenKey(null)}
        closeLabel={t("closeAria")}
      />
    </section>
  );
}
