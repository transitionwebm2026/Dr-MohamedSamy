"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";
import { socialIcon } from "@/components/ui/socialIcons";

export function ContactInfo() {
  const t = useTranslations("contactPage.info");
  const tSite = useTranslations("site");
  const settings = useSiteSettings();
  const address = tSite("address");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex flex-col gap-6"
    >
      <GlassCard hover={false} className="space-y-4 p-5 sm:p-6">
        <a
          href={`tel:${settings.phone}`}
          className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/5"
        >
          <span className="gradient-brand flex size-11 shrink-0 items-center justify-center rounded-xl">
            <Phone className="size-5 text-white" />
          </span>
          <div>
            <p className="text-xs text-brand-ink-muted">{t("phoneLabel")}</p>
            <p dir="ltr" className="text-end font-montserrat text-sm font-bold text-brand-ink">
              {settings.phoneDisplay}
            </p>
          </div>
        </a>

        <a
          href={settings.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/5"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-whatsapp">
            <FaWhatsapp className="size-5 text-white" />
          </span>
          <div>
            <p className="text-xs text-brand-ink-muted">{t("whatsappLabel")}</p>
            <p dir="ltr" className="text-end font-montserrat text-sm font-bold text-brand-ink">
              {settings.phoneDisplay}
            </p>
          </div>
        </a>

        <a
          href={`mailto:${settings.email}`}
          className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/5"
        >
          <span className="gradient-brand flex size-11 shrink-0 items-center justify-center rounded-xl">
            <Mail className="size-5 text-white" />
          </span>
          <div>
            <p className="text-xs text-brand-ink-muted">{t("emailLabel")}</p>
            <p dir="ltr" className="text-end text-sm font-bold text-brand-ink">
              {settings.email}
            </p>
          </div>
        </a>

        <div className="flex items-start gap-3 p-2">
          <span className="gradient-brand flex size-11 shrink-0 items-center justify-center rounded-xl">
            <MapPin className="size-5 text-white" />
          </span>
          <div>
            <p className="text-xs text-brand-ink-muted">{t("addressLabel")}</p>
            <p className="text-sm font-bold text-brand-ink">{address}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <p className="text-sm font-bold text-brand-ink">{t("followUsLabel")}</p>
          <div className="flex gap-2">
            {settings.socials.map((social) => {
              const Icon = socialIcon(social.name);
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="glass flex size-9 items-center justify-center rounded-full text-brand-ink-muted transition-colors hover:text-brand-rose"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </GlassCard>

      <GlassCard hover={false} className="flex-1 overflow-hidden p-0 sm:p-0">
        <iframe
          title={address}
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          className="h-64 w-full sm:h-full sm:min-h-[220px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </GlassCard>
    </motion.div>
  );
}
