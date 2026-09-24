"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { ok?: boolean; error?: string } | undefined;

async function revalidate(slug: string) {
  revalidatePath(`/admin/pages/${slug}`);
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export async function updateSection(
  sectionId: string,
  slug: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();

  let content: Record<string, unknown> = {};
  try {
    content = JSON.parse(String(formData.get("content") ?? "{}"));
  } catch {
    return { error: "المحتوى غير صالح" };
  }

  const { error } = await supabase
    .from("page_sections")
    .update({
      section_title_ar: String(formData.get("section_title_ar") ?? ""),
      section_title_en: String(formData.get("section_title_en") ?? ""),
      is_visible: formData.get("is_visible") === "on",
      content,
    })
    .eq("id", sectionId);

  if (error) return { error: error.message };
  await revalidate(slug);
  return { ok: true };
}

export async function createSection(pageId: string, slug: string, formData: FormData): Promise<void> {
  const supabase = await createClient();
  const sectionKey = String(formData.get("section_key") ?? "").trim();
  if (!sectionKey) return;

  const { data: existing } = await supabase
    .from("page_sections")
    .select("order_index")
    .eq("page_id", pageId)
    .order("order_index", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("page_sections").insert({
    page_id: pageId,
    section_key: sectionKey,
    section_title_ar: sectionKey,
    section_title_en: sectionKey,
    order_index: (existing?.order_index ?? -1) + 1,
    content: {},
  });

  await revalidate(slug);
}

export async function deleteSection(sectionId: string, slug: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("page_sections").delete().eq("id", sectionId);
  await revalidate(slug);
}

export async function moveSection(
  slug: string,
  sections: { id: string; order_index: number }[],
  sectionId: string,
  direction: "up" | "down",
): Promise<void> {
  const supabase = await createClient();
  const sorted = [...sections].sort((a, b) => a.order_index - b.order_index);
  const i = sorted.findIndex((s) => s.id === sectionId);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= sorted.length) return;

  await Promise.all([
    supabase.from("page_sections").update({ order_index: sorted[j].order_index }).eq("id", sorted[i].id),
    supabase.from("page_sections").update({ order_index: sorted[i].order_index }).eq("id", sorted[j].id),
  ]);

  await revalidate(slug);
}

// ---------------------------------------------------------------------------
// Items (dynamic_items_collections)
// ---------------------------------------------------------------------------

export async function upsertItem(
  sectionId: string,
  slug: string,
  itemId: string | null,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();

  let extra: Record<string, unknown> = {};
  try {
    extra = JSON.parse(String(formData.get("extra") ?? "{}"));
  } catch {
    return { error: "بيانات إضافية غير صالحة" };
  }

  const payload = {
    section_id: sectionId,
    item_key: String(formData.get("item_key") ?? "") || null,
    title_ar: String(formData.get("title_ar") ?? ""),
    title_en: String(formData.get("title_en") ?? ""),
    description_ar: String(formData.get("description_ar") ?? ""),
    description_en: String(formData.get("description_en") ?? ""),
    image_url: String(formData.get("image_url") ?? "") || null,
    link_url: String(formData.get("link_url") ?? "") || null,
    is_visible: formData.get("is_visible") === "on",
    extra,
  };

  const { error } = itemId
    ? await supabase.from("dynamic_items_collections").update(payload).eq("id", itemId)
    : await supabase
        .from("dynamic_items_collections")
        .insert({ ...payload, order_index: Date.now() });

  if (error) return { error: error.message };
  await revalidate(slug);
  return { ok: true };
}

export async function deleteItem(itemId: string, slug: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("dynamic_items_collections").delete().eq("id", itemId);
  await revalidate(slug);
}

export async function moveItem(
  slug: string,
  items: { id: string; order_index: number }[],
  itemId: string,
  direction: "up" | "down",
): Promise<void> {
  const supabase = await createClient();
  const sorted = [...items].sort((a, b) => a.order_index - b.order_index);
  const i = sorted.findIndex((it) => it.id === itemId);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= sorted.length) return;

  await Promise.all([
    supabase.from("dynamic_items_collections").update({ order_index: sorted[j].order_index }).eq("id", sorted[i].id),
    supabase.from("dynamic_items_collections").update({ order_index: sorted[i].order_index }).eq("id", sorted[j].id),
  ]);

  await revalidate(slug);
}
