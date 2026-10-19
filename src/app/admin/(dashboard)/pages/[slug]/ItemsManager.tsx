"use client";

import { useActionState, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { VideoUploader } from "@/components/admin/VideoUploader";
import { BilingualListEditor } from "@/components/admin/BilingualListEditor";
import {
  itemFieldConfig,
  linkItemSections,
  videoItemSections,
  type ExtraFieldConfig,
} from "@/components/admin/itemFieldConfig";
import type { DynamicItem } from "@/lib/supabase/types";
import { deleteItem, moveItem, upsertItem } from "./actions";

type Localized = { ar: string; en: string };

function ExtraFieldsEditor({
  sectionKey,
  initialExtra,
}: {
  sectionKey: string;
  initialExtra: Record<string, unknown>;
}) {
  const config = itemFieldConfig[sectionKey] ?? [];
  const [extra, setExtra] = useState<Record<string, unknown>>(initialExtra ?? {});
  const setField = (key: string, value: unknown) => setExtra((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <input type="hidden" name="extra" value={JSON.stringify(extra)} />
      {config.map((field: ExtraFieldConfig) => {
        if (field.type === "text") {
          return (
            <label key={field.key} className="block">
              <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{field.label}</span>
              <input
                dir="ltr"
                value={typeof extra[field.key] === "string" ? (extra[field.key] as string) : ""}
                onChange={(e) => setField(field.key, e.target.value)}
                className="glass w-full rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
              />
            </label>
          );
        }
        if (field.type === "number") {
          return (
            <label key={field.key} className="block">
              <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{field.label}</span>
              <input
                type="number"
                value={typeof extra[field.key] === "number" ? (extra[field.key] as number) : ""}
                onChange={(e) => setField(field.key, Number(e.target.value))}
                className="glass w-40 rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
              />
            </label>
          );
        }
        if (field.type === "checkbox") {
          return (
            <label key={field.key} className="flex items-center gap-2.5 text-sm font-semibold text-brand-ink">
              <input
                type="checkbox"
                checked={!!extra[field.key]}
                onChange={(e) => setField(field.key, e.target.checked)}
                className="size-4 accent-brand-rose"
              />
              {field.label}
            </label>
          );
        }
        if (field.type === "select") {
          return (
            <label key={field.key} className="block">
              <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{field.label}</span>
              <select
                value={typeof extra[field.key] === "string" ? (extra[field.key] as string) : ""}
                onChange={(e) => setField(field.key, e.target.value)}
                className="glass w-full rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
              >
                <option value="" disabled>
                  اختر...
                </option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          );
        }
        if (field.type === "bilingual") {
          const value = (extra[field.key] as Localized | undefined) ?? { ar: "", en: "" };
          const Field = field.multiline ? "textarea" : "input";
          return (
            <div key={field.key} className="grid gap-2 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{field.label} (عربي)</span>
                <Field
                  rows={field.multiline ? 3 : undefined}
                  value={value.ar}
                  onChange={(e) => setField(field.key, { ...value, ar: e.target.value })}
                  className="glass w-full resize-y rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{field.label} (English)</span>
                <Field
                  rows={field.multiline ? 3 : undefined}
                  dir="ltr"
                  value={value.en}
                  onChange={(e) => setField(field.key, { ...value, en: e.target.value })}
                  className="glass w-full resize-y rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
                />
              </label>
            </div>
          );
        }
        if (field.type === "bilingualList") {
          const value = (extra[field.key] as { ar: string[]; en: string[] } | undefined) ?? { ar: [], en: [] };
          return (
            <BilingualListEditor
              key={field.key}
              label={field.label}
              defaultValue={value}
              onChange={(v) => setField(field.key, v)}
            />
          );
        }
        if (field.type === "video") {
          return (
            <VideoUploader
              key={field.key}
              label={field.label}
              defaultValue={typeof extra[field.key] === "string" ? (extra[field.key] as string) : ""}
              onChange={(url) => setField(field.key, url)}
            />
          );
        }
        return null;
      })}
    </>
  );
}

function ItemForm({
  sectionId,
  sectionKey,
  slug,
  item,
}: {
  sectionId: string;
  sectionKey: string;
  slug: string;
  item: DynamicItem | null;
}) {
  const action = upsertItem.bind(null, sectionId, slug, item?.id ?? null);
  const [state, formAction] = useActionState(action, undefined);
  const isVideoSection = videoItemSections.has(sectionKey);
  const isLinkSection = linkItemSections.has(sectionKey);

  return (
    <form action={formAction} className="space-y-3 p-4">
      {isLinkSection ? (
        <>
          {/* not editable here, but they must round-trip so saving never wipes them */}
          <input type="hidden" name="item_key" value={item?.item_key ?? ""} />
          <input type="hidden" name="description_ar" value={item?.description_ar ?? ""} />
          <input type="hidden" name="description_en" value={item?.description_en ?? ""} />
          <input type="hidden" name="image_url" value={item?.image_url ?? ""} />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="نص الرابط (عربي)" name="title_ar" defaultValue={item?.title_ar ?? ""} />
            <TextField label="نص الرابط (إنجليزي)" name="title_en" defaultValue={item?.title_en ?? ""} dir="ltr" />
          </div>
          <TextField
            label="الرابط (مثال: /about أو https://...)"
            name="link_url"
            defaultValue={item?.link_url ?? ""}
            dir="ltr"
          />
        </>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="مفتاح العنصر (اختياري)" name="item_key" defaultValue={item?.item_key ?? ""} dir="ltr" />
            <TextField label="رابط (اختياري)" name="link_url" defaultValue={item?.link_url ?? ""} dir="ltr" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="العنوان (عربي)" name="title_ar" defaultValue={item?.title_ar ?? ""} />
            <TextField label="العنوان (إنجليزي)" name="title_en" defaultValue={item?.title_en ?? ""} dir="ltr" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextAreaField label="الوصف (عربي)" name="description_ar" defaultValue={item?.description_ar ?? ""} />
            <TextAreaField label="الوصف (إنجليزي)" name="description_en" defaultValue={item?.description_en ?? ""} dir="ltr" />
          </div>
          <ImageUploader name="image_url" defaultValue={item?.image_url} label={isVideoSection ? "صورة الفيديو (Thumbnail)" : "الصورة"} />
        </>
      )}

      <ExtraFieldsEditor sectionKey={sectionKey} initialExtra={item?.extra ?? {}} />

      <label className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
        <input type="checkbox" name="is_visible" defaultChecked={item?.is_visible ?? true} className="size-4 accent-brand-rose" />
        ظاهر في الموقع
      </label>
      <div className="flex items-center gap-3">
        <SaveButton label={item ? "حفظ العنصر" : "إضافة العنصر"} />
        {state?.ok && <span className="text-sm text-brand-whatsapp">تم الحفظ</span>}
        {state?.error && <span className="text-sm text-red-400">{state.error}</span>}
      </div>
    </form>
  );
}

function ItemRow({
  sectionId,
  sectionKey,
  slug,
  item,
  items,
}: {
  sectionId: string;
  sectionKey: string;
  slug: string;
  item: DynamicItem;
  items: DynamicItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass rounded-xl">
      <div className="flex items-center justify-between gap-2 p-3">
        <button type="button" onClick={() => setOpen((v) => !v)} className="flex flex-1 items-center gap-2 text-start">
          <ChevronDown className={cn("size-3.5 shrink-0 transition-transform", open && "rotate-180")} />
          {item.image_url && (
            // eslint-disable-next-line @next/next/no-img-element -- small admin thumbnail
            <img src={item.image_url} alt="" className="size-8 shrink-0 rounded-lg object-cover" />
          )}
          <span className="text-sm font-semibold text-brand-ink">{item.title_ar || item.item_key || "بدون عنوان"}</span>
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => moveItem(slug, items, item.id, "up")}
            className="flex size-7 items-center justify-center rounded-lg text-brand-ink-muted hover:bg-white/10"
          >
            <ArrowUp className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => moveItem(slug, items, item.id, "down")}
            className="flex size-7 items-center justify-center rounded-lg text-brand-ink-muted hover:bg-white/10"
          >
            <ArrowDown className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("متأكد من حذف هذا العنصر؟")) void deleteItem(item.id, slug);
            }}
            className="flex size-7 items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10">
          <ItemForm sectionId={sectionId} sectionKey={sectionKey} slug={slug} item={item} />
        </div>
      )}
    </div>
  );
}

export function ItemsManager({
  sectionId,
  sectionKey,
  slug,
  items,
}: {
  sectionId: string;
  sectionKey: string;
  slug: string;
  items: DynamicItem[];
}) {
  const [addingNew, setAddingNew] = useState(false);
  const sorted = [...items].sort((a, b) => a.order_index - b.order_index);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-brand-rose">العناصر ({sorted.length})</h3>
        <button
          type="button"
          onClick={() => setAddingNew((v) => !v)}
          className="glass inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-brand-ink-muted hover:text-brand-ink"
        >
          <Plus className="size-3.5" /> إضافة عنصر
        </button>
      </div>

      {addingNew && (
        <div className="glass mb-3 rounded-xl">
          <ItemForm sectionId={sectionId} sectionKey={sectionKey} slug={slug} item={null} />
        </div>
      )}

      <div className="space-y-2">
        {sorted.map((item) => (
          <ItemRow key={item.id} sectionId={sectionId} sectionKey={sectionKey} slug={slug} item={item} items={sorted} />
        ))}
        {sorted.length === 0 && <p className="text-sm text-brand-ink-muted">لا توجد عناصر بعد.</p>}
      </div>
    </div>
  );
}
