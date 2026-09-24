"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, Clock, X, type LucideIcon } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/utils";
import { articleCategoryIcons, articleGrid, articleList, featuredArticle } from "@/lib/data";

const categoryClass: Record<string, string> = {
  digestive: "border-brand-primary/40 bg-brand-primary/20 text-brand-ink",
  liver: "border-brand-rose/40 bg-brand-rose/20 text-brand-ink",
  endoscopy: "border-brand-light/40 bg-brand-light/20 text-brand-ink",
};

const allArticles = [featuredArticle, ...articleList, ...articleGrid];

function CategoryBadge({ category, label, className }: { category: string; label: string; className?: string }) {
  const Icon = articleCategoryIcons[category as keyof typeof articleCategoryIcons];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold",
        categoryClass[category],
        className,
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

function ReadTime({ minutes, label }: { minutes: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink-muted">
      <Clock className="size-3.5" />
      {minutes} {label}
    </span>
  );
}

function ReadMoreButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-rose transition-colors hover:text-brand-ink"
    >
      {label}
      <ArrowLeft className="size-4 ltr:-scale-x-100" />
    </button>
  );
}

type ArticleCardData = {
  key: string;
  icon: LucideIcon;
  category: string;
  readTime: string;
};

function ArticleCard({
  article,
  index,
  t,
  onOpen,
}: {
  article: ArticleCardData;
  index: number;
  t: ReturnType<typeof useTranslations>;
  onOpen: () => void;
}) {
  return (
    <GlassCard
      glow
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col p-5 sm:p-6"
    >
      <MediaPlaceholder icon={article.icon} ratio="video" />
      <CategoryBadge category={article.category} label={t(`categories.${article.category}`)} className="mt-4" />
      <h4 className="mt-3 text-base font-bold text-brand-ink">{t(`items.${article.key}.title`)}</h4>
      <p className="line-clamp-3 mt-2 flex-1 text-sm leading-relaxed text-brand-ink-muted">
        {t(`items.${article.key}.excerpt`)}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ReadTime minutes={article.readTime} label={t("readTimeLabel")} />
        <ReadMoreButton label={t("readMoreLabel")} onClick={onOpen} />
      </div>
    </GlassCard>
  );
}

export function ArticlesSection() {
  const t = useTranslations("articlesPage.section");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openArticle = allArticles.find((a) => a.key === openKey);
  const openParagraphs = openArticle ? t(`items.${openArticle.key}.content`).split("\n\n") : [];

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        {/* Featured hero article */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glow-border glass-strong mt-14 grid overflow-hidden rounded-[2rem] lg:grid-cols-2"
        >
          <MediaPlaceholder icon={featuredArticle.icon} ratio="video" className="h-full rounded-none" />
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <CategoryBadge category={featuredArticle.category} label={t(`categories.${featuredArticle.category}`)} />
            <h3 className="mt-4 text-xl font-extrabold leading-snug text-brand-ink sm:text-2xl lg:text-3xl">
              {t(`items.${featuredArticle.key}.title`)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-ink-muted sm:text-base">
              {t(`items.${featuredArticle.key}.excerpt`)}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ReadTime minutes={featuredArticle.readTime} label={t("readTimeLabel")} />
              <ReadMoreButton label={t("readMoreLabel")} onClick={() => setOpenKey(featuredArticle.key)} />
            </div>
          </div>
        </motion.div>

        {/* 3 articles */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articleList.map((article, i) => (
            <ArticleCard key={article.key} article={article} index={i} t={t} onOpen={() => setOpenKey(article.key)} />
          ))}
        </div>

        {/* 3 more articles */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articleGrid.map((article, i) => (
            <ArticleCard key={article.key} article={article} index={i} t={t} onOpen={() => setOpenKey(article.key)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenKey(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-surface/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl"
            >
              <button
                onClick={() => setOpenKey(null)}
                className="glass absolute -top-4 -end-4 z-10 flex size-10 items-center justify-center rounded-full text-brand-ink"
                aria-label={t("closeAria")}
              >
                <X className="size-5" />
              </button>

              <div className="glass-strong max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
                <MediaPlaceholder icon={openArticle.icon} ratio="video" iconClassName="size-14" />
                <CategoryBadge
                  category={openArticle.category}
                  label={t(`categories.${openArticle.category}`)}
                  className="mt-5"
                />
                <h3 className="mt-4 text-xl font-extrabold leading-snug text-brand-ink sm:text-2xl">
                  {t(`items.${openArticle.key}.title`)}
                </h3>
                <div className="mt-2">
                  <ReadTime minutes={openArticle.readTime} label={t("readTimeLabel")} />
                </div>

                <div className="mt-6 space-y-4">
                  {openParagraphs.map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-brand-ink-muted sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
