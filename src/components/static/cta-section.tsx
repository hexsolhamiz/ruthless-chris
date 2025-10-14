import React from "react";
import { Button } from "../ui/button";

export const CtaSection = () => {
  return (
    <div className="w-full py-8 bg-black ">
      <div
        className="w-full max-w-7xl mx-auto lg:h-[350px] h-[200px] bg-center bg-cover rounded-2xl flex items-start justify-center py-4"
        style={{ backgroundImage: "url('/cta-bg.png')" }}
      >
        <div className="hidden md:block">
          <h2 className="text-white text-center font-bold text-3xl mb-2">
            Have a song request, shoutout, or feedback?
          </h2>
          <p className="font-light text-center text-white pb-2 text-xl">
            We&apos;d love to hear from you—reach out and let your voice be part
            of the show!
          </p>
          <div className="py-2 flex justify-center">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 font-light rounded-full py-4 px-6 text-white hover:cursor-pointer">Contact Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
