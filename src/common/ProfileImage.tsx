import AdminIntroduce from "@/components/shared/AdminIntroduce";
import Image from "next/image";

const ProfileImage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="relative mb-2 size-[150px] overflow-hidden rounded-full border-[8px] border-slate-300 object-cover  duration-300 hover:border-blue-500 dark:border-slate-700 dark:hover:border-blue-700">
        <Image
          src="/assets/images/profile-2.png"
          fill
          priority
          quality={100}
          alt="Deflow Logo"
          className="object-cover "
        />
      </div>

      <AdminIntroduce />
    </div>
  );
};

export default ProfileImage;
