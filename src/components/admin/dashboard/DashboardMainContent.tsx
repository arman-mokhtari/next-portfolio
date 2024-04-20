import { getAdmin } from "@/backend/libs/actions/user.action";
import AboutSkeleton from "@/components/about/AboutSkeleton";
import FullIntroduce from "@/components/about/FullIntroduce";
import CustomizedCard from "@/components/shared/CustomizedCard";

const DashboardMainContent = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <AboutSkeleton />;
  }
  return (
    <CustomizedCard>
      <FullIntroduce admin={admin} />
    </CustomizedCard>
  );
};

export default DashboardMainContent;
