"use client";

import { useTranslations } from "next-intl";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/sections/reviews/TiltCard";
import { patientReviews } from "@/lib/data";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="size-4 fill-brand-rose text-brand-rose" />
      ))}
    </div>
  );
}

function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-whatsapp/15 px-2.5 py-1 text-xs font-bold text-brand-whatsapp">
      <BadgeCheck className="size-3.5" />
      {label}
    </span>
  );
}

export function ReviewsBentoGrid() {
  const t = useTranslations("reviewsPage.gallery");

  return (
    <section id="reviews" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {patientReviews.map((review, i) => (
            <TiltCard
              key={review.key}
              initial={{ opacity: 0, y: 36, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.12,
              }}
              className="glow-border glass flex h-[380px] flex-col overflow-hidden rounded-3xl p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="gradient-brand flex size-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white">
                  {t(`items.${review.key}.name`).charAt(0)}
                </span>
                <div className="flex flex-col items-end gap-2">
                  <StarRow rating={review.rating} />
                  <Quote className="size-6 text-brand-rose/50" />
                </div>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-brand-ink-muted sm:text-base">
                {t(`items.${review.key}.text`)}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                <VerifiedBadge label={t("verifiedBadge")} />
                <div className="text-end">
                  <p className="text-sm font-bold text-brand-ink">{t(`items.${review.key}.name`)}</p>
                  <p className="text-xs text-brand-ink-muted">{t(`items.${review.key}.procedure`)}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
