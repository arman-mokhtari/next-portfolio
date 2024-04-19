import TitleHeadingSkeleton from "../shared/TitleHeadingSkeleton";
import { Skeleton } from "../ui/skeleton";

const SkillsSkeleton = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-20 md:py-0">
      <div className="text-dark400_light900 flex w-full flex-col items-center justify-center md:w-[95%] xl:w-[90%]">
        <TitleHeadingSkeleton />

        <div className="flex w-full flex-col gap-8 xl:flex-row">
          <div className="w-full space-y-4">
            <Skeleton className="h-10 w-[35%] items-center rounded-full" />
            <div className="flex w-full flex-col gap-3 rounded-xl ">
              <Skeleton className=" h-[13.2rem] w-full" />
            </div>
          </div>

          <div className="w-full space-y-4">
            <Skeleton className="h-10 w-[35%] items-center rounded-full" />

            <div className="flex w-full flex-col gap-3  rounded-xl ">
              <Skeleton className="h-[13.2rem] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSkeleton;
