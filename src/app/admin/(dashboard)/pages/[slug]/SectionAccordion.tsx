"use client";

import { useActionState, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, EyeOff, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { linkItemSections } from "@/components/admin/itemFieldConfig";
import type { DynamicItem, PageSection } from "@/lib/supabase/types";
import { deleteSection, moveSection, updateSection } from "./actions";
import { ItemsManager } from "./ItemsManager";

export function SectionAccordion({
  section,
  slug,
  items,
  sections,
}: {
  section: PageSection;
  slug: string;
  items: DynamicItem[];
  sections: { id: string; order_index: number }[];
}) {
  const [open, setOpen] = useState(false);
  // The navbar/footer sections are plain field groups; only their link lists hold items.
  const hasItems = !["navbar", "footer"].includes(slug) || linkItemSections.has(section.section_key);
  const action = updateSection.bind(null, section.id, slug);
  const [state, formAction] = useActionState(action, undefined);

  return (
    <div className="glass-strong rounded-2xl">
      <div className="flex items-center justify-between gap-3 p-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-1 items-center gap-2 text-start"
        >
          <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} />
          <span className="font-bold text-brand-ink">{section.section_title_ar || section.section_key}</span>
          <span className="text-xs text-brand-ink-muted">({section.section_key})</span>
          {!section.is_visible && <EyeOff className="size-3.5 shrink-0 text-brand-ink-muted" />}
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => void moveSection(slug, sections, section.id, "up")}
            className="flex size-8 items-center justify-center rounded-lg text-brand-ink-muted hover:bg-white/10"
          >
            <ArrowUp className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => void moveSection(slug, sections, section.id, "down")}
            className="flex size-8 items-center justify-center rounded-lg text-brand-ink-muted hover:bg-white/10"
          >
            <ArrowDown className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("متأكد من حذف هذا القسم بالكامل؟")) void deleteSection(section.id, slug);
            }}
            className="flex size-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-6 border-t border-white/10 p-4">
          <form action={formAction} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="عنوان القسم (عربي)" name="section_title_ar" defaultValue={section.section_title_ar} />
              <TextField
                label="عنوان القسم (إنجليزي)"
                name="section_title_en"
                defaultValue={section.section_title_en}
                dir="ltr"
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
              <input
                type="checkbox"
                name="is_visible"
                defaultChecked={section.is_visible}
                className="size-4 accent-brand-rose"
              />
              ظاهر في الموقع
            </label>
            <ContentEditor name="content" initialContent={section.content} />
            <div className="flex items-center gap-3">
              <SaveButton />
              {state?.ok && <span className="text-sm text-brand-whatsapp">تم الحفظ</span>}
              {state?.error && <span className="text-sm text-red-400">{state.error}</span>}
            </div>
          </form>

          {hasItems && (
            <div className="border-t border-white/10 pt-5">
              <ItemsManager sectionId={section.id} sectionKey={section.section_key} slug={slug} items={items} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
