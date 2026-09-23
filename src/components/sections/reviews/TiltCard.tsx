"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = HTMLMotionProps<"div"> & {
  className?: string;
};

/**
 * Wraps a card with a subtle pointer-tracked 3D tilt — rotates toward the
 * cursor position and springs back to flat on leave.
 */
export function TiltCard({ className, children, ...rest }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 10);
    rotateX.set(y * -10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, y: -6 }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      className={cn(
        "will-change-transform transition-[box-shadow,border-color] duration-500 hover:border-brand-rose/50 hover:shadow-[0_25px_60px_-20px_rgba(225,148,159,0.45)]",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
