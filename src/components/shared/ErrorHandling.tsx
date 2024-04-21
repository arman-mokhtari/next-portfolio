import { MouseEventHandler } from "react";
import BlueButton from "./BlueButton";
import Image from "next/image";
interface Prop {
  onClick: MouseEventHandler<HTMLButtonElement> | any;
}
const ErrorHandling = ({ onClick }: Prop) => {
  const srcImg = "https://cdn.workfolio.ir/images/svg/errors/error.svg";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-2">
      <Image
        className="mb-2 h-auto w-[70%] object-cover sm:w-[55%]"
        priority
        alt="خطا از سمت سرور"
        width={200}
        height={200}
        placeholder="blur"
        blurDataURL={srcImg}
        src={srcImg}
      />
      <p className="text-lg font-bold">ظاهرا خطایی در سمت سرور رخ داده است!</p>
      <div className="space-y-2 text-center font-medium">
        <p>
          احتمالا با تلاش مجدد مشکل بر طرف خواهد شد، در صورت تداوم خطا با
          پشتیبانی تماس بگیرید.
        </p>
        <p>از صبر و شکیبایی شما سپاسگذاریم.</p>
      </div>
      <BlueButton text="تلاش مجدد!" onClick={onClick} />
    </div>
  );
};
export default ErrorHandling;
