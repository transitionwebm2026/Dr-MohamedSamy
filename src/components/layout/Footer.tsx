import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { type IconType } from "react-icons";

const socialIcons: Record<string, IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
};

export function Footer() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const tFooter = useTranslations("footer");

  return (
    <footer className="relative border-t border-white/10 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <Image
                src="/images/logo-icon.png"
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-base font-extrabold text-brand-ink">{tSite("name")}</span>
                <span className="font-montserrat text-[11px] text-brand-ink-muted">{tSite("nameEn")}</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-ink-muted">{tSite("title")}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-brand-ink">{tFooter("quickLinks")}</h3>
            <ul className="space-y-2.5">
              {siteConfig.navLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-ink-muted transition-colors hover:text-brand-rose"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-brand-ink">{tFooter("contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-brand-ink-muted">
                <Phone className="size-4 text-brand-rose" />
                <span dir="ltr">{siteConfig.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-brand-ink-muted">
                <Mail className="size-4 text-brand-rose" />
                <span dir="ltr">{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-brand-ink-muted">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-rose" />
                <span>{tSite("address")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-brand-ink">{tFooter("followUs")}</h3>
            <div className="flex gap-3">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="glass flex size-10 items-center justify-center rounded-xl text-brand-ink-muted transition-colors hover:text-brand-rose"
                  >
                    {Icon && <Icon className="size-4" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-brand-ink-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {tSite("name")}. {tFooter("rights")}.
          </p>

          <a
            href="https://transitioneg.com/"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="glow-border inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-gradient-to-r from-brand-primary via-brand-light to-brand-rose px-4 py-2 shadow-[0_8px_20px_-6px_rgba(110,75,152,0.7)] transition-transform hover:scale-105"
          >
            <span className="font-montserrat text-sm font-bold tracking-wide text-white">Transition</span>
            <span className="flex size-7 items-center justify-center rounded-lg bg-white/10">
              <Image
                src="/images/logo-01.png"
                alt="Transition logo"
                width={64}
                height={64}
                className="size-5 object-contain"
              />
            </span>
            <span className="text-xs font-bold text-white">تصميم وتطوير</span>
          </a>

          <p className="font-montserrat">{tSite("title")}</p>
        </div>
      </div>
    </footer>
  );
}
