import { getAdmin } from "@/backend/libs/actions/user.action";
import { Button } from "../ui/button";
import TextTyped from "./TextAnimate";

const HomeContent = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-dark500_light700 flex flex-col items-center gap-6 font-bold">
      <h1 className="text-[1.2rem] md:text-[1.5rem]">
        سلام من
        <span className="mx-1.5 inline-block whitespace-nowrap text-blue-600">
          {admin.name}
        </span>
        هستم!
      </h1>
      <div className="h-8 text-center  text-xl md:text-2xl">
        <TextTyped textArray={admin.typed} />
      </div>
      <p className="text-[1rem] md:text-[1.1rem]">ساکن {admin.location}.</p>
      <a
        download="resume"
        title={`دانلود رزومه ${admin.name}`}
        href={admin.cv}
        className="mt-4"
      >
        <Button className="hover-gradient min-h-[46px] min-w-[140px] rounded-full px-4 py-3 text-base !text-light-900 shadow-lg shadow-slate-400 active:shadow-md dark:shadow-none">
          دانلود رزومه
        </Button>
      </a>
    </div>
  );
};

export default HomeContent;
