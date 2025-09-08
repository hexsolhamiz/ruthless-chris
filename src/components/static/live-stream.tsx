"use client"


interface LiveStreamProps {
  videoUrl: string
  title?: string
}


export function LiveStream({ videoUrl, title = "Live Stream" }: LiveStreamProps) {


  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : url
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center mx-auto bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row">
        {/* Video Player */}
        <div className="w-full relative">
          <div className="aspect-video bg-black relative">
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-white text-center px-4">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-shadow-lg">
                  I CAN FEEL THE PARADISE BEFORE MY WORLD IMPLODES
                </h3>
              </div>
            </div>
          </div>

          {/* Audio Waveform Visualization */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-center">
            <div className="flex items-end space-x-1 h-8">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-sm animate-pulse"
                  style={{
                    width: "3px",
                    height: `${Math.random() * 100 + 20}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

    
      </div>
    </div>
  )
}
