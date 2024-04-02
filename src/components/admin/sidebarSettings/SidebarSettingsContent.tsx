import { getUserById } from "@/backend/libs/actions/user.action";
import SidebarSettingsForm from "../forms/SidebarSettingsForm";
import { auth } from "@clerk/nextjs";

const SidebarSettingsContent = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  return (
    <div className="mt-10 lg:mt-0">
      <div className="flex min-h-screen items-center justify-center">
        <SidebarSettingsForm
          clerkId={userId}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </div>
  );
};

export default SidebarSettingsContent;
