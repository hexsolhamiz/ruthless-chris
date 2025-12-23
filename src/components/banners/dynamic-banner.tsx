"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

type ImageData = {
  id: number;
  url: string;
  type: string;
};

export const DynamicBanner = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/images?type=banner');
        
        if (!response.ok) {
          throw new Error('Failed to fetch banner image');
        }
        
        const data: ImageData = await response.json();
        setImageUrl(data.url);
      } catch (err) {
        console.error('Error fetching banner image:', err);
        setImageUrl('https://res.cloudinary.com/dkgcww59b/image/upload/v1766416370/seb_zpixtd.png');
      } finally {
        setLoading(false);
      }
    };

    fetchBannerImage();
  }, []);

  return (
    <div className='min-h-[350px] w-full px-4'>
      <div className='flex justify-center items-center h-[180px] w-full bg-white/10 rounded-4xl'>
        {loading ? (
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        ) : (
          <Image
            src={imageUrl || 'https://res.cloudinary.com/dkgcww59b/image/upload/v1766416370/seb_zpixtd.png'}
            alt="banner logo"
            height={150}
            width={150}
            className='object-contain' 
            priority
          />
        )}
      </div>
    </div>
  );
};