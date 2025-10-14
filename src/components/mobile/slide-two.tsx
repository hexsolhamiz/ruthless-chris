import { Footer } from "@/components/static/footer";
import { LiveStream } from "@/components/static/live-stream";
import React from "react";
import { StreamBanner } from "../banners/stream-banner";
import MobileCta from "../static/mobile-cta";

export const SlideTwo = () => {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <StreamBanner />
      <LiveStream videoUrl="https://www.youtube.com/embed/36YnV9STBqc?si=z59ATHulfbim8waW" />
      <MobileCta />
      <Footer />
    </div>
  );
};
