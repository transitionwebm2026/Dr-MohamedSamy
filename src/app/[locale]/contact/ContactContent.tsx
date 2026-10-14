import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { getPageSections } from "@/lib/cms/queries";

export async function ContactContent() {
  const sections = await getPageSections("contact");
  const byKey = new Map(sections.map((s) => [s.section_key, s]));

  return (
    <>
      <ContactHero content={byKey.get("hero")?.content} />
      <ContactSection locations={byKey.get("locations")?.items ?? []} />
      <ContactCTA />
    </>
  );
}
