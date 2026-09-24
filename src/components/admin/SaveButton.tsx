"use client";

import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";

export function SaveButton({ label = "حفظ التغييرات" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="gradient-brand inline-flex items-center gap-2 rounded-2xl border border-white/25 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_-8px_rgba(110,75,152,0.7)] transition-opacity disabled:opacity-60"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
      {pending ? "جارِ الحفظ..." : label}
    </button>
  );
}
