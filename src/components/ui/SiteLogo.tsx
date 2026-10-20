import Image from "next/image";

const DEFAULT_LOGO = "/images/logo-icon.png";

/** The clinic logo, uploaded from the dashboard or the built-in default — both go through next/image. */
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
  return <Image src={url} alt="" width={size} height={size} priority={priority} className={className} />;
}
