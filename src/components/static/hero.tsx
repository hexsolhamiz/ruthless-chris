"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Radio,
  Monitor,
  Info,
  Phone,
  Mail,
  Share2,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onMenuClick: () => void;
}

export function Hero({ onMenuClick }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };




  return (
    <div className="relative min-h-[600px] lg:min-h-[400px] bg-[url(/hero.png)] bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Navigation Bar */}
      <nav className="hidden md:flex relative z-50 items-center justify-between px-6 py-4 text-white">
        {/* Left Navigation */}
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:cursor-pointer p-2 hover:bg-none"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center hover:cursor-pointer space-x-1 text-sm">
            <Radio className="w-4 h-4 text-white" />
            <span>Live</span>
          </div>

          <div className="flex items-center hover:cursor-pointer space-x-1 text-sm">
            <Monitor className="w-4 h-4 text-white" />
            <span>Airplay</span>
          </div>

          <div className="flex items-center hover:cursor-pointer space-x-1 text-sm">
            <Info className="w-4 h-4 text-white" />
            <span>Info</span>
          </div>
        </div>

        {/* Center Branding */}
        <div className="text-4xl mt-2 font-bold tracking-wider">
          Ruthless Chris
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex hover:cursor-pointer items-center space-x-1">
            <Phone className="w-4 h-4 text-white" />
            <span>Phone</span>
          </div>

          <div className="flex hover:cursor-pointer items-center space-x-1">
            <Mail className="w-4 h-4 text-white" />
            <span>Email</span>
          </div>

          <div className="flex items-center hover:cursor-pointer space-x-1">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 lg:pt-0 flex flex-col items-center justify-center h-[450px] lg:min-h-[500px] px-6">
        {/* Animated Wave Graphics */}
        <Image
          src="/logo.png"
          width={400}
          height={400}
          alt="Logo"
          className="lg:h-[400px] lg:w-[400px] h-[200px] w-[200px] animation-pulse"
        />
      </div>

      {/* Audio Player Controls */}
      <div className="hidden lg:flex max-w-6xl mx-auto items-center space-x-3 pb-4">
        {/* LIVE Badge */}
        {/* Play/Pause Button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 p-3 rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="text-cyan-600 w-6 h-6" />
          ) : (
            <Play className="text-cyan-600 w-6 h-6" />
          )}
        </Button>

        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 bg-cyan-600 animate-pulse rounded-full"></span>
          <span className="text-cyan-600 text-sm font-semibold tracking-wide">
            LIVE
          </span>
        </div>

        {/* Full Progress Bar (100%) */}
        <div className="flex-1 h-2 bg-white/20 rounded-full relative cursor-default">
          <div
            className="h-full bg-cyan-600 rounded-full"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-12">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Track Info Here
        </h1>
        <p className="text-lg px-2 text-white/90 text-center">
          Your ultimate destination for live streams, music, and more. Explore
          our content and stay connected!
        </p>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef}>
        <source src="https://hello.citrus3.com:8022/stream" type="audio/mpeg" />
      </audio>
    </div>
  );
}
