import { Skeleton } from "../ui/skeleton";

const AboutSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full flex-col gap-8 bg-slate-200 p-4 sm:flex-row md:w-[95%] xl:w-[85%]">
        <Skeleton className=" w-full pt-[20%] sm:pt-[43%]" />

        <Skeleton className=" w-full pt-[66%] sm:pt-[43%]" />
      </div>
    </div>
  );
};

export default AboutSkeleton;
