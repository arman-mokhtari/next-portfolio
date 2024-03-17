import Image from "next/image";

const ProfileImage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <Image
        src="https://cdn.workfolio.ir/images/admin/arman_mokhtari.png"
        width={150}
        height={150}
        alt="Deflow Logo"
        className="mb-2 rounded-full border-[8px] border-slate-300 hover:border-blue-500  dark:border-slate-700 dark:hover:border-blue-700"
      />
      <p className="text-dark400_light900 text-xl font-medium">آرمان مختاری</p>
      <p className="text-dark100_light900 text-sm">توسعه‌دهنده جاوا اسکریپت</p>
      
    </div>
  );
};

export default ProfileImage;
