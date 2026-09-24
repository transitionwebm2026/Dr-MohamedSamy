import Image from "next/image";

const DEFAULT_LOGO = "/images/logo-icon.png";

/**
 * The clinic logo. Site-relative paths go through next/image; a logo uploaded
 * from the dashboard lives on Supabase Storage, so it renders as a plain <img>.
 */
export function SiteLogo({
  src,
  size = 40,
  priority,
  className,
}: {
  src?: string;
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  const url = src || DEFAULT_LOGO;

  if (url.startsWith("/")) {
    return <Image src={url} alt="" width={size} height={size} priority={priority} className={className} />;
  }
  // eslint-disable-next-line @next/next/no-img-element -- remote upload from the dashboard
  return <img src={url} alt="" width={size} height={size} className={className} />;
}
