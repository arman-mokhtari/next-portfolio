import AboutEditMainContent from "@/components/admin/aboutEdit/AboutEditMainContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return <AboutEditMainContent />;
};

export default Page;
