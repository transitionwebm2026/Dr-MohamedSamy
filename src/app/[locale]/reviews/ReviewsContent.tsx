import { ReviewsHero } from "@/components/sections/reviews/ReviewsHero";
import { ReviewsBentoGrid } from "@/components/sections/reviews/ReviewsBentoGrid";
import { ReviewsCTA } from "@/components/sections/reviews/ReviewsCTA";
import { getPageSections } from "@/lib/cms/queries";

export async function ReviewsContent() {
  const sections = await getPageSections("reviews");
  const byKey = new Map(sections.map((s) => [s.section_key, s]));

  return (
    <>
      <ReviewsHero content={byKey.get("hero")?.content} />
      <ReviewsBentoGrid items={byKey.get("reviews_grid")?.items ?? []} />
      <ReviewsCTA />
    </>
  );
}
