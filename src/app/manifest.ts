import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "دكتور محمد سامي — استشاري الجهاز الهضمي والكبد",
    short_name: "دكتور محمد سامي",
    description: "استشاري أمراض الجهاز الهضمي والكبد والمناظير، بخبرة تزيد عن 18 عامًا.",
    start_url: "/ar",
    display: "standalone",
    background_color: "#150726",
    theme_color: "#290b4c",
    lang: "ar",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
