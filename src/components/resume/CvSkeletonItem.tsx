import { Skeleton } from "../ui/skeleton";

const CvSkeletonItems = () => {
  return Array.from({ length: 3 }, (_, i) => (
    <li
      key={i}
      className={`relative flex gap-8 pb-7 ${
        i === 2
          ? ""
          : "after:absolute after:right-1.5 after:top-3 after:h-full after:w-[1px] after:bg-slate-300 after:dark:bg-slate-600"
      }`}
    >
      <Skeleton className="before:absolute before:right-0 before:size-3 before:rounded-full before:bg-slate-300 before:dark:bg-slate-600" />

      <div className="w-full space-y-3">
        <Skeleton className="h-4 w-16" />
        <div>
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </li>
  ));
};

export default CvSkeletonItems;
