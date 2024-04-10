import ActivitiesEditMainContent from "@/components/admin/activitiesEdit/ActivitiesEditMainContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return <ActivitiesEditMainContent />;
};

export default Page;
