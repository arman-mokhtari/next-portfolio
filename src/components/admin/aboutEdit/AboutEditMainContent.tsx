import { getUserById } from "@/backend/libs/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import AboutEditForm from "../forms/AboutEditForm";

const AboutEditMainContent = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  return (
    <div className="py-10 lg:py-0">
      <div className="flex min-h-screen items-center justify-center">
        <AboutEditForm clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default AboutEditMainContent;
