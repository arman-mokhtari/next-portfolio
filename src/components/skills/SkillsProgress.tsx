"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import TitleBadge from "@/common/TitleBadge";
import TitleHeading from "../shared/TitleHeading";

type Skill = {
  _id: number;
  title: string;
  number: number;
};

type Skills = {
  [key: number]: number;
};

const SkillsProgress = ({ admin }: any) => {
  const [skills, setSkills] = useState<Skills>({});

  const proSkills = admin?.skillsItem.filter(
    (item: any) => item.type === "pro"
  );
  const publicSkills = admin?.skillsItem.filter(
    (item: any) => item.type === "public"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkills((prevSkills) => {
        const newSkills: Skills = {};
        proSkills?.forEach((skill: Skill, index: number) => {
          newSkills[index] = skill.number;
        });
        publicSkills?.forEach((skill: Skill, index: number) => {
          newSkills[index] = skill.number;
        });
        return { ...prevSkills, ...newSkills };
      });
    });

    return () => clearTimeout(timer);
  }, [proSkills, publicSkills]);

  const mapSkills = (skillsArray: Skill[]) => {
    return skillsArray.map((skill, index) => (
      <div key={index}>
        <Badge className="background-slate300_slate700 transition-none">
          <p>{skill.title}</p>
        </Badge>
        <div className="flex items-center gap-2">
          <Progress className="h-2" value={skills[index]} />
          <Badge className="background-slate300_slate700 relative inline-flex h-6 w-10 justify-center text-center align-middle transition-none">
            <span className="absolute top-[.310rem]">{skills[index]}%</span>
          </Badge>
        </div>
      </div>
    ));
  };

  return (
    <div className="text-dark400_light900 flex w-full flex-col items-center justify-center md:w-[95%] xl:w-[90%]">
      <TitleHeading
        heading={admin.skills?.title}
        text={admin.skills?.desc}
      />
      <div className="flex w-full flex-col gap-8 xl:flex-row">
        <div className="w-full">
          <TitleBadge title="مهارت‌های عمومی" />
          <div className="shadow-grey-darknone flex w-full flex-col gap-3 rounded-xl bg-slate-200  p-4 dark:bg-slate-800 ">
            {mapSkills(publicSkills)}
          </div>
        </div>

        <div className="w-full">
          <TitleBadge title="مهارت‌های تخصصی" />
          <div className="shadow-grey-darknone flex w-full flex-col gap-3  rounded-xl bg-slate-200 p-4 dark:bg-slate-800">
            {mapSkills(proSkills)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgress;
