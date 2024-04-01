import SidebarSettingsContent from "@/components/admin/sidebarSettings/SidebarSettingsContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return <SidebarSettingsContent />;
};

export default Page;
