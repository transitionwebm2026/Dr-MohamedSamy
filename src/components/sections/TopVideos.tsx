"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowLeft, Play } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { topVideos } from "@/lib/data";

export function TopVideos() {
  const t = useTranslations("topVideos");

  return (
    <section className="relative py-20 sm:py-28">
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
            {topVideos.map((video, i) => {
              const title = t(`items.${video.key}.title`);
              return (
                <SwiperSlide key={video.key}>
                  <motion.button
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative block w-full overflow-hidden rounded-3xl text-start"
                    aria-label={title}
                  >
                    <div className="glow-border glass-strong rounded-3xl p-2">
                      <MediaPlaceholder icon={Play} ratio="portrait" className="rounded-2xl" />
                    </div>
                    <span className="glass-strong absolute left-1/2 top-[42%] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110">
                      <Play className="size-6 fill-current" />
                    </span>
                    <span className="absolute end-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm" dir="ltr">
                      {video.duration}
                    </span>
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
    </section>
  );
}
