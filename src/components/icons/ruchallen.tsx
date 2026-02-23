import Image from 'next/image'
import React from 'react'

export const Ruchallen = () => {
    return (
        <div className='relative overflow-hidden bg-white w-15 h-15 rounded-full'>
            <Image
                src="/ruchallen.png"
                alt='ruchallen'
                fill
                className='bg-contain'
            />
        </div>
    )
}
