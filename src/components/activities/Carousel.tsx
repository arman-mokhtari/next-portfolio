"use client";

import TitleHeading from "../shared/TitleHeading";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

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
    <div className="w-full md:w-[95%]">
      <TitleHeading
        heading={admin.activities.title}
        text={admin.activities.desc}
      />
      <div className="flex justify-center px-6">
        <Carousel
        opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        className="w-full"
      >
        <CarouselContent>
          {admin.activities.activityLinks.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-0">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.split("&")[1]}
                    >
                      <Image
                        className="rounded-md"
                        alt="تصویر پروژه"
                        src={item.split("&")[0]}
                        width={450}
                        height={450}
                      />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      </div>
      
    </div>
  );
};
export default ProjectSlider;
