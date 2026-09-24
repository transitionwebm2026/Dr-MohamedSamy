"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Lightweight gradient + icon placeholder standing in for real photography
 * or video thumbnails. Replace with next/image once assets are available —
 * shape (rounded corners, aspect ratio) is kept identical for a drop-in swap.
 */
type MediaPlaceholderProps = {
  icon: LucideIcon;
  className?: string;
  ratio?: "video" | "square" | "portrait";
  iconClassName?: string;
};

const ratioClasses: Record<NonNullable<MediaPlaceholderProps["ratio"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[9/16]",
};

export function MediaPlaceholder({
  icon: Icon,
  className,
  ratio = "video",
  iconClassName,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(ratioClasses[ratio], "gradient-brand relative w-full overflow-hidden rounded-2xl", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(225,190,255,0.22),transparent_55%)]" />
      <div className="flex h-full w-full items-center justify-center">
        <Icon className={cn("size-10 text-white/85 sm:size-12", iconClassName)} strokeWidth={1.5} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-dark/60 to-transparent" />
    </div>
  );
}
