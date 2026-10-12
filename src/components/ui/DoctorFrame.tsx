"use client";

import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaImage } from "@/components/ui/MediaImage";

/**
 * The doctor's portrait frame. Pass `src` (an uploaded photo URL from the
 * dashboard) to show a real photo; without one it falls back to the original
 * decorative gradient + stethoscope placeholder.
 */
type DoctorFrameProps = {
  className?: string;
  ratio?: "portrait" | "square" | "wide";
  src?: string;
  alt?: string;
};

const ratioClasses: Record<NonNullable<DoctorFrameProps["ratio"]>, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-video",
};

// MediaImage uses "video" where DoctorFrame says "wide" for the same aspect ratio.
const mediaImageRatio: Record<NonNullable<DoctorFrameProps["ratio"]>, "video" | "square" | "portrait"> = {
  portrait: "portrait",
  square: "square",
  wide: "video",
};

export function DoctorFrame({ className, ratio = "portrait", src, alt = "" }: DoctorFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("group relative", className)}
    >
      <div className="glow-border glass-strong relative overflow-hidden rounded-[2.5rem] p-2">
        {src ? (
          <MediaImage
            src={src}
            alt={alt}
            icon={Stethoscope}
            ratio={mediaImageRatio[ratio]}
            className="rounded-[2rem]"
          />
        ) : (
          <div
            className={cn(
              ratioClasses[ratio],
              "gradient-brand relative w-full overflow-hidden rounded-[2rem]",
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
            <div className="flex h-full w-full items-center justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass flex size-24 items-center justify-center rounded-full sm:size-32"
              >
                <Stethoscope className="size-12 text-white/90 sm:size-16" strokeWidth={1.5} />
              </motion.div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-dark/70 to-transparent" />
          </div>
        )}
      </div>

      {/* glow ring accent */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] border border-dashed border-brand-rose/30"
      />
    </motion.div>
  );
}
