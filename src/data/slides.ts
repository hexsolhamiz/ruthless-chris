import React from "react";
import { Home, Radio, Music2, Contact, Calendar, Croissant } from "lucide-react";
import { SlideOne, SlideTwo, SlideThree, SlideFour, SlideFive, SlideSix } from "../components/mobile/index";
import { Seb } from "@/components/icons/seb";
import { JR } from "@/components/icons/jr";
import { SlideEight } from "@/components/mobile/slide-eight";
import { SlideNine } from "@/components/mobile/slide-nine";
// import { SlideSeven } from "@/components/mobile/slide-seven";

export const items = [
    {
      icon: React.createElement(Home, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: React.createElement(SlideOne), // Example content
      text: "Home",
    },
    {
      icon: React.createElement(Radio, { size: 28 }),
      color: "bg-green-500",
      bgImage: "/slides/slide2.png",
      content: React.createElement(SlideTwo),
      text: "Live",
    },

    {
      icon: React.createElement(Music2, { size: 28 }),
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: React.createElement(SlideThree),
      text: "Videos",
    },
    {
      icon: React.createElement(Contact, { size: 28 }),
      color: "bg-yellow-500",
      bgImage: "/slides/slide4.png",
      content: React.createElement(SlideFour),
      text: "Contact",
    },
    {
      icon: React.createElement(Calendar, { size: 28 }),
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: React.createElement(SlideFive),
      text: "Events",
    },
    {
      icon: React.createElement(Croissant, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: React.createElement(SlideSix),
      text: "Bookings",
    },
    {
      icon: React.createElement(Seb, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: React.createElement(SlideEight),
      text: "Bookings",
    },
    {
      icon: React.createElement(JR, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: React.createElement(SlideNine),
      text: "Bookings",
    },
    {
      icon: React.createElement(Home, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: React.createElement(SlideOne), // Example content
      text: "Home",
    },
    {
      icon: React.createElement(Radio, { size: 28 }),
      color: "bg-green-500",
      bgImage: "/slides/slide2.png",
      content: React.createElement(SlideTwo),
      text: "Live",
    },

    {
      icon: React.createElement(Music2, { size: 28 }),
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: React.createElement(SlideThree),
      text: "Videos",
    },
    {
      icon: React.createElement(Contact, { size: 28 }),
      color: "bg-yellow-500",
      bgImage: "/slides/slide4.png",
      content: React.createElement(SlideFour),
      text: "Contact",
    },
    {
      icon: React.createElement(Calendar, { size: 28 }),
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: React.createElement(SlideFive),
      text: "Events",
    },
    {
      icon: React.createElement(Croissant, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: React.createElement(SlideSix),
      text: "Bookings",
    },
    {
      icon: React.createElement(Seb, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: React.createElement(SlideEight),
      text: "Bookings",
    },
    {
      icon: React.createElement(JR, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: React.createElement(SlideNine),
      text: "Bookings",
    },
  ];