import Divider from "@/common/Divider";
import { Skeleton } from "../ui/skeleton";

const TitleHeadingSkeleton = () => {
  return (
    <div className="mb-10 flex w-full flex-col items-center gap-2">
      <Skeleton className=" h-10 w-[300px]" />
      <Divider otherClass="border-blue-600 flex self-center dark:border-blue-600 border-t-4 w-1/5" />
      <Skeleton className=" h-4 w-full" />
      <Skeleton className=" h-4 w-full sm:hidden" />
      <Skeleton className=" h-4 w-full sm:hidden" />
      <Skeleton className=" h-4 w-1/2" />
    </div>
  );
};

export default TitleHeadingSkeleton;
