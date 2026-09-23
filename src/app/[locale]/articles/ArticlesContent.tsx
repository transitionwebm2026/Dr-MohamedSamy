import { ArticlesHero } from "@/components/sections/articles/ArticlesHero";
import { ArticlesSection } from "@/components/sections/articles/ArticlesSection";
import { ArticlesCTA } from "@/components/sections/articles/ArticlesCTA";

export function ArticlesContent() {
  return (
    <>
      <ArticlesHero />
      <ArticlesSection />
      <ArticlesCTA />
    </>
  );
}
