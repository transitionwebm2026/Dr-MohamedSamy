import { ReviewsHero } from "@/components/sections/reviews/ReviewsHero";
import { ReviewsBentoGrid } from "@/components/sections/reviews/ReviewsBentoGrid";
import { ReviewsCTA } from "@/components/sections/reviews/ReviewsCTA";

export function ReviewsContent() {
  return (
    <>
      <ReviewsHero />
      <ReviewsBentoGrid />
      <ReviewsCTA />
    </>
  );
}
