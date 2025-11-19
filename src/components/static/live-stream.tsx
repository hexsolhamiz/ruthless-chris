"use client";

import { useEffect, useState } from "react";

interface LiveStreamProps {
  title?: string;
}

export function LiveStream({ title = "Live Stream" }: LiveStreamProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const sheetId = process.env.NEXT_PUBLIC_SHEET_ID;
  const sheetName = process.env.NEXT_PUBLIC_SHEET_NAME || "Sheet1";

  const openSheetUrl = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

  // Converts YouTube links → embed format
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    )?.[1];

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
      : url;
  };

  useEffect(() => {
    async function fetchVideoUrl() {
      try {
        const res = await fetch(openSheetUrl);
        const data = await res.json();

        const rawUrl = data?.[0]?.videoUrl;
        if (rawUrl) {
          setVideoUrl(getEmbedUrl(rawUrl));
        }
      } catch (error) {
        console.error("Error fetching livestream URL:", error);
        setVideoUrl(null);
      } finally {
        setLoading(false);
      }
    }

    fetchVideoUrl();

    // Optional auto-refresh every 30 seconds
    const interval = setInterval(fetchVideoUrl, 30000);
    return () => clearInterval(interval);
  }, [openSheetUrl]);

  if (loading) {
    return (
      <div className="py-8 text-center text-white">Loading Live Stream...</div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="py-8 text-center text-white">
        No livestream URL found.
      </div>
    );
  }

  return (
    <div className="py-8 w-full min-h-[600px] flex flex-col justify-center mx-auto bg-black overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto flex justify-start px-4 pt-3 pb-1">
        <h2 className="text-white text-start font-bold text-3xl py-2">
          {title}
        </h2>
      </div>

      {/* Main Content */}
      <div className="w-full h-full flex flex-col lg:flex-row">
        {/* Video Player */}
        <div className="max-w-7xl mx-auto lg:py-8 h-full w-full relative">
          <div className="flex lg:flex-row flex-col aspect-video bg-black relative">
            <iframe
              src={videoUrl}
              className="w-full lg:w-[70%] h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <iframe
              src={`https://www.youtube.com/live_chat?v=${
                videoUrl.match(/embed\/([^?]+)/)?.[1] ?? ""
              }&embed_domain=${
                typeof window !== "undefined" ? window.location.hostname : ""
              }&dark_theme=1`}
              className="lg:w-[30%] w-full h-full bg-black"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
