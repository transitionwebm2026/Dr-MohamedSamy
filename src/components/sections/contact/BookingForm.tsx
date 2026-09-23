"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CalendarDays, MessageSquare, Phone, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/site-config";

const fieldClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-brand-ink placeholder:text-brand-ink-muted/70 outline-none transition-colors focus:border-brand-rose/60";

export function BookingForm() {
  const t = useTranslations("contactPage.form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const serviceOptions = [
    { value: "general", label: t("serviceOptions.general") },
    { value: "endoscopy", label: t("serviceOptions.endoscopy") },
    { value: "liver", label: t("serviceOptions.liver") },
    { value: "other", label: t("serviceOptions.other") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceLabel = serviceOptions.find((o) => o.value === service)?.label ?? t("notSpecified");

    const message = [
      `*${t("messageTitle")}*`,
      "",
      `${t("nameLabel")}: ${name}`,
      `${t("phoneLabel")}: ${phone}`,
      `${t("serviceLabel")}: ${serviceLabel}`,
      `${t("dateLabel")}: ${date || t("notSpecified")}`,
      `${t("notesLabel")}: ${notes || t("noNotes")}`,
    ].join("\n");

    const url = `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
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
              <option value="" disabled>
                {t("servicePlaceholder")}
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-brand-ink">
              <CalendarDays className="size-4 text-brand-rose" />
              {t("dateLabel")}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={fieldClass}
            />
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
