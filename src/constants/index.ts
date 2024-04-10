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
    label: "پروژه‌ها",
  },
  {
    imgURL: "/assets/icons/sidebar/contact.svg",
    route: "/contact",
    label: "ارتباط",
  },
];
export const adminSidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/sidebar/home.svg",
    route: "/",
    label: "صفحه اصلی",
  },
  {
    imgURL: "/assets/icons/sidebar/dashboard.svg",
    route: "/admin/dashboard",
    label: "داشبورد",
  },
  {
    imgURL: "/assets/icons/sidebar/user.svg",
    route: "/admin/profile",
    label: "پروفایل",
  },
  {
    imgURL: "/assets/icons/sidebar/user.svg",
    route: "/admin/sidebar-settings",
    label: "نوار سمت راست",
  },
  {
    imgURL: "/assets/icons/sidebar/user.svg",
    route: "/admin/home-edit",
    label: "تنظیمات صفحه اصلی",
  },
  {
    imgURL: "/assets/icons/sidebar/user.svg",
    route: "/admin/about-edit",
    label: "تنظیمات درباره من",
  },
  {
    imgURL: "/assets/icons/sidebar/user.svg",
    route: "/admin/skills-edit",
    label: "تنظیمات مهارت‌ها",
  },
  {
    imgURL: "/assets/icons/sidebar/user.svg",
    route: "/admin/resume-edit",
    label: "تنظیمات رزومه",
  },
  {
    imgURL: "/assets/icons/sidebar/user.svg",
    route: "/admin/activities-edit",
    label: "تنظیمات پروژه‌ها",
  },
];