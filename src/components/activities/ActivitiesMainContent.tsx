import { getAdmin } from "@/backend/libs/actions/user.action";
import ProjectSlider from "./Carousel";

const ActivitiesMainContent = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <ProjectSlider admin={admin} />
    </div>
  );
};

export default ActivitiesMainContent;
