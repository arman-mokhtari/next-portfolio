import { SignedOut } from "@clerk/nextjs";
import ProfileImage from "@/common/ProfileImage";
import SidebarSocial from "../SocialIcons";
import Divider from "@/common/Divider";
import SignButtons from "./SignButtons";
import AdminDashboardLink from "./AdminDashboardLink";
import RightSidebarLinks from "./RightSidebarLinks";

const RightSidebar = () => {
  return (
    <section className="sidebar-background light-border custom-scrollbar fixed right-0 top-0 z-50 flex min-h-screen w-[300px] flex-col justify-between overflow-y-auto border-l-4 border-slate-300 py-2 dark:border-slate-800 max-lg:hidden">
      <ProfileImage />
      <Divider />
      <div className="flex flex-col gap-2">
        <RightSidebarLinks />
        <AdminDashboardLink />
      </div>
      <SignedOut>
        <SignButtons />
      </SignedOut>

      <Divider />
      <div>
        <SidebarSocial />
      </div>
    </section>
  );
};
export default RightSidebar;
