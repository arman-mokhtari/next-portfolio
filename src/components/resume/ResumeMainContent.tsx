import { getAdmin } from "@/backend/libs/actions/user.action";
import ResumeItems from "./ResumeItems";
import ResumeSkeleton from "./ResumeSkeleton";

const ResumeMainContent = async () => {
  const admin = await getAdmin();
  if (!admin && admin && !admin.resumeItems) {
    return <ResumeSkeleton />;
  }
  return <ResumeItems admin={admin} />;
};

export default ResumeMainContent;
