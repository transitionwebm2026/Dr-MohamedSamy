"use client";

import { useTranslations } from "next-intl";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookingForm } from "@/components/sections/contact/BookingForm";
import { BranchLocations } from "@/components/sections/contact/BranchLocations";
import type { DynamicItem } from "@/lib/supabase/types";

export function ContactSection({ locations = [] }: { locations?: DynamicItem[] }) {
  const t = useTranslations("contactPage.info");

  return (
    <section className="relative py-20 sm:py-28">
      <AmbientBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <BookingForm locations={locations} />
          <BranchLocations items={locations} />
        </div>
      </div>
    </section>
  );
}
