import React from "react";
import { Skeleton } from "../ui/skeleton";

const SocialIconsSkeleton = () => {
  return (
    <div className="flex justify-center gap-4 ">
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton key={i} className="size-6 rounded-full" />
      ))}
    </div>
  );
};

export default SocialIconsSkeleton;
