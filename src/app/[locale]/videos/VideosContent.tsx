import { VideosHero } from "@/components/sections/videos/VideosHero";
import { VideoGallery } from "@/components/sections/videos/VideoGallery";
import { VideosCTA } from "@/components/sections/videos/VideosCTA";
import { getSection } from "@/lib/cms/queries";

export async function VideosContent() {
  const gallery = await getSection("videos", "video_gallery");

  return (
    <>
      <VideosHero />
      <VideoGallery items={gallery?.items ?? []} />
      <VideosCTA />
    </>
  );
}
