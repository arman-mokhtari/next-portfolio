import ThemeButton from "@/components/shared/ThemeButton";
import { ReactNode } from "react";
import RightSidebar from "@/components/shared/RightSidebar";
import MobileSidebar from "@/components/shared/MobileSidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <ThemeButton />
      <MobileSidebar />
      <div className="flex">
        <RightSidebar/>
        <section className="flex min-h-screen flex-1 p-8">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
