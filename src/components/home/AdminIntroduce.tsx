import { Button } from "../ui/button";
import TextTyped from "./TextAnimate";

const AdminIntroduce = () => {
  return (
    <div className="text-dark500_light700 flex flex-col items-center gap-6 font-bold">
      <h1 className="text-[1.2rem] md:text-[1.5rem]">
        سلام من
        <span className="mx-1.5 inline-block whitespace-nowrap text-blue-600">
          آرمان مختاری
        </span>
        هستم!
      </h1>
      <div className="h-8 text-center  text-2xl md:text-3xl">
        <TextTyped />
      </div>
      <p className="text-[1rem] md:text-[1.1rem]">ساکن ایران، تهران.</p>
      <a
        download="resume"
        href="https://cdn.workfolio.ir/pdf/cv/resume.pdf"
        className="mt-4"
      >
        <Button className="hover-gradient min-h-[46px] min-w-[140px] rounded-full px-4 py-3 text-base !text-light-900 shadow-lg shadow-slate-400 active:shadow-md dark:shadow-none">
          دانلود رزومه
        </Button>
      </a>
    </div>
  );
};

export default AdminIntroduce;
