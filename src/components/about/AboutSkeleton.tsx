import { Skeleton } from "../ui/skeleton";

const AboutSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Skeleton className=" h-10 w-[300px]" />

        <div className="text-center  text-xl md:text-2xl">
          <Skeleton className="h-6 w-[200px] " />
        </div>
        <Skeleton className="h-4 w-[100px] " />

        <Skeleton className="mt-4 min-h-[46px] min-w-[140px] rounded-full px-4 py-3" />
      </div>
    </div>
  );
};

export default AboutSkeleton;
