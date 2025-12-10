import Image from 'next/image'
import React from 'react'

export const Seb = () => {
    return (
        <div className='relative overflow-hidden w-15 h-15 rounded-full'>
            <Image
                src="/icons/seb.png"
                alt='seb'
                fill
                className='bg-contain'
            />
        </div>
    )
}
