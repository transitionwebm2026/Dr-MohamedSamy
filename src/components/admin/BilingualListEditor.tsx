"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type BilingualList = { ar: string[]; en: string[] };

export function BilingualListEditor({
  name,
  label,
  defaultValue,
  onChange,
}: {
  name?: string;
  label: string;
  defaultValue: BilingualList;
  onChange?: (value: BilingualList) => void;
}) {
  const rowCount = Math.max(defaultValue.ar.length, defaultValue.en.length, 1);
  const [rows, setRows] = useState<{ ar: string; en: string }[]>(
    Array.from({ length: rowCount }, (_, i) => ({
      ar: defaultValue.ar[i] ?? "",
      en: defaultValue.en[i] ?? "",
    })),
  );

  const update = (i: number, field: "ar" | "en", value: string) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)));
  };

  const value: BilingualList = {
    ar: rows.map((r) => r.ar).filter(Boolean),
    en: rows.map((r) => r.en).filter(Boolean),
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps -- notify on every row edit, not just mount
  useEffect(() => onChange?.(value), [rows]);

  return (
    <div>
      {name && <input type="hidden" name={name} value={JSON.stringify(value)} />}
      <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{label}</span>
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-2">
            <div className="flex gap-2">
              <span className="flex size-9 shrink-0 items-center justify-center text-xs font-bold text-brand-ink-muted">
                {i + 1}
              </span>
              <input
                value={row.ar}
                onChange={(e) => update(i, "ar", e.target.value)}
                placeholder="عربي"
                className="glass w-full rounded-xl px-3 py-2 text-sm text-brand-ink outline-none placeholder:text-brand-ink-muted focus:border-brand-rose/50"
              />
            </div>
            <div className="flex gap-2">
              <input
                value={row.en}
                onChange={(e) => update(i, "en", e.target.value)}
                placeholder="English"
                dir="ltr"
                className="glass w-full rounded-xl px-3 py-2 text-sm text-brand-ink outline-none placeholder:text-brand-ink-muted focus:border-brand-rose/50"
              />
              <button
                type="button"
                onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRows((prev) => [...prev, { ar: "", en: "" }])}
        className="glass mt-2 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-brand-ink-muted hover:text-brand-ink"
      >
        <Plus className="size-3.5" /> إضافة سطر
      </button>
    </div>
  );
}
