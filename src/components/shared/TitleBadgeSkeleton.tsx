import { Skeleton } from "../ui/skeleton";
interface Prop {
  otherClasses: string;
}
const TitleBadgeSkeleton = ({ otherClasses }: Prop) => {
  return (
    <Skeleton
      className={`h-10 items-center rounded-full ${otherClasses}`}
    />
  );
};

export default TitleBadgeSkeleton;
