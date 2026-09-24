export type ExtraFieldConfig =
  | { type: "text"; key: string; label: string }
  | { type: "bilingual"; key: string; label: string; multiline?: boolean }
  | { type: "number"; key: string; label: string }
  | { type: "select"; key: string; label: string; options: { value: string; label: string }[] }
  | { type: "checkbox"; key: string; label: string }
  | { type: "bilingualList"; key: string; label: string }
  | { type: "video"; key: string; label: string };

/** Which extra fields to render for each section's items, keyed by section_key. Sections not listed here have no extra fields (just title/description/image). */
export const itemFieldConfig: Record<string, ExtraFieldConfig[]> = {
  stats: [
    { type: "number", key: "value", label: "الرقم" },
    { type: "text", key: "suffix", label: "لاحقة الرقم (مثال: +)" },
  ],
  patient_guide: [
    {
      type: "select",
      key: "phase",
      label: "المرحلة",
      options: [
        { value: "before", label: "قبل المنظار" },
        { value: "after", label: "بعد المنظار" },
      ],
    },
  ],
  top_videos: [
    { type: "text", key: "duration", label: "مدة الفيديو (مثال: 03:12)" },
    { type: "video", key: "videoUrl", label: "ملف الفيديو" },
  ],
  reviews: [{ type: "bilingual", key: "procedure", label: "الإجراء الطبي" }],
  academic_timeline: [{ type: "text", key: "year", label: "السنة" }],
  career_history: [
    { type: "text", key: "year", label: "السنة" },
    { type: "bilingual", key: "place", label: "مكان العمل" },
  ],
  category_selector: [{ type: "text", key: "anchor", label: "الرابط الداخلي (anchor)" }],
  endoscopy_types: [{ type: "bilingualList", key: "applications", label: "دواعي الاستخدام" }],
  video_gallery: [
    {
      type: "select",
      key: "category",
      label: "التصنيف",
      options: [
        { value: "endoscopy", label: "مناظير" },
        { value: "liver", label: "صحة الكبد" },
        { value: "prevention", label: "نصائح وقاية" },
      ],
    },
    { type: "text", key: "duration", label: "مدة الفيديو (مثال: 03:12)" },
    { type: "video", key: "videoUrl", label: "ملف الفيديو" },
  ],
  reviews_grid: [
    { type: "number", key: "rating", label: "التقييم (من 5)" },
    { type: "bilingual", key: "date", label: "التاريخ (مثال: منذ أسبوع)" },
    { type: "bilingual", key: "procedure", label: "الإجراء الطبي" },
    { type: "bilingual", key: "highlight", label: "عنوان مختصر (اختياري)" },
    { type: "bilingual", key: "doctorResponse", label: "رد الدكتور (اختياري)", multiline: true },
  ],
  articles_section: [
    {
      type: "select",
      key: "category",
      label: "التصنيف",
      options: [
        { value: "digestive", label: "الجهاز الهضمي" },
        { value: "liver", label: "صحة الكبد" },
        { value: "endoscopy", label: "المناظير" },
      ],
    },
    { type: "text", key: "readTime", label: "دقائق القراءة" },
    { type: "checkbox", key: "featured", label: "مقال رئيسي (Featured)" },
    { type: "bilingual", key: "content", label: "محتوى المقال الكامل", multiline: true },
  ],
};

/** Sections whose items are plain menu links (label + URL), so the item form drops the description and image fields. */
export const linkItemSections = new Set(["links", "quick_links"]);

/** Sections whose items are videos and should show a thumbnail image alongside the video file. */
export const videoItemSections = new Set(["top_videos", "video_gallery"]);
