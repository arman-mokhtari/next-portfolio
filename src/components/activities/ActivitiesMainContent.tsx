import { getAdmin } from "@/backend/libs/actions/user.action";
import ProjectSlider from "./Carousel";
import ActivitiesSkeleton from "./ActivitiesSkeleton";

const ActivitiesMainContent = async () => {
  const admin = await getAdmin();

  if (
    !admin &&
    !admin.activities.title &&
    !admin.activities.desc &&
    !admin.activities.activityLinks
  ) {
    return <ActivitiesSkeleton />;
  }
  return (
    <div className="relative mx-5 flex min-h-screen items-center justify-center py-20 md:py-0">
      <ProjectSlider admin={admin} />
    </div>
  );
};

export default ActivitiesMainContent;
