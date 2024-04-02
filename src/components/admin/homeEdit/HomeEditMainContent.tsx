import { getUserById } from "@/backend/libs/actions/user.action";
import { auth } from "@clerk/nextjs";
import HomeEditForm from "../forms/HomeEditForm";

const HomeEditMainContent = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  return (
    <div className="mt-10 lg:mt-0">
      <div className="flex min-h-screen items-center justify-center">
        <HomeEditForm clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default HomeEditMainContent;
