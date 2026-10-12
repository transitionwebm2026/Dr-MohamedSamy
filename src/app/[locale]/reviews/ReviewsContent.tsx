import { ReviewsHero } from "@/components/sections/reviews/ReviewsHero";
import { ReviewsBentoGrid } from "@/components/sections/reviews/ReviewsBentoGrid";
import { ReviewsCTA } from "@/components/sections/reviews/ReviewsCTA";
import { getSection } from "@/lib/cms/queries";

export async function ReviewsContent() {
  const section = await getSection("reviews", "reviews_grid");

  return (
    <>
      <ReviewsHero />
      <ReviewsBentoGrid items={section?.items ?? []} />
      <ReviewsCTA />
    </>
  );
}
