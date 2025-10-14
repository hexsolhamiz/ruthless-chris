import React from "react";
import { Button } from "../ui/button";

const MobileCta = () => {
  return (
    <div className="bg-black h-[400px] flex items-center">
      <div className="">
        <h2 className="text-white text-center font-bold text-3xl mb-2">
          Have a song request, shoutout, or feedback?
        </h2>
        <p className="font-light text-center text-white pb-2 text-xl">
          We&apos;d love to hear from you—reach out and let your voice be part
          of the show!
        </p>
        <div className="py-2 flex justify-center">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 font-light rounded-full py-4 px-6 text-white hover:cursor-pointer">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileCta;
