import TitleHeadingSkeleton from "../shared/TitleHeadingSkeleton";
import { Skeleton } from "../ui/skeleton";

const ContactSkeleton = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 md:py-0">
      <div className="w-full md:w-[95%] xl:w-[90%]">
        <TitleHeadingSkeleton />

        <div className="w-full ">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-12 flex-1" />
            ))}
          </div>
          <Skeleton className="h-36 flex-1" />

          <Skeleton className="mt-4 min-h-[46px] w-[140px] rounded-full px-4 py-3" />
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;
