"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Wifi,
  Monitor,
  Info,
  Phone,
  Mail,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

// Typed Howl/Howler interfaces
interface HowlOptions {
  src: string[];
  html5?: boolean;
  format?: string[];
  volume?: number;
  onload?: () => void;
  onloaderror?: (id: number, error: unknown) => void;
  onplayerror?: (id: number, error: unknown) => void;
  onplay?: () => void;
  onpause?: () => void;
}

interface HowlInstance {
  play: () => void;
  pause: () => void;
  unload: () => void;
  volume: (v: number) => void;
  mute: (m: boolean) => void;
  once: (event: string, fn: () => void) => void;
}

declare global {
  interface Window {
    Howl?: new (options: HowlOptions) => HowlInstance;
    Howler?: unknown;
  }
}

interface NavigationItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { id: "live", icon: Wifi, label: "live" },
  { id: "display", icon: Monitor, label: "Display" },
  { id: "info", icon: Info, label: "Info" },
  { id: "phone", icon: Phone, label: "Phone" },
  { id: "email", icon: Mail, label: "Email" },
  { id: "share", icon: Share2, label: "Share" },
];

export function BottomNavigation() {
  const [activeItem, setActiveItem] = useState<string>("live");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [sound, setSound] = useState<HowlInstance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [howlerLoaded, setHowlerLoaded] = useState<boolean>(false);

  // Load Howler.js
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js";
    script.async = true;

    script.onload = () => {
      setHowlerLoaded(true);
    };
    script.onerror = () => {
      setError("Failed to load audio library");
    };

    document.body.appendChild(script);

    return () => {
      sound?.unload();
    };
  }, [sound]);

  // Initialize stream
  useEffect(() => {
    if (!howlerLoaded || sound || !window.Howl) return;

    try {
      const newSound = new window.Howl({
        src: ["https://hello.citrus3.com:8022/stream"],
        html5: true,
        format: ["mp3", "aac"],
        volume,
        onload: () => {
          setIsLoading(false);
        },
        onloaderror: (_id, err) => {
          setError("Failed to load stream");
          setIsLoading(false);
        },
        onplayerror: (_id, err) => {
          setError("Failed to play stream");
          newSound.once("unlock", () => {
            newSound.play();
          });
        },
        onplay: () => {
          setIsPlaying(true);
          setIsLoading(false);
        },
        onpause: () => setIsPlaying(false),
      });

      setSound(newSound);
    } catch (err) {
      setError("Failed to initialize audio");
    }
  }, [howlerLoaded, sound, volume]);

  const togglePlay = () => {
    if (!sound) {
      setError("Audio not initialized");
      return;
    }

    try {
      if (isPlaying) {
        sound.pause();
        setIsPlaying(false);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        sound.play();
      }
    } catch (err) {
      setError("Playback error");
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    sound?.volume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!sound) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    sound.mute(newMuted);
  };

  return (
    <nav className="sticky bottom-0 w-full overflow-hidden right-0 bg-blue-950/30 backdrop-blur-2xl z-50">
      <div className="px-4 py-3">
        {error && (
          <div className="mb-2 text-xs text-red-400 bg-red-950/20 px-2 py-1 rounded">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            disabled={!howlerLoaded || isLoading}
            className="flex items-center justify-center h-8 w-8 rounded-full transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white ml-0.5" />
            )}
          </button>

          <div className="flex-1 flex items-center gap-2">
            {isPlaying && (
              <span className="flex items-center gap-2 text-xs text-white">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                LIVE
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-white">
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-secondary rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors",
                "hover:bg-accent text-white rounded-md"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
