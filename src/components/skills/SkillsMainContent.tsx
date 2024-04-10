import { getAdmin } from "@/backend/libs/actions/user.action";
import SkillsProgress from "./SkillsProgress";
import TitleHeading from "../shared/TitleHeading";

const SkillsMainContent = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <TitleHeading
        heading={admin.skills?.title}
        text={admin.skills?.desc}
      />

      <SkillsProgress admin={admin} />
    </div>
  );
};

export default SkillsMainContent;
