import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const supabase = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

const ar = JSON.parse(readFileSync(new URL("../messages/ar.json", import.meta.url)));
const en = JSON.parse(readFileSync(new URL("../messages/en.json", import.meta.url)));

function get(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
// Builds a { ar, en } pair by looking up the same dot-path in both trees.
function bi(path) {
  const a = get(ar, path);
  const e = get(en, path);
  return { ar: a ?? "", en: e ?? "" };
}
// Builds an object of { ar, en } pairs for a list of field names under a base path.
function biFields(basePath, fields) {
  const result = {};
  for (const f of fields) result[f] = bi(`${basePath}.${f}`);
  return result;
}

// ---------------------------------------------------------------------------
// Section content (bilingual text blobs, keyed by [pageSlug, sectionKey])
// ---------------------------------------------------------------------------
const sectionContent = {
  home: {
    hero: biFields("hero", ["titleLine1", "titleLine2", "subtitle", "bookNow", "exploreServices", "callUs"]),
    stats: {},
    symptom_checker: biFields("symptoms", ["eyebrow", "title", "description", "cta"]),
    about_doctor: biFields("about", ["eyebrow", "title", "description"]),
    treatments: biFields("treatments", ["eyebrow", "title", "description", "readMore", "cta"]),
    endoscopy_unit: biFields("endoscopy", ["eyebrow", "title", "description", "cta"]),
    patient_journey: biFields("journey", ["eyebrow", "title", "description"]),
    why_choose_us: biFields("whyChooseUs", ["eyebrow", "title", "description", "badgeTitle", "badgeSubtitle"]),
    patient_guide: biFields("guide", ["eyebrow", "title", "description", "beforeLabel", "afterLabel"]),
    top_videos: biFields("topVideos", ["eyebrow", "title", "description", "viewAll"]),
    reviews: biFields("reviews", ["eyebrow", "title", "description", "readMore"]),
    final_cta: biFields("finalCta", ["title", "titleHighlight", "description", "contactUs", "whatsapp"]),
  },
  about: {
    hero: biFields("aboutPage.hero", ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"]),
    bio: biFields("aboutPage.bio", ["eyebrow", "title", "paragraph1", "paragraph2", "paragraph3"]),
    intro_video: biFields("aboutPage.video", ["eyebrow", "title", "description", "playAria", "closeAria"]),
    academic_timeline: biFields("aboutPage.academic", ["eyebrow", "title", "description"]),
    expertise_areas: biFields("aboutPage.expertise", ["eyebrow", "title", "description", "cta"]),
    career_history: biFields("aboutPage.career", ["eyebrow", "title", "description"]),
    core_specializations: biFields("aboutPage.specializations", ["eyebrow", "title", "description"]),
    philosophy: biFields("aboutPage.philosophy", ["eyebrow", "title", "description"]),
    doctor_message: biFields("aboutPage.message", ["eyebrow", "title", "quote", "signatureName", "signatureTitle"]),
    achievements_stats: biFields("aboutPage.stats", ["eyebrow", "title", "description"]),
    cta: biFields("aboutPage.cta", ["title", "titleHighlight", "description", "contactUs", "whatsapp"]),
  },
  services: {
    hero: biFields("servicesPage.hero", ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"]),
    category_selector: biFields("servicesPage.categories", ["eyebrow", "title", "description"]),
    category_details_endoscopy: biFields("servicesPage.categoryDetails.endoscopy", ["title", "description"]),
    category_details_liver: biFields("servicesPage.categoryDetails.liver", ["title", "description"]),
    category_details_colon: biFields("servicesPage.categoryDetails.colon", ["title", "description"]),
    category_details_diagnostics: biFields("servicesPage.categoryDetails.diagnostics", ["title", "description"]),
    endoscopy_types: biFields("servicesPage.endoscopyTypes", [
      "eyebrow",
      "title",
      "description",
      "applicationsLabel",
      "bookBtn",
    ]),
    symptom_triggers: biFields("servicesPage.triggers", ["eyebrow", "title", "description"]),
    faq: biFields("servicesPage.faq", ["eyebrow", "title", "description"]),
    cta: biFields("servicesPage.cta", ["title", "titleHighlight", "description", "contactUs", "whatsapp"]),
  },
  videos: {
    hero: biFields("videosPage.hero", ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"]),
    video_gallery: {
      ...biFields("videosPage.gallery", ["eyebrow", "title", "description", "playAria", "closeAria"]),
      categoryEndoscopy: bi("videosPage.gallery.categories.endoscopy"),
      categoryLiver: bi("videosPage.gallery.categories.liver"),
      categoryPrevention: bi("videosPage.gallery.categories.prevention"),
    },
    cta: biFields("videosPage.cta", ["title", "titleHighlight", "description", "contactUs", "whatsapp"]),
  },
  reviews: {
    hero: biFields("reviewsPage.hero", ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"]),
    reviews_grid: biFields("reviewsPage.gallery", ["eyebrow", "title", "description", "verifiedBadge", "doctorResponseLabel"]),
    cta: biFields("reviewsPage.cta", ["title", "titleHighlight", "description", "contactUs", "whatsapp"]),
  },
  articles: {
    hero: biFields("articlesPage.hero", ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"]),
    articles_section: {
      ...biFields("articlesPage.section", ["eyebrow", "title", "description", "readTimeLabel", "readMoreLabel", "closeAria"]),
      categoryDigestive: bi("articlesPage.section.categories.digestive"),
      categoryLiver: bi("articlesPage.section.categories.liver"),
      categoryEndoscopy: bi("articlesPage.section.categories.endoscopy"),
    },
    cta: biFields("articlesPage.cta", ["title", "titleHighlight", "description", "contactUs", "whatsapp"]),
  },
  contact: {
    hero: biFields("contactPage.hero", ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"]),
    contact_section: {
      formEyebrow: bi("contactPage.form.eyebrow"),
      formTitle: bi("contactPage.form.title"),
      formDescription: bi("contactPage.form.description"),
      formSubmitBtn: bi("contactPage.form.submitBtn"),
      infoEyebrow: bi("contactPage.info.eyebrow"),
      infoTitle: bi("contactPage.info.title"),
      infoDescription: bi("contactPage.info.description"),
      phoneLabel: bi("contactPage.info.phoneLabel"),
      whatsappLabel: bi("contactPage.info.whatsappLabel"),
      emailLabel: bi("contactPage.info.emailLabel"),
      addressLabel: bi("contactPage.info.addressLabel"),
      followUsLabel: bi("contactPage.info.followUsLabel"),
    },
    cta: biFields("contactPage.cta", ["title", "titleHighlight", "description", "contactUs", "whatsapp"]),
  },
};

// ---------------------------------------------------------------------------
// Dynamic items per [pageSlug, sectionKey]
// ---------------------------------------------------------------------------
function statItems() {
  return [
    { key: "healed", value: 15000, suffix: "+" },
    { key: "experience", value: 18, suffix: "" },
    { key: "endoscopies", value: 10000, suffix: "+" },
    { key: "patients", value: 25000, suffix: "+" },
  ].map((s, i) => ({
    item_key: s.key,
    title_ar: get(ar, `stats.${s.key}`) ?? "",
    title_en: get(en, `stats.${s.key}`) ?? "",
    description_ar: "",
    description_en: "",
    extra: { value: s.value, suffix: s.suffix },
    order_index: i,
  }));
}

function simpleItems(basePath, keys) {
  return keys.map((key, i) => ({
    item_key: key,
    title_ar: get(ar, `${basePath}.${key}.title`) ?? "",
    title_en: get(en, `${basePath}.${key}.title`) ?? "",
    description_ar: get(ar, `${basePath}.${key}.description`) ?? "",
    description_en: get(en, `${basePath}.${key}.description`) ?? "",
    extra: {},
    order_index: i,
  }));
}

const itemsByPageSection = {
  home: {
    stats: statItems(),
    symptom_checker: simpleItems("symptoms.items", ["reflux", "stomach", "liver"]),
    about_doctor: ["phd", "fellowship", "member"].map((key, i) => ({
      item_key: key,
      title_ar: get(ar, `about.qualifications.${key}`) ?? "",
      title_en: get(en, `about.qualifications.${key}`) ?? "",
      description_ar: "",
      description_en: "",
      extra: {},
      order_index: i,
    })),
    treatments: simpleItems("treatments.items", ["ulcer", "varices", "chronic"]),
    endoscopy_unit: simpleItems("endoscopy.items", ["gastroscopy", "colonoscopy", "ercp"]),
    patient_journey: simpleItems("journey.steps", ["consultation", "diagnosis", "treatment", "followup"]),
    why_choose_us: simpleItems("whyChooseUs.points", ["academic", "devices", "safety", "care"]),
    patient_guide: [
      ["fasting", "before"],
      ["reports", "before"],
      ["medications", "before"],
      ["rest", "after"],
      ["diet", "after"],
      ["symptoms", "after"],
    ].map(([key, phase], i) => ({
      item_key: key,
      title_ar: get(ar, `guide.${phase}.${key}.title`) ?? "",
      title_en: get(en, `guide.${phase}.${key}.title`) ?? "",
      description_ar: get(ar, `guide.${phase}.${key}.content`) ?? "",
      description_en: get(en, `guide.${phase}.${key}.content`) ?? "",
      extra: { phase },
      order_index: i,
    })),
    top_videos: [
      { key: "gastroscopy101", duration: "03:12" },
      { key: "refluxCauses", duration: "04:45" },
      { key: "colonoscopyTips", duration: "02:58" },
    ].map((v, i) => ({
      item_key: v.key,
      title_ar: get(ar, `topVideos.items.${v.key}.title`) ?? "",
      title_en: get(en, `topVideos.items.${v.key}.title`) ?? "",
      description_ar: "",
      description_en: "",
      extra: { duration: v.duration },
      order_index: i,
    })),
    reviews: [
      { key: "ahmed", rating: 5 },
      { key: "sara", rating: 5 },
      { key: "mahmoud", rating: 5 },
      { key: "mona", rating: 5 },
    ].map((r, i) => ({
      item_key: r.key,
      title_ar: get(ar, `reviews.items.${r.key}.name`) ?? "",
      title_en: get(en, `reviews.items.${r.key}.name`) ?? "",
      description_ar: get(ar, `reviews.items.${r.key}.text`) ?? "",
      description_en: get(en, `reviews.items.${r.key}.text`) ?? "",
      extra: {
        rating: r.rating,
        procedure: { ar: get(ar, `reviews.items.${r.key}.procedure`) ?? "", en: get(en, `reviews.items.${r.key}.procedure`) ?? "" },
      },
      order_index: i,
    })),
  },
  about: {
    academic_timeline: [
      { key: "bachelor", year: "2004" },
      { key: "masters", year: "2010" },
      { key: "phd", year: "2014" },
      { key: "fellowship", year: "2017" },
      { key: "conferences", year: "2022" },
    ].map((it, i) => ({
      item_key: it.key,
      title_ar: get(ar, `aboutPage.academic.items.${it.key}.title`) ?? "",
      title_en: get(en, `aboutPage.academic.items.${it.key}.title`) ?? "",
      description_ar: get(ar, `aboutPage.academic.items.${it.key}.description`) ?? "",
      description_en: get(en, `aboutPage.academic.items.${it.key}.description`) ?? "",
      extra: { year: it.year },
      order_index: i,
    })),
    expertise_areas: simpleItems("aboutPage.expertise.items", ["diagnostics", "liver", "endoscopy", "earlyDetection"]),
    career_history: [
      { key: "houseOfficer", year: "2005" },
      { key: "resident", year: "2008" },
      { key: "specialist", year: "2013" },
      { key: "unitHead", year: "2018" },
      { key: "consultant", year: "2021" },
    ].map((it, i) => ({
      item_key: it.key,
      title_ar: get(ar, `aboutPage.career.items.${it.key}.title`) ?? "",
      title_en: get(en, `aboutPage.career.items.${it.key}.title`) ?? "",
      description_ar: get(ar, `aboutPage.career.items.${it.key}.description`) ?? "",
      description_en: get(en, `aboutPage.career.items.${it.key}.description`) ?? "",
      extra: {
        year: it.year,
        place: { ar: get(ar, `aboutPage.career.items.${it.key}.place`) ?? "", en: get(en, `aboutPage.career.items.${it.key}.place`) ?? "" },
      },
      order_index: i,
    })),
    core_specializations: simpleItems("aboutPage.specializations.items", [
      "cancerDetection",
      "advancedEndoscopy",
      "liverDiseases",
      "ibd",
    ]),
    philosophy: simpleItems("aboutPage.philosophy.items", ["patientFirst", "modernTech", "personalizedCare", "followUp"]),
    achievements_stats: statItems(),
  },
  services: {
    category_selector: [
      { key: "endoscopy", anchor: "endoscopy" },
      { key: "liver", anchor: "liver-diseases" },
      { key: "colon", anchor: "colon-health" },
      { key: "diagnostics", anchor: "diagnostics" },
    ].map((c, i) => ({
      item_key: c.key,
      title_ar: get(ar, `servicesPage.categories.items.${c.key}.title`) ?? "",
      title_en: get(en, `servicesPage.categories.items.${c.key}.title`) ?? "",
      description_ar: get(ar, `servicesPage.categories.items.${c.key}.description`) ?? "",
      description_en: get(en, `servicesPage.categories.items.${c.key}.description`) ?? "",
      extra: { anchor: c.anchor },
      order_index: i,
    })),
    category_details_endoscopy: simpleItems("servicesPage.categoryDetails.endoscopy.items", [
      "overview",
      "beforeCare",
      "afterCare",
    ]),
    category_details_liver: simpleItems("servicesPage.categoryDetails.liver.items", [
      "chronicCare",
      "cirrhosis",
      "monitoring",
    ]),
    category_details_colon: simpleItems("servicesPage.categoryDetails.colon.items", ["ibs", "polyps", "nutrition"]),
    category_details_diagnostics: simpleItems("servicesPage.categoryDetails.diagnostics.items", [
      "earlyScreening",
      "labTests",
      "imaging",
    ]),
    endoscopy_types: ["gastroscopy", "colonoscopy", "ercp", "eus"].map((key, i) => ({
      item_key: key,
      title_ar: get(ar, `servicesPage.endoscopyTypes.items.${key}.title`) ?? "",
      title_en: get(en, `servicesPage.endoscopyTypes.items.${key}.title`) ?? "",
      description_ar: "",
      description_en: "",
      extra: {
        applications: {
          ar: get(ar, `servicesPage.endoscopyTypes.items.${key}.applications`) ?? [],
          en: get(en, `servicesPage.endoscopyTypes.items.${key}.applications`) ?? [],
        },
      },
      order_index: i,
    })),
    symptom_triggers: simpleItems("servicesPage.triggers.items", [
      "chronicIndigestion",
      "persistentPain",
      "bleeding",
      "severeReflux",
    ]),
    faq: ["isSafe", "sedation", "pain", "recoveryTime", "afterEffects", "cost", "howToBook"].map((key, i) => ({
      item_key: key,
      title_ar: get(ar, `servicesPage.faq.items.${key}.question`) ?? "",
      title_en: get(en, `servicesPage.faq.items.${key}.question`) ?? "",
      description_ar: get(ar, `servicesPage.faq.items.${key}.answer`) ?? "",
      description_en: get(en, `servicesPage.faq.items.${key}.answer`) ?? "",
      extra: {},
      order_index: i,
    })),
  },
  videos: {
    video_gallery: [
      { key: "gastroscopy101", category: "endoscopy", duration: "03:12" },
      { key: "colonoscopyTips", category: "endoscopy", duration: "02:58" },
      { key: "ercpExplained", category: "endoscopy", duration: "04:05" },
      { key: "hepatitisSigns", category: "liver", duration: "03:40" },
      { key: "liverCirrhosisPrevention", category: "liver", duration: "04:20" },
      { key: "fattyLiverTypes", category: "liver", duration: "03:15" },
      { key: "refluxCauses", category: "prevention", duration: "04:45" },
      { key: "colonNutritionTips", category: "prevention", duration: "03:30" },
      { key: "whenToSeeDoctor", category: "prevention", duration: "02:50" },
    ].map((v, i) => ({
      item_key: v.key,
      title_ar: get(ar, `videosPage.gallery.items.${v.key}.title`) ?? "",
      title_en: get(en, `videosPage.gallery.items.${v.key}.title`) ?? "",
      description_ar: get(ar, `videosPage.gallery.items.${v.key}.description`) ?? "",
      description_en: get(en, `videosPage.gallery.items.${v.key}.description`) ?? "",
      extra: { category: v.category, duration: v.duration },
      order_index: i,
    })),
  },
  reviews: {
    reviews_grid: [
      { key: "ahmedFull", rating: 5, extra: true },
      { key: "saraFull", rating: 5, extra: true },
      { key: "mahmoud", rating: 5 },
      { key: "mona", rating: 5 },
      { key: "youssef", rating: 5 },
      { key: "heba", rating: 5 },
      { key: "amr", rating: 5 },
      { key: "nour", rating: 5 },
      { key: "khaled", rating: 5 },
    ].map((r, i) => ({
      item_key: r.key,
      title_ar: get(ar, `reviewsPage.gallery.items.${r.key}.name`) ?? "",
      title_en: get(en, `reviewsPage.gallery.items.${r.key}.name`) ?? "",
      description_ar: get(ar, `reviewsPage.gallery.items.${r.key}.text`) ?? "",
      description_en: get(en, `reviewsPage.gallery.items.${r.key}.text`) ?? "",
      extra: {
        rating: r.rating,
        date: { ar: get(ar, `reviewsPage.gallery.items.${r.key}.date`) ?? "", en: get(en, `reviewsPage.gallery.items.${r.key}.date`) ?? "" },
        procedure: {
          ar: get(ar, `reviewsPage.gallery.items.${r.key}.procedure`) ?? "",
          en: get(en, `reviewsPage.gallery.items.${r.key}.procedure`) ?? "",
        },
        ...(r.extra
          ? {
              highlight: {
                ar: get(ar, `reviewsPage.gallery.items.${r.key}.highlight`) ?? "",
                en: get(en, `reviewsPage.gallery.items.${r.key}.highlight`) ?? "",
              },
              doctorResponse: {
                ar: get(ar, `reviewsPage.gallery.items.${r.key}.doctorResponse`) ?? "",
                en: get(en, `reviewsPage.gallery.items.${r.key}.doctorResponse`) ?? "",
              },
            }
          : {}),
      },
      order_index: i,
    })),
  },
  articles: {
    articles_section: [
      { key: "completeGuide", category: "digestive", readTime: "8", featured: true },
      { key: "refluxVsHeartburn", category: "digestive", readTime: "5" },
      { key: "ibsCauses", category: "digestive", readTime: "6" },
      { key: "fattyLiverGuide", category: "liver", readTime: "7" },
      { key: "endoscopyPrep", category: "endoscopy", readTime: "4" },
      { key: "postEndoscopyNutrition", category: "endoscopy", readTime: "5" },
      { key: "liverFunctionTests", category: "liver", readTime: "4" },
    ].map((a, i) => ({
      item_key: a.key,
      title_ar: get(ar, `articlesPage.section.items.${a.key}.title`) ?? "",
      title_en: get(en, `articlesPage.section.items.${a.key}.title`) ?? "",
      description_ar: get(ar, `articlesPage.section.items.${a.key}.excerpt`) ?? "",
      description_en: get(en, `articlesPage.section.items.${a.key}.excerpt`) ?? "",
      extra: {
        category: a.category,
        readTime: a.readTime,
        featured: !!a.featured,
        content: {
          ar: get(ar, `articlesPage.section.items.${a.key}.content`) ?? "",
          en: get(en, `articlesPage.section.items.${a.key}.content`) ?? "",
        },
      },
      order_index: i,
    })),
  },
};

// ---------------------------------------------------------------------------
// Apply: update page_sections.content, then replace each section's items.
// ---------------------------------------------------------------------------
const { data: pages, error: pagesError } = await supabase.from("pages").select("id, slug");
if (pagesError) {
  console.error("Failed to load pages:", pagesError.message);
  process.exit(1);
}

for (const page of pages) {
  const contentMap = sectionContent[page.slug];
  const itemsMap = itemsByPageSection[page.slug] ?? {};
  if (!contentMap) continue;

  const { data: sections, error: sectionsError } = await supabase
    .from("page_sections")
    .select("id, section_key")
    .eq("page_id", page.id);
  if (sectionsError) {
    console.error(`Failed to load sections for ${page.slug}:`, sectionsError.message);
    continue;
  }

  for (const section of sections) {
    const content = contentMap[section.section_key];
    if (content) {
      const { error } = await supabase.from("page_sections").update({ content }).eq("id", section.id);
      if (error) console.error(`content update failed [${page.slug}/${section.section_key}]:`, error.message);
    }

    const items = itemsMap[section.section_key];
    if (items) {
      await supabase.from("dynamic_items_collections").delete().eq("section_id", section.id);
      const { error } = await supabase
        .from("dynamic_items_collections")
        .insert(items.map((it) => ({ ...it, section_id: section.id, is_visible: true })));
      if (error) console.error(`items insert failed [${page.slug}/${section.section_key}]:`, error.message);
      else console.log(`Seeded ${items.length} items for ${page.slug}/${section.section_key}`);
    }
  }

  console.log(`Updated content for ${page.slug} (${sections.length} sections)`);
}

console.log("Done.");
