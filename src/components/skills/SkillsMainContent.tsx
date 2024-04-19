import { getAdmin } from "@/backend/libs/actions/user.action";
import SkillsProgress from "./SkillsProgress";
import SkillsSkeleton from "./SkillsSkeleton";

const SkillsMainContent = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <SkillsSkeleton />;
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-20 md:py-0">
      <SkillsProgress admin={admin} />
    </div>
  );
};

export default SkillsMainContent;
