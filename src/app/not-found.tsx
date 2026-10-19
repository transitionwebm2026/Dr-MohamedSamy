import Link from "next/link";
import "./globals.css";
import { SiteLogo } from "@/components/ui/SiteLogo";

/**
 * The one global 404 a static host falls back to for any URL that matches
 * no generated file (`out/404.html`) — outside [locale], so the visitor's
 * language isn't known yet. Both languages are shown together instead of
 * guessing one.
 */
export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
        style={{ background: "var(--color-brand-surface)", color: "var(--color-brand-ink)" }}
      >
        <SiteLogo size={64} />
        <div>
          <p className="text-2xl font-extrabold">الصفحة غير موجودة</p>
          <p className="mt-1 text-sm" style={{ color: "var(--color-brand-ink-muted)" }}>
            Page not found
          </p>
        </div>
        <Link
          href="/ar"
          className="rounded-full px-6 py-3 text-sm font-bold text-white"
          style={{
            background: "linear-gradient(90deg, var(--color-brand-primary), var(--color-brand-rose))",
          }}
        >
          العودة للرئيسية · Back to home
        </Link>
      </body>
    </html>
  );
}
