import Image from "next/image";
import FullIntroduce from "./FullIntroduce";
import { getAdmin } from "@/backend/libs/actions/user.action";
import AboutSkeleton from "./AboutSkeleton";

const MainContent = async () => {
  const admin = await getAdmin();

  const {
    profileImage,
    name,
    age,
    nationality,
    languages,
    location,
    expertise,
    status,
  } = admin || {};

  if (
    !admin &&
    !profileImage &&
    !name &&
    !age &&
    !nationality &&
    !languages &&
    !location &&
    !expertise &&
    !status
  ) {
    return <AboutSkeleton />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full flex-col gap-8 bg-slate-200 p-4 shadow-lg  transition-shadow hover:shadow-gray-400 dark:bg-slate-800 dark:shadow-none sm:flex-row md:w-[95%] xl:w-[85%]">
        <FullIntroduce otherClasses="sm:hidden" admin={admin} />
        <div className="ps-card-media relative hidden flex-1 rounded-md sm:flex">
          <span className="img-box-span-1" />
          <Image
            className="object-cover"
            priority
            quality={100}
            src={profileImage}
            placeholder="blur"
            blurDataURL={profileImage}
            alt="profile"
            sizes="100%"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
