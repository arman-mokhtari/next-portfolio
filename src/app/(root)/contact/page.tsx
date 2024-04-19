import ContactMainContent from "@/components/contact/ContactMainContent";
import ContactSkeleton from "@/components/contact/ContactSkeleton";

const Page = () => {
  const loading = true;
  if (loading) return <ContactSkeleton />;
  return <ContactMainContent />;
};

export default Page;
