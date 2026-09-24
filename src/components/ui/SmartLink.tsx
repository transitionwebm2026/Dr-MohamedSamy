"use client";

import { Link } from "@/i18n/navigation";

type SmartLinkProps = Omit<React.ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/** Site-relative paths keep the locale prefix; full URLs, mailto: and tel: open as plain links. */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
