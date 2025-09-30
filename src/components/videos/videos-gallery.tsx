"use client"

import { videos } from "@/data/videos"



export function VideosGallery() {
  return (
    <section className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl px-2 md:px-0 text-center lg:text-start sm:text-5xl font-semibold tracking-tight text-white">Ruthless Chris Videos</h1>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="space-y-3">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`https://www.youtube.com/embed/${video.link}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
