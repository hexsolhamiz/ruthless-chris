"use client";
import { Footer } from "@/components/static/footer";
import { VideosGallery } from "@/components/videos/videos-gallery";
import React  from "react";
import { VideoBanner } from "../banners/videos-banner";

export const SlideThree = () => {

  return (
    <div className="min-w-full  flex flex-col items-center justify-center">
      <VideoBanner />
      <VideosGallery />
      <Footer />
    </div>
  );
};
