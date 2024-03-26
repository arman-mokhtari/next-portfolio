"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import ProfileImage from "@/common/ProfileImage";
import SidebarSocial from "../SocialIcons";
import Divider from "@/common/Divider";
import SignButtons from "./SignButtons";

const RightSidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sidebar-background light-border custom-scrollbar fixed right-0 top-0 z-50 flex min-h-screen w-[300px] flex-col justify-between overflow-y-auto border-l-4 border-slate-300 py-2 dark:border-slate-800 max-lg:hidden">
      <ProfileImage />

      <Divider />

      <div className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`${
                isActive
                  ? "border-l-4 border-blue-600 text-blue-600"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent px-4 py-3`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "active-theme" : "sidebar-svg"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <SignButtons />
      </SignedOut>

      <Divider />
      <div>
        <SidebarSocial />
      </div>
    </section>
  );
};
export default RightSidebar;
