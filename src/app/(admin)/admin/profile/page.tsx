import ProfileMainContent from "@/components/admin/profile/ProfileMainContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return <ProfileMainContent />;
};

export default Page;
