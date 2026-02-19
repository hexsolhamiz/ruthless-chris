import React from 'react'
import Image from 'next/image'

export const JrBanner = () => {
  return (
    <div className="w-full relative min-h-[500px] lg:min-h-[400px] bg-[url(/hero.png)] bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 pt-24 lg:pt-0 flex flex-col items-center justify-center h-[450px] lg:min-h-[500px] px-6">
        {/* Animated Wave Graphics */}
        <Image
          src="/jr.png"
          width={400}
          height={400}
          alt="Logo"
          className="lg:h-[400px] lg:w-[400px]  animation-pulse"
        />
      </div>
    </div>
  )
}
