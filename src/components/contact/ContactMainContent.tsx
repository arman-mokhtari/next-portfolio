import { getAdmin } from "@/backend/libs/actions/user.action";
import ContactForm from "../forms/ContactForm";
import TitleHeading from "../shared/TitleHeading";
import ContactSkeleton from "./ContactSkeleton";

const ContactMainContent = async () => {
  const admin = await getAdmin();

  if (!admin && !admin.contact.title && !admin.contact.desc) {
    return <ContactSkeleton />;
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 md:py-0">
      <div className="w-full md:w-[95%] xl:w-[85%]">
        <TitleHeading heading={admin.contact.title} text={admin.contact.desc} />
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactMainContent;
