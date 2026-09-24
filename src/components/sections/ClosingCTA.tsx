"use client";

import Image from "next/image";
import { type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { CheckCheck, HeartPulse, Mic, PhoneCall } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";

type ClosingCTAProps = {
  id?: string;
  title: string;
  titleHighlight: string;
  description: string;
  contactLabel: string;
  contactHref: string;
  whatsappLabel: string;
};

const chatCopy = {
  ar: { greeting: "أهلاً بيك، اتفضل", message: "عايز أحجز كشف يا دكتور" },
  en: { greeting: "Hello, how can I help?", message: "I'd like to book a check-up, doctor" },
};

const cardFade = "linear-gradient(to bottom, black 78%, transparent 100%)";
const springConfig = { stiffness: 110, damping: 20, mass: 0.4 };

/**
 * The shared "closing CTA" every page ends on: a phone lying flat in
 * perspective with the CTA card rising out of its screen on a beam of light.
 * One design, reused everywhere (Home, About, Services, Videos, Reviews,
 * Articles, Contact) — only the copy and the primary button's destination
 * change per page.
 */
export function ClosingCTA({
  id,
  title,
  titleHighlight,
  description,
  contactLabel,
  contactHref,
  whatsappLabel,
}: ClosingCTAProps) {
  const { whatsapp } = useSiteSettings();
  const tSite = useTranslations("site");
  const doctorName = tSite("name");
  const chat = chatCopy[useLocale() === "ar" ? "ar" : "en"];
  const reduceMotion = useReducedMotion();

  // pointer position over the scene, -0.5..0.5 on each axis, drives the 3D tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, springConfig);
  const sy = useSpring(py, springConfig);
  const cardRotateX = useTransform(sy, [-0.5, 0.5], [12, 0]);
  const cardRotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const whatsappX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const whatsappY = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const callX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const callY = useTransform(sy, [-0.5, 0.5], [16, -16]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section id={id} className="relative overflow-hidden py-14 sm:py-16">
      <AmbientBackground variant="hero" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className="relative mx-auto">
          {/* the card, rising out of the phone */}
          <motion.div
            initial={{ opacity: 0, y: 110, scale: 0.88 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.15 }}
            className="relative z-20 mx-auto max-w-4xl"
          >
            <motion.div
              style={reduceMotion ? undefined : { rotateX: cardRotateX, rotateY: cardRotateY, transformPerspective: 1400 }}
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* the card fades into the phone's light at its base */}
              <div className="relative pt-4" style={{ maskImage: cardFade, WebkitMaskImage: cardFade }}>
                {/* stacked layers behind the card for depth */}
                <span className="absolute inset-x-10 top-0 h-full rounded-[2.5rem] border border-white/10 bg-white/[0.04]" />
                <span className="absolute inset-x-5 top-2 h-full rounded-[2.5rem] border border-white/15 bg-white/[0.06]" />

                <div className="glow-border relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-dark via-brand-surface to-brand-primary/45 px-6 pb-20 pt-11 text-center shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] sm:px-12 sm:pb-24 sm:pt-14">
                  <HeartPulse
                    className="pointer-events-none absolute -end-8 -top-10 size-48 rotate-12 text-white/[0.04] sm:size-64"
                    strokeWidth={1}
                  />

                  {/* heartbeat pulse line drawn across the top on scroll-into-view */}
                  <svg
                    className="pointer-events-none absolute inset-x-0 top-0 h-9 w-full opacity-50 sm:h-12"
                    viewBox="0 0 400 40"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="cta-pulse-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--color-brand-rose)" stopOpacity="0" />
                        <stop offset="35%" stopColor="var(--color-brand-rose)" />
                        <stop offset="65%" stopColor="var(--color-brand-light)" />
                        <stop offset="100%" stopColor="var(--color-brand-light)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0 20 H140 L155 4 L172 34 L188 12 L200 20 H400"
                      stroke="url(#cta-pulse-gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                  </svg>

                  <h2 className="text-balance-ar relative text-[1.75rem] font-extrabold leading-tight text-brand-ink sm:text-4xl lg:text-[2.6rem]">
                    {title}
                    <span className="mt-1 block gradient-brand-text">{titleHighlight}</span>
                  </h2>
                  <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-ink-muted sm:text-lg">
                    {description}
                  </p>

                  <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <LiquidButton href={contactHref} variant="primary" icon={PhoneCall} iconPosition="start">
                      {contactLabel}
                    </LiquidButton>
                    <LiquidButton href={whatsapp} variant="whatsapp" icon={FaWhatsapp} iconPosition="start">
                      {whatsappLabel}
                    </LiquidButton>
                  </div>
                </div>
              </div>

              {/* whatsapp bubble hovering off the card's top corner */}
              <motion.div
                style={reduceMotion ? undefined : { x: whatsappX, y: whatsappY }}
                className="absolute -top-4 -start-3 z-30 sm:-start-9 sm:-top-6"
                aria-hidden="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.55, type: "spring", stiffness: 260, damping: 14 }}
                >
                  <motion.span
                    animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3ee083] to-brand-whatsapp shadow-[0_22px_40px_-10px_rgba(37,211,102,0.7)] sm:size-[4.25rem]"
                  >
                    <motion.span
                      animate={reduceMotion ? undefined : { scale: [1, 1.6], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full bg-brand-whatsapp"
                    />
                    <FaWhatsapp className="relative size-7 text-white sm:size-8" />
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* call bubble hovering off the opposite edge */}
              <motion.div
                style={reduceMotion ? undefined : { x: callX, y: callY }}
                className="absolute -end-2 bottom-16 z-30 sm:-end-8 sm:bottom-auto sm:top-[42%]"
                aria-hidden="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.55, type: "spring", stiffness: 260, damping: 14 }}
                >
                  <motion.span
                    animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="gradient-brand flex size-11 items-center justify-center rounded-full border border-white/25 shadow-[0_22px_40px_-10px_rgba(110,75,152,0.8)] sm:size-[3.75rem]"
                  >
                    <PhoneCall className="size-5 text-white sm:size-7" />
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* the phone, lying flat on a surface in perspective */}
          <div aria-hidden="true" className="relative z-10 -mt-16 h-[9.5rem] sm:-mt-20 sm:h-[12.5rem] lg:h-[15rem]">
            {/* light spilling onto the surface around the phone */}
            <div className="absolute left-1/2 top-[2.5rem] h-24 w-[70%] -translate-x-1/2 rounded-full bg-brand-rose/25 blur-3xl sm:top-[3.5rem] lg:top-[4.5rem]" />

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-1/2 top-[-3.1rem] -translate-x-1/2 sm:top-[-1.9rem] lg:top-[-0.75rem]"
            >
              <div
                className="origin-center scale-[0.58] sm:scale-[0.8] lg:scale-[1.1]"
                style={{ transform: "perspective(1100px) rotateX(52deg)" }}
              >
                <div className="relative h-[15rem] w-[33rem]">
                  {/* the phone's edge, giving it thickness */}
                  <span className="absolute inset-0 translate-y-3 rounded-[2.6rem] bg-[#090311]" />
                  <span className="absolute inset-x-8 -bottom-7 h-12 rounded-full bg-black/70 blur-2xl" />

                  <div className="relative h-full w-full rounded-[2.6rem] border-[3px] border-white/20 bg-gradient-to-b from-[#2a1740] to-[#150826] p-2.5 shadow-[inset_0_2px_0_rgba(255,255,255,0.18)]">
                    {/* side buttons along the far edge */}
                    <span className="absolute -top-[3px] left-24 h-[3px] w-10 rounded-t-full bg-white/30" />
                    <span className="absolute -top-[3px] left-40 h-[3px] w-10 rounded-t-full bg-white/30" />
                    <span className="absolute -bottom-[3px] right-28 h-[3px] w-14 rounded-b-full bg-white/30" />

                    {/* screen — a mini WhatsApp chat, as if someone is messaging the doctor */}
                    <div className="relative flex h-full w-full overflow-hidden rounded-[2.1rem] bg-[#0b141a] shadow-[0_0_70px_rgba(225,148,159,0.4)]">
                      <span className="absolute left-0 top-1/2 z-20 h-16 w-3.5 -translate-y-1/2 rounded-r-xl bg-black" />

                      <div className="flex h-full w-full flex-col pl-3.5">
                        <div className="flex items-center gap-2.5 bg-[#1f2c34] px-4 py-2.5">
                          <Image
                            src="/images/logo-icon.png"
                            alt=""
                            width={28}
                            height={28}
                            className="size-7 shrink-0 rounded-full ring-1 ring-white/20"
                          />
                          <span className="truncate text-xs font-bold text-white">{doctorName}</span>
                          <span className="ms-auto size-2 shrink-0 rounded-full bg-brand-whatsapp" />
                        </div>

                        <div className="flex flex-1 flex-col justify-end gap-2 px-4 py-3">
                          <span className="max-w-[55%] self-start rounded-2xl rounded-ss-md bg-[#202c33] px-3 py-1.5 text-xs leading-snug text-white/90">
                            {chat.greeting}
                          </span>
                          <div className="flex max-w-[65%] flex-col gap-0.5 self-end rounded-2xl rounded-se-md bg-[#005c4b] px-3 py-1.5">
                            <span className="text-xs leading-snug text-white">{chat.message}</span>
                            <span className="flex items-center justify-end gap-1">
                              <span className="text-[10px] text-white/50">10:42</span>
                              <CheckCheck className="size-3.5 text-[#53bdeb]" strokeWidth={2.5} />
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 bg-[#1f2c34] px-4 py-2">
                          <span className="h-5 flex-1 rounded-full bg-white/10" />
                          <Mic className="size-4 shrink-0 text-white/50" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* the beam of light the card rises along, from the phone's screen up into the card */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              style={{ originY: 1, clipPath: "polygon(36% 100%, 64% 100%, 100% 0, 0 0)" }}
              className="absolute left-1/2 top-0 h-[4.4rem] w-[80%] -translate-x-1/2 bg-gradient-to-t from-brand-rose/60 via-brand-light/25 to-transparent mix-blend-screen sm:h-[5.5rem] lg:h-[6.75rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
