import React from "react";
import { Hero } from "../static/hero";
import { MusicMadness } from "../music/music-madness";
import MusicShowCarousel from "../carousels/music-show-carousel";
import { LiveStream } from "../static/live-stream";

export const SlideFour = () => {
  return (
    <div className="min-w-full min-h-screen flex flex-col items-center justify-center">
      <LiveStream videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
      <Hero onMenuClick={() => {}} />
      <MusicMadness />
      <MusicShowCarousel />
    </div>
  );
};
