import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { pageAlternates } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { SymptomChecker } from "@/components/sections/SymptomChecker";
import { AboutDoctor } from "@/components/sections/AboutDoctor";
import { Treatments } from "@/components/sections/Treatments";
import { EndoscopyUnit } from "@/components/sections/EndoscopyUnit";
import { PatientJourney } from "@/components/sections/PatientJourney";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PatientGuide } from "@/components/sections/PatientGuide";
import { TopVideos } from "@/components/sections/TopVideos";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getPageSections, getSection } from "@/lib/cms/queries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale) };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [sections, videoGallery, endoscopyTypes] = await Promise.all([
    getPageSections("home"),
    // Home shows a preview of the SAME videos/endoscopy-types lists the
    // dedicated pages manage, instead of keeping its own separate copy.
    getSection("videos", "video_gallery"),
    getSection("services", "endoscopy_types"),
  ]);
  const byKey = new Map(sections.map((s) => [s.section_key, s]));

  return (
    <>
      <Hero content={byKey.get("hero")?.content} />
      <Stats items={byKey.get("stats")?.items ?? []} />
      <SymptomChecker items={byKey.get("symptom_checker")?.items ?? []} />
      <AboutDoctor content={byKey.get("about_doctor")?.content} />
      <Treatments items={byKey.get("treatments")?.items ?? []} />
      <EndoscopyUnit items={endoscopyTypes?.items ?? []} />
      <PatientJourney />
      <WhyChooseUs content={byKey.get("why_choose_us")?.content} />
      <PatientGuide />
      <TopVideos items={videoGallery?.items ?? []} />
      <Reviews />
      <FinalCTA />
    </>
  );
}
