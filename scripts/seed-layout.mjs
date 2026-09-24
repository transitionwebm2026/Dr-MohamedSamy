// Seeds the "Navbar" and "Footer" admin pages (pages -> sections -> items) and
// fills any still-empty global settings, all from what the site shows today, so
// the dashboard opens with the real content already in it.
// Run:  set -a && source .env.local && set +a && node scripts/seed-layout.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const supabase = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

const ar = JSON.parse(readFileSync("messages/ar.json", "utf8"));
const en = JSON.parse(readFileSync("messages/en.json", "utf8"));
const both = (path) => {
  const get = (m) => path.split(".").reduce((o, k) => o?.[k], m);
  return { ar: get(ar), en: get(en) };
};

const navLinks = [
  ["home", "/"],
  ["about", "/about"],
  ["services", "/services"],
  ["videos", "/videos"],
  ["reviews", "/reviews"],
  ["articles", "/articles"],
  ["contact", "/contact"],
];

const linkItems = navLinks.map(([key, href], i) => ({
  item_key: key,
  link_url: href,
  title_ar: ar.nav[key],
  title_en: en.nav[key],
  order_index: i,
}));

const layout = {
  navbar: {
    title_ar: "الناف بار",
    title_en: "Navbar",
    sections: [
      {
        key: "brand",
        title: "الشعار والاسم",
        content: {
          logoUrl: "/images/logo-icon.png",
          name: both("site.name"),
          nameEn: both("site.nameEn"),
        },
      },
      { key: "links", title: "روابط القائمة", content: {}, items: linkItems },
      {
        key: "actions",
        title: "الأزرار والأدوات",
        content: {
          bookNow: both("nav.bookNow"),
          bookHref: "/contact",
          showBookButton: true,
          showLanguageSwitcher: true,
          openMenu: both("nav.openMenu"),
        },
      },
    ],
  },
  footer: {
    title_ar: "الفوتر",
    title_en: "Footer",
    sections: [
      {
        key: "about",
        title: "عن الدكتور (العمود الأول)",
        content: { logoUrl: "/images/logo-icon.png", tagline: both("site.title") },
      },
      { key: "quick_links", title: "روابط سريعة", content: { heading: both("footer.quickLinks") }, items: linkItems },
      {
        key: "social",
        title: "تابعنا",
        content: { heading: both("footer.followUs"), showPhone: true, showEmail: true, showAddress: true },
      },
      {
        key: "bottom",
        title: "الشريط السفلي",
        content: {
          rights: both("footer.rights"),
          tagline: both("site.title"),
          showCredit: true,
          creditName: "Transition",
          creditLabel: { ar: "تصميم وتطوير", en: "Design & Development" },
          creditUrl: "https://transitioneg.com/",
          creditLogoUrl: "/images/logo-01.png",
        },
      },
    ],
  },
};

let pageOrder = 0;
for (const [slug, def] of Object.entries(layout)) {
  pageOrder++;
  const { data: page, error: pageError } = await supabase
    .from("pages")
    .upsert({ slug, title_ar: def.title_ar, title_en: def.title_en, is_active: true }, { onConflict: "slug" })
    .select("id")
    .single();
  if (pageError) {
    console.error(`Failed to upsert page ${slug}:`, pageError.message);
    process.exit(1);
  }

  for (const [index, section] of def.sections.entries()) {
    const { data: existing } = await supabase
      .from("page_sections")
      .select("id, content")
      .eq("page_id", page.id)
      .eq("section_key", section.key)
      .maybeSingle();

    let sectionId = existing?.id;
    if (!existing) {
      const { data: created, error } = await supabase
        .from("page_sections")
        .insert({
          page_id: page.id,
          section_key: section.key,
          section_title_ar: section.title,
          section_title_en: section.title,
          order_index: index,
          content: section.content,
        })
        .select("id")
        .single();
      if (error) {
        console.error(`Failed to create section ${slug}/${section.key}:`, error.message);
        continue;
      }
      sectionId = created.id;
      console.log(`Created ${slug}/${section.key}`);
    } else {
      console.log(`Kept existing ${slug}/${section.key} (not overwritten)`);
    }

    for (const item of section.items ?? []) {
      const { data: hasItem } = await supabase
        .from("dynamic_items_collections")
        .select("id")
        .eq("section_id", sectionId)
        .eq("item_key", item.item_key)
        .maybeSingle();
      if (hasItem) continue;
      const { error } = await supabase
        .from("dynamic_items_collections")
        .insert({ ...item, section_id: sectionId, description_ar: "", description_en: "", extra: {} });
      if (error) console.error(`Failed item ${slug}/${section.key}/${item.item_key}:`, error.message);
    }
  }
}

// Global settings: fill only what's still empty, from what the site shows today.
const { data: current } = await supabase.from("global_settings").select("*").eq("id", 1).maybeSingle();
const defaults = {
  phone: "+201000000000",
  whatsapp: "https://wa.me/201000000000",
  email: "info@dr-mohamedsami.com",
  address_ar: ar.site.address,
  address_en: en.site.address,
  social_links: [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "TikTok", href: "https://tiktok.com" },
  ],
};
const patch = {};
for (const [key, value] of Object.entries(defaults)) {
  const cur = current?.[key];
  const empty = cur == null || cur === "" || (Array.isArray(cur) && cur.length === 0);
  if (empty) patch[key] = value;
}
if (Object.keys(patch).length > 0) {
  const { error } = await supabase.from("global_settings").update(patch).eq("id", 1);
  console.log(error ? `Settings update failed: ${error.message}` : `Filled global settings: ${Object.keys(patch).join(", ")}`);
} else {
  console.log("Global settings already filled");
}
