import { getAdmin } from "@/backend/libs/actions/user.action";
import AdminIntroduce from "@/components/shared/AdminIntroduce";
import Image from "next/image";
import ProfileImageSkeleton from "./ProfileImageSkeleton";

const ProfileImage = async () => {
  const admin = await getAdmin();

  const { avatar, name, expertise } = admin || {};

  if (!admin && !avatar && !name && !expertise) {
    return <ProfileImageSkeleton />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="relative mb-2 size-[150px] overflow-hidden rounded-full border-[8px] border-slate-300 object-cover  duration-300 hover:border-blue-500 dark:border-slate-700 dark:hover:border-blue-700">
        <Image
          src={avatar}
          fill
          sizes="100%"
          priority
          quality={100}
          alt={name}
          title={name}
          className="object-cover"
        />
      </div>

      <AdminIntroduce admin={admin} />
    </div>
  );
};

export default ProfileImage;
