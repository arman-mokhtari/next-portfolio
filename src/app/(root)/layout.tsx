import ThemeButton from "@/components/shared/ThemeButton";
import { ReactNode } from "react";
import RightSidebar from "@/components/shared/sidebar/RightSidebar";
import MobileSidebar from "@/components/shared/sidebar/MobileSidebar";
import HomeLines from "@/components/shared/HomeLines";
import ProfileBtn from "@/components/shared/ProfileBtn";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative overflow-x-hidden">
      <ThemeButton />
      <ProfileBtn />
      <MobileSidebar />
      <div className="flex">
        <RightSidebar />
        <section className="relative flex min-h-screen flex-1 bg-slate-100 dark:bg-slate-950">
          <HomeLines />
          <div className="z-[2] mx-auto w-full">
            <div className="px-4">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
