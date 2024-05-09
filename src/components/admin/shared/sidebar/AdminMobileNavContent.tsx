"use client";

import { SheetClose } from "@/components/ui/sheet";
import { adminSidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMobileNavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-2 pt-1">
      {adminSidebarLinks.map((item) => {
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
                className={`${isActive ? "active-theme" : "sidebar-svg"}`}
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

export default AdminMobileNavContent;
