import ThemeButton from "@/components/shared/ThemeButton";
import { ReactNode } from "react";
import RightSidebar from "@/components/shared/sidebar/RightSidebar";
import MobileSidebar from "@/components/shared/sidebar/MobileSidebar";
import HomeLines from "@/components/shared/HomeLines";
import ProfileBtn from "@/components/shared/ProfileBtn";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative ">
      <ThemeButton />
      <ProfileBtn />
      <MobileSidebar />
      <div className="flex">
        <RightSidebar />
        <section className="flex min-h-screen flex-1 bg-slate-100 dark:bg-slate-950">
          <div className="mx-auto w-full">
            <HomeLines />
            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
