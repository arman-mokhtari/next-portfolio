import { SidebarLink } from "@/types";

export const themes = [
  {
    value: "light",
    label: "Light",
    icon: "/assets/icons/sun.svg",
  },
  {
    value: "dark",
    label: "Dark",
    icon: "/assets/icons/moon.svg",
  },
  {
    value: "system",
    label: "System",
    icon: "/assets/icons/computer.svg",
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/sidebar/home.svg",
    route: "/",
    label: "صفحه اصلی",
  },
  {
    imgURL: "/assets/icons/sidebar/user.svg",
    route: "/about",
    label: "درباره من",
  },
  {
    imgURL: "/assets/icons/sidebar/skills.svg",
    route: "/skills",
    label: "مهارت‌ها",
  },
  {
    imgURL: "/assets/icons/sidebar/resume.svg",
    route: "/resume",
    label: "رزومه",
  },
  {
    imgURL: "/assets/icons/sidebar/activities.svg",
    route: "/activities",
    label: "فعالیت‌ها",
  },
  {
    imgURL: "/assets/icons/sidebar/contact.svg",
    route: "/contact",
    label: "ارتباط",
  },
];

export const skillData = [
  {
    id: 1,
    key: "js",
    title: "جاوا اسکریپت",
    number: 65,
  },
  {
    id: 2,
    key: "html",
    title: "اچ تی ام ال",
    number: 92,
  },
  {
    id: 3,
    key: "css",
    title: "سی اس اس",
    number: 82,
  },
  {
    id: 5,
    key: "react",
    title: "ری‌اکت",
    number: 89,
  },
  {
    id: 6,
    key: "node",
    title: "نود جی اس",
    number: 75,
  },
  {
    id: 7,
    key: "next",
    title: "نکست جی اس",
    number: 85,
  },
];
