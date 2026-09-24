"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, LogOut, PanelBottom, PanelTop, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/admin/(dashboard)/actions";
import { siteConfig } from "@/lib/site-config";
import type { Page } from "@/lib/supabase/types";

const navOrder: string[] = siteConfig.navLinks.map((link) => link.key);

// Site-wide parts (not standalone pages), listed after the pages in this order.
const sitePartSlugs = ["navbar", "footer"];
const sitePartIcons = { navbar: PanelTop, footer: PanelBottom };

export function Sidebar({ pages }: { pages: Page[] }) {
  const pathname = usePathname();
  const orderedPages = pages
    .filter((page) => !sitePartSlugs.includes(page.slug))
    .sort((a, b) => navOrder.indexOf(a.slug) - navOrder.indexOf(b.slug));
  const siteParts = sitePartSlugs
    .map((slug) => pages.find((page) => page.slug === slug))
    .filter((page): page is Page => !!page);

  const linkClass = (active: boolean) =>
    cn(
      "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
      active ? "gradient-brand text-white" : "text-brand-ink-muted hover:bg-white/10 hover:text-brand-ink",
    );

  return (
    <aside className="glass-strong flex h-full w-64 shrink-0 flex-col gap-6 rounded-3xl p-4">
      <div className="px-2 pt-1">
        <p className="text-sm font-extrabold text-brand-ink">لوحة التحكم</p>
        <p className="text-xs text-brand-ink-muted">دكتور محمد سامي</p>
      </div>

      <nav className="flex flex-col gap-1">
        <Link href="/admin/settings" className={linkClass(pathname === "/admin/settings")}>
          <Settings className="size-4.5 shrink-0" />
          الإعدادات العامة
        </Link>
      </nav>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-xs font-bold uppercase tracking-wide text-brand-ink-muted">الصفحات</p>
        <nav className="flex flex-col gap-1">
          {orderedPages.map((page) => (
            <Link
              key={page.id}
              href={`/admin/pages/${page.slug}`}
              className={linkClass(pathname === `/admin/pages/${page.slug}`)}
            >
              <LayoutGrid className="size-4.5 shrink-0" />
              {page.title_ar || page.slug}
            </Link>
          ))}
        </nav>
      </div>

      {siteParts.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="px-4 text-xs font-bold uppercase tracking-wide text-brand-ink-muted">عناصر الموقع</p>
          <nav className="flex flex-col gap-1">
            {siteParts.map((page) => {
              const Icon = sitePartIcons[page.slug as keyof typeof sitePartIcons] ?? LayoutGrid;
              return (
                <Link
                  key={page.id}
                  href={`/admin/pages/${page.slug}`}
                  className={linkClass(pathname === `/admin/pages/${page.slug}`)}
                >
                  <Icon className="size-4.5 shrink-0" />
                  {page.title_ar || page.slug}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      <form action={signOut} className="mt-auto">
        <button
          type="submit"
          className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-ink-muted transition-colors hover:bg-white/10 hover:text-brand-rose"
        >
          <LogOut className="size-4.5 shrink-0" />
          تسجيل الخروج
        </button>
      </form>
    </aside>
  );
}
