import { createClient } from "@/lib/supabase/server";
import { GlobalSettingsForm } from "./GlobalSettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("global_settings").select("*").eq("id", 1).single();

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
