"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  compact?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  compact = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-start",
        className,
      )}
    >
      {eyebrow && (
        <span className="glass mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-brand-rose sm:text-sm">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance-ar font-extrabold leading-tight text-brand-ink",
          compact ? "text-2xl sm:text-3xl lg:text-4xl" : "text-3xl sm:text-4xl md:text-5xl",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mx-auto max-w-2xl leading-relaxed text-brand-ink-muted",
            compact ? "mt-3 text-sm sm:text-base" : "mt-4 text-base sm:text-lg",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
