"use client";

import { useState } from "react";
import { labelize } from "./fieldLabels";
import { ImageUploader } from "./ImageUploader";
import { VideoUploader } from "./VideoUploader";
import { BilingualListEditor } from "./BilingualListEditor";

type Localized = { ar: string; en: string };
type BilingualList = { ar: string[]; en: string[] };

function isLocalized(value: unknown): value is Localized {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof (value as Record<string, unknown>).ar === "string" &&
    typeof (value as Record<string, unknown>).en === "string" &&
    Object.keys(value as Record<string, unknown>).length === 2
  );
}

function isBilingualList(value: unknown): value is BilingualList {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Array.isArray((value as Record<string, unknown>).ar) &&
    Array.isArray((value as Record<string, unknown>).en)
  );
}

const mediaKeys = new Set(["imageUrl", "thumbnailUrl", "logoUrl", "creditLogoUrl"]);

/**
 * Field-based editor for a page_sections.content JSONB blob — every key
 * renders as a labeled input matched to its real shape (bilingual text pair,
 * plain text/number/boolean, a bilingual list, or an image/video uploader
 * for reserved media keys). Nothing is ever shown as raw JSON.
 */
export function ContentEditor({
  name,
  initialContent,
}: {
  name: string;
  initialContent: Record<string, unknown>;
}) {
  const [content, setContent] = useState<Record<string, unknown>>(initialContent ?? {});

  const setKey = (key: string, value: unknown) => setContent((prev) => ({ ...prev, [key]: value }));

  const keys = Object.keys(content);

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={JSON.stringify(content)} />

      {keys.length === 0 && <p className="text-sm text-brand-ink-muted">لا يوجد محتوى مخصص لهذا القسم بعد.</p>}

      {keys.map((key) => {
        const value = content[key];

        if (mediaKeys.has(key)) {
          return (
            <ImageUploader
              key={key}
              defaultValue={typeof value === "string" ? value : ""}
              label={labelize(key)}
              onChange={(url) => setKey(key, url)}
            />
          );
        }

        if (key === "videoUrl") {
          return (
            <VideoUploader
              key={key}
              defaultValue={typeof value === "string" ? value : ""}
              label={labelize(key)}
              onChange={(url) => setKey(key, url)}
            />
          );
        }

        if (isLocalized(value)) {
          const long = value.ar.length > 80 || value.en.length > 80 || /desc|text|content|body|quote/i.test(key);
          const Field = long ? "textarea" : "input";
          return (
            <div key={key} className="grid gap-2 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{labelize(key)} (عربي)</span>
                <Field
                  rows={long ? 3 : undefined}
                  value={value.ar}
                  onChange={(e) => setKey(key, { ...value, ar: e.target.value })}
                  className="glass w-full resize-y rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{labelize(key)} (English)</span>
                <Field
                  rows={long ? 3 : undefined}
                  dir="ltr"
                  value={value.en}
                  onChange={(e) => setKey(key, { ...value, en: e.target.value })}
                  className="glass w-full resize-y rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
                />
              </label>
            </div>
          );
        }

        if (isBilingualList(value)) {
          return (
            <BilingualListEditor
              key={key}
              label={labelize(key)}
              defaultValue={value}
              onChange={(v) => setKey(key, v)}
            />
          );
        }

        if (typeof value === "string") {
          return (
            <label key={key} className="block">
              <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{labelize(key)}</span>
              <input
                value={value}
                onChange={(e) => setKey(key, e.target.value)}
                className="glass w-full rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
              />
            </label>
          );
        }

        if (typeof value === "number") {
          return (
            <label key={key} className="block">
              <span className="mb-1.5 block text-sm font-semibold text-brand-ink">{labelize(key)}</span>
              <input
                type="number"
                value={value}
                onChange={(e) => setKey(key, Number(e.target.value))}
                className="glass w-40 rounded-xl px-4 py-2.5 text-sm text-brand-ink outline-none focus:border-brand-rose/50"
              />
            </label>
          );
        }

        if (typeof value === "boolean") {
          return (
            <label key={key} className="flex items-center gap-2.5 text-sm font-semibold text-brand-ink">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setKey(key, e.target.checked)}
                className="size-4 accent-brand-rose"
              />
              {labelize(key)}
            </label>
          );
        }

        // Unrecognized shape: keep the value intact (round-trips via the
        // hidden input above) without ever exposing it as raw JSON.
        return null;
      })}
    </div>
  );
}

