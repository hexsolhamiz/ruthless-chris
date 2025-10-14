
import React from "react";

import { Footer } from "../static/footer";
import { MusicMadness } from "../music/music-madness";
import Sponsers from "../sponsers/sponsers";
import { HomeBanner } from "../banners/home-banner";
import MobileCta from "../static/mobile-cta";

export const SlideOne = () => {
  return (
   <div className="min-w-full h-fit-content">
      <HomeBanner />
      <MusicMadness />
      <Sponsers />
      <MobileCta />
      <Footer />
    </div>
  );
};
