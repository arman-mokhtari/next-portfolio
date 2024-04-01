import React from "react";
import AdminIntroduce from "../shared/AdminIntroduce";

import Divider from "@/common/Divider";
import Image from "next/image";

interface Props {
  otherClasses?: string;
  topBubble?: boolean;
  admin: {
    name: string;
    age: number;
    nationality: string;
    languages: string[];
    location: string;
    expertise: string;
    status: string;
    profileImage: string;
  };
}

const FullIntroduce = ({ otherClasses, topBubble, admin }: Props) => {

  const isBubble = topBubble || false;

  const itemMappings: { [key: string]: string } = {
    name: "نام",
    age: "سن",
    nationality: "ملیت",
    languages: "زبان‌ها",
    location: "موقعیت",
    expertise: "تخصص",
    status: "وضعیت",
  };

  return (
    <div className="flex flex-1 flex-col justify-around ">
      <div className="flex items-center justify-between gap-3">
        <div>
          {isBubble && (
            <span className="speech-bubble relative mb-3 mr-2 inline-block whitespace-nowrap rounded bg-blue-600 px-2 py-[.2rem] text-sm font-semibold text-light-800">
              سلام
            </span>
          )}
          <div className="border-r-[5px] border-blue-600 pr-2">
            <AdminIntroduce admin={admin} />
          </div>
        </div>
        <Image
          className={`rounded-3xl object-cover ${otherClasses}`}
          src={admin.profileImage}
          alt="profile"
          width={100}
          height={100}
        />
      </div>
      <Divider otherClass="mx-0 my-4" />

      <ul role="list">
        {Object.keys(itemMappings).map((key) => (
          <li
            key={key}
            className="text-dark400_light900 flex justify-between overflow-hidden p-2 font-[400] odd:bg-slate-300 dark:odd:bg-slate-700"
          >
            <p>{itemMappings[key]}:</p>
            <p>{(admin as any)[key]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FullIntroduce;
