"use client";

import { Plus } from "lucide-react";
import { createSection } from "./actions";

export function NewSectionForm({ pageId, slug }: { pageId: string; slug: string }) {
  const action = createSection.bind(null, pageId, slug);

  return (
    <form action={action} className="glass flex items-center gap-2 rounded-2xl p-3">
      <input
        name="section_key"
        required
        placeholder="مفتاح القسم الجديد (مثال: hero)"
        dir="ltr"
        className="flex-1 rounded-xl bg-transparent px-3 py-2 text-sm text-brand-ink outline-none placeholder:text-brand-ink-muted"
      />
      <button
        type="submit"
        className="gradient-brand flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white"
      >
        <Plus className="size-3.5" /> إضافة قسم
      </button>
    </form>
  );
}
