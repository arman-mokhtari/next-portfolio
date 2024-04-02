"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { skillData } from "@/constants";
import TitleBadge from "@/common/TitleBadge";

type Skill = {
  _id: number;
  title: string;
  number: number;
};

type Skills = {
  [key: number]: number;
};

const SkillsMainContent = () => {
  const [skills, setSkills] = useState<Skills>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkills((prevSkills) => {
        const newSkills: Skills = {};
        Object.entries(skillData).forEach(([type, skillsArray]) => {
          skillsArray.forEach((skill: Skill) => {
            newSkills[skill._id] = skill.number;
          });
        });
        return { ...prevSkills, ...newSkills };
      });
    });

    return () => clearTimeout(timer);
  }, []);

  const mapSkills = (skillsArray: Skill[]) => {
    return skillsArray.map((skill) => (
      <div key={skill._id}>
        <Badge className="background-slate300_slate700 transition-none">
          <p>{skill.title}</p>
        </Badge>
        <div className="flex items-center gap-2">
          <Progress className="h-2" value={skills[skill._id]} />
          <Badge className="background-slate300_slate700 relative inline-flex h-6 w-10 justify-center text-center align-middle transition-none">
            <span className="absolute top-[.310rem]">{skills[skill._id]}%</span>
          </Badge>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-dark400_light900 flex w-full flex-col gap-8 md:w-[95%] xl:w-[80%] xl:flex-row">
        <div className="w-full">
          <TitleBadge title="مهارت‌های عمومی" />
          <div className="shadow-grey-darknone flex w-full flex-col gap-3 rounded-xl bg-slate-200  p-4 dark:bg-slate-800 ">
            {mapSkills(skillData.public)}
          </div>
        </div>

        <div className="w-full">
          <TitleBadge title="مهارت‌های تخصصی" />
          <div className="shadow-grey-darknone flex w-full flex-col gap-3  rounded-xl bg-slate-200 p-4 dark:bg-slate-800">
            {mapSkills(skillData.pro)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMainContent;
