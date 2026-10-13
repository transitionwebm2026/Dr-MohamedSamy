import { VideosHero } from "@/components/sections/videos/VideosHero";
import { VideoGallery } from "@/components/sections/videos/VideoGallery";
import { VideosCTA } from "@/components/sections/videos/VideosCTA";
import { getPageSections } from "@/lib/cms/queries";

export async function VideosContent() {
  const sections = await getPageSections("videos");
  const byKey = new Map(sections.map((s) => [s.section_key, s]));

  return (
    <>
      <VideosHero content={byKey.get("hero")?.content} />
      <VideoGallery items={byKey.get("video_gallery")?.items ?? []} />
      <VideosCTA />
    </>
  );
}
