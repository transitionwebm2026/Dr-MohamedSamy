import { ArticlesHero } from "@/components/sections/articles/ArticlesHero";
import { ArticlesSection } from "@/components/sections/articles/ArticlesSection";
import { ArticlesCTA } from "@/components/sections/articles/ArticlesCTA";
import { getSection } from "@/lib/cms/queries";

export async function ArticlesContent() {
  const section = await getSection("articles", "articles_section");

  return (
    <>
      <ArticlesHero />
      <ArticlesSection items={section?.items ?? []} />
      <ArticlesCTA />
    </>
  );
}
