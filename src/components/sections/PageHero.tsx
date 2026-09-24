"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Phone, type LucideIcon } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";
import { socialIcon } from "@/components/ui/socialIcons";
import { cn } from "@/lib/utils";

const particlePositions = [
  { top: "18%", left: "22%" },
  { top: "30%", left: "68%" },
  { top: "62%", left: "15%" },
  { top: "72%", left: "78%" },
  { top: "48%", left: "45%" },
];

function HeroBackground() {
  const isRtl = useLocale() === "ar";
  // text sits at the logical "start" edge (right in RTL, left in LTR), so
  // the photo's subject and the readability wash both need to favor the
  // opposite edge depending on direction.

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <Image
        src="/images/hero-doctor.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn("object-cover", isRtl ? "object-[45%_18%] lg:object-[25%_18%]" : "object-[55%_18%] lg:object-[75%_18%]")}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(225,148,159,0.18),transparent_60%)]",
          !isRtl && "bg-[radial-gradient(circle_at_75%_30%,rgba(225,148,159,0.18),transparent_60%)]",
        )}
      />
      {/* readability wash (desktop): opaque on the text side, fading out fast so most of the portrait stays clearly visible */}
      <div
        className={cn(
          "absolute inset-0 hidden lg:block",
          isRtl
            ? "bg-gradient-to-l from-brand-surface from-0% via-brand-surface/60 via-30% to-transparent to-60%"
            : "bg-gradient-to-r from-brand-surface from-0% via-brand-surface/60 via-30% to-transparent to-60%",
        )}
      />
      {/* readability scrim (phones/tablets): text is centered over the photo, so dim it evenly */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-surface/90 via-brand-surface/75 to-brand-surface/95 lg:hidden" />

      {particlePositions.map((p, i) => (
        <motion.span
          key={i}
          className="absolute size-1.5 rounded-full bg-brand-rose/60"
          style={{ top: p.top, left: p.left }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-surface to-transparent" />
    </div>
  );
}

function ContactPanel() {
  const t = useTranslations("hero");
  const settings = useSiteSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
      className="glass-strong flex w-full flex-col items-center gap-3 rounded-3xl px-4 py-3 sm:flex-row sm:gap-4"
    >
      <a
        href={`tel:${settings.phone}`}
        className="animate-pulse-glow gradient-brand flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-white transition-transform hover:scale-105 sm:w-auto sm:flex-1"
        aria-label={t("callUs")}
      >
        <Phone className="size-4" />
        <span dir="ltr" className="font-montserrat text-sm font-bold">
          {settings.phoneDisplay}
        </span>
      </a>

      <span className="hidden h-8 w-px shrink-0 bg-white/15 sm:block" />

      <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
        {settings.socials.map((social) => {
          const Icon = socialIcon(social.name);
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex size-9 items-center justify-center rounded-full bg-white/5 text-brand-ink-muted transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-brand-rose"
            >
              <Icon className="size-4" />
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}

type HeroButton = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type PageHeroProps = {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
};

/**
 * Shared full-screen hero used at the top of every page (Home, About, and
 * future pages) so they all share one visual design — background, contact
 * panel, button styling — and only the text/links/icons change per page.
 */
export function PageHero({ titleLine1, titleLine2, subtitle, primaryButton, secondaryButton }: PageHeroProps) {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden pt-28 pb-28 sm:pb-16">
      <HeroBackground />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-start"
        >
          <h1 className="text-balance-ar text-[1.7rem] font-extrabold leading-[1.25] text-brand-ink min-[400px]:text-3xl sm:text-4xl lg:text-5xl">
            {titleLine1}
            <span className="mt-1.5 block gradient-brand-text">{titleLine2}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-ink-muted sm:text-base lg:mx-0">
            {subtitle}
          </p>

          <div className="mx-auto mt-8 flex w-fit flex-col items-stretch gap-4 lg:mx-0">
            <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <LiquidButton
                href={primaryButton.href}
                variant="primary"
                icon={primaryButton.icon}
                iconPosition="start"
                className="px-6 py-3 text-sm"
              >
                {primaryButton.label}
              </LiquidButton>
              <LiquidButton
                href={secondaryButton.href}
                variant="ghost"
                icon={secondaryButton.icon}
                iconPosition="start"
                className="px-6 py-3 text-sm"
              >
                {secondaryButton.label}
              </LiquidButton>
            </div>

            <ContactPanel />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand-ink-muted"
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
