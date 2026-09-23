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

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <SymptomChecker />
      <AboutDoctor />
      <Treatments />
      <EndoscopyUnit />
      <PatientJourney />
      <WhyChooseUs />
      <PatientGuide />
      <TopVideos />
      <Reviews />
      <FinalCTA />
    </>
  );
}
