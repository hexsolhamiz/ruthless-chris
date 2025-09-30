import React from "react";
import { Hero } from "../static/hero";
import { MusicMadness } from "../music/music-madness";
import MusicShowCarousel from "../carousels/music-show-carousel";

export const SlideThree = () => {
  return (
    <div className="min-w-full  flex flex-col items-center justify-center">
      <MusicShowCarousel />
      <Hero onMenuClick={() => {}} />
      <MusicMadness />
    </div>
  );
};