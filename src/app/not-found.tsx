import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  const srcImg = "/assets/images/svg/404.svg";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-3">
      <Image
        className="h-auto w-[70%] object-cover sm:w-[45%]"
        priority
        alt="خطا از سمت سرور"
        placeholder="blur"
        blurDataURL={srcImg}
        width={200}
        height={200}
        src={srcImg}
      />

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-lg font-medium">به نظر میاد یه جایی گم شدیم...</p>

        <p className="font-medium">متاسفانه صفحه مورد نظر شما پیدا نشد!</p>
        <p className="text-sm font-medium">
          اما جای هیچ نگرانی نیست! آینده روشنه و ما در حال بهتر شدن هستیم.
        </p>
      </div>
      <Link
        href="/"
        className="mt-3 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500  focus:z-10 dark:bg-blue-800 dark:hover:bg-blue-700"
      >
        همین حالا به خانه برگرد!
      </Link>
    </div>
  );
}
