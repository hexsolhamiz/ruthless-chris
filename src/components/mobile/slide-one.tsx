
import React from "react";

import { Footer } from "../static/footer";
import { MusicMadness } from "../music/music-madness";
import { CtaSection } from "../static/cta-section";
import Sponsers from "../sponsers/sponsers";
import { HomeBanner } from "../banners/home-banner";

export const SlideOne = () => {
  return (
   <div className="min-w-full h-fit-content">
      <HomeBanner />
      <MusicMadness />
      <Sponsers />
      <CtaSection />
      <Footer />
    </div>
  );
};
