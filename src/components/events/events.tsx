"use client";

import { events } from "@/data/events";
import Image from "next/image";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export const Events = () => {
  return (
    <div className="z-50 w-full bg-black min-h-[500px] flex flex-col justify-start">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:items-start items-center py-4">
        <h1 className="text-3xl px-4 text-center lg:text-start font-bold text-white">
          Upcoming Events
        </h1>
        <p className="text-white px-4 lg:text-start text-center">
          Stay tuned for our upcoming events and live shows! Check back often
          for the latest updates and schedules.
        </p>
        <div className="hidden md:block">
          <div className="w-full grid grid-cols-4 py-4 px-4 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 lg:py-8">
            {events.slice(9, 22).map((event, index) => (
              <Image
                key={index}
                src={event.img}
                alt={event.img}
                width={400}
                height={160}
                className="w-full lg:h-92 object-contain rounded-2xl mb-4"
              />
            ))}
          </div>

          <div className="w-full px-4 grid grid-cols-4 gap-6 py-8">
            {events.slice(22, 26).map((event, index) => (
              <Image
                key={index}
                src={event.img}
                alt={event.img}
                width={400}
                height={160}
                className="w-full lg:h-92 rounded-2xl mb-4"
              />
            ))}
          </div>
        </div>
        <div className="md:hidden z-50">
        <Carousel
          opts={{
            align: "end",
          }}
          orientation="vertical"
          className="w-full mt-12 max-w-xs"
        >
          <h1 className="text-white text-lg font-light text-center">
            Swipe up to see more
          </h1>
          <CarouselContent className="mt-4 h-[400px]">
            {events.map((event, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                <Image
                  key={index}
                  src={event.img}
                  alt={event.img}
                  width={400}
                  height={160}
                  className="w-full h-[260px]  rounded-2xl mb-4"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        </div>
      </div>
    </div>
  );
};
