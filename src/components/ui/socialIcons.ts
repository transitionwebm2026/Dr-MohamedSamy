import { Link2 } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { ComponentType } from "react";

type Icon = ComponentType<{ className?: string }>;

const socialIcons: Record<string, Icon> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  x: FaXTwitter,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  snapchat: FaSnapchat,
  telegram: FaTelegram,
};

/** Icon for a social link by its name (case-insensitive); unknown names get a generic link icon. */
export function socialIcon(name: string): Icon {
  return socialIcons[name.trim().toLowerCase()] ?? Link2;
}
