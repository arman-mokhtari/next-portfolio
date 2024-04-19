import TitleBadgeSkeleton from "../shared/TitleBadgeSkeleton";
import CvSkeletonItems from "./CvSkeletonItem";

const ResumeSkeleton = () => {
  return (
    <div className="my-20 flex min-h-screen items-center justify-center md:my-0">
      <div className="flex w-full flex-col justify-center gap-10 md:w-[95%] lg:flex-row xl:w-[95%]">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="flex-1 space-y-5">
            <TitleBadgeSkeleton otherClasses="w-[25%]" />
            <ul>
              <CvSkeletonItems />
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeSkeleton;
