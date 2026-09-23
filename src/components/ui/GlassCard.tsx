"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLMotionProps<"div"> & {
  strong?: boolean;
  glow?: boolean;
  hover?: boolean;
};

export function GlassCard({
  strong = false,
  glow = false,
  hover = true,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        strong ? "glass-strong" : "glass",
        glow && "glow-border",
        "relative rounded-3xl p-6 transition-all duration-500 sm:p-8",
        hover &&
          "hover:-translate-y-1.5 hover:border-brand-rose/50 hover:shadow-[0_25px_60px_-20px_rgba(225,148,159,0.45)]",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
