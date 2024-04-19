import HomeContent from "@/components/home/HomeContent";
import HomeSkeleton from "@/components/home/HomeSkeleton";

export default function Home() {
  const loading = true;
  if (loading) return <HomeSkeleton />;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <HomeContent />
    </div>
  );
}
