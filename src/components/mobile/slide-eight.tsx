import React from "react";
import { SebBanner } from "../banners/seb-banner";
import { SebVideosGallery } from "../videos/seb-videos-gallery";
import { DynamicBanner } from "../banners/dynamic-banner";

export const SlideEight = () => {

  return (
    <div className="min-w-full flex flex-col items-center justify-center">
      <SebBanner />
      <DynamicBanner />
      <SebVideosGallery />
    </div>
  );
};
