"use client";

import { useEffect, useState } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

/**
 * A real photo (src) with the same shape/ratio as MediaPlaceholder, falling
 * back to that icon+gradient placeholder automatically if the file isn't
 * there yet — drop a matching image into /public/images/services/ and it
 * swaps in with zero code changes.
 *
 * The load check happens via a detached JS Image() inside useEffect rather
 * than an onError on the rendered <img> — attaching the SSR'd <img>'s src
 * directly races hydration (the browser can fire its native error before
 * React finishes hydrating and attaches the listener, silently losing the
 * event). Building the probe entirely inside an effect guarantees the
 * listener is attached before the request starts.
 */
type MediaImageProps = {
  src: string;
  alt: string;
  icon: LucideIcon;
  ratio?: "video" | "square" | "portrait";
  className?: string;
};

const ratioClasses: Record<NonNullable<MediaImageProps["ratio"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[9/16]",
};

export function MediaImage({ src, alt, icon, ratio = "video", className }: MediaImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    probe.onerror = () => {
      if (!cancelled) setLoaded(false);
    };
    probe.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!loaded) {
    return <MediaPlaceholder icon={icon} ratio={ratio} className={className} />;
  }

  return (
    <div
      className={cn(ratioClasses[ratio], "relative w-full overflow-hidden rounded-2xl bg-brand-surface-2", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- already verified loadable above */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-dark/60 to-transparent" />
    </div>
  );
}
