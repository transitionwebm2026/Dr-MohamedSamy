"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play, Stethoscope } from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaImage } from "@/components/ui/MediaImage";
import { VideoModal } from "@/components/ui/VideoModal";

export function IntroVideo({ content }: { content?: Record<string, unknown> }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("aboutPage.video");
  const thumbnailUrl = typeof content?.thumbnailUrl === "string" ? content.thumbnailUrl : "";
  const videoUrl = typeof content?.videoUrl === "string" ? content.videoUrl : "";

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
            <MediaImage
              src={thumbnailUrl}
              alt={t("title")}
              icon={Stethoscope}
              ratio="video"
              className="min-h-[50vh] w-full rounded-[2rem] sm:min-h-[65vh] lg:min-h-[80vh]"
            />
          </div>
          <span className="glass-strong absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110 sm:size-20">
            <Play className="size-7 fill-current sm:size-8" />
          </span>
        </motion.button>
      </div>

      <VideoModal open={open} videoUrl={videoUrl} title={t("title")} onClose={() => setOpen(false)} closeLabel={t("closeAria")} />
    </section>
  );
}
