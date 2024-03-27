import ProfileImage from "@/common/ProfileImage";
import Divider from "@/common/Divider";
import RightSidebarLinks from "./AdminRightSidebarLinks";

const AdminRightSidebar = () => {
  return (
    <section className="sidebar-background light-border custom-scrollbar fixed right-0 top-0 z-50 flex min-h-screen w-[300px] flex-col justify-between overflow-y-auto border-l-4 border-slate-300 py-2 dark:border-slate-800 max-lg:hidden">
      <ProfileImage />
      <Divider />
      <RightSidebarLinks />
    </section>
  );
};
export default AdminRightSidebar;
