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
  [key: string]: number;
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
          newSkills[`pro_${index}`] = Number(skill.title.split("&")[1]);
        });
        publicSkills?.forEach((skill: Skill, index: number) => {
          newSkills[`public_${index}`] = Number(skill.title.split("&")[1]);
        });
        return { ...prevSkills, ...newSkills };
      });
    });

    return () => clearTimeout(timer);
  }, [proSkills, publicSkills]);

  const mapSkills = (skillsArray: Skill[], type: string) => {
    return skillsArray.map((skill, index) => (
      <div key={`${type}_${index}`}>
        <Badge className="background-slate300_slate700 transition-none">
          <p>{skill.title.split("&")[0]}</p>
        </Badge>
        <div className="flex items-center gap-2">
          <Progress className="h-2" value={skills[`${type}_${index}`]} />
          <Badge className="background-slate300_slate700 relative inline-flex h-6 w-10 justify-center text-center align-middle transition-none">
            <span className="absolute top-[.310rem]">
              {skills[`${type}_${index}`]}%
            </span>
          </Badge>
        </div>
      </div>
    ));
  };

  return (
    <div className="text-dark400_light900 flex w-full flex-col items-center justify-center md:w-[95%] xl:w-[85%]">
      <TitleHeading heading={admin.skills?.title} text={admin.skills?.desc} />
      <div className="flex w-full flex-col gap-8 xl:flex-row">
        <div className="w-full">
          <TitleBadge title="مهارت‌های عمومی" />
          <div className="shadow-grey-darknone flex w-full flex-col gap-3 rounded-xl bg-slate-200  p-4 dark:bg-slate-800 ">
            {mapSkills(publicSkills, "public")}
          </div>
        </div>

        <div className="w-full">
          <TitleBadge title="مهارت‌های تخصصی" />
          <div className="shadow-grey-darknone flex w-full flex-col gap-3  rounded-xl bg-slate-200 p-4 dark:bg-slate-800">
            {mapSkills(proSkills, "pro")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgress;
