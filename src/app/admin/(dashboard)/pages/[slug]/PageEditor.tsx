"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DynamicItem, Page, PageSection } from "@/lib/supabase/types";
import { SectionAccordion } from "./SectionAccordion";
import { NewSectionForm } from "./NewSectionForm";
import { RefreshProvider } from "./refresh-context";

const siteWidePages = new Set(["navbar", "footer"]);

const pageNotes: Record<string, string> = {
  navbar:
    "يظهر هذا الناف بار في أعلى كل صفحات الموقع. أخفِ أي قسم بإلغاء «ظاهر في الموقع»، ورتّب الروابط بالأسهم، وأضف روابط جديدة من قسم «روابط القائمة».",
  footer:
    "يظهر هذا الفوتر أسفل كل صفحات الموقع. أرقام التواصل والبريد والعنوان وروابط السوشيال ميديا تُعدَّل من «الإعدادات العامة» وتنعكس هنا تلقائياً.",
  contact:
    "في قسم «فروعنا ومواقعنا»، كل فرع عبارة عن عنصر: اسم الفرع في العنوان، العنوان بالتفصيل في الوصف، رقم هاتف الفرع في حقل «رقم الهاتف»، ورابط خرائط جوجل (لو موجود) في حقل «رابط». رقم الواتساب الموحّد والبريد يُعدَّلان من «الإعدادات العامة».",
};

export function PageEditor({ slug }: { slug: string }) {
  const [page, setPage] = useState<Page | null | undefined>(undefined);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [itemsBySection, setItemsBySection] = useState<Map<string, DynamicItem[]>>(new Map());

  const refresh = useCallback(async () => {
    const supabase = createClient();

    const { data: pageRow } = await supabase.from("pages").select("*").eq("slug", slug).single();
    if (!pageRow) {
      setPage(null);
      return;
    }
    setPage(pageRow);

    const { data: sectionRows } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_id", pageRow.id)
      .order("order_index");
    setSections(sectionRows ?? []);

    const sectionIds = (sectionRows ?? []).map((s) => s.id);
    const { data: items } =
      sectionIds.length > 0
        ? await supabase.from("dynamic_items_collections").select("*").in("section_id", sectionIds)
        : { data: [] as DynamicItem[] };

    const map = new Map<string, DynamicItem[]>();
    for (const item of items ?? []) {
      const list = map.get(item.section_id) ?? [];
      list.push(item);
      map.set(item.section_id, list);
    }
    setItemsBySection(map);
  }, [slug]);

  useEffect(() => {
    // Fetches this page's sections/items fresh from Supabase (no
    // build-time cache to read from in a Client Component) — the same
    // function is reused as `refresh` after every mutation below.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  if (page === undefined) return null;
  if (page === null) return <p className="text-brand-ink-muted">هذه الصفحة غير موجودة.</p>;

  return (
    <RefreshProvider value={refresh}>
      <div>
        <h1 className="mb-2 text-xl font-extrabold text-brand-ink">{page.title_ar || page.slug}</h1>
        {pageNotes[slug] ? (
          <p className="mb-6 text-sm leading-relaxed text-brand-ink-muted">{pageNotes[slug]}</p>
        ) : (
          <div className="mb-4" />
        )}

        <div className="space-y-4">
          {sections.map((section) => (
            <SectionAccordion
              key={section.id}
              section={section}
              slug={slug}
              items={itemsBySection.get(section.id) ?? []}
              sections={sections.map((s) => ({ id: s.id, order_index: s.order_index }))}
            />
          ))}

          {sections.length === 0 && <p className="text-sm text-brand-ink-muted">لا توجد أقسام لهذه الصفحة بعد.</p>}
        </div>

        {!siteWidePages.has(slug) && (
          <div className="mt-6">
            <NewSectionForm pageId={page.id} slug={slug} />
          </div>
        )}
      </div>
    </RefreshProvider>
  );
}
