import { getGlobalSettings, getPageSections, localizedField, type SectionWithItems } from "@/lib/cms/queries";
import { siteConfig } from "@/lib/site-config";
import type { DynamicItem, SocialLink } from "@/lib/supabase/types";

/** Contact details + socials shared by the footer, hero panel, contact page and floating buttons. */
export type SiteSettings = {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  socials: SocialLink[];
};

export type LinkItem = { key: string; href: string; label: string };

/** `undefined` fields fall back to the static defaults inside the component. */
export type NavbarData = {
  showBrand: boolean;
  logoUrl?: string;
  name?: string;
  nameEn?: string;
  /** `undefined` = use the default 7 links; `[]` = the links section is hidden. */
  links?: LinkItem[];
  showBook: boolean;
  bookLabel?: string;
  bookHref: string;
  showLanguageSwitcher: boolean;
  openMenuLabel?: string;
};

/** A `null` block means the admin hid that part of the footer. */
export type FooterData = {
  name?: string;
  nameEn?: string;
  about: { logoUrl?: string; tagline?: string } | null;
  quickLinks: { heading?: string; links?: LinkItem[] } | null;
  /** The "follow us" column: social icons, then the phone / email / address items under them. */
  social: { heading?: string; showPhone: boolean; showEmail: boolean; showAddress: boolean } | null;
  bottom: {
    rights?: string;
    tagline?: string;
    credit: { name: string; label?: string; url: string; logoUrl?: string } | null;
  } | null;
};

export type LayoutData = {
  settings: SiteSettings;
  navbar: NavbarData | null;
  footer: FooterData | null;
};

const staticSettings: SiteSettings = {
  phone: siteConfig.phone,
  phoneDisplay: siteConfig.phoneDisplay,
  whatsapp: siteConfig.whatsapp,
  email: siteConfig.email,
  socials: siteConfig.socials.map((s) => ({ name: s.name, href: s.href })),
};

/** "+201000000000" -> "01000000000", the way the site has always displayed it. */
function displayPhone(phone: string): string {
  const compact = phone.replace(/\s+/g, "");
  return compact.startsWith("+20") ? `0${compact.slice(3)}` : compact;
}

const text = (content: Record<string, unknown> | undefined, key: string, locale: string) =>
  localizedField(content, key, locale) || undefined;

const str = (content: Record<string, unknown> | undefined, key: string) => {
  const v = content?.[key];
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;
};

const flag = (content: Record<string, unknown> | undefined, key: string) => content?.[key] !== false;

function toLinks(items: DynamicItem[], locale: string): LinkItem[] {
  return items
    .map((item) => {
      const own = locale === "ar" ? item.title_ar : item.title_en;
      const other = locale === "ar" ? item.title_en : item.title_ar;
      return { key: item.item_key ?? item.id, href: item.link_url || "/", label: own || other };
    })
    .filter((link) => link.label.length > 0);
}

function bySection(sections: SectionWithItems[]) {
  return new Map(sections.map((s) => [s.section_key, s]));
}

/**
 * Everything the navbar and footer render, resolved for one locale from the
 * dashboard's "Navbar" / "Footer" pages and the global settings. Any part the
 * dashboard hasn't filled in is left `undefined` (component falls back to its
 * static default); a section the admin hid comes back as `null`/`false`.
 */
export async function getLayoutData(locale: string): Promise<LayoutData> {
  try {
    const [global, navSections, footerSections] = await Promise.all([
      getGlobalSettings(),
      getPageSections("navbar"),
      getPageSections("footer"),
    ]);

    const settings: SiteSettings = {
      phone: global?.phone || staticSettings.phone,
      phoneDisplay: global?.phone ? displayPhone(global.phone) : staticSettings.phoneDisplay,
      whatsapp: global?.whatsapp || staticSettings.whatsapp,
      email: global?.email || staticSettings.email,
      socials: global?.social_links?.length ? global.social_links : staticSettings.socials,
    };

    const nav = bySection(navSections);
    const brand = nav.get("brand");
    const actions = nav.get("actions");
    const links = nav.get("links");
    const brandName = text(brand?.content, "name", locale);
    const brandNameEn = text(brand?.content, "nameEn", locale);

    const navbar: NavbarData | null =
      navSections.length === 0
        ? null
        : {
            showBrand: !!brand,
            logoUrl: str(brand?.content, "logoUrl") ?? global?.logo_url ?? undefined,
            name: brandName,
            nameEn: brandNameEn,
            links: links ? toLinks(links.items, locale) : [],
            showBook: !!actions && flag(actions.content, "showBookButton"),
            bookLabel: text(actions?.content, "bookNow", locale),
            bookHref: str(actions?.content, "bookHref") ?? "/contact",
            showLanguageSwitcher: !!actions && flag(actions.content, "showLanguageSwitcher"),
            openMenuLabel: text(actions?.content, "openMenu", locale),
          };

    const foot = bySection(footerSections);
    const about = foot.get("about");
    const quick = foot.get("quick_links");
    const social = foot.get("social");
    const bottom = foot.get("bottom");

    const footer: FooterData | null =
      footerSections.length === 0
        ? null
        : {
            name: brandName,
            nameEn: brandNameEn,
            about: about
              ? {
                  logoUrl: str(about.content, "logoUrl") ?? str(brand?.content, "logoUrl") ?? global?.logo_url ?? undefined,
                  tagline: text(about.content, "tagline", locale),
                }
              : null,
            quickLinks: quick
              ? { heading: text(quick.content, "heading", locale), links: toLinks(quick.items, locale) }
              : null,
            social: social
              ? {
                  heading: text(social.content, "heading", locale),
                  showPhone: flag(social.content, "showPhone"),
                  showEmail: flag(social.content, "showEmail"),
                  showAddress: flag(social.content, "showAddress"),
                }
              : null,
            bottom: bottom
              ? {
                  rights: text(bottom.content, "rights", locale),
                  tagline: text(bottom.content, "tagline", locale),
                  credit: flag(bottom.content, "showCredit")
                    ? {
                        name: str(bottom.content, "creditName") ?? "Transition",
                        label: text(bottom.content, "creditLabel", locale),
                        url: str(bottom.content, "creditUrl") ?? "https://transitioneg.com/",
                        logoUrl: str(bottom.content, "creditLogoUrl"),
                      }
                    : null,
                }
              : null,
          };

    return { settings, navbar, footer };
  } catch {
    // Supabase unreachable/misconfigured — the site keeps its built-in defaults.
    return { settings: staticSettings, navbar: null, footer: null };
  }
}
