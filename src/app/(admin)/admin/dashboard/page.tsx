import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import DashboardMainContent from "@/components/admin/dashboard/DashboardMainContent";

export default function AdminDashboard() {
  if (!checkRole("admin")) {
    redirect("/404");
  }

  return <DashboardMainContent />;
}
