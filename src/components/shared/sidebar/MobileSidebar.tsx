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
    <section className="flex h-full flex-col gap-2 pt-1">
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
              } flex items-center justify-start gap-4 bg-transparent px-4 py-3`}
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
        className="fixed right-5 top-5 z-10 cursor-pointer rounded-full bg-slate-300 p-1.5 shadow-lg shadow-gray-300 hover:bg-slate-400 active:shadow-md dark:bg-slate-400 dark:shadow-none dark:hover:bg-slate-300 lg:hidden"
        asChild
      >
        <div className="flex size-10 flex-col items-center justify-center gap-1.5 rounded-full">
          {Array.from({ length: 3 }, (_, i) => (
            <span
              key={i}
              className="w-[80%] border-b-[2.4px] border-slate-600 "
            />
          ))}
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sidebar-background custom-scrollbar z-50 flex w-[350px] flex-col justify-between overflow-y-auto border-none px-0 py-2 shadow-2xl lg:hidden"
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
