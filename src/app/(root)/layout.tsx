import ThemeButton from "@/components/shared/ThemeButton";
import { ReactNode } from "react";
import RightSidebar from "@/components/shared/sidebar/RightSidebar";
import MobileSidebar from "@/components/shared/sidebar/MobileSidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative ">
      <ThemeButton />
      <MobileSidebar />
      <div className="flex">
        <RightSidebar />
        <section className="flex min-h-screen flex-1">
          <div className="mx-auto w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
