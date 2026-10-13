"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowLeft, Play } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaImage } from "@/components/ui/MediaImage";
import { VideoModal } from "@/components/ui/VideoModal";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { extraString, findItem } from "@/lib/cms/helpers";
import type { DynamicItem } from "@/lib/supabase/types";

/**
 * Shows a preview of the same videos managed on the Videos page (the first
 * few, by their own order) instead of a separately-authored list, so editing
 * or reordering a video there is instantly reflected here too.
 */
export function TopVideos({ items = [] }: { items?: DynamicItem[] }) {
  const t = useTranslations("topVideos");
  const tVideos = useTranslations("videosPage.gallery");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const videos = items
    .filter((item): item is DynamicItem & { item_key: string } => !!item.item_key)
    .slice(0, 3);
  const openItem = openKey ? findItem(items, openKey) : undefined;
  const openVideoUrl = openItem ? extraString(openItem, "videoUrl", "") : "";
  const openTitle = openKey ? tVideos(`items.${openKey}.title`) : "";

  if (videos.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1.15}
            centeredSlides={false}
            pagination={{ clickable: true, el: ".videos-pagination" }}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-2"
          >
            {videos.map((video, i) => {
              const title = tVideos(`items.${video.item_key}.title`);
              const duration = extraString(video, "duration", "");
              return (
                <SwiperSlide key={video.item_key}>
                  <motion.button
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    onClick={() => setOpenKey(video.item_key)}
                    className="group relative block w-full overflow-hidden rounded-3xl text-start"
                    aria-label={title}
                  >
                    <div className="glow-border glass-strong rounded-3xl p-2">
                      <MediaImage src={video.image_url ?? ""} alt={title} icon={Play} ratio="portrait" className="rounded-2xl" />
                    </div>
                    <span className="glass-strong absolute left-1/2 top-[42%] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110">
                      <Play className="size-6 fill-current" />
                    </span>
                    {duration && (
                      <span className="absolute end-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm" dir="ltr">
                        {duration}
                      </span>
                    )}
                    <p className="mt-3 px-1 text-sm font-bold text-brand-ink">{title}</p>
                  </motion.button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="videos-pagination mt-6 flex justify-center gap-2" />
        </div>

        <div className="mt-10 flex justify-center">
          <LiquidButton href="/videos" variant="primary" icon={ArrowLeft} iconPosition="end">
            {t("viewAll")}
          </LiquidButton>
        </div>
      </div>

      <VideoModal open={!!openKey} videoUrl={openVideoUrl} title={openTitle} onClose={() => setOpenKey(null)} />
    </section>
  );
}
