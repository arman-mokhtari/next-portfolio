import ThemeButton from "@/components/shared/ThemeButton";
import { ReactNode } from "react";
import RightSidebar from "@/components/shared/sidebar/RightSidebar";
import MobileSidebar from "@/components/shared/sidebar/MobileSidebar";
import HomeLines from "@/components/shared/HomeLines";
import ProfileBtn from "@/components/shared/ProfileBtn";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative overflow-x-hidden">
      <ThemeButton />
      <ProfileBtn />
      <MobileSidebar />
      <div className="flex">
        <div className="sticky lg:w-[300px]">
          <RightSidebar />
        </div>

        <section className="relative flex min-h-screen flex-1 bg-slate-100  dark:bg-slate-950 ">
          <HomeLines />
          <div className="z-[2] mx-auto w-full">
            <div className="px-5 md:px-0">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
