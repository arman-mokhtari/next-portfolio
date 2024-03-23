import Divider from "@/common/Divider";

const ActivitiesDesc = () => {
  return (
    <div className="text-dark200_light800 mb-10 flex flex-col gap-2 text-center">
      <h2 className="text-2xl font-bold">بهترین پروژه‌های من</h2>
      <Divider otherClass="border-blue-600 flex self-center dark:border-blue-600 border-t-4 w-1/5" />
      <p className="text-lg">
        در کنار شما هستیم تا با قیمتی مقرون به صرفه کسب و کار خود را به صورت
        آنلاین به میلیون‌ها نفر معرفی کنید. هزاران کسب و کار تا به امروز با ما
        به نتایج شگفت‌انگیزی دست پیدا کرده‌اند.
      </p>
    </div>
  );
};

export default ActivitiesDesc;
