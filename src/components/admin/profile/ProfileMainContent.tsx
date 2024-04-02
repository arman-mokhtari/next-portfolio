import { auth } from "@clerk/nextjs";
import ProfileForm from "../forms/ProfileForm";
import { getUserById } from "@/backend/libs/actions/user.action";

const ProfileMainContent = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  return (
    <div className="mt-10 lg:mt-0">
      <div className="flex min-h-screen items-center justify-center">
        <ProfileForm clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default ProfileMainContent;
