import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";

export function ContactContent() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactCTA />
    </>
  );
}
