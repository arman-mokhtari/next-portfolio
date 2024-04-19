import AboutSkeleton from "@/components/about/AboutSkeleton";
import MainContent from "@/components/about/MainContent";

const Page = () => {
  const loading = false;
  if (loading) return <AboutSkeleton />;

  return <MainContent />;
};

export default Page;
