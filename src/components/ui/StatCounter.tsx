"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type StatCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

export function StatCounter({ value, suffix = "", duration = 2 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} dir="ltr" className="font-montserrat tabular-nums">
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
