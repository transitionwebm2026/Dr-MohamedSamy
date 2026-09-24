import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { FooterData, SiteSettings } from "@/lib/cms/layout";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { SmartLink } from "@/components/ui/SmartLink";
import { socialIcon } from "@/components/ui/socialIcons";

const columnClass: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

/** Heading with a short gradient underline, centered above its column. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 text-sm font-bold text-brand-ink after:mx-auto after:mt-2.5 after:block after:h-0.5 after:w-8 after:rounded-full after:bg-gradient-to-r after:from-brand-rose after:to-brand-light">
      {children}
    </h3>
  );
}

/**
 * `data` comes from the dashboard's "Footer" page and `settings` from the
 * global settings. Every field falls back to the built-in default, and a part
 * the admin hid (`null`) is simply not rendered.
 */
export function Footer({ data, settings }: { data: FooterData | null; settings: SiteSettings }) {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const tFooter = useTranslations("footer");

  const about: FooterData["about"] = data ? data.about : {};
  const quickLinks: FooterData["quickLinks"] = data ? data.quickLinks : {};
  const social: FooterData["social"] = data
    ? data.social
    : { showPhone: true, showEmail: true, showAddress: true };
  const bottom: FooterData["bottom"] = data
    ? data.bottom
    : { credit: { name: "Transition", url: "https://transitioneg.com/", logoUrl: "/images/logo-01.png" } };

  const links =
    quickLinks?.links ?? siteConfig.navLinks.map((item) => ({ key: item.key, href: item.href, label: t(item.key) }));
  const name = data?.name ?? tSite("name");
  const nameEn = data?.nameEn ?? tSite("nameEn");
  const credit = bottom?.credit;
  const columns = [about, quickLinks, social].filter(Boolean).length;

  const columnClassName =
    "flex flex-col items-center text-center md:border-s md:border-white/10 md:px-8 md:first:border-s-0";

  return (
    <footer className="relative border-t border-white/10 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {columns > 0 && (
          <div className={`grid gap-12 pb-14 ${columnClass[columns]}`}>
            {about && (
              <div className={columnClassName}>
                <SmartLink href="/" className="mb-4 flex flex-col items-center gap-3">
                  <SiteLogo src={about.logoUrl} size={56} className="size-14 shrink-0 object-contain" />
                  <span className="flex flex-col leading-tight">
                    <span className="text-lg font-extrabold text-brand-ink">{name}</span>
                    <span className="mt-0.5 font-montserrat text-xs text-brand-ink-muted">{nameEn}</span>
                  </span>
                </SmartLink>
                <p className="max-w-xs text-sm leading-relaxed text-brand-ink-muted">
                  {about.tagline ?? tSite("title")}
                </p>
              </div>
            )}

            {quickLinks && (
              <div className={columnClassName}>
                <ColumnHeading>{quickLinks.heading ?? tFooter("quickLinks")}</ColumnHeading>
                <ul className="flex flex-col items-center gap-3">
                  {links.map((item) => (
                    <li key={item.key}>
                      <SmartLink
                        href={item.href}
                        className="text-sm text-brand-ink-muted transition-colors hover:text-brand-rose"
                      >
                        {item.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {social && (
              <div className={columnClassName}>
                <ColumnHeading>{social.heading ?? tFooter("followUs")}</ColumnHeading>
                <div className="flex flex-wrap justify-center gap-3">
                  {settings.socials.map((item) => {
                    const Icon = socialIcon(item.name);
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                        className="glass flex size-10 items-center justify-center rounded-xl text-brand-ink-muted transition-all hover:-translate-y-0.5 hover:text-brand-rose"
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                </div>

                {(social.showPhone || social.showEmail || social.showAddress) && (
                  <ul className="mt-6 space-y-3">
                    {social.showPhone && (
                      <li className="flex items-center justify-center gap-2 text-sm text-brand-ink-muted">
                        <Phone className="size-4 shrink-0 text-brand-rose" />
                        <a href={`tel:${settings.phone}`} dir="ltr" className="transition-colors hover:text-brand-rose">
                          {settings.phoneDisplay}
                        </a>
                      </li>
                    )}
                    {social.showEmail && (
                      <li className="flex items-center justify-center gap-2 text-sm text-brand-ink-muted">
                        <Mail className="size-4 shrink-0 text-brand-rose" />
                        <a
                          href={`mailto:${settings.email}`}
                          dir="ltr"
                          className="break-all transition-colors hover:text-brand-rose"
                        >
                          {settings.email}
                        </a>
                      </li>
                    )}
                    {social.showAddress && (
                      <li className="flex items-start justify-center gap-2 text-sm text-brand-ink-muted">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-brand-rose" />
                        <span>{tSite("address")}</span>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {bottom && (
          <div className="grid items-center justify-items-center gap-4 border-t border-white/10 py-6 text-center text-xs text-brand-ink-muted sm:grid-cols-[1fr_auto_1fr]">
            <p className="sm:justify-self-start">
              © {new Date().getFullYear()} {name}. {bottom.rights ?? tFooter("rights")}.
            </p>

            {credit ? (
              <a
                href={credit.url}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="glow-border inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-gradient-to-r from-brand-primary via-brand-light to-brand-rose px-4 py-2 shadow-[0_8px_20px_-6px_rgba(110,75,152,0.7)] transition-transform hover:scale-105"
              >
                <span className="font-montserrat text-sm font-bold tracking-wide text-white">{credit.name}</span>
                {credit.logoUrl && (
                  <span className="flex size-7 items-center justify-center rounded-lg bg-white/10">
                    {credit.logoUrl.startsWith("/") ? (
                      <Image
                        src={credit.logoUrl}
                        alt={`${credit.name} logo`}
                        width={64}
                        height={64}
                        className="size-5 object-contain"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element -- remote upload from the dashboard
                      <img src={credit.logoUrl} alt={`${credit.name} logo`} className="size-5 object-contain" />
                    )}
                  </span>
                )}
                <span className="text-xs font-bold text-white">{credit.label ?? "تصميم وتطوير"}</span>
              </a>
            ) : (
              <span />
            )}

            <p className="font-montserrat sm:justify-self-end">{bottom.tagline ?? tSite("title")}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
