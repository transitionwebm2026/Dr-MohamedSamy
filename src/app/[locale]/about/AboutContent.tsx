import { AboutHero } from "@/components/sections/about/AboutHero";
import { BioSection } from "@/components/sections/about/BioSection";
import { IntroVideo } from "@/components/sections/about/IntroVideo";
import { AcademicTimeline } from "@/components/sections/about/AcademicTimeline";
import { ExpertiseAreas } from "@/components/sections/about/ExpertiseAreas";
import { CareerHistory } from "@/components/sections/about/CareerHistory";
import { CoreSpecializations } from "@/components/sections/about/CoreSpecializations";
import { PhilosophySection } from "@/components/sections/about/PhilosophySection";
import { DoctorMessage } from "@/components/sections/about/DoctorMessage";
import { AchievementsStats } from "@/components/sections/about/AchievementsStats";
import { AboutCTA } from "@/components/sections/about/AboutCTA";
import { getPageSections, getSection } from "@/lib/cms/queries";

export async function AboutContent() {
  const [sections, statsSection] = await Promise.all([getPageSections("about"), getSection("home", "stats")]);
  const byKey = new Map(sections.map((s) => [s.section_key, s]));

  return (
    <>
      <AboutHero />
      <BioSection />
      <IntroVideo content={byKey.get("intro_video")?.content} />
      <AcademicTimeline />
      <ExpertiseAreas items={byKey.get("expertise_areas")?.items ?? []} />
      <CareerHistory />
      <CoreSpecializations />
      <PhilosophySection />
      <DoctorMessage />
      <AchievementsStats items={statsSection?.items ?? []} />
      <AboutCTA />
    </>
  );
}
