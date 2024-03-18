"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import ProfileImage from "@/common/ProfileImage";
import Divider from "@/common/Divider";
import SidebarSocial from "../SocialIcons";
import SignButtons from "./SignButtons";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-1">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "border-l-4 border-blue-600 text-blue-600"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "active-theme" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger
        className="absolute right-5 top-5 cursor-pointer rounded-full bg-slate-400 p-1.5 dark:bg-slate-600 sm:hidden"
        asChild
      >
        <Image
          src="/assets/icons/hamburger.svg"
          width={40}
          height={40}
          alt="menu"
        />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sidebar-background custom-scrollbar z-50 flex w-[350px] flex-col justify-between overflow-y-auto border-none px-0 py-2 shadow-2xl sm:hidden"
      >
        <div>
          <ProfileImage />
          <Divider />
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>

        <div>
          <SignedOut>
            <SheetClose asChild>
              <SignButtons />
            </SheetClose>
          </SignedOut>
          <Divider />
          <SidebarSocial />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;
