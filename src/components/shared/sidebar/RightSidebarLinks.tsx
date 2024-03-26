"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const RightSidebarLinks = () => {
  const pathname = usePathname();
  return (
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
  );
};

export default RightSidebarLinks;
