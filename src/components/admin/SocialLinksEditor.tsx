"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { SocialLink } from "@/lib/supabase/types";

export function SocialLinksEditor({ defaultValue }: { defaultValue: SocialLink[] }) {
  const [links, setLinks] = useState<SocialLink[]>(defaultValue.length ? defaultValue : [{ name: "", href: "" }]);

  const update = (i: number, field: keyof SocialLink, value: string) => {
    setLinks((prev) => prev.map((link, idx) => (idx === i ? { ...link, [field]: value } : link)));
  };

  return (
    <div>
      <input type="hidden" name="social_links" value={JSON.stringify(links.filter((l) => l.name || l.href))} />
      <span className="mb-1.5 block text-sm font-semibold text-brand-ink">روابط التواصل الاجتماعي</span>
      <div className="space-y-2">
        {links.map((link, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={link.name}
              onChange={(e) => update(i, "name", e.target.value)}
              placeholder="الاسم (Facebook)"
              className="glass w-32 shrink-0 rounded-xl px-3 py-2 text-sm text-brand-ink outline-none placeholder:text-brand-ink-muted focus:border-brand-rose/50"
            />
            <input
              value={link.href}
              onChange={(e) => update(i, "href", e.target.value)}
              placeholder="https://..."
              dir="ltr"
              className="glass min-w-0 flex-1 rounded-xl px-3 py-2 text-sm text-brand-ink outline-none placeholder:text-brand-ink-muted focus:border-brand-rose/50"
            />
            <button
              type="button"
              onClick={() => setLinks((prev) => prev.filter((_, idx) => idx !== i))}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setLinks((prev) => [...prev, { name: "", href: "" }])}
        className="glass mt-2 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-brand-ink-muted hover:text-brand-ink"
      >
        <Plus className="size-3.5" /> إضافة رابط
      </button>
    </div>
  );
}
