"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
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
  Volume2,
} from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onMenuClick: () => void;
}

export function Hero({ onMenuClick }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes default
  const [volume, setVolume] = useState(0.7);
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

  // const handleTimeUpdate = () => {
  //   if (audioRef.current) {
  //     setCurrentTime(audioRef.current.currentTime);
  //   }
  // };

  // const handleLoadedMetadata = () => {
  //   if (audioRef.current) {
  //     setDuration(audioRef.current.duration);
  //   }
  // };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    // Simulate audio progress for demo
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  return (
    <div className="relative  min-h-[500px] lg:min-h-[400px] bg-[url(/hero.png)] bg-cover bg-center bg-no-repeat overflow-hidden">
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
        <div className="text-4xl mt-2 font-bold tracking-wider">Ruthless Chris</div>

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
          className="lg:h-[400px] lg:w-[400px] h-[250px] w-[200px] animate-pulse"
        />
      </div>

      {/* Audio Player Controls */}
      <div className=" z-30  p-6">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 p-3 rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>

          {/* Progress Bar */}
          <div className="flex-1 mx-4">
            <div
              className="h-2 bg-white/20 rounded-full cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg"
                style={{
                  left: `${(currentTime / duration) * 100}%`,
                  marginLeft: "-8px",
                }}
              />
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
            />
          </div>
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
      {/* <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src="/placeholder-audio.mp3"
      /> */}
    </div>
  );
}
