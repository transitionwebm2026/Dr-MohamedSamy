"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookingForm } from "@/components/sections/contact/BookingForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";

export function ContactSection() {
  const t = useTranslations("contactPage.info");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <BookingForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
