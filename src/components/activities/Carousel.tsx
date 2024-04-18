"use client";

import { settings } from "@/constants/sliderSettings";
import Image from "next/image";
import Slider from "react-slick";
import TitleHeading from "../shared/TitleHeading";

interface AdminType {
  activities: {
    desc: string;
    title: string;
    activityLinks: string[];
  };
}

interface ProjectSliderProps {
  admin: AdminType;
}

const ProjectSlider = ({ admin }: ProjectSliderProps) => {
  return (
    <div className="absolute w-full md:w-[95%] xl:w-[95%]">
      <TitleHeading
        heading={admin.activities.title}
        text={admin.activities.desc}
      />
      <Slider {...settings}>
        {admin.activities.activityLinks.map((item, i) => (
          <div className="flex-imp flex justify-center" key={i}>
            <Image
              className="object-cover sm:p-4"
              alt="تصویر پروژه"
              src={item}
              width={450}
              height={450}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default ProjectSlider;
