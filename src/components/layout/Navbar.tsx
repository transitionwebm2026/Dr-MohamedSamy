"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            scrolled && "glass-strong",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-icon.png"
              alt=""
              width={40}
              height={40}
              priority
              className="size-10 shrink-0 rounded-full"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-base font-extrabold text-brand-ink">{tSite("name")}</span>
              <span className="font-montserrat text-[11px] font-medium tracking-wide text-brand-ink-muted">
                {tSite("nameEn")}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {siteConfig.navLinks.map((item) => {
              const active = !item.href.includes("#") && pathname === item.href;
              return (
                <Link
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
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <LiquidButton href="/contact" variant="primary" className="px-5 py-2.5 text-sm">
              {t("bookNow")}
            </LiquidButton>
          </div>

          <button
            aria-label={t("openMenu")}
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
            <div className="glass-strong flex flex-col gap-1 rounded-2xl p-3">
              {siteConfig.navLinks.map((item) => {
                const active = !item.href.includes("#") && pathname === item.href;
                return (
                  <Link
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
                    {t(item.key)}
                  </Link>
                );
              })}
              <div className="mt-1 flex items-center gap-2 px-1">
                <LanguageSwitcher className="shrink-0" />
                <LiquidButton href="/contact" variant="primary" className="flex-1">
                  {t("bookNow")}
                </LiquidButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
