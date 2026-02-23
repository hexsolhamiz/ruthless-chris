import React from "react";
import { Home, Radio, Music2, Contact, Calendar, Croissant } from "lucide-react";
import { SlideOne, SlideTwo, SlideThree, SlideFour, SlideFive, SlideSix } from "../components/mobile/index";
import { Seb } from "@/components/icons/seb";
import { JR } from "@/components/icons/jr";
import { SlideEight } from "@/components/mobile/slide-eight";
import { SlideNine } from "@/components/mobile/slide-nine";
import { SlideTen } from "@/components/mobile/slide-ten";
import { Ruchallen } from "@/components/icons/ruchallen";
// import { SlideSeven } from "@/components/mobile/slide-seven";

export const items = [
 {
      icon: React.createElement(Home, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideOne), 
      text: "Home",
      link:"https://ruthlesschris.co.uk"
    },
    {
      icon: React.createElement(Radio, { size: 28 }),
      color: "bg-green-500",
      bgImage: "/slides/slide2.png",
      content: () => React.createElement(SlideTwo),
      text: "Live",
      link:"/"
    },
    {
      icon: React.createElement(Music2, { size: 28 }),
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: () => React.createElement(SlideThree),
      text: "Videos",
      link:"/"
    },
    {
      icon: React.createElement(Contact, { size: 28 }),
      color: "bg-yellow-500",
      bgImage: "/slides/slide4.png",
      content: () => React.createElement(SlideFour),
      text: "Contact",
      link:"https://ruthlesschris.co.uk/contact"
    },
    {
      icon: React.createElement(Calendar, { size: 28 }),
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: () => React.createElement(SlideFive),
      text: "Events",
      link:"https://ruthlesschris.co.uk/events"
    },
    {
      icon: React.createElement(Croissant, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideSix),
      text: "Bookings",
      link:"https://ruthlesschris.co.uk/Schedule"
    },
    
    {
      icon: React.createElement(Seb, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideEight),
      text: "Bookings",
      link:"https://ruthlesschris.co.uk/sexyelegantandblessed.html"
    },
    {
      icon: React.createElement(JR, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideNine),
      text: "Bookings",
      link:"https://ruthlesschris.co.uk/jiggyradio"

    },
    {
      icon: React.createElement(Ruchallen, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideTen),
      text: "Bookings",
      link:"https://www.ruchallen.com"
    },
    
     {
      icon: React.createElement(Home, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideOne), // ✅ Function that creates element on demand
      text: "Home",
      link:"https://ruthlesschris.co.uk"

    },
    {
      icon: React.createElement(Radio, { size: 28 }),
      color: "bg-green-500",
      bgImage: "/slides/slide2.png",
      content: () => React.createElement(SlideTwo),
      text: "Live",
      link:"/"

    },
    {
      icon: React.createElement(Music2, { size: 28 }),
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: () => React.createElement(SlideThree),
      text: "Videos",
      link:"/"

    },
    {
      icon: React.createElement(Contact, { size: 28 }),
      color: "bg-yellow-500",
      bgImage: "/slides/slide4.png",
      content: () => React.createElement(SlideFour),
      text: "Contact",
    },
    {
      icon: React.createElement(Calendar, { size: 28 }),
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: () => React.createElement(SlideFive),
      text: "Events",
      link:"https://ruthlesschris.co.uk/events"
    },
    {
      icon: React.createElement(Croissant, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideSix),
      text: "Bookings",
    },
    {
      icon: React.createElement(Seb, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideEight),
      text: "Bookings",
      link:"https://ruthlesschris.co.uk/sexyelegantandblessed.html"
    },
    {
      icon: React.createElement(JR, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideNine),
      text: "Bookings",
      link:"https://ruthlesschris.co.uk/jiggyradio"
    },
    {
      icon: React.createElement(Ruchallen, { size: 28 }),
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: () => React.createElement(SlideTen),
      text: "Bookings",
      link:"https://www.ruchallen.com"
    },
    
];