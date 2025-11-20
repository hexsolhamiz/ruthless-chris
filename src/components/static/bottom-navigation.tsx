"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
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

const navigationItems = [
  { id: "live", icon: Wifi, label: "live" },
  { id: "display", icon: Monitor, label: "Display" },
  { id: "info", icon: Info, label: "Info" },
  { id: "phone", icon: Phone, label: "Phone" },
  { id: "email", icon: Mail, label: "Email" },
  { id: "share", icon: Share2, label: "Share" },
];

export function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("live");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamMethod, setStreamMethod] = useState<'direct' | 'cors-proxy'>('direct');
  const audioRef = useRef<HTMLAudioElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const playAttemptRef = useRef(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      console.log('Stream ready to play');
      setIsLoading(false);
      setError(null);
      retryCountRef.current = 0;
    };

    const handlePlaying = () => {
      console.log('Stream playing');
      setIsPlaying(true);
      setIsLoading(false);
      setError(null);
      playAttemptRef.current = 0;
    };

    const handleWaiting = () => {
      console.log('Stream buffering...');
      setIsLoading(true);
    };

    const handleStalled = () => {
      console.log('Stream stalled');
      setIsLoading(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleError = () => {
      const errorCode = audio.error?.code;
      const errorMessages: { [key: number]: string } = {
        1: 'Loading aborted',
        2: 'Network error',
        3: 'Stream format issue',
        4: 'Format not supported',
      };

      const errorMsg = errorCode ? errorMessages[errorCode] : 'Unknown error';
      console.error('Stream error:', errorMsg, 'Code:', errorCode, audio.error);
      
      // Try CORS proxy on first decode error (code 3)
      if (errorCode === 3 && playAttemptRef.current === 0 && streamMethod === 'direct') {
        playAttemptRef.current++;
        console.log('Trying CORS proxy fallback...');
        setStreamMethod('cors-proxy');
        setError('Trying alternative connection...');
        
        retryTimeoutRef.current = setTimeout(() => {
          if (audio) {
            audio.load();
            audio.play().catch(err => console.error('Proxy retry failed:', err));
          }
        }, 1000);
        return;
      }
      
      // Regular retry logic for network errors
      if (errorCode === 2 && retryCountRef.current < 3) {
        retryCountRef.current++;
        console.log(`Retrying connection (${retryCountRef.current}/3)...`);
        setError(`Connection lost, retrying... (${retryCountRef.current}/3)`);
        
        retryTimeoutRef.current = setTimeout(() => {
          if (audio && isPlaying) {
            audio.load();
            audio.play().catch(err => console.error('Retry failed:', err));
          }
        }, 2000);
      } else {
        setError(errorMsg);
        setIsPlaying(false);
        setIsLoading(false);
      }
    };

    const handleLoadStart = () => {
      console.log('Loading stream...');
      setIsLoading(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [isPlaying, streamMethod]);

  const getStreamUrl = () => {
    const baseUrl = 'https://hello.citrus3.com:8022/stream';
    
    if (streamMethod === 'cors-proxy') {
      // Use CORS proxy for Safari
      return `https://corsproxy.io/?${encodeURIComponent(baseUrl)}`;
    }
    
    return baseUrl;
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setError(null);
        retryCountRef.current = 0;
        
        // Force reload with current stream method
        audio.load();
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Playback started successfully');
            })
            .catch((err) => {
              console.error('Play failed:', err);
              
              if (err.name === 'NotAllowedError') {
                setError('Click play to start');
              } else if (err.name === 'NotSupportedError') {
                setError('Stream format not supported');
              } else {
                setError('Failed to play stream');
              }
              
              setIsPlaying(false);
              setIsLoading(false);
            });
        }
      }
    } catch (err) {
      console.error('Toggle play error:', err);
      setError('Playback error');
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <nav className="sticky bottom-0 w-full overflow-hidden right-0 bg-blue-950/30 backdrop-blur-2xl z-50">
      <div className="px-4 py-3">
        <audio 
          ref={audioRef}
          preload="none"
          crossOrigin="anonymous"
          key={streamMethod}
        >
          <source
            src={getStreamUrl()}
            type="audio/mpeg"
          />
        </audio>

        {error && (
          <div className="mb-2 text-xs text-yellow-400 bg-yellow-950/20 px-2 py-1 rounded flex items-center gap-2">
            <span className="flex-1">{error}</span>
            {streamMethod === 'cors-proxy' && (
              <span className="text-[10px] text-yellow-300 bg-yellow-900/30 px-1 py-0.5 rounded">
                PROXY
              </span>
            )}
            {retryCountRef.current > 0 && (
              <div className="h-3 w-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading && retryCountRef.current === 0}
            className="flex items-center justify-center h-8 w-8 rounded-full transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="text-white h-4 w-4 ml-0.5" />
            )}
          </button>

          {/* Live Indicator */}
          <div className="flex-1 flex items-center gap-2">
            {isPlaying && !isLoading && (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-xs text-white">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  LIVE
                </span>
                <span className="text-[10px] text-white/50">Kemet FM</span>
              </div>
            )}
            {isLoading && (
              <span className="text-xs text-white/70">
                Connecting...
              </span>
            )}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-white transition-colors"
            >
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
              className="w-16 h-1 bg-secondary rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
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