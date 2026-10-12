import { setRequestLocale } from "next-intl/server";
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
import { getPageSections } from "@/lib/cms/queries";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sections = await getPageSections("home");
  const byKey = new Map(sections.map((s) => [s.section_key, s]));

  return (
    <>
      <Hero />
      <Stats items={byKey.get("stats")?.items ?? []} />
      <SymptomChecker items={byKey.get("symptom_checker")?.items ?? []} />
      <AboutDoctor content={byKey.get("about_doctor")?.content} />
      <Treatments items={byKey.get("treatments")?.items ?? []} />
      <EndoscopyUnit items={byKey.get("endoscopy_unit")?.items ?? []} />
      <PatientJourney />
      <WhyChooseUs content={byKey.get("why_choose_us")?.content} />
      <PatientGuide />
      <TopVideos items={byKey.get("top_videos")?.items ?? []} />
      <Reviews />
      <FinalCTA />
    </>
  );
}
