import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  otherClasses?: string;
}

const CustomizedCard = ({ children, otherClasses }: Props) => {
  return (
    <div
      className={`customized-card w-full bg-slate-200 p-4 sm:flex-row md:w-[95%] xl:w-[80%] ${otherClasses}`}
    >
      {children}
    </div>
  );
};

export default CustomizedCard;
