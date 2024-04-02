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
];

export const skillData = {
  public: [
    {
      _id: 1,
      title: "جاوا اسکریپت",
      number: 65,
    },
    {
      _id: 2,
      title: "اچ تی ام ال",
      number: 92,
    },
    {
      _id: 3,
      title: "سی اس اس",
      number: 82,
    }
  ],
  pro: [
    {
      _id: 5,
      title: "ری‌اکت",
      number: 89,
    },
    {
      _id: 6,
      title: "نود جی اس",
      number: 75,
    },
    {
      _id: 7,
      title: "نکست جی اس",
      number: 85,
    }
  ]
};