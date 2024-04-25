import ContactEditMainContent from "@/components/admin/contactEdit/ContactEditMainContent";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const Page = () => {
  if (!checkRole("admin")) {
    redirect("/404");
  }
  return <ContactEditMainContent />;
};

export default Page;
