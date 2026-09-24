"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Video, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type VideoUploaderProps = {
  name?: string;
  defaultValue?: string | null;
  label?: string;
  onChange?: (url: string) => void;
};

/**
 * Same upload pattern as ImageUploader, targeting video files. Uploads
 * directly to the public `media` Supabase Storage bucket, exposing the
 * resulting URL via a hidden form field (`name`) or `onChange`.
 */
export function VideoUploader({ name, defaultValue, label, onChange }: VideoUploaderProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- notify on every change, not just mount
  useEffect(() => onChange?.(url), [url]);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل رفع الفيديو");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <p className="mb-2 text-sm font-semibold text-brand-ink">{label}</p>}
      {name && <input type="hidden" name={name} value={url} />}
      <div className="flex items-center gap-4">
        <div className="glass flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl">
          {url ? (
            <video src={url} className="h-full w-full object-cover" muted />
          ) : (
            <Video className="size-6 text-brand-ink-muted" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="glass rounded-xl px-4 py-2 text-xs font-bold text-brand-ink transition-colors hover:border-brand-rose/50 disabled:opacity-60"
            >
              {uploading ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="size-3.5 animate-spin" /> جارِ الرفع...
                </span>
              ) : (
                "اختيار فيديو"
              )}
            </button>
            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10"
              >
                <X className="size-3.5" /> إزالة
              </button>
            )}
          </div>
          {error && <p className="text-xs font-semibold text-red-400">{error}</p>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
    </div>
  );
}
