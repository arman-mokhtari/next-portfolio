import ThemeButton from "@/components/shared/ThemeButton";
import { ReactNode } from "react";
import HomeLines from "@/components/shared/HomeLines";
import ProfileBtn from "@/components/shared/ProfileBtn";
import AdminMobileSidebar from "@/components/admin/shared/sidebar/AdminMobileSidebar";
import AdminRightSidebar from "@/components/admin/shared/sidebar/AdminRightSidebar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative overflow-x-hidden">
      <ThemeButton />
      <ProfileBtn />
      <AdminMobileSidebar />
      <div className="flex">
        <div className="sticky lg:w-[300px]">
          <AdminRightSidebar />
        </div>

        <section className="relative flex min-h-screen flex-1 bg-slate-100  dark:bg-slate-950 ">
          <HomeLines />
          <div className="z-[2] mx-auto w-full">
            <div className="px-10">{children}</div>
          </div>
        </section>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
