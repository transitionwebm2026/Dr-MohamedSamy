"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AmbientBackgroundProps = {
  variant?: "hero" | "section";
  className?: string;
};

/**
 * The backdrop every section sits on: the flat dark page color plus a soft
 * purple glow at the very top of the section — strongest in the top-right
 * corner, fading out downward — so each section "starts" with it and nothing
 * else tints the rest of the page.
 */
export function AmbientBackground({ variant = "section", className }: AmbientBackgroundProps) {
  const h = variant === "hero" ? 560 : 420;

  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            `radial-gradient(45% ${h}px at 100% 0%, rgba(225, 148, 159, 0.19), transparent)`,
            `radial-gradient(60% ${h}px at 100% 0%, rgba(169, 127, 201, 0.09), transparent)`,
            `radial-gradient(45% ${h}px at 0% 0%, rgba(110, 75, 152, 0.14), transparent)`,
            `linear-gradient(to bottom, rgba(110, 75, 152, 0.13), transparent ${h}px)`,
          ].join(", "),
        }}
      />

      {/* subtle floating particles */}
      {particlePositions.map((p, i) => (
        <motion.span
          key={i}
          className="absolute size-1.5 rounded-full bg-brand-rose/60"
          style={{ top: p.top, left: p.left }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

const particlePositions = [
  { top: "12%", left: "18%" },
  { top: "25%", left: "78%" },
  { top: "60%", left: "10%" },
  { top: "72%", left: "85%" },
  { top: "40%", left: "50%" },
  { top: "85%", left: "40%" },
  { top: "15%", left: "60%" },
  { top: "55%", left: "92%" },
];
