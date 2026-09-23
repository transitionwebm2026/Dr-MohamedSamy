"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "whatsapp";

type IconComponent = React.ComponentType<{ className?: string }>;

type BaseProps = {
  variant?: Variant;
  icon?: IconComponent;
  iconPosition?: "start" | "end";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
} & Omit<HTMLMotionProps<"a">, "href" | "className" | "children">;

type ButtonAsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
} & Omit<HTMLMotionProps<"button">, "onClick" | "className" | "children">;

type LiquidButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<Variant, string> = {
  primary:
    "gradient-brand text-white border border-white/25 shadow-[0_8px_30px_-8px_rgba(110,75,152,0.7)]",
  ghost: "glass text-brand-ink hover:border-brand-rose/60",
  whatsapp:
    "bg-gradient-to-br from-[#3ee083] to-brand-whatsapp text-white border border-white/20 shadow-[0_8px_24px_-6px_rgba(37,211,102,0.65)]",
};

export function LiquidButton(props: LiquidButtonProps) {
  const {
    variant = "primary",
    icon: Icon,
    iconPosition = "end",
    className,
    children,
    href,
    ...rest
  } = props;

  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon && iconPosition === "start" && <Icon className="size-5" />}
        <span>{children}</span>
        {/* end-position icons are always "continue" arrows — mirror them in LTR */}
        {Icon && iconPosition === "end" && <Icon className="size-5 ltr:-scale-x-100" />}
      </span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </>
  );

  const sharedClassName = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-3xl px-7 py-3.5 text-sm font-bold tracking-wide backdrop-blur-md transition-all duration-300 sm:text-base",
    "hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(225,148,159,0.55)] active:translate-y-0",
    variantClasses[variant],
    className,
  );

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={sharedClassName}>
          {content}
        </Link>
      );
    }
    if (href.startsWith("#")) {
      return (
        <motion.a href={href} whileTap={{ scale: 0.96 }} className={sharedClassName} {...(rest as HTMLMotionProps<"a">)}>
          {content}
        </motion.a>
      );
    }
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.96 }}
        className={sharedClassName}
        {...(rest as HTMLMotionProps<"a">)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={sharedClassName}
      {...(rest as HTMLMotionProps<"button">)}
    >
      {content}
    </motion.button>
  );
}
