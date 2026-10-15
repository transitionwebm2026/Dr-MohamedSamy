"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlobalSettingsForm } from "./GlobalSettingsForm";
import type { GlobalSettings } from "@/lib/supabase/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<GlobalSettings | null | undefined>(undefined);

  useEffect(() => {
    createClient()
      .from("global_settings")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => setSettings(data ?? null));
  }, []);

  if (settings === undefined) return null;

  if (!settings) {
    return <p className="text-brand-ink-muted">تعذّر تحميل الإعدادات.</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-brand-ink">الإعدادات العامة</h1>
      <GlobalSettingsForm settings={settings} />
    </div>
  );
}
