
import React from "react";
import { Hero } from "../static/hero";
import { Footer } from "../static/footer";
import { MusicMadness } from "../music/music-madness";
import { CtaSection } from "../static/cta-section";
import Sponsers from "../sponsers/sponsers";

export const SlideOne = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-w-full h-fit-content">
      <Hero onMenuClick={() => {}} />
      <MusicMadness />
      <Sponsers />
      <CtaSection />
      <Footer />
    </div>
  );
};
