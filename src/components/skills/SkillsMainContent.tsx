"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { skillData } from "@/constants";
import TitleBadge from "@/common/TitleBadge";

type Skills = {
  [key: string]: number;
};

const SkillsMainContent = () => {
  const [skills, setSkills] = useState<Skills>({
    js: 0,
    css: 0,
    html: 0,
    react: 0,
    node: 0,
    next: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkills((prevSkills) => {
        return skillData.reduce(
          (acc, { key, number }) => {
            acc[key] = number;
            return acc;
          },
          { ...prevSkills }
        );
      });
    });
    return () => clearInterval(timer);
  }, []);
  const firstHalfSkillData = skillData.slice(
    0,
    Math.ceil(skillData.length / 2)
  );
  const secondHalfSkillData = skillData.slice(Math.ceil(skillData.length / 2));
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-dark400_light900 flex w-full flex-col gap-8 md:w-[95%] xl:w-[80%] xl:flex-row">
        <div className="w-full">
          <TitleBadge title="مهارت‌های عمومی" />
          <div className="shadow-grey-darknone flex w-full flex-col gap-3 rounded-xl bg-slate-200  p-4 dark:bg-slate-800 ">
            {firstHalfSkillData.map((skill) => (
              <div key={skill.id}>
                <Badge className="background-slate300_slate700 transition-none">
                  <p>{skill.title}</p>
                </Badge>
                <div className="flex items-center gap-2">
                  <Progress className="h-2" value={skills[skill.key]} />
                  <Badge className="background-slate300_slate700 relative inline-flex h-6 w-10 justify-center text-center align-middle transition-none">
                    <span className="absolute top-[.310rem]">
                      {skills[skill.key]}%
                    </span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <TitleBadge title="مهارت‌های تخصصی" />
          <div className="shadow-grey-darknone flex w-full flex-col gap-3  rounded-xl bg-slate-200 p-4 dark:bg-slate-800">
            {secondHalfSkillData.map((skill) => (
              <div key={skill.id}>
                <Badge className="background-slate300_slate700 transition-none">
                  <p>{skill.title}</p>
                </Badge>
                <div className="flex items-center gap-2">
                  <Progress className="h-2" value={skills[skill.key]} />
                  <Badge className="background-slate300_slate700 relative inline-flex h-6 w-10 justify-center text-center align-middle transition-none">
                    <span className="absolute top-[.310rem]">
                      {skills[skill.key]}%
                    </span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMainContent;
