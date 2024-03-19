import Image from "next/image";
import FullIntroduce from "./FullIntroduce";

const MainContent = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex gap-8 bg-slate-200 p-4 shadow-lg transition-shadow hover:shadow-gray-400  dark:bg-slate-800 dark:shadow-none xs:w-full xs:flex-col sm:flex-row md:w-[85%] lg:w-[80%]">
        <FullIntroduce />
        <Image
          className="flex-1 rounded-md object-cover p-2 pr-0 xs:hidden sm:flex"
          priority
          src="/assets/images/about.png"
          alt="profile"
          width={250}
          height={300}
        />
      </div>
    </div>
  );
};

export default MainContent;
