"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Clock, MapPin, MessageSquare, Phone, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";
import { extraLocalizedList, extraString } from "@/lib/cms/helpers";
import type { DynamicItem } from "@/lib/supabase/types";

const fieldClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-brand-ink placeholder:text-brand-ink-muted/70 outline-none transition-colors focus:border-brand-rose/60";

// Native <option> popups ignore most page styling (they're OS-rendered), so
// without an explicit opaque background a light theme/browser combo can
// render this dark site's light option text unreadable — seen specifically
// on desktop/laptop Chrome and Edge.
const optionClass = "bg-brand-surface text-brand-ink";

/** "+201557800164" -> "https://wa.me/201557800164" */
function branchWhatsapp(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export function BookingForm({ locations = [] }: { locations?: DynamicItem[] }) {
  const t = useTranslations("contactPage.form");
  const locale = useLocale();
  const { whatsapp } = useSiteSettings();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const branchOptions = locations.map((item) => ({
    value: item.item_key ?? item.id,
    label: (locale === "ar" ? item.title_ar : item.title_en) || item.title_ar,
    whatsapp: branchWhatsapp(extraString(item, "phone", "")),
    hours: extraLocalizedList(item, "hours", locale),
  }));
  const defaultBranch = branchOptions.find((b) => b.value === "janaklis")?.value ?? branchOptions[0]?.value ?? "";
  const [branch, setBranch] = useState(defaultBranch);
  const selectedBranch = branchOptions.find((b) => b.value === branch);

  const handleBranchChange = (value: string) => {
    setBranch(value);
    setDate(""); // the previous slot belongs to the old branch's schedule
  };

  const serviceOptions = [
    { value: "checkup", label: t("serviceOptions.checkup") },
    { value: "consultation", label: t("serviceOptions.consultation") },
    { value: "endoscopy", label: t("serviceOptions.endoscopy") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceLabel = serviceOptions.find((o) => o.value === service)?.label ?? t("notSpecified");

    const lines = [
      `*${t("messageTitle")}*`,
      "",
      `${t("nameLabel")}: ${name}`,
      `${t("phoneLabel")}: ${phone}`,
      `${t("serviceLabel")}: ${serviceLabel}`,
    ];
    if (selectedBranch) lines.push(`${t("branchLabel")}: ${selectedBranch.label}`);
    lines.push(
      `${t("dateLabel")}: ${date || t("notSpecified")}`,
      `${t("notesLabel")}: ${notes || t("noNotes")}`,
    );

    const destination = selectedBranch?.whatsapp || whatsapp;
    const url = `${destination}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      id="contact-form"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-28"
    >
      <GlassCard glow hover={false} className="p-6 sm:p-8">
        <span className="glass mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-brand-rose sm:text-sm">
          {t("eyebrow")}
        </span>
        <h2 className="text-balance-ar text-2xl font-extrabold leading-tight text-brand-ink sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-ink-muted sm:text-base">{t("description")}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-brand-ink">
              <User className="size-4 text-brand-rose" />
              {t("nameLabel")}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-brand-ink">
              <Phone className="size-4 text-brand-rose" />
              {t("phoneLabel")}
            </label>
            <input
              type="tel"
              dir="ltr"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-brand-ink">
              <MessageSquare className="size-4 text-brand-rose" />
              {t("serviceLabel")}
            </label>
            <select
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={fieldClass}
            >
              <option value="" disabled className={optionClass}>
                {t("servicePlaceholder")}
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value} className={optionClass}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {branchOptions.length > 0 && (
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-brand-ink">
                <MapPin className="size-4 text-brand-rose" />
                {t("branchLabel")}
              </label>
              <select
                required
                value={branch}
                onChange={(e) => handleBranchChange(e.target.value)}
                className={fieldClass}
              >
                <option value="" disabled className={optionClass}>
                  {t("branchPlaceholder")}
                </option>
                {branchOptions.map((option) => (
                  <option key={option.value} value={option.value} className={optionClass}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-brand-ink">
              <Clock className="size-4 text-brand-rose" />
              {t("dateLabel")}
            </label>
            <select value={date} onChange={(e) => setDate(e.target.value)} className={fieldClass}>
              <option value="" className={optionClass}>
                {t("datePlaceholder")}
              </option>
              {(selectedBranch?.hours ?? []).map((slot) => (
                <option key={slot} value={slot} className={optionClass}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-brand-ink">
              <MessageSquare className="size-4 text-brand-rose" />
              {t("notesLabel")}
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("notesPlaceholder")}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="gradient-brand-vivid flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <FaWhatsapp className="size-5" />
            {t("submitBtn")}
          </button>
        </form>
      </GlassCard>
    </motion.div>
  );
}
