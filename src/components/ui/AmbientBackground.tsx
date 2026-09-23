"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AmbientBackgroundProps = {
  variant?: "hero" | "section";
  className?: string;
};

export function AmbientBackground({ variant = "section", className }: AmbientBackgroundProps) {
  const size = variant === "hero" ? "size-[38rem]" : "size-96";

  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          size,
          "absolute -top-32 -right-24 rounded-full bg-brand-primary/30 blur-[110px]",
        )}
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          size,
          "absolute -bottom-32 -left-24 rounded-full bg-brand-rose/25 blur-[110px]",
        )}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full bg-brand-dark/40 blur-[100px]"
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-brand-surface)_92%)]" />
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
