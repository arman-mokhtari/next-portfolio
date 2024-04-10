import { getAdmin } from "@/backend/libs/actions/user.action";
import ResumeItems from "./ResumeItems";

const ResumeMainContent = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <div>Loading...</div>;
  }
 return <ResumeItems admin={admin} />
};

export default ResumeMainContent;
