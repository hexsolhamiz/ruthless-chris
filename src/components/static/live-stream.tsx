"use client";

interface LiveStreamProps {
  videoUrl: string;
  title?: string;
}

export function LiveStream({
  videoUrl,
  title = "Live Stream",
}: LiveStreamProps) {
  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    )?.[1];
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
      : url;
  };

  return (
    <div className="py-8 w-full min-h-[600px] flex flex-col justify-center mx-auto bg-black overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto flex justify-start px-4 pt-3 pb-1">
        <h2 className="text-white text-start font-bold text-3xl py-2">{title}</h2>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row">
        {/* Video Player */}
        <div className="max-w-7xl mx-auto lg:py-8 h-full w-full relative">
          <div className="flex lg:flex-row flex-col aspect-video bg-black relative">
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="w-full lg:w-[70%] h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <iframe
              src="https://www.youtube.com/live_chat?v=36YnV9STBqc&si=z59ATHulfbim8waW&embed_domain=localhost"
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
