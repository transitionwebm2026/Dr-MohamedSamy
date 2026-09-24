"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SocialLink } from "@/lib/supabase/types";

export type SettingsFormState = { ok?: boolean; error?: string } | undefined;

export async function updateGlobalSettings(
  _prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const supabase = await createClient();

  let socialLinks: SocialLink[] = [];
  try {
    socialLinks = JSON.parse(String(formData.get("social_links") ?? "[]"));
  } catch {
    return { error: "روابط التواصل الاجتماعي غير صالحة" };
  }

  const { error } = await supabase
    .from("global_settings")
    .update({
      phone: String(formData.get("phone") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      email: String(formData.get("email") ?? ""),
      address_ar: String(formData.get("address_ar") ?? ""),
      address_en: String(formData.get("address_en") ?? ""),
      social_links: socialLinks,
      logo_url: String(formData.get("logo_url") ?? "") || null,
      seo_default_title_ar: String(formData.get("seo_default_title_ar") ?? ""),
      seo_default_title_en: String(formData.get("seo_default_title_en") ?? ""),
      seo_default_description_ar: String(formData.get("seo_default_description_ar") ?? ""),
      seo_default_description_en: String(formData.get("seo_default_description_en") ?? ""),
    })
    .eq("id", 1);

  if (error) return { error: error.message };

  revalidatePath("/admin/settings");
  return { ok: true };
}
