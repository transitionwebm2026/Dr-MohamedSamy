import { createClient } from "@/lib/supabase/server";

type Json = Record<string, unknown>;

function setPath(obj: Json, path: string, value: unknown) {
  const keys = path.split(".");
  let cur: Json = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (typeof cur[k] !== "object" || cur[k] === null) cur[k] = {};
    cur = cur[k] as Json;
  }
  cur[keys[keys.length - 1]] = value;
}

/** Reads a { ar, en } pair, returning undefined if missing/empty so callers can skip the override and keep the static default. */
function pick(value: unknown, locale: string): string | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const v = (value as Record<string, unknown>)[locale];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return undefined;
}

function mergeFields(target: Json, basePath: string, content: Json, locale: string, keys: string[]) {
  for (const key of keys) {
    const v = pick(content[key], locale);
    if (v !== undefined) setPath(target, `${basePath}.${key}`, v);
  }
}

type DbItem = {
  item_key: string | null;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  extra: Record<string, unknown>;
};

function mergeSimpleItems(target: Json, basePath: string, items: DbItem[], locale: string) {
  for (const item of items) {
    if (!item.item_key) continue;
    const title = locale === "ar" ? item.title_ar : item.title_en;
    const description = locale === "ar" ? item.description_ar : item.description_en;
    const patch: Json = {};
    if (title) patch.title = title;
    if (description) patch.description = description;
    if (Object.keys(patch).length > 0) setPath(target, `${basePath}.${item.item_key}`, patch);
  }
}

// The base message-tree path for each [pageSlug][sectionKey]'s `content` blob.
const contentBasePath: Record<string, Record<string, string>> = {
  home: {
    hero: "hero",
    symptom_checker: "symptoms",
    about_doctor: "about",
    treatments: "treatments",
    endoscopy_unit: "endoscopy",
    patient_journey: "journey",
    why_choose_us: "whyChooseUs",
    patient_guide: "guide",
    top_videos: "topVideos",
    reviews: "reviews",
    final_cta: "finalCta",
  },
  about: {
    hero: "aboutPage.hero",
    bio: "aboutPage.bio",
    intro_video: "aboutPage.video",
    academic_timeline: "aboutPage.academic",
    expertise_areas: "aboutPage.expertise",
    career_history: "aboutPage.career",
    core_specializations: "aboutPage.specializations",
    philosophy: "aboutPage.philosophy",
    doctor_message: "aboutPage.message",
    achievements_stats: "aboutPage.stats",
    cta: "aboutPage.cta",
  },
  services: {
    hero: "servicesPage.hero",
    category_selector: "servicesPage.categories",
    category_details_endoscopy: "servicesPage.categoryDetails.endoscopy",
    category_details_liver: "servicesPage.categoryDetails.liver",
    category_details_colon: "servicesPage.categoryDetails.colon",
    category_details_diagnostics: "servicesPage.categoryDetails.diagnostics",
    endoscopy_types: "servicesPage.endoscopyTypes",
    symptom_triggers: "servicesPage.triggers",
    faq: "servicesPage.faq",
    cta: "servicesPage.cta",
  },
  videos: { hero: "videosPage.hero", video_gallery: "videosPage.gallery", cta: "videosPage.cta" },
  reviews: { hero: "reviewsPage.hero", reviews_grid: "reviewsPage.gallery", cta: "reviewsPage.cta" },
  articles: { hero: "articlesPage.hero", articles_section: "articlesPage.section", cta: "articlesPage.cta" },
  contact: { hero: "contactPage.hero", cta: "contactPage.cta" },
};

const contentFieldsByBasePath: Record<string, string[]> = {
  hero: ["titleLine1", "titleLine2", "subtitle", "bookNow", "exploreServices", "callUs"],
  symptoms: ["eyebrow", "title", "description", "cta"],
  about: ["eyebrow", "title", "description"],
  treatments: ["eyebrow", "title", "description", "readMore", "cta"],
  endoscopy: ["eyebrow", "title", "description", "cta"],
  journey: ["eyebrow", "title", "description"],
  whyChooseUs: ["eyebrow", "title", "description", "badgeTitle", "badgeSubtitle"],
  guide: ["eyebrow", "title", "description", "beforeLabel", "afterLabel"],
  topVideos: ["eyebrow", "title", "description", "viewAll"],
  reviews: ["eyebrow", "title", "description", "readMore"],
  finalCta: ["title", "titleHighlight", "description", "contactUs", "whatsapp"],
  "aboutPage.hero": ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"],
  "aboutPage.bio": ["eyebrow", "title", "paragraph1", "paragraph2", "paragraph3"],
  "aboutPage.video": ["eyebrow", "title", "description", "playAria", "closeAria"],
  "aboutPage.academic": ["eyebrow", "title", "description"],
  "aboutPage.expertise": ["eyebrow", "title", "description", "cta"],
  "aboutPage.career": ["eyebrow", "title", "description"],
  "aboutPage.specializations": ["eyebrow", "title", "description"],
  "aboutPage.philosophy": ["eyebrow", "title", "description"],
  "aboutPage.message": ["eyebrow", "title", "quote", "signatureName", "signatureTitle"],
  "aboutPage.stats": ["eyebrow", "title", "description"],
  "aboutPage.cta": ["title", "titleHighlight", "description", "contactUs", "whatsapp"],
  "servicesPage.hero": ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"],
  "servicesPage.categories": ["eyebrow", "title", "description"],
  "servicesPage.categoryDetails.endoscopy": ["title", "description"],
  "servicesPage.categoryDetails.liver": ["title", "description"],
  "servicesPage.categoryDetails.colon": ["title", "description"],
  "servicesPage.categoryDetails.diagnostics": ["title", "description"],
  "servicesPage.endoscopyTypes": ["eyebrow", "title", "description", "applicationsLabel", "bookBtn"],
  "servicesPage.triggers": ["eyebrow", "title", "description"],
  "servicesPage.faq": ["eyebrow", "title", "description"],
  "servicesPage.cta": ["title", "titleHighlight", "description", "contactUs", "whatsapp"],
  "videosPage.hero": ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"],
  "videosPage.gallery": ["eyebrow", "title", "description", "playAria", "closeAria"],
  "videosPage.cta": ["title", "titleHighlight", "description", "contactUs", "whatsapp"],
  "reviewsPage.hero": ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"],
  "reviewsPage.gallery": ["eyebrow", "title", "description", "verifiedBadge", "doctorResponseLabel"],
  "reviewsPage.cta": ["title", "titleHighlight", "description", "contactUs", "whatsapp"],
  "articlesPage.hero": ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"],
  "articlesPage.section": ["eyebrow", "title", "description", "readTimeLabel", "readMoreLabel", "closeAria"],
  "articlesPage.cta": ["title", "titleHighlight", "description", "contactUs", "whatsapp"],
  "contactPage.hero": ["titleLine1", "titleLine2", "subtitle", "servicesBtn", "contactBtn"],
  "contactPage.cta": ["title", "titleHighlight", "description", "contactUs", "whatsapp"],
};

// Sections whose items are plain { title, description } lists — [pageSlug][sectionKey] -> messages base path.
const simpleItemPaths: Record<string, Record<string, string>> = {
  home: {
    symptom_checker: "symptoms.items",
    treatments: "treatments.items",
    endoscopy_unit: "endoscopy.items",
    patient_journey: "journey.steps",
    why_choose_us: "whyChooseUs.points",
  },
  about: {
    expertise_areas: "aboutPage.expertise.items",
    core_specializations: "aboutPage.specializations.items",
    philosophy: "aboutPage.philosophy.items",
    academic_timeline: "aboutPage.academic.items",
  },
  services: {
    category_details_endoscopy: "servicesPage.categoryDetails.endoscopy.items",
    category_details_liver: "servicesPage.categoryDetails.liver.items",
    category_details_colon: "servicesPage.categoryDetails.colon.items",
    category_details_diagnostics: "servicesPage.categoryDetails.diagnostics.items",
    symptom_triggers: "servicesPage.triggers.items",
    category_selector: "servicesPage.categories.items",
  },
  videos: { video_gallery: "videosPage.gallery.items" },
};

type PageData = { id: string; sections: Map<string, { content: Json; items: DbItem[] }> };

async function loadAllPages(): Promise<Map<string, PageData>> {
  const supabase = await createClient();

  const { data: pages } = await supabase.from("pages").select("id, slug");
  const { data: sections } = await supabase.from("page_sections").select("id, page_id, section_key, content");
  const { data: items } = await supabase
    .from("dynamic_items_collections")
    .select("section_id, item_key, title_ar, title_en, description_ar, description_en, extra");

  const itemsBySection = new Map<string, DbItem[]>();
  for (const item of items ?? []) {
    const list = itemsBySection.get(item.section_id) ?? [];
    list.push(item);
    itemsBySection.set(item.section_id, list);
  }

  const result = new Map<string, PageData>();
  for (const page of pages ?? []) {
    const sectionMap = new Map<string, { content: Json; items: DbItem[] }>();
    for (const section of sections ?? []) {
      if (section.page_id !== page.id) continue;
      sectionMap.set(section.section_key, {
        content: (section.content as Json) ?? {},
        items: itemsBySection.get(section.id) ?? [],
      });
    }
    result.set(page.slug, { id: page.id, sections: sectionMap });
  }
  return result;
}

function applyPage(patch: Json, pageSlug: string, page: PageData, locale: string) {
  const get = (sectionKey: string) => page.sections.get(sectionKey);

  for (const [sectionKey, basePath] of Object.entries(contentBasePath[pageSlug] ?? {})) {
    const section = get(sectionKey);
    if (section && contentFieldsByBasePath[basePath]) {
      mergeFields(patch, basePath, section.content, locale, contentFieldsByBasePath[basePath]);
    }
  }

  for (const [sectionKey, basePath] of Object.entries(simpleItemPaths[pageSlug] ?? {})) {
    const section = get(sectionKey);
    if (section) mergeSimpleItems(patch, basePath, section.items, locale);
  }

  if (pageSlug === "home") {
    // Both home's "stats" section and about's "achievements_stats" section
    // render via the shared root-level `stats.<key>` label (see Stats.tsx /
    // AchievementsStats.tsx), which is a flat string, not a { title } object.
    // home/stats is treated as the single source of truth for that label so
    // the two sections' duplicate item rows can't clobber each other.
    const statsSection = get("stats");
    if (statsSection) {
      for (const item of statsSection.items) {
        const title = locale === "ar" ? item.title_ar : item.title_en;
        if (item.item_key && title) setPath(patch, `stats.${item.item_key}`, title);
      }
    }
  }

  if (pageSlug === "home") {
    const topVideos = get("top_videos");
    if (topVideos) {
      for (const item of topVideos.items) {
        const title = locale === "ar" ? item.title_ar : item.title_en;
        if (item.item_key && title) setPath(patch, `topVideos.items.${item.item_key}`, { title });
      }
    }
    const reviews = get("reviews");
    if (reviews) {
      for (const item of reviews.items) {
        if (!item.item_key) continue;
        const name = locale === "ar" ? item.title_ar : item.title_en;
        const text = locale === "ar" ? item.description_ar : item.description_en;
        const procedure = pick(item.extra?.procedure, locale);
        const p: Json = {};
        if (name) p.name = name;
        if (text) p.text = text;
        if (procedure) p.procedure = procedure;
        if (Object.keys(p).length) setPath(patch, `reviews.items.${item.item_key}`, p);
      }
    }
    const guide = get("patient_guide");
    if (guide) {
      for (const item of guide.items) {
        if (!item.item_key) continue;
        const phase = item.extra?.phase === "after" ? "after" : "before";
        const title = locale === "ar" ? item.title_ar : item.title_en;
        const content = locale === "ar" ? item.description_ar : item.description_en;
        const p: Json = {};
        if (title) p.title = title;
        if (content) p.content = content;
        if (Object.keys(p).length) setPath(patch, `guide.${phase}.${item.item_key}`, p);
      }
    }
    const aboutDoctor = get("about_doctor");
    if (aboutDoctor) {
      for (const item of aboutDoctor.items) {
        const title = locale === "ar" ? item.title_ar : item.title_en;
        if (item.item_key && title) setPath(patch, `about.qualifications.${item.item_key}`, title);
      }
    }
  }

  if (pageSlug === "about") {
    const career = get("career_history");
    if (career) {
      for (const item of career.items) {
        if (!item.item_key) continue;
        const title = locale === "ar" ? item.title_ar : item.title_en;
        const description = locale === "ar" ? item.description_ar : item.description_en;
        const place = pick(item.extra?.place, locale);
        const p: Json = {};
        if (title) p.title = title;
        if (place) p.place = place;
        if (description) p.description = description;
        if (Object.keys(p).length) setPath(patch, `aboutPage.career.items.${item.item_key}`, p);
      }
    }
  }

  if (pageSlug === "services") {
    const endoscopyTypes = get("endoscopy_types");
    if (endoscopyTypes) {
      for (const item of endoscopyTypes.items) {
        if (!item.item_key) continue;
        const title = locale === "ar" ? item.title_ar : item.title_en;
        const applications = (item.extra?.applications as Record<string, string[]> | undefined)?.[locale];
        const p: Json = {};
        if (title) p.title = title;
        if (Array.isArray(applications) && applications.length) p.applications = applications;
        if (Object.keys(p).length) setPath(patch, `servicesPage.endoscopyTypes.items.${item.item_key}`, p);
      }
    }
    const faq = get("faq");
    if (faq) {
      for (const item of faq.items) {
        if (!item.item_key) continue;
        const question = locale === "ar" ? item.title_ar : item.title_en;
        const answer = locale === "ar" ? item.description_ar : item.description_en;
        const p: Json = {};
        if (question) p.question = question;
        if (answer) p.answer = answer;
        if (Object.keys(p).length) setPath(patch, `servicesPage.faq.items.${item.item_key}`, p);
      }
    }
  }

  if (pageSlug === "videos") {
    const gallery = get("video_gallery");
    if (gallery) {
      const cat = (key: string, path: string) => {
        const v = pick(gallery.content[key], locale);
        if (v) setPath(patch, path, v);
      };
      cat("categoryEndoscopy", "videosPage.gallery.categories.endoscopy");
      cat("categoryLiver", "videosPage.gallery.categories.liver");
      cat("categoryPrevention", "videosPage.gallery.categories.prevention");
    }
  }

  if (pageSlug === "reviews") {
    const grid = get("reviews_grid");
    if (grid) {
      for (const item of grid.items) {
        if (!item.item_key) continue;
        const name = locale === "ar" ? item.title_ar : item.title_en;
        const text = locale === "ar" ? item.description_ar : item.description_en;
        const date = pick(item.extra?.date, locale);
        const procedure = pick(item.extra?.procedure, locale);
        const highlight = pick(item.extra?.highlight, locale);
        const doctorResponse = pick(item.extra?.doctorResponse, locale);
        const p: Json = {};
        if (name) p.name = name;
        if (text) p.text = text;
        if (date) p.date = date;
        if (procedure) p.procedure = procedure;
        if (highlight) p.highlight = highlight;
        if (doctorResponse) p.doctorResponse = doctorResponse;
        if (Object.keys(p).length) setPath(patch, `reviewsPage.gallery.items.${item.item_key}`, p);
      }
    }
  }

  if (pageSlug === "articles") {
    const section = get("articles_section");
    if (section) {
      for (const item of section.items) {
        if (!item.item_key) continue;
        const title = locale === "ar" ? item.title_ar : item.title_en;
        const excerpt = locale === "ar" ? item.description_ar : item.description_en;
        const content = pick(item.extra?.content, locale);
        const p: Json = {};
        if (title) p.title = title;
        if (excerpt) p.excerpt = excerpt;
        if (content) p.content = content;
        if (Object.keys(p).length) setPath(patch, `articlesPage.section.items.${item.item_key}`, p);
      }
      const cat = (key: string, path: string) => {
        const v = pick(section.content[key], locale);
        if (v) setPath(patch, path, v);
      };
      cat("categoryDigestive", "articlesPage.section.categories.digestive");
      cat("categoryLiver", "articlesPage.section.categories.liver");
      cat("categoryEndoscopy", "articlesPage.section.categories.endoscopy");
    }
  }

  if (pageSlug === "contact") {
    const contactSection = get("contact_section");
    if (contactSection) {
      const map: Record<string, string> = {
        formEyebrow: "contactPage.form.eyebrow",
        formTitle: "contactPage.form.title",
        formDescription: "contactPage.form.description",
        formSubmitBtn: "contactPage.form.submitBtn",
        infoEyebrow: "contactPage.info.eyebrow",
        infoTitle: "contactPage.info.title",
        infoDescription: "contactPage.info.description",
        phoneLabel: "contactPage.info.phoneLabel",
        whatsappLabel: "contactPage.info.whatsappLabel",
        emailLabel: "contactPage.info.emailLabel",
        addressLabel: "contactPage.info.addressLabel",
        followUsLabel: "contactPage.info.followUsLabel",
      };
      for (const [key, path] of Object.entries(map)) {
        const v = pick(contactSection.content[key], locale);
        if (v) setPath(patch, path, v);
      }
    }
  }
}

function deepMerge(target: Json, patch: Json): Json {
  for (const key of Object.keys(patch)) {
    const patchValue = patch[key];
    if (patchValue && typeof patchValue === "object" && !Array.isArray(patchValue)) {
      if (typeof target[key] !== "object" || target[key] === null || Array.isArray(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key] as Json, patchValue as Json);
    } else {
      target[key] = patchValue;
    }
  }
  return target;
}

/** Overlays live CMS content onto the static next-intl messages, per-field, leaving anything not customized untouched. */
export async function applyMessageOverrides(locale: string, messages: Json): Promise<Json> {
  try {
    const pages = await loadAllPages();
    const patch: Json = {};
    for (const [slug, page] of pages) applyPage(patch, slug, page, locale);

    // The clinic address lives in the global settings; the footer and contact page read it as `site.address`.
    const supabase = await createClient();
    const { data: settings } = await supabase
      .from("global_settings")
      .select("address_ar, address_en")
      .eq("id", 1)
      .maybeSingle();
    const address = locale === "ar" ? settings?.address_ar : settings?.address_en;
    if (address) setPath(patch, "site.address", address);

    return deepMerge(messages, patch);
  } catch {
    // Supabase unreachable/misconfigured — keep the static messages as-is.
    return messages;
  }
}
