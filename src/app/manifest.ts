import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "وبسایت شخصی آرمان مختاری برنامه نویس جاوا اسکریپت",
    short_name: "صفحه شخصی آرمان مختاری",
    description:
      "به وبسایت شخصی آرمان مختاری، برنامه نویس و طراح وب، خوش آمدید. در اینجا با تجربیات و دانش من در زمینه توسعه وب، طراحی رابط کاربری و بهینه‌سازی وب بیشتر آشنا خواهید شد.",
    start_url: "/",
    display: "standalone",
    background_color: "#F1F1F1",
    theme_color: "#F1F1F1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icons/maskable-icon.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-144x144.png",
        type: "image/png",
        sizes: "144x144",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/screenshot.jpg",
        type: "image/jpg",
        sizes: "1226x818",
        // form_factor: "narrow",
      },
      {
        src: "/screenshots/screenshot.png",
        type: "image/png",
        sizes: "1226x818",
        // form_factor: "wide",
      },
    ],
  };
}
