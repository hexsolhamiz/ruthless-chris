"use client"
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import Image from 'next/image';



export default function MusicShowCarousel() {

    const data = [
    { id: 1, url: '/music/music-show.png' },
    { id: 2, url: '/music/music-show.png' },
    { id: 3, url: '/music/music-show.png' },
    { id: 4, url: '/music/music-show.png' },
    { id: 5, url: '/music/music-show.png' },
    { id: 6, url: '/music/music-show.png' },
    { id: 7, url: '/music/music-show.png' },
    { id: 8, url: '/music/music-show.png' },
    ]
  return (
      <div className='w-full min-h-screen lg:h-[400px] flex items-center justify-center bg-gray-900 text-white'>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper flex items-center justify-center lg:h-full w-full">

        {
            data.map((item) => (
                <SwiperSlide key={item.id}>
                    <Image src={item.url} alt={`Slide ${item.id}`} width={400} height={200} className='w-full h-full'/>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  );
}
