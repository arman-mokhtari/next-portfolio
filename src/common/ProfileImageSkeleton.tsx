import { Skeleton } from "@/components/ui/skeleton";

const ProfileImageSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <Skeleton className="relative mb-2 size-[150px] overflow-hidden rounded-full" />

      <Skeleton className="h-8 w-2/6" />
      <Skeleton className="h-4 w-2/4" />
    </div>
  );
};

export default ProfileImageSkeleton;
