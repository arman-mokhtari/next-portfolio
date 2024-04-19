import ResumeMainContent from "@/components/resume/ResumeMainContent";
import ResumeSkeleton from "@/components/resume/ResumeSkeleton";

const Page = () => {
  const loading = true;
  if (loading) return <ResumeSkeleton />;
  return <ResumeMainContent />;
};

export default Page;
