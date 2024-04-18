import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  otherClasses?: string;
}

const CustomizedCard = ({ children, otherClasses }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={`customized-card w-full bg-slate-200 p-4 dark:bg-slate-800 sm:flex-row md:w-[95%] ${otherClasses}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomizedCard;
