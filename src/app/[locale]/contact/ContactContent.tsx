import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { getSection } from "@/lib/cms/queries";

export async function ContactContent() {
  const hero = await getSection("contact", "hero");

  return (
    <>
      <ContactHero content={hero?.content} />
      <ContactSection />
      <ContactCTA />
    </>
  );
}
