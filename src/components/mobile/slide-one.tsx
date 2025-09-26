import React from "react";
import { Hero } from "../static/hero";
import { MusicMadness } from "../music/music-madness";
import MusicShowCarousel from "../carousels/music-show-carousel";

export const SlideOne = () => {
  return (
    <div className="min-w-full min-h-screen flex flex-col items-center justify-center">
      <Hero onMenuClick={() => {}} />
      <Hero onMenuClick={() => {}} />
      <MusicMadness />
      <MusicShowCarousel />
    </div>
  );
};
