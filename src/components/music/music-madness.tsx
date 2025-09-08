import Image from "next/image";
import React from "react";

export const MusicMadness = () => {
  return (
    <div className="lg:min-h-[300px] min-h-screen w-full relative bg-[url('/music/music-bg.png')] bg-cover bg-center flex items-center justify-center">
      <div className="max-w-7xl mx-auto gap-2 text-center lg:px-0 px-6">
        <h1 className="text-6xl font-bold text-white">
          Where Music Meets Madness
        </h1>
        <h1 className="text-6xl font-bold text-white">Ruthless Style</h1>
        <p className="text-md opacity-90 max-w-2xl mx-auto py-2 text-white">
          Enter the zone. Feel the flow.
        </p>
      </div>
      <div className="absolute -bottom-10 right-0">
        <Image
          src="/music/mic.png"
          alt="Music Note"
          width={250}
          height={250}
        />
      </div>
    </div>
  );
};
