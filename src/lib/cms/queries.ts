import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import type { DynamicItem, GlobalSettings, Page, PageSection } from "@/lib/supabase/types";

/**
 * Data access layer for the public site. Every function degrades to `null`
 * / an empty array instead of throwing, so a caller can fall back to the
 * existing next-intl content while a page hasn't been migrated into the CMS
 * yet (or a section's row simply doesn't exist).
 */

export const getGlobalSettings = cache(async (): Promise<GlobalSettings | null> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("global_settings").select("*").eq("id", 1).maybeSingle();
  return data ?? null;
});

/**
 * Every page/section/item in the site, fetched in 3 parallel queries instead
 * of walking pages -> sections -> items one round trip at a time. Cached per
 * request (React `cache`) so the navbar, footer, every page's own content,
 * and the i18n override layer all share this one fetch instead of each
 * re-querying Supabase — this was the main source of the multi-second SSR
 * times (10+ sequential round trips per page load before this change).
 */
export const loadRawCmsData = cache(async (): Promise<{ pages: Page[]; sections: PageSection[]; items: DynamicItem[] }> => {
  const supabase = createPublicClient();
  const [pagesRes, sectionsRes, itemsRes] = await Promise.all([
    supabase.from("pages").select("*"),
    supabase.from("page_sections").select("*"),
    supabase.from("dynamic_items_collections").select("*"),
  ]);
  return {
    pages: pagesRes.data ?? [],
    sections: sectionsRes.data ?? [],
    items: itemsRes.data ?? [],
  };
});

export type SectionWithItems = PageSection & { items: DynamicItem[] };

export async function getPageSections(slug: string): Promise<SectionWithItems[]> {
  const { pages, sections, items } = await loadRawCmsData();

  const page = pages.find((p) => p.slug === slug && p.is_active);
  if (!page) return [];

  const pageSections = sections
    .filter((s) => s.page_id === page.id && s.is_visible)
    .sort((a, b) => a.order_index - b.order_index);

  if (pageSections.length === 0) return [];

  return pageSections.map((section) => ({
    ...section,
    items: items
      .filter((item) => item.section_id === section.id && item.is_visible)
      .sort((a, b) => a.order_index - b.order_index),
  }));
}

export async function getSection(slug: string, sectionKey: string): Promise<SectionWithItems | null> {
  const sections = await getPageSections(slug);
  return sections.find((s) => s.section_key === sectionKey) ?? null;
}

/** Reads a `{ar, en}` field out of a section's content blob for the given locale. */
export function localizedField(
  content: Record<string, unknown> | undefined,
  key: string,
  locale: string,
): string | undefined {
  const value = content?.[key];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const localized = value as Record<string, unknown>;
    const v = localized[locale];
    return typeof v === "string" ? v : undefined;
  }
  return undefined;
}
