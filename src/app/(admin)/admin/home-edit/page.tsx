import HomeEditMainContent from "@/components/admin/homeEdit/HomeEditMainContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return <HomeEditMainContent />;
};

export default Page;
