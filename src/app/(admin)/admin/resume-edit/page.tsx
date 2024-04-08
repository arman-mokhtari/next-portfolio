import ResumeEditMainContent from "@/components/admin/resumeEdit/ResumeEditMainContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return <ResumeEditMainContent />;
};

export default Page;
