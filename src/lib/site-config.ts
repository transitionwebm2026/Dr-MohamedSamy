export const siteConfig = {
  url: "https://dr-mohamedsami.com",
  phone: "+201000000000",
  phoneDisplay: "01000000000",
  whatsapp: "https://wa.me/201000000000",
  email: "info@dr-mohamedsami.com",
  socials: [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "TikTok", href: "https://tiktok.com" },
  ],
  navLinks: [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "videos", href: "/videos" },
    { key: "reviews", href: "/reviews" },
    { key: "articles", href: "/articles" },
    { key: "contact", href: "/contact" },
  ],
} as const;
