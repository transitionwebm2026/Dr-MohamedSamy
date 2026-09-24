import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Mirrors the real component tree for each page, in render order.
const sectionsByPage = {
  home: [
    ["hero", "الهيرو الرئيسي"],
    ["stats", "الإحصائيات"],
    ["symptom_checker", "معاينة الخدمات"],
    ["about_doctor", "نبذة عن الدكتور"],
    ["treatments", "طرق العلاج"],
    ["endoscopy_unit", "وحدة المناظير"],
    ["patient_journey", "رحلة المريض"],
    ["why_choose_us", "ليه تختارنا"],
    ["patient_guide", "إرشادات المريض"],
    ["top_videos", "أهم الفيديوهات"],
    ["reviews", "آراء المرضى"],
    ["final_cta", "دعوة لحجز موعد"],
  ],
  about: [
    ["hero", "الهيرو الرئيسي"],
    ["bio", "نبذة شخصية"],
    ["intro_video", "فيديو تعريفي"],
    ["academic_timeline", "المسيرة الأكاديمية"],
    ["expertise_areas", "مجالات الخبرة والتخصص"],
    ["career_history", "التاريخ المهني"],
    ["core_specializations", "التخصصات الأساسية"],
    ["philosophy", "فلسفة العلاج"],
    ["doctor_message", "رسالة الدكتور"],
    ["achievements_stats", "الإنجازات بالأرقام"],
    ["cta", "دعوة للتواصل"],
  ],
  services: [
    ["hero", "الهيرو الرئيسي"],
    ["category_selector", "اختيار الفئة"],
    ["category_details_endoscopy", "تفاصيل فئة: المناظير"],
    ["category_details_liver", "تفاصيل فئة: أمراض الكبد"],
    ["category_details_colon", "تفاصيل فئة: صحة القولون"],
    ["category_details_diagnostics", "تفاصيل فئة: التشخيص"],
    ["endoscopy_types", "أنواع المناظير"],
    ["symptom_triggers", "محفزات الأعراض"],
    ["faq", "الأسئلة الشائعة"],
    ["cta", "دعوة للتواصل"],
  ],
  videos: [
    ["hero", "الهيرو الرئيسي"],
    ["video_gallery", "معرض الفيديوهات"],
    ["cta", "دعوة للتواصل"],
  ],
  reviews: [
    ["hero", "الهيرو الرئيسي"],
    ["reviews_grid", "شبكة آراء المرضى"],
    ["cta", "دعوة للتواصل"],
  ],
  articles: [
    ["hero", "الهيرو الرئيسي"],
    ["articles_section", "قسم المقالات"],
    ["cta", "دعوة للتواصل"],
  ],
  contact: [
    ["hero", "الهيرو الرئيسي"],
    ["contact_section", "الفورم ومعلومات التواصل"],
    ["cta", "دعوة للتواصل"],
  ],
};

const { data: pages, error: pagesError } = await supabase.from("pages").select("id, slug");
if (pagesError) {
  console.error("Failed to load pages:", pagesError.message);
  process.exit(1);
}

for (const page of pages) {
  const sections = sectionsByPage[page.slug];
  if (!sections) continue;

  const rows = sections.map(([section_key, section_title_ar], index) => ({
    page_id: page.id,
    section_key,
    section_title_ar,
    section_title_en: section_title_ar,
    order_index: index,
    content: {},
  }));

  const { error } = await supabase
    .from("page_sections")
    .upsert(rows, { onConflict: "page_id,section_key", ignoreDuplicates: true });

  if (error) {
    console.error(`Failed to seed sections for ${page.slug}:`, error.message);
  } else {
    console.log(`Seeded ${rows.length} sections for ${page.slug}`);
  }
}
