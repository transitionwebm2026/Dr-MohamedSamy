import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { CategorySelector } from "@/components/sections/services/CategorySelector";
import { CategoryDetails } from "@/components/sections/services/CategoryDetails";
import { EndoscopyTypes } from "@/components/sections/services/EndoscopyTypes";
import { SymptomTriggers } from "@/components/sections/services/SymptomTriggers";
import { ServicesFAQ } from "@/components/sections/services/ServicesFAQ";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";
import { serviceCategories } from "@/lib/data";

export function ServicesContent() {
  return (
    <>
      <ServicesHero />
      <CategorySelector />
      {serviceCategories.map((category) => (
        <CategoryDetails key={category.key} categoryKey={category.key} anchor={category.anchor} />
      ))}
      <EndoscopyTypes />
      <SymptomTriggers />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  );
}
