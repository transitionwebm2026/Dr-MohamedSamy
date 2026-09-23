import type { Metadata, Viewport } from "next";
import { Montserrat, Tajawal } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import "swiper/css";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CallButton } from "@/components/layout/CallButton";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { siteConfig } from "@/lib/site-config";

// "DG Tebian" is not available as a web font; Tajawal is used as the
// production-ready Arabic typeface it was requested as a fallback for.
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#290b4c",
  colorScheme: "dark",
};

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${t("name")} | ${t("title")}`,
      template: `%s | ${t("name")}`,
    },
    description: t("description"),
    keywords: [
      "دكتور محمد سامي",
      "استشاري جهاز هضمي",
      "دكتور كبد",
      "منظار معدة",
      "منظار قولون",
      "Gastroenterology",
      "Hepatology",
      "Endoscopy",
    ],
    authors: [{ name: t("name") }],
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      url: siteConfig.url,
      title: `${t("name")} | ${t("title")}`,
      description: t("description"),
      siteName: t("name"),
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${t("name")} | ${t("title")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("name")} | ${t("title")}`,
      description: t("description"),
      images: ["/opengraph-image.png"],
    },
    alternates: {
      canonical: siteConfig.url,
      languages: { ar: "/ar", en: "/en" },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "site" });
  const dir = locale === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: t("nameEn"),
    alternateName: t("name"),
    medicalSpecialty: ["Gastroenterology", "Hepatology", "Endoscopy"],
    description: t("description"),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: t("address"),
      addressCountry: "EG",
    },
    sameAs: siteConfig.socials.map((s) => s.href),
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${tajawal.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`flex min-h-full flex-col overflow-x-hidden ${locale === "ar" ? "font-tajawal" : "font-montserrat"}`}
      >
        <NextIntlClientProvider>
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3">
            <WhatsAppButton />
            <CallButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
