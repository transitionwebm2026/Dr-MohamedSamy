"use client";

import { useActionState } from "react";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { SocialLinksEditor } from "@/components/admin/SocialLinksEditor";
import { updateGlobalSettings } from "./actions";
import type { GlobalSettings } from "@/lib/supabase/types";

export function GlobalSettingsForm({ settings }: { settings: GlobalSettings }) {
  const [state, formAction] = useActionState(updateGlobalSettings, undefined);

  return (
    <form action={formAction} className="glass-strong space-y-8 rounded-3xl p-6 sm:p-8">
      <section>
        <h2 className="mb-4 text-sm font-extrabold text-brand-rose">بيانات التواصل</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="رقم الهاتف" name="phone" defaultValue={settings.phone} dir="ltr" />
          <TextField label="رقم واتساب (رابط wa.me)" name="whatsapp" defaultValue={settings.whatsapp} dir="ltr" />
          <TextField label="البريد الإلكتروني" name="email" defaultValue={settings.email} dir="ltr" type="email" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField label="العنوان (عربي)" name="address_ar" defaultValue={settings.address_ar} />
          <TextField label="العنوان (إنجليزي)" name="address_en" defaultValue={settings.address_en} dir="ltr" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-extrabold text-brand-rose">الشعار</h2>
        <ImageUploader name="logo_url" defaultValue={settings.logo_url} />
      </section>

      <section>
        <h2 className="mb-4 text-sm font-extrabold text-brand-rose">التواصل الاجتماعي</h2>
        <SocialLinksEditor defaultValue={settings.social_links} />
      </section>

      <section>
        <h2 className="mb-4 text-sm font-extrabold text-brand-rose">إعدادات SEO الافتراضية</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="العنوان الافتراضي (عربي)" name="seo_default_title_ar" defaultValue={settings.seo_default_title_ar} />
          <TextField label="العنوان الافتراضي (إنجليزي)" name="seo_default_title_en" defaultValue={settings.seo_default_title_en} dir="ltr" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextAreaField
            label="الوصف الافتراضي (عربي)"
            name="seo_default_description_ar"
            defaultValue={settings.seo_default_description_ar}
          />
          <TextAreaField
            label="الوصف الافتراضي (إنجليزي)"
            name="seo_default_description_en"
            defaultValue={settings.seo_default_description_en}
            dir="ltr"
          />
        </div>
      </section>

      <div className="flex items-center gap-4 border-t border-white/10 pt-6">
        <SaveButton />
        {state?.ok && <p className="text-sm font-semibold text-brand-whatsapp">تم الحفظ بنجاح</p>}
        {state?.error && <p className="text-sm font-semibold text-red-400">{state.error}</p>}
      </div>
    </form>
  );
}
