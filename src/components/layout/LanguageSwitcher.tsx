"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const options = [
  { locale: "ar", label: "عربي" },
  { locale: "en", label: "EN" },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={cn("glass flex items-center gap-0.5 rounded-full p-1", className)}>
      {options.map((option) => {
        const active = locale === option.locale;
        return (
          <Link
            key={option.locale}
            href={pathname}
            locale={option.locale}
            aria-current={active}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
              active ? "gradient-brand text-white" : "text-brand-ink-muted hover:text-brand-ink",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
