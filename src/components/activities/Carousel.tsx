"use client";

import { settings } from "@/constants/sliderSettings";
import Image from "next/image";
import Slider from "react-slick";
import TitleHeading from "../shared/TitleHeading";
const projects = [
  {
    src: "/assets/images/carousel/1.png",
    alt: "project",
  },
  {
    src: "/assets/images/carousel/2.png",
    alt: "project",
  },
  {
    src: "/assets/images/carousel/3.png",
    alt: "project",
  },
  {
    src: "/assets/images/carousel/4.png",
    alt: "project",
  },
  {
    src: "/assets/images/carousel/5.png",
    alt: "project",
  },
];
const ProjectSlider = () => {
  return (
    <div className="absolute w-full md:w-[95%] xl:w-[80%]">
      <TitleHeading
        heading="بهترین پروژه‌های من"
        text="در کنار شما هستیم تا با قیمتی مقرون به صرفه کسب و کار خود را به صورت
        آنلاین به میلیون‌ها نفر معرفی کنید. هزاران کسب و کار تا به امروز با ما
        به نتایج شگفت‌انگیزی دست پیدا کرده‌اند."
      />
      <Slider {...settings}>
        {projects.map((item, i) => (
          <div className="flex-imp flex justify-center" key={i}>
            <Image
              className="object-cover sm:p-4"
              alt={item.alt}
              src={item.src}
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