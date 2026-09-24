"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

type VideoModalProps = {
  open: boolean;
  videoUrl?: string;
  title?: string;
  onClose: () => void;
  closeLabel?: string;
};

/**
 * Shared video lightbox — every video on the site (Home, About, Videos page)
 * opens through this same component so the popup is always sized and behaves
 * identically: a centered, capped-width card (never the full viewport) that
 * keeps the video's own 16:9 aspect ratio via aspect-video + object-contain.
 */
export function VideoModal({ open, videoUrl, title, onClose, closeLabel = "إغلاق" }: VideoModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
        >
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="glass absolute end-4 top-4 z-10 flex size-11 items-center justify-center rounded-full text-white sm:end-6 sm:top-6"
          >
            <X className="size-5" />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-4xl flex-col items-center gap-4 p-4 sm:p-10"
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="aspect-video max-h-[75vh] w-full rounded-xl bg-black object-contain sm:rounded-2xl"
              />
            ) : (
              <MediaPlaceholder icon={Play} ratio="video" className="w-full" />
            )}
            {title && <p className="px-4 text-center text-sm font-bold text-white sm:text-base">{title}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
