"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowLeft, Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { reviews } from "@/lib/data";

export function Reviews() {
  const t = useTranslations("reviews");

  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true, el: ".reviews-pagination" }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-2"
          >
            {reviews.map((review) => {
              const name = t(`items.${review.key}.name`);
              return (
                <SwiperSlide key={review.key} className="h-auto py-2">
                  <GlassCard glow className="flex h-full flex-col">
                    <Quote className="size-8 text-brand-rose/70" />
                    <div className="mt-3 flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-brand-rose text-brand-rose" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-ink-muted">
                      {t(`items.${review.key}.text`)}
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                      <span className="gradient-brand flex size-10 items-center justify-center rounded-full text-sm font-bold text-white">
                        {name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-brand-ink">{name}</p>
                        <p className="text-xs text-brand-ink-muted">{t(`items.${review.key}.procedure`)}</p>
                      </div>
                    </div>
                  </GlassCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="reviews-pagination mt-6 flex justify-center gap-2" />
        </motion.div>

        <div className="mt-10 flex justify-center">
          <LiquidButton href="/reviews" variant="ghost" icon={ArrowLeft} iconPosition="end">
            {t("readMore")}
          </LiquidButton>
        </div>
      </div>
    </section>
  );
}
