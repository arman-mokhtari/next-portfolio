"use client";

import TitleBadge from "@/common/TitleBadge";

type ResumeItem = {
  length: number;
  desc: string;
  date: string;
  type: string;
};

type Props = {
  admin?: {
    resumeItems?: ResumeItem[];
  };
};

const ResumeItems = ({ admin }: Props) => {
  const degreeCv = admin?.resumeItems?.filter((item) => item.type === "degree") || [];
  const experienceCv = admin?.resumeItems?.filter((item) => item.type === "experience") || [];

  const mapCv = (cvArray: ResumeItem[]) => {
    return cvArray.map((item, i) => (
      <li
        key={`${item.type}-${i}`}
        className={`relative flex gap-8 pb-5 ${i === cvArray.length - 1 ? "" : "after:absolute after:right-1.5 after:top-3 after:h-full after:w-[1px] after:bg-blue-600"}`}
      >
        <div className="before:absolute before:right-0 before:size-3 before:rounded-full before:bg-blue-600" />

        <div className="text-sm">
          <p className="text-gray-500 dark:text-gray-400">{item.date}</p>
          <p className="text-dark500_light700 mt-2">{item.desc}</p>
        </div>
      </li>
    ));
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="my-20 flex w-full flex-col justify-center gap-10 md:w-[95%] lg:flex-row xl:w-[80%]">
        <div className="flex-1">
          <TitleBadge title="مدارک تحصیلی" />
          <ul>{mapCv(degreeCv)}</ul>
        </div>

        <div className="flex-1">
          <TitleBadge title="تجربیات کاری" />
          <ul>{mapCv(experienceCv)}</ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeItems;
