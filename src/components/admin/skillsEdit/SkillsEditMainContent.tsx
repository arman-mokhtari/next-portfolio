import { getUserById } from "@/backend/libs/actions/user.action";
import { auth } from "@clerk/nextjs";
import SkillsEditForm from "../forms/SkillsForm";

const SkillsEditMainContent = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  return (
    <div className="mb-4 py-20">
      <div className="flex min-h-screen items-center justify-center">
        <SkillsEditForm clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default SkillsEditMainContent;
