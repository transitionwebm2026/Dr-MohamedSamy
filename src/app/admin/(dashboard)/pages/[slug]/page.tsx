import { PageEditor } from "./PageEditor";

// The CMS's page list is fixed by schema design (one row per site page/part,
// seeded by scripts/seed-sections.mjs + seed-layout.mjs) — static export
// needs every dynamic-route value known at build time, so this is that list.
const slugs = ["home", "about", "services", "videos", "reviews", "articles", "contact", "navbar", "footer"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function AdminPageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PageEditor slug={slug} />;
}
