import React from 'react'
import Image from 'next/image'

export const RuchallenBanner = () => {
  return (
    <div className="w-full relative min-h-[500px] lg:min-h-[400px] bg-[url(/hero.png)] bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 pt-24 lg:pt-0 flex flex-col items-center justify-center h-[450px] lg:min-h-[500px] px-6">
        {/* Animated Wave Graphics */}
        <Image
          src="/ruchallen.png"
          width={300}
          height={300}
          alt="Logo"
          className="lg:h-[300px] lg:w-[300px]  animation-pulse"
        />
      </div>
    </div>
  )
}
