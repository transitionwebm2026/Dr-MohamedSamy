"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { extraString } from "@/lib/cms/helpers";
import type { DynamicItem } from "@/lib/supabase/types";

function mapsSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/**
 * Every branch, stacked and each given an equal share of the available
 * height — as a grid item next to BookingForm, that height is the form's
 * own height, so the two columns line up symmetrically.
 */
export function BranchLocations({ items = [] }: { items?: DynamicItem[] }) {
  const t = useTranslations("contactPage.info");
  const locale = useLocale();

  if (items.length === 0) return null;

  return (
    <div className="flex h-full flex-col gap-6">
      {items.map((branch, i) => {
        const name = (locale === "ar" ? branch.title_ar : branch.title_en) || branch.title_ar;
        const address = (locale === "ar" ? branch.description_ar : branch.description_en) || branch.description_ar;
        const phone = extraString(branch, "phone", "");
        const mapHref = branch.link_url || mapsSearchUrl(address);

        return (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex-1"
          >
            <GlassCard hover={false} className="flex h-full flex-col overflow-hidden p-0 sm:p-0">
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="gradient-brand flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <MapPin className="size-5 text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-brand-ink">{name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-brand-ink-muted">{address}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 ps-14 sm:ps-0">
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      dir="ltr"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-ink transition-colors hover:text-brand-rose"
                    >
                      <Phone className="size-4 text-brand-rose" />
                      {phone}
                    </a>
                  )}
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-rose transition-colors hover:text-brand-ink"
                  >
                    <ExternalLink className="size-4" />
                    {t("viewOnMapLabel")}
                  </a>
                </div>
              </div>

              <iframe
                title={name}
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                className="min-h-[160px] w-full flex-1"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
