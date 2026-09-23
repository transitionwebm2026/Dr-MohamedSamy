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

export function AboutContent() {
  return (
    <>
      <AboutHero />
      <BioSection />
      <IntroVideo />
      <AcademicTimeline />
      <ExpertiseAreas />
      <CareerHistory />
      <CoreSpecializations />
      <PhilosophySection />
      <DoctorMessage />
      <AchievementsStats />
      <AboutCTA />
    </>
  );
}
