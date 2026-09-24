import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { DynamicItem } from "@/lib/supabase/types";
import { SectionAccordion } from "./SectionAccordion";
import { NewSectionForm } from "./NewSectionForm";

const siteWidePages = new Set(["navbar", "footer"]);

const pageNotes: Record<string, string> = {
  navbar:
    "يظهر هذا الناف بار في أعلى كل صفحات الموقع. أخفِ أي قسم بإلغاء «ظاهر في الموقع»، ورتّب الروابط بالأسهم، وأضف روابط جديدة من قسم «روابط القائمة».",
  footer:
    "يظهر هذا الفوتر أسفل كل صفحات الموقع. أرقام التواصل والبريد والعنوان وروابط السوشيال ميديا تُعدَّل من «الإعدادات العامة» وتنعكس هنا تلقائياً.",
};

export default async function AdminPageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: page } = await supabase.from("pages").select("*").eq("slug", slug).single();
  if (!page) notFound();

  const { data: sections } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_id", page.id)
    .order("order_index");

  const sectionIds = (sections ?? []).map((s) => s.id);
  const { data: items } =
    sectionIds.length > 0
      ? await supabase.from("dynamic_items_collections").select("*").in("section_id", sectionIds)
      : { data: [] };

  const itemsBySection = new Map<string, DynamicItem[]>();
  for (const item of items ?? []) {
    const list = itemsBySection.get(item.section_id) ?? [];
    list.push(item);
    itemsBySection.set(item.section_id, list);
  }

  return (
    <div>
      <h1 className="mb-2 text-xl font-extrabold text-brand-ink">{page.title_ar || page.slug}</h1>
      {pageNotes[slug] ? (
        <p className="mb-6 text-sm leading-relaxed text-brand-ink-muted">{pageNotes[slug]}</p>
      ) : (
        <div className="mb-4" />
      )}

      <div className="space-y-4">
        {(sections ?? []).map((section) => (
          <SectionAccordion
            key={section.id}
            section={section}
            slug={slug}
            items={itemsBySection.get(section.id) ?? []}
            sections={(sections ?? []).map((s) => ({ id: s.id, order_index: s.order_index }))}
          />
        ))}

        {(sections ?? []).length === 0 && (
          <p className="text-sm text-brand-ink-muted">لا توجد أقسام لهذه الصفحة بعد.</p>
        )}
      </div>

      {!siteWidePages.has(slug) && (
        <div className="mt-6">
          <NewSectionForm pageId={page.id} slug={slug} />
        </div>
      )}
    </div>
  );
}
