import { VideosHero } from "@/components/sections/videos/VideosHero";
import { VideoGallery } from "@/components/sections/videos/VideoGallery";
import { VideosCTA } from "@/components/sections/videos/VideosCTA";

export function VideosContent() {
  return (
    <>
      <VideosHero />
      <VideoGallery />
      <VideosCTA />
    </>
  );
}
