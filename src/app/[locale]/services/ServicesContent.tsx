import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { CategorySelector } from "@/components/sections/services/CategorySelector";
import { CategoryDetails } from "@/components/sections/services/CategoryDetails";
import { EndoscopyTypes } from "@/components/sections/services/EndoscopyTypes";
import { SymptomTriggers } from "@/components/sections/services/SymptomTriggers";
import { ServicesFAQ } from "@/components/sections/services/ServicesFAQ";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";
import { serviceCategories } from "@/lib/data";
import { getPageSections } from "@/lib/cms/queries";

export async function ServicesContent() {
  const sections = await getPageSections("services");
  const byKey = new Map(sections.map((s) => [s.section_key, s]));

  return (
    <>
      <ServicesHero />
      <CategorySelector items={byKey.get("category_selector")?.items ?? []} />
      {serviceCategories.map((category) => (
        <CategoryDetails
          key={category.key}
          categoryKey={category.key}
          anchor={category.anchor}
          items={byKey.get(`category_details_${category.key}`)?.items ?? []}
        />
      ))}
      <EndoscopyTypes items={byKey.get("endoscopy_types")?.items ?? []} />
      <SymptomTriggers />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  );
}
