import { createClient } from "@/lib/supabase/server";
import type { DynamicItem, GlobalSettings, PageSection } from "@/lib/supabase/types";

/**
 * Data access layer for the public site. Every function degrades to `null`
 * / an empty array instead of throwing, so a caller can fall back to the
 * existing next-intl content while a page hasn't been migrated into the CMS
 * yet (or a section's row simply doesn't exist).
 */

export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("global_settings").select("*").eq("id", 1).maybeSingle();
  return data ?? null;
}

export type SectionWithItems = PageSection & { items: DynamicItem[] };

export async function getPageSections(slug: string): Promise<SectionWithItems[]> {
  const supabase = await createClient();

  const { data: page } = await supabase.from("pages").select("id").eq("slug", slug).eq("is_active", true).maybeSingle();
  if (!page) return [];

  const { data: sections } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_id", page.id)
    .eq("is_visible", true)
    .order("order_index");

  if (!sections || sections.length === 0) return [];

  const { data: items } = await supabase
    .from("dynamic_items_collections")
    .select("*")
    .in(
      "section_id",
      sections.map((s) => s.id),
    )
    .eq("is_visible", true)
    .order("order_index");

  return sections.map((section) => ({
    ...section,
    items: (items ?? []).filter((item) => item.section_id === section.id),
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
