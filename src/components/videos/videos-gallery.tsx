"use client"

import { useEffect, useState } from "react"

interface VideoItem {
  url : string;
  id : number;
}
export function VideosGallery() {

  const [videos,setVideos] = useState<VideoItem[]>([]);
   

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);
  
  

  return (
    <section className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl px-2 md:px-0 text-center lg:text-start sm:text-5xl font-semibold tracking-tight text-white">Ruthless Chris Videos</h1>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length > 0 && videos.map((video,index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`${video.url}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  
                  className="w-full h-full"
                />
              </div>allowFullScreen

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
