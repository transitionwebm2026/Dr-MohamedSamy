"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Award, GraduationCap, Play, Stethoscope } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaImage } from "@/components/ui/MediaImage";
import { VideoModal } from "@/components/ui/VideoModal";

const qualifications = [
  { key: "phd", icon: GraduationCap },
  { key: "fellowship", icon: Award },
  { key: "member", icon: Stethoscope },
];

export function AboutDoctor({ content }: { content?: Record<string, unknown> }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("about");
  const thumbnailUrl = typeof content?.thumbnailUrl === "string" ? content.thumbnailUrl : "";
  const videoUrl = typeof content?.videoUrl === "string" ? content.videoUrl : "";

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative w-full"
          >
            <button
              onClick={() => setOpen(true)}
              className="group relative block w-full overflow-hidden rounded-3xl"
              aria-label={t("playAria")}
            >
              <div className="glow-border glass-strong w-full rounded-3xl p-2">
                {/* aspect-video (16:9) is intentional — keep this ratio regardless of column height */}
                <MediaImage src={thumbnailUrl} alt={t("title")} icon={Stethoscope} ratio="video" className="w-full rounded-2xl" />
              </div>
              <span className="glass-strong absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110 sm:size-16">
                <Play className="size-6 fill-current sm:size-7" />
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SectionHeader
              align="start"
              compact
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              className="mx-0 max-w-none"
            />

            <ul className="mt-6 space-y-3">
              {qualifications.map((q) => (
                <li key={q.key} className="glass flex items-center gap-3.5 rounded-2xl p-3.5">
                  <span className="gradient-brand flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <q.icon className="size-4 text-white" />
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-brand-ink-muted">
                    {t(`qualifications.${q.key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <VideoModal open={open} videoUrl={videoUrl} title={t("title")} onClose={() => setOpen(false)} closeLabel={t("closeAria")} />
    </section>
  );
}
