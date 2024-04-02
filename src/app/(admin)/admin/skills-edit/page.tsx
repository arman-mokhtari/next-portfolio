import SkillsEditMainContent from "@/components/admin/skillsEdit/SkillsEditMainContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return <SkillsEditMainContent />;
};

export default Page;
