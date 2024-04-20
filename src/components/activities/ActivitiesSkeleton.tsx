import TitleHeadingSkeleton from "../shared/TitleHeadingSkeleton";
import { Skeleton } from "../ui/skeleton";

const ActivitiesSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center py-20 md:py-0">
      <div className="w-[95%]">
        <TitleHeadingSkeleton />
        <div className="flex justify-center gap-10 px-8 sm:py-4">
          <Skeleton className="w-full pt-[65%] sm:pt-[28%]" />
          <Skeleton className="hidden w-full pt-[28%] sm:block" />
        </div>
      </div>
    </div>
  );
};

export default ActivitiesSkeleton;
