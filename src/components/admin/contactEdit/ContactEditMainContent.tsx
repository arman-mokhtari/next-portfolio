import { getUserById } from "@/backend/libs/actions/user.action";
import { auth } from "@clerk/nextjs";
import ContactEditForm from "../forms/ContactEditForm";

const ContactEditMainContent = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  return (
    <div className="py-10 lg:py-0">
      <div className="flex min-h-screen items-center justify-center">
        <ContactEditForm clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default ContactEditMainContent;
