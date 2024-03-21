import TitleBadge from "@/common/TitleBadge";

const ResumeMainContent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="my-20 flex w-full flex-col items-center justify-center gap-10 md:w-[95%] lg:flex-row xl:w-[80%]">
        <div>
          <TitleBadge title="مدارک تحصیلی" />
          <ul>
            {Array.from({ length: 5 }, (_, i) => (
              <li
                key={i}
                className={`relative flex gap-8 pb-5 ${i === 4 ? "" : "after:absolute after:right-1.5 after:top-3 after:h-full after:w-[1px] after:bg-blue-600"}`}
              >
                <div className="before:absolute before:right-0 before:size-3 before:rounded-full before:bg-blue-600" />

                <div className="text-sm">
                  <p className="text-gray-500 dark:text-gray-400">27.03.2024</p>
                  <p className="text-dark500_light700 mt-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Reprehenderit, provident?s
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <TitleBadge title="تجربیات کاری" />
          <ul>
            {Array.from({ length: 5 }, (_, i) => (
              <li
                key={i}
                className={`relative flex gap-8 pb-5 ${i === 4 ? "" : "after:absolute after:right-1.5 after:top-3 after:h-full after:w-[1px] after:bg-blue-600"}`}
              >
                <div className="before:absolute before:right-0 before:size-3 before:rounded-full before:bg-blue-600" />

                <div className="text-sm">
                  <p className="text-gray-500 dark:text-gray-400">27.03.2024</p>
                  <p className="text-dark500_light700 mt-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Reprehenderit, provident?s
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeMainContent;
