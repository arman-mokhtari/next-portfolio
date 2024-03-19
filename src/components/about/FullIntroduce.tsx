import React from "react";
import AdminIntroduce from "../shared/AdminIntroduce";
import { profileData } from "@/constants/adminProfile";
import Divider from "@/common/Divider";
import Image from "next/image";

const FullIntroduce = () => {
  const isBubble = true;

  return (
    <div className="flex flex-1 flex-col justify-around ">
      <div className="flex items-center justify-between">
        <div>
          {isBubble && (
            <div>
              <span className="speech-bubble relative mb-3 inline-block whitespace-nowrap rounded bg-blue-600 px-2 py-[.2rem] text-sm font-semibold text-light-800">
                سلام
              </span>
            </div>
          )}
          <AdminIntroduce />
        </div>
        <Image
          className="rounded-3xl object-cover sm:hidden"
          src="/assets/images/about.png"
          alt="profile"
          width={150}
          height={150}
        />
      </div>
      <Divider otherClass="mx-0 my-4" />

      <ul role="list" className="">
        {profileData.map((item, i) => (
          <li
            key={i}
            className="text-dark400_light900 flex justify-between  overflow-hidden p-2 font-[400] odd:bg-slate-300 dark:odd:bg-slate-700"
          >
            <p>{item.key}:</p>
            <p>{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FullIntroduce;
