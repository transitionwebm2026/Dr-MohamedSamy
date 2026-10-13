import { ArticlesHero } from "@/components/sections/articles/ArticlesHero";
import { ArticlesSection } from "@/components/sections/articles/ArticlesSection";
import { ArticlesCTA } from "@/components/sections/articles/ArticlesCTA";
import { getPageSections } from "@/lib/cms/queries";

export async function ArticlesContent() {
  const sections = await getPageSections("articles");
  const byKey = new Map(sections.map((s) => [s.section_key, s]));

  return (
    <>
      <ArticlesHero content={byKey.get("hero")?.content} />
      <ArticlesSection items={byKey.get("articles_section")?.items ?? []} />
      <ArticlesCTA />
    </>
  );
}
