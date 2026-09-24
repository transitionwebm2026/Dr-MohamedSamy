import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "../globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "لوحة التحكم | دكتور محمد سامي",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} h-full antialiased`}>
      <body className="min-h-full bg-brand-surface font-tajawal text-brand-ink">{children}</body>
    </html>
  );
}
