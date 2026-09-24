"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import type { NavbarData } from "@/lib/cms/layout";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { SmartLink } from "@/components/ui/SmartLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";

/**
 * `data` comes from the dashboard's "Navbar" page; every field is optional and
 * falls back to the built-in defaults, so the navbar still renders if the CMS
 * has nothing (or can't be reached).
 */
export function Navbar({ data }: { data: NavbarData | null }) {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = data?.links ?? siteConfig.navLinks.map((item) => ({ key: item.key, href: item.href, label: t(item.key) }));
  const showBrand = data?.showBrand ?? true;
  const showBook = data?.showBook ?? true;
  const showLanguageSwitcher = data?.showLanguageSwitcher ?? true;
  const bookLabel = data?.bookLabel ?? t("bookNow");
  const bookHref = data?.bookHref ?? "/contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "glass flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6",
            scrolled && "glass-strong max-lg:bg-brand-surface!",
          )}
        >
          {showBrand ? (
            <SmartLink href="/" className="flex items-center gap-2.5">
              <SiteLogo src={data?.logoUrl} priority className="size-10 shrink-0 object-contain" />
              <span className="flex flex-col leading-tight">
                <span className="text-base font-extrabold text-brand-ink">{data?.name ?? tSite("name")}</span>
                <span className="font-montserrat text-[11px] font-medium tracking-wide text-brand-ink-muted">
                  {data?.nameEn ?? tSite("nameEn")}
                </span>
              </span>
            </SmartLink>
          ) : (
            <span />
          )}

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((item) => {
              const active = !item.href.includes("#") && pathname === item.href;
              return (
                <SmartLink
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "gradient-brand text-white"
                      : "text-brand-ink-muted hover:bg-white/10 hover:text-brand-ink",
                  )}
                >
                  {item.label}
                </SmartLink>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {showLanguageSwitcher && <LanguageSwitcher />}
            {showBook && (
              <LiquidButton href={bookHref} variant="primary" className="px-5 py-2.5 text-sm">
                {bookLabel}
              </LiquidButton>
            )}
          </div>

          <button
            aria-label={data?.openMenuLabel ?? t("openMenu")}
            onClick={() => setOpen((v) => !v)}
            className="glass flex size-11 items-center justify-center rounded-xl text-brand-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 lg:hidden"
          >
            <div className="glass-strong flex flex-col gap-1 rounded-2xl bg-brand-surface! p-3">
              {links.map((item) => {
                const active = !item.href.includes("#") && pathname === item.href;
                return (
                  <SmartLink
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                      active
                        ? "gradient-brand text-white"
                        : "text-brand-ink-muted hover:bg-white/10 hover:text-brand-ink",
                    )}
                  >
                    {item.label}
                  </SmartLink>
                );
              })}
              {(showLanguageSwitcher || showBook) && (
                <div className="mt-1 flex items-center gap-2 px-1">
                  {showLanguageSwitcher && <LanguageSwitcher className="shrink-0" />}
                  {showBook && (
                    <LiquidButton href={bookHref} variant="primary" className="flex-1">
                      {bookLabel}
                    </LiquidButton>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
